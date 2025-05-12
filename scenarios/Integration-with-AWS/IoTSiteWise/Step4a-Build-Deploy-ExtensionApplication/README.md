## Build and Deploy the Extension Application

In this section, you will clone the codebase and deploy the extension application in SAP BTP. 

### 1. Clone the GitHub Repository
    

Clone the [Event To Action Framework](https://github.com/SAP-samples/btp-events-to-business-actions-framework) GitHub repository **advanced-event-mesh** branch. Use the following command to clone the Repo.

```
git clone https://github.com/SAP-samples/btp-events-to-business-actions-framework.git
```

### 2. Check the Prerequisites for Deployment

Ensure you have added the required entitlements as described in section **Step1-Setup-SAPBTP-Subaccount** page before deployment.

### 3. Deploy the Extension Application

Build and deploy the application. Run the following commands:

**Note**: Ensure you have Cloud MBT Build Tool. Refer [The Cloud MTA Build Tool (MBT)](https://help.sap.com/docs/HANA_CLOUD_DATABASE/c2b99f19e9264c4d9ae9221b22f6f589/1412120094534a23b1a894bc498c2767.html) for more details.

1. Open the Cloud Foundry command line interface (cf CLI).

2. Navigate to **action-management** directory. Below is the correct directory path once u have cloned the Repository. 

    ```
    cd Code\BTP\action-management
    ```

3. To enable the SAP CAP application to interact with the Generative AI Hub and AWS Bedrock, please maintain the following configuration in your `.cdsrc.json` file: Note: Paste the model deployement ID which is copied at [Step-1](../Step1-Setup-SAPBTP-Subaccount/README.md). The destination creation `AWS_BEDROCK_MODEL` is documented at [Step-7](../Step7-Configure-BusinessActions/README.md)

```
{
  "requires": {
    "db": "hana",
    "cap-llm-plugin": {
      "impl": "cap-llm-plugin/srv/cap-llm-plugin.js"
    },
    "GENERATIVE_AI_HUB": {
      "CHAT_MODEL_DESTINATION_NAME": "AWSBedrockDestination",
      "CHAT_MODEL_DEPLOYMENT_URL": "/inference/deployments/<your_model_deployment_ID>",
      "CHAT_MODEL_RESOURCE_GROUP": "default",
      "CHAT_MODEL_API_VERSION": "bedrock-2023-05-31"
    },
    "AWSBedrockDestination": {
      "kind": "rest",
      "credentials": {
        "destination": "AWS_BEDROCK_MODEL",
        "requestTimeout": "300000"
      }
    }
  },
  "build": {
    "target": "dbsrv-build"
  }
}

```


3. Fetch the dependencies.

    ```
    npm install
    ```
4. Build action-management modules.

    ```
    npm run build
    ```
5. Log in to your subaccount in SAP BTP to deploy the extension application.
    Check your region and copy the API endpoint accordingly. For example, "https://api.cf.region.hana.ondemand.com"

    ```
    cf login -a `<CF API endpoint>`
    ```
6. Push the application to your subaccount.

    ```
    npm run deploy
    ```
7. You can also check the status of your applications in the SAP BTP cockpit. Copy the value of the extension application URL.

    ![plot](./images/SAPBTPCockpit.png)

8. In the SAP BTP cockpit, navigate to your subaccount and choose **Services** > **Instances and Subscriptions**. Check if you have all of the instances created post deployment as shown below. Make sure the status of all of the instances are **Created**.

    ![plot](./images/postdeploy.png)


