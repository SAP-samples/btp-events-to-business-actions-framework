# Integrate Events from AWS IoT SiteWise with SAP S/4HANA using SAP BTP and Gen AI Hub

**AWS IoT SiteWise** is a managed service with which you can collect, store, organize and monitor data from industrial equipment at scale to help you make better, data-driven decisions. You can use AWS IoT SiteWise to monitor operations across facilities, quickly compute common industrial performance metrics, and create applications that analyze industrial equipment data to prevent costly equipment issues and reduce gaps in production.

However, the events only provides valuable results if any business action is taken on them. To reduce the burden of change management and ensure action is taken on the AWS IoT SiteWise events, this sample project has demonstrated how to automatically record the AWS IoT SiteWise inferences in SAP Plant maintenance/asset management. 


## SAP BTP integration pattern
If the SAP ECC or S/4 HANA system is an API provider to BTP, please use the below architecture. The architecture uses an APIKey for authentication. The preflow policy contains snippets from here to pass the provider credentials and xcsrf token to the consumer.
![architecture](/Solution-Architecture.png)

This project is intended to be sample code only. Not for use in production.

This project will create the following in your AWS cloud environment specified:
* Lambda Layers
* Lambda for detecting Anomalies and creating notifications in SAP
* Roles
* S3 Notifications

## Deploying the CDK Project

This project is set up like a standard Python project.  


2.  Clone the github repository and navigate to the directory.

```
$ git clone https://github.com/SAP-samples/btp-aws-monitron.git

$ cd aws-monitron-sap-integration
```

To manually create a virtualenv 

```
$ python3 -m venv .env
```

After the init process completes and the virtualenv is created, you can use the following
step to activate your virtualenv.

```
$ source .env/bin/activate
```

Once the virtualenv is activated, you can install the required dependencies.

```
$ pip install -r requirements.txt
```

The `appConfig.json` file takes the input paramters for the stack. Maintain the following parameters in the `appConfig.json` before deploying the stack

## AWS environment details
* `account` Enter AWS account id of your AWS cloud environment
* `region`  Enter Region information where the stack resources needs to be created
* `vpcId`   Enter the VPC for Lambda execution from where Lambda can access SAP resources and look out for vision
* `subnet`  Enter the subnet for Lambda exection
## Resource Identifiers
* `stackname` Enter an Identifier/Name for the CDK stack
* `ddbtablename` Enter a name for Dynamo DB Table that would be created as part of the stack which would hold the metadata for creating Service notification in SAP
## Bucket Structure
* `bucketname` Enter the name of the bucketwhere the inferences are sent.
* `inferencefolder` Enter the name of the folder(prefix)where the inferences are sent. Leave blank if no folder
## SAP Environnment details
* `SAP_AUTH_SECRET` Provide the arn where the credentials with keys `user` and `password` or `APIkey` if using SAP BTP  for accessing SAP services.
* `SAP_HOST_NAME` Host name of the instance for accessing the SAP OData service e.g. hostname of load balancer/Web Dispatcher/SAP Gateway. If using BTP, please pass host alias
* `SAP_PORT` provide the port on which the SAP service can be accesed e.g 443/50001
* `SAP_PROTOCOL` Enter protocol ushing which the service will be accessed HTTPS/HTTP 


Bootstrap your AWS account for CDK. Please check [here](https://docs.aws.amazon.com/cdk/latest/guide/tools.html) for more details on bootstraping for CDK. Bootstraping deploys a CDK toolkit stack to your account and creates a S3 bucket for storing various artifacts. You incur any charges for what the AWS CDK stores in the bucket. Because the AWS CDK does not remove any objects from the bucket, the bucket can accumulate objects as you use the AWS CDK. You can get rid of the bucket by deleting the CDKToolkit stack from your account.

```
$ cdk bootstrap aws://<YOUR ACCOUNT ID>/<YOUR AWS REGION>
```

Deploy the stack to your account. Make sure your CLI is setup for account ID and region provided in the appConfig.json file.

```
$ cdk deploy
```

## Cleanup

In order to delete all resources created by this CDK app, run the following command

```
cdk destroy
```

## Useful commands

 * `cdk ls`          list all stacks in the app
 * `cdk synth`       emits the synthesized CloudFormation template
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk docs`        open CDK documentation

Enjoy!
