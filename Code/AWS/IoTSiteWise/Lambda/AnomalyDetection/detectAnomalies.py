import io
import os
import json
import traceback
import urllib.parse
import boto3
import copy
import botocore.response as br
import base64 as b64
import urllib3

#clients
s3       = boto3.resource('s3')
smclient = boto3.client('secretsmanager')
sitewise = boto3.client('iotsitewise')
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
        print("File text" + filetext)
        filedata = json.loads(filetext)
        print(type(filedata))

        # Parse IoT SiteWise data
        event_type = filedata.get('type')
        payload = filedata.get('payload', {})
        asset_id = payload.get('assetId')
        property_id = payload.get('propertyId')
        values = payload.get('values', [])

        if event_type != "PropertyValueUpdate" or not values:
            raise ValueError("Invalid event type or missing values")

        # Extract the latest value
        latest_value = values[0]
        timestamp = latest_value.get('timestamp', {})
        quality = latest_value.get('quality')
        value = latest_value.get('value', {})

        # Parse string value if it's JSON
        string_value = value.get('stringValue')
        if string_value:
            try:
                parsed_value = json.loads(string_value)
            except json.JSONDecodeError:
                parsed_value = string_value
        else:
            parsed_value = None

        # Fetch asset and property names
        asset_name = ""
        property_name = ""
        try:
            asset_response = sitewise.describe_asset(assetId=asset_id)
            asset_name = asset_response.get('assetName', 'Unknown Asset')
            print(asset_name)
        except Exception as e:
            print(f"Error fetching asset details: {str(e)}")
            asset_name = 'Universal Robotic Robot'

        try:
            property_response = sitewise.describe_asset_property(
                assetId=asset_id,
                propertyId=property_id
            )
            property_name = property_response.get('compositeModel', {}).get('name', 'Unknown Property')
            print(property_name)
        except Exception as e:
            print(f"Error fetching property details: {str(e)}")
            property_name = 'temperature'

        
        #print(filedata)
        #Snotif = getODataClient(NOTIF_SERVICE)
        notif_data = {'data':{}}
        notif_data['data']['SourceSystem']= 'aws-iot-sitewise' #filedata['projectDisplayName']
        notif_data['data']['DeviceLocation']= '1017' #filedata['siteDisplayName']
        notif_data['data']['DeviceType']= 'Robot' #filedata['assetDisplayName']
        notif_data['data']['AssetName']= asset_name #filedata['assetDisplayName']
        notif_data['data']['PropertyName']= property_name #filedata['assetDisplayName']
        notif_data['data']['BUCKETId']=bucket
        notif_data['data']['eventData']=filedata
        #fetch oauth token for SAP Event Mesh
        
        #Send event to SAP Advanced Event Mesh
        aem_rest_url = os.environ.get('SAP_AEM_REST_URL')
        http = urllib3.PoolManager()
        aem_credentials = get_aem_credentials()
        headers = urllib3.make_headers(basic_auth=aem_credentials)
        headers['Content-Type'] = 'application/json'
        api_call_response = http.request('POST', aem_rest_url, body=json.dumps(notif_data), headers=headers, preload_content=False)
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
    #token = b64.b64encode(f"{aem_username}:{aem_password}".encode('utf-8')).decode("ascii")
    return f'{aem_username}:{aem_password}'