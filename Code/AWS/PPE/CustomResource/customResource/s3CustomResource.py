
import boto3
import os
def handler(event,context):

    s3_client = boto3.client('s3')
    folder_name= os.environ.get('FOLDER_NAME')
    
    if event['RequestType'] == 'Create':
        #    bucket = s3_client.create_bucket(Bucket=os.environ('BUCKET_NAME'))
        return  s3_client.put_object(Bucket=os.environ.get('BUCKET_NAME'), Key=(folder_name+'/'))






