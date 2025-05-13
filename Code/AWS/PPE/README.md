## Integrating Amazon Rekognition and SAP EHS with SAP BTP for PPE Detection

Safety hazards can exist in every workplace in many different forms: sharp edges, falling objects, flying sparks, chemicals, noise, and other potentially dangerous situations. Safety regulators such as Occupational Safety and Health Administration (OSHA) and European Commission often require that businesses protect their employees and customers from hazards that can cause injury by providing them personal protective equipment (PPE) and ensuring their use.With Amazon Rekognition PPE detection, customers can analyze images from their on-premises cameras across all locations to automatically detect if persons in the images are wearing the required PPE such as face covers, hand covers, and head covers. SAP customers use SAP Environment health and safety module to record these detections manually as safety observations.This solution provides an integration framework between Amazon Rekognition and SAP Envriroment, Health and Safety(EHS).
## Architecture
![architecture](/p4s.png)


## SAP BTP integration pattern
 The architecture uses an APIKey for authentication. The preflow policy contains snippets from here to pass the provider credentials and xcsrf token to the consumer.
The API proxy and policy steps are taken from the [SAP documentation](https://blogs.sap.com/2020/08/10/consuming-sap-on-premise-data-through-sap-api-management/) to pass the APIKey and XCSRF token.  
![API product](/APIproduct.png)
![API](/API.png)
![API](/APIPolicy.png)


This project is intended to be sample code only. Not for use in production.

This project will create the following in your AWS cloud environment specified:
* Lambda Layers
* Lambda for detecting Anomalies and creating notifications in SAP
* Roles
* S3 bucket which will be used as a landing zone for images captured from equipment
* S3 Notifications

## Deploying the CDK Project

This project is set up like a standard Python project.  For an integrated development environment (IDE), use `AWS Cloud9 environment` to create python virtual environment for the project with required dependencies.  

1. Launch your AWS Cloud9 environment.

2.  Clone the github repository and navigate to the directory.

```
$ git clone https://github.com/ganeesin/ppedetection-ehs

$ cd ppedetection-ehs
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
## Bucket Structure
* `bucketname` Enter the name of the bucket to be created where the images will be captured for analysis
## SAP Environnment details
* `SAP_AUTH_SECRET` Provide the arn where the credentials with keys `user` and `password` or `APIkey` if using SAP BTP  for accessing SAP services.
* `SAP_HOST_NAME` Host name of the instance for accessing the SAP OData service e.g. hostname of load balancer/Web Dispatcher/SAP Gateway. If using BTP, please pass host alias
* `SAP_PORT` provide the port on which the SAP service can be accesed e.g 443/50001
* `SAP_PROTOCOL` Enter protocol ushing which the service will be accessed HTTPS/HTTP 
* `SAP_AUTH_SECRET` Enter ARN of secrets manager holding the APIKey. 

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