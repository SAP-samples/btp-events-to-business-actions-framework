#!/usr/bin/env python3
from aws_cdk import App,Environment
from aws_sitewise_sap.aws_sitewise_sap_stack  import AwsSitewiseSAPStack
from AppConfig.config import Config

_config = Config()

app = App()

env = Environment(account=_config.account, region=_config.region)

AwsSitewiseSAPStack(app,_config.stackname,env=env)

app.synth()
