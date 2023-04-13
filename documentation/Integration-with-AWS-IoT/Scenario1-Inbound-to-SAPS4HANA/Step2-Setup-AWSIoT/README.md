## Configure AWS IoT

In this tutorial, you will configure Microsoft Azure IoT Central Application. These are the Microsoft Azure services and components you will need for this scenario:

    - Valid AWS Subscription
    - AWS IoT Core
    - Amazon SQS
    - Amazon EventBridge

If you don't have access to a AWS (including a paid or trial subscription), create a new AWS account using [AWS Portal](https://aws.amazon.com/)


In this section, you will use Amazon AWS account to provision the resources needed for executing this workflow.

### 1. Create Policy in AWS IoT Core

1. In the AWS portal, search for **IoT Core** and choose **IoT Core**.

    ![plot](./images/iot-core-search.png)

2. In AWS IoT, under **Security** section, choose **Policies** and then choose **Create policy**.

    ![plot](./images/iot-policy-create1.png)

3. In the **Policy name** input field, enter "Silo-Device-Policy" and in the **Policy Statements** tab, select **iot:Connect** in the **Policy action** dropdown and enter "*" in the **Policy resource** field.

    ![plot](./images/iot-policy-create2.png)

4. Choose **Add new statement** button and add more policies for **iot:Publish**, **iot:Receive** and  **iot:Subscribe** and then choose **Create**.
    The policies choosen should look like the below screenshot.

    ![plot](./images/iot-policy-create3.png)

5. You will get the "Successfully created policy" message as shown below.

    ![plot](./images/iot-policy-create3.png)

### 2. Create Thing Type AWS IoT Core

1. In the AWS portal, search for **IoT Core** and choose **IoT Core**.

    ![plot](./images/iot-core-search.png)

2. In the AWS IoT, under **Manage** section, choose **All devices** and then choose **Thing types**.

    ![plot](./images/iot-thing-types.png)

3. Choose **Create thing type**

    ![plot](./images/iot-thing-types-create1.png)

4. In the **Thing type name** input field, enter "Silo" and then choose **Create thing type** to create the thing type.

    ![plot](./images/iot-thing-types-create2.png)

### 3. Create Thing in AWS IoT Core

1. Under **Manage** section, choose **All devices**, choose **Things** and then choose **Create things**.

    ![plot](./images/iot-thing-create1.png)

2. Choose **Create single thing** and then choose **Next**

    ![plot](./images/iot-thing-create2.png)

3. In the **Thing name** field, enter the name of the thing as "Silo1" and in the dropdown for **Thing type**,select the thing type created in the Step 2(Silo).

    ![plot](./images/iot-thing-create3.png)

4. Scrool down and then Choose **Next**.

5. In the **Configure device certificate** step, choose **Auto-generate a new certificate** and then choose **Next**

    ![plot](./images/iot-thing-create4.png)

6. In the **Attach policies to certificate** step, choose the policy the you created in Step 1(Silo-Device-Policy) and then choose **Create thing**.

    ![plot](./images/iot-thing-create5.png)

7. Choose **Download** to download the device certitificate, public/private key files and root CA certificates.

    ![plot](./images/iot-thing-certificates.png)

### 4. Configure Data Export

1. Choose **Data export** and then choose **+ New Data Export** to create new Data export.

    ![plot](./images/iot-dataexport.png)

2. Enter **Waste Container Export** as value. 

    In the **Type of data to export** dropdown menu, select **Telemetry** and then choose **+Message property filter**.

    ![plot](./images/dataexport-new.png)

3. In the **Export the data if** dropdown menu, select **all of the conditions are true**. You can configure this as per your requirement.

4. In the **Name** field, enter **Device template** as value.

5. In the **Operator** dropdown menu, select **Equals** and in the **Value**, enter **Waste Container v2**.

    ![plot](./images/dataexport-new1.png)

6. Choose **+Filter**.

    ![plot](./images/dataexport-new2.png)

    Enter the details as shown in the below screen shot.

    ![plot](./images/dataexport-new3.png)

    
7. In the **Enrichments** section, choose **+Custom String** and enter the below key value pairs as shown below.

    ![plot](./images/enrichment-custom.png)

8. Choose **+Property** and enter the below key value pairs as shown below.

    ![plot](./images/enrichment-property.png)

9. Choose **Save**.
