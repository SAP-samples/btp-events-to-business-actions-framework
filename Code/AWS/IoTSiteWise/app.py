#!/usr/bin/env python3
from aws_cdk import App,Environment
from aws_monitron_sap.aws_monitron_sap_stack import AwsMonitronSAPStack
from AppConfig.config import Config

_config = Config()

app = App()

env = Environment(account=_config.account, region=_config.region)

AwsMonitronSAPStack(app,_config.stackname,env=env)

app.synth()
