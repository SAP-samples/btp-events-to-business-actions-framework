import io
import os
import json
import traceback
import urllib.parse
import boto3
import copy
import botocore.response as br
import requests
import base64 as b64
from datetime import datetime, tzinfo,timezone,timedelta

#from boto3.dynamodb.conditions import Key
#from boto3.dynamodb.conditions import Attr

#clients
s3       = boto3.client('s3')
smclient = boto3.client('secretsmanager')

sapauth={}


def handler(event,context):
# Incoming image
    bucket = event['Records'][0]['s3']['bucket']['name']
    key = urllib.parse.unquote_plus(event['Records'][0]['s3']['object']['key'],\
         encoding='utf-8')
    
    try:
    # Read the image object    
        detectIncident(bucket, key)

    except Exception as e:
        traceback.print_exc()
        return e
        
def detectIncident(bucket,key):
        # Amazon Rekognition client
    rekognition = boto3.client('rekognition')
    response = rekognition.detect_protective_equipment(
        Image={'S3Object': {'Bucket': bucket, 'Name': key}},
        SummarizationAttributes={
            'MinConfidence': 90,
            'RequiredEquipmentTypes': [
                'FACE_COVER',
                'HEAD_COVER',
                'HAND_COVER'
            ]
        }
    )
    
        
        
    print(key)
    result = len(response['Summary']['PersonsWithoutRequiredEquipment'])
    print('is Safety observation:'+str(result))
    
    if result > 0:
         #createNotification(image_bytes,image_type,key)
         createIncident(bucket,key)
         
def createIncident(bucket,key):
    try: 
        notif_data = {'data':{}}
        notif_data['data']['BUCKETId']=bucket
        notif_data['data']['photo']=key
        notif_data['data']['SourceSystem']='AWS-PPE'
        notif_data['data']['DeviceType']='Camera'
        notif_data['data']['DeviceLocation']='L001'
        
        
        incidendate = datetime.utcnow().isoformat()[:-7]+'Z'
        print("date is"+incidendate)
        payload = {
            
        }
        #payload["IncidentUTCDateTime"] = datetime.utcnow().isoformat()[:-7]+'Z'
        payload["IncidentCategory"] = "003"
        payload["IncidentTitle"] = "PPE incident detected - Safety observation"
        payload["IncidentUTCDateTime"]=incidendate
        print(payload["IncidentUTCDateTime"])
        notif_data['data']['eventData']=payload
        #fetch oauth token for SAP Event Mesh
        
        #Send event to SAP Advanced Event Mesh
        api_call_headers = {
            'Authorization': get_aem_credentials(),
            'Content-Type': 'application/json'
        }

        aem_rest_url = os.environ.get('SAP_AEM_REST_URL')
        api_call_response = requests.post(aem_rest_url, data=json.dumps(notif_data), headers=api_call_headers, verify=False)
        print("api_call_headers",api_call_headers)
        print("Successfuly sent event to BTP")
    except Exception as e:
        traceback.print_exc()
        return e
    #print('SAP Incident number:'+Incident.IncidentUUID)

def get_aem_credentials():
    #Secret Manager
    aem_credentials_secret = smclient.get_secret_value(
        SecretId=os.environ.get('SAP_AEM_CREDENTIALS')    
    )
    
    aem_secret_string = json.loads(aem_credentials_secret['SecretString'])
    aem_username = aem_secret_string['username']
    aem_password = aem_secret_string['password']

    token = b64.b64encode(f"{aem_username}:{aem_password}".encode('utf-8')).decode("ascii")


    return f'Basic {token}'
  



   




