import json
import os 

class Config:
    def __init__(self):
        root_dir = os.path.dirname(os.path.dirname( __file__ ))
        configfile = open(root_dir + '/appConfig.json')
        appConfig = json.load(configfile)
        
        self.account = appConfig['env']['account']
        self.region  = appConfig['env']['region']
        self.stackname = appConfig['stackName']
        self.sapaemcredential = appConfig['sapenv']['SAP_AEM_CREDENTIALS']
        self.sapaemresturl = appConfig['sapenv']['SAP_AEM_REST_URL']
        self.timeout = appConfig['lambdaTimeout']
        self.bucketname = appConfig['s3']['bucketname']
        self.vpc = appConfig['vpcId']
        self.subnet=appConfig['subnet']


