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

#clients
s3       = boto3.resource('s3')
smclient = boto3.client('secretsmanager')
sapauth={}


def handler(event,context):
    try:
# Incoming json file
        bucket = event['Records'][0]['s3']['bucket']['name']
        key = urllib.parse.unquote_plus(event['Records'][0]['s3']['object']['key'],\
             encoding='utf-8')
        # Read the json file   
        print(bucket)
        print(key)
        
        S3client = boto3.client("s3")
        
        fileobj = S3client.get_object(
        Bucket=bucket,
        Key=key
        ) 
        
        
        filetext = fileobj['Body'].read().decode('utf-8')
        #print(filetext)
        filesplit = filetext.splitlines()
        #get the latest record
        filedata=json.loads(filesplit[-1])
        #print(filedata)
        if filedata['assetState']['newState'] == 'NEEDS_MAINTENANCE' and filedata['assetState']['newState'] != filedata['assetState']['previousState']:

            #Snotif = getODataClient(NOTIF_SERVICE)
            notif_data = {'data':{}}
            notif_data['data']['SourceSystem']=filedata['projectDisplayName']
            notif_data['data']['DeviceLocation']=filedata['siteDisplayName']
            notif_data['data']['DeviceType']=filedata['assetDisplayName']
            notif_data['data']['BUCKETId']=bucket
            notif_data['data']['eventData']=filedata
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




