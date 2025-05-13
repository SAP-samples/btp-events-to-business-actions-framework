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
        #self.projectname = appConfig['lookoutvision']['projectname']
        #self.modelversion = appConfig['lookoutvision']['modelversion']
        self.timeout = appConfig['lambdaTimeout']
        self.bucketname = appConfig['s3']['bucketname']
        self.vpc = appConfig['vpcId']
        self.location=appConfig['s3']['location']
        self.camera=appConfig['s3']['camera']
        self.plant=appConfig['s3']['plant']
        self.subnet=appConfig['subnet']


