#!/usr/bin/env python3
from aws_cdk import App,Environment
from aws_sap_ppe.aws_sap_ppe import AwsPpeEhsStack
from AppConfig.config import Config

_config = Config()

app = App()

env = Environment(account=_config.account, region=_config.region)

AwsPpeEhsStack(app,_config.stackname,env=env)

app.synth()
