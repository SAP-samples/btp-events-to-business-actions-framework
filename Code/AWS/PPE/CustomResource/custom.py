from aws_cdk import(
aws_lambda as _lambda,
aws_logs as _logs,
aws_ec2 as ec2,
custom_resources as cr,
App,
Stack,
Duration,
CustomResource,
)
from constructs import Construct

import os 
from   os import path

class customResourceConstruct(Construct):
    def __init__(self, scope: Construct, id: str, props, **kwargs) -> None:
        super().__init__(scope, id,**kwargs)

        __dirname = (os.path.dirname(__file__))

        self._lambdaevent = _lambda.Function(self,'lambdabackeds3',
        runtime=_lambda.Runtime.PYTHON_3_8,
        code=_lambda.Code.from_asset(path.join(__dirname, './customResource')),
        handler='s3CustomResource.handler',
        # layers=[props['boto3Layer']],
        vpc=props['vpc'],
        vpc_subnets=ec2.SubnetSelection(subnets=props['subnet']),
        environment={
                "BUCKET_NAME": props['config'].bucketname,
                "FOLDER_NAME": props['folder']},
        memory_size=2048,
        timeout=Duration.seconds(props['config'].timeout),
        role=props['role']
        )

        self.s3CustomResourceProvider = cr.Provider(self, 's3CustomResourceProvider',
        on_event_handler=self._lambdaevent,
        log_retention=_logs.RetentionDays.ONE_DAY)


        self.s3CustomResource = CustomResource(self, 's3CustomResource',
        service_token=self.s3CustomResourceProvider.service_token
        )




