## Configure AWS IoT

In this tutorial, you will configure AWS components. These are the AWS services and components you will need for this scenario:

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

### 4. Create Queue in Amazon SQS

1. In the AWS portal, search for **sqs** and choose **Simple Queue Service**.

    ![plot](./images/sqs-search.png)

2. Choose **Create queue**

    ![plot](./images/sqs-queue-create1.png)

3. In the **Create queue** screen, enter the **Name** of the queue (Ex: iot-core-queue).

    ![plot](./images/sqs-queue-create2.png)

4. Scroll down and choose **Create queue**

    ![plot](./images/sqs-queue-create3.png)

5. Queue create successfully is displayed.

    ![plot](./images/sqs-queue-create4.png)

### 5. Create rule in AWS IoT Core to send events to SQS topic

1. In AWS IoT Core, under **Manage** section, choose **Message routing** and then choose **Rules**.

    ![plot](./images/iot-rules1.png)

2. Under the **Rules** section, choose **Create rule**

    ![plot](./images/iot-rules2.png)

3. In the **Specify rule properties** step, enter the **Rule name** as "LowStock_Rule" and then choose **Next**.

    ![plot](./images/iot-rules3.png)

4. In the **Configure SQL statement** step, enter the **SQL statement** as "SELECT * FROM 'iot/topic/silo' WHERE FillingLevel < 20" and then choose **Next**.

    ![plot](./images/iot-rules4.png)

5. In the **Attach rule actions** step, under **Rule actions**, select **Simple Queue Service**

    ![plot](./images/iot-rules5.png)

6. In the **Queue name** dropdown, select the queue that is created in Section 4 - Create Queue in Amazon SQS above (iot-core-queue) and then choose **Create new role**

    ![plot](./images/iot-rules6.png)

7. Enter the role name as then choose **Create**

    ![plot](./images/iot-rules-role.png)

8. **Successfully created role** message is displayed. Scroll down and choose **Next**

    ![plot](./images/iot-rules7.png)

9. In the **Review and create** step, choose **Create**

    ![plot](./images/iot-rules8.png)

10. **Successfully created rule** message is displayed.

    ![plot](./images/iot-rules9.png)