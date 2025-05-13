from aws_cdk import ( 
    aws_ec2 as ec2,
    aws_s3 as s3,
    Stack,
    RemovalPolicy,
)
# import constructs
from constructs import Construct
from LambdaLayer.LambdaLayers import LambdaLayers
from Lambda.Lambda import LambdaConstruct
from Roles.roles import rolesConstruct
from AppConfig.config import Config
from CustomResource.custom import customResourceConstruct

# Requires docker
# from aws_cdk.aws_lambda_python import(
#     PythonLayerVersion
#     PythonFunction
# )
class AwsPpeEhsStack(Stack):

    def __init__(self, scope: Construct, id: str, **kwargs) -> None:
        super().__init__(scope, id, **kwargs)
         
        #Configuration parameters for CDK from 'appConfig.json'
        appConfig = Config()
        
        #1.VPC
        vpc = ec2.Vpc.from_lookup(self,"VPC",vpc_id=appConfig.vpc)
         
        privateSubnets = vpc.select_subnets(subnet_type=ec2.SubnetType.PRIVATE_WITH_NAT)

        lamdbasubnet=[]

        for subnet in privateSubnets.subnets:
            if subnet.subnet_id==appConfig.subnet:
                lamdbasubnet.append(subnet)
 
        #2.Layers
        layers = LambdaLayers(self,'p4slambdalayers')
        
        #3.Roles
        p4srole = rolesConstruct(self, 'p4srole')

        #5.S3 Bucket
        pocbucket = s3.Bucket(self,'p4sbucket',
        bucket_name=appConfig.bucketname,removal_policy=RemovalPolicy.DESTROY)

        #6. Create Custom Resources
        _folder = appConfig.plant+'/'+appConfig.location+'/'+appConfig.camera

        customResourceConstruct(self, 'p4sfolders', props={
            'config': appConfig,
            'role': p4srole._lambdarole,
            # 'boto3Layer': layers._boto3,
            'folder': _folder,
            'vpc': vpc,
            'subnet':lamdbasubnet,
        })

        #7.Lambda
        LambdaConstruct(self, 'poclambda', props={
            # 'pyodataLayer':layers._pyodataLayer,
            # 'boto3Layer': layers._boto3,
            # 'pillowLayer': layers._pillow,
            # 'requestsLayer': layers._requests,
            'lambdaLayer': layers._lambdalayer,
            'vpc': vpc,
            'subnet': lamdbasubnet,
            'config': appConfig,
            'lambdarole': p4srole._lambdarole,
            'bucket': pocbucket,
            'prefix': _folder
            })


        #8.Lookout for vision
        