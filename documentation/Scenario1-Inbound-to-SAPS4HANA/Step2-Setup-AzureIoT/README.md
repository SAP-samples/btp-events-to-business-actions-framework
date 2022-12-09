## Configure Microsoft Azure IoT Central

In this tutorial, you will configure Microsoft Azure IoT Central Application. These are the Microsoft Azure services and components you will need for this scenario:

    - Valid Azure Subscription
    - Azure IoT Central

If you don't have access to a Microsoft Azure account (including a paid or trial subscription), check out the [Unit 3: Microsoft Azure basics and setup](https://open.sap.com/courses/btpma1/items/1f82kP2dhVdZ6e9xia10A8) chapter in the latest openSAP course [Building Applications on SAP BTP with Microsoft Services](https://open.sap.com/courses/btpma1/). 

It explains in detail how to create a new Microsoft Azure account and get a free trial subscription. 

Once you have access to Microsoft Azure account, you will be able to see the list of Azure services in [Microsoft Azure Portal Home Page](http://portal.azure.com).

![plot](./images/homepage.png) 

In this section, you will create an Microsoft Azure IoT Central application and configure data export from the devices based on certain rules. Here you will use the GUI-based method to create the application.

### 1. Create Azure Resource Group

1. In the Azure portal, navigate to the **Home** page and choose **Resource groups**.

    ![plot](./images/resourcegrp.png)

2. In the **Basics** tab, in the **Project details** section, in the **Resource group** field, enter **SAPBusinessActions**.

    ![plot](./images/resourcegrpcreate.png)

### 2. Create Azure IoT Central application

1. In your Microsoft Azure Portal Home page, choose the created Resource Group.

2. Choose **Create**. 

    ![plot](./images/iot-central-app-create.png)

3. From the **Marketplace** search for **IoT Central application**.

    ![plot](./images/iot-central-app-create1.png)

4. Select the **IoT Central application** tile and then choose **Create**.

    ![plot](./images/iot-central-app-create2.png)

5. In the **IoT Central application** template page,   

    - In the **Subscription** dropdown menu, select **Free Trial** in case of free trial subscription or select your subscription.
    
    - In the **Resource group**  dropdown menu, select the resource group created in Step 1.

    - In the **Resource name** field, enter  **iot-events**. This is a unique name you can choose.

    - In the **Application URL** field, enter **iot-events**.

    - In the **Template** dropdown menu, select **Connected Waste Management**. In this scenario, you are using the template from list of industry-relevant template to get started quickly.

    - In the **Region** dropdown menu, select your preferred location where you would like to create your application.

    - In the **Pricing plan** dropdown menu, select your preferred plan.

6. Choose **Review + create**.

    ![plot](./images/iot-central-app-create3.png)

 7. If you see a message **Validation Passed**, choose **Create**.

    ![plot](./images/iot-central-app-create4.png)

### 3. Create a new device template in IoT Central application

1. Select the created IoT Central Application to view the details. Choose the created IoT Central Application URL to open the application.

    ![plot](./images/created-app.png)

2. Select the IoT Central Application URL to open the application.

    Your application should have two devices added for the device template type **Connected Waste Bin** as shown in the screenshot.

    ![plot](./images/iot-app.png)

3. In this scenario, you will create a new device template based on your custom capabilities. Choose **Device templates** > **Select type** and then choose **Create a custom device template**.

4. Choose **Next:Customize** to create a new device template.

    ![plot](./images/newdevice-template1.png)

5. In the **Device template name** field, enter **Waste Container v2**. Choose **Next: Review**.

   ![plot](./images/newdevice-template2.png)

6. Review and choose **Create**. 

   ![plot](./images/newdevice-template3.png)

7. Choose the created device template and choose **Import a model** to import model file.

    ![plot](./images/import-template.png)

    **Note**: **Container.json** file is available in devicetemplate folder. Upload this model file.

    ![plot](./images/model-imported.png)

8. Choose **Publish**.

    ![plot](./images/publish.png)

### 4. Configure Data Export

1. Choose **Data export** to create new Data export.

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

### 4. Create Destinations

   **Note: To create a destination, you will need details from SAP BTP which you will get post deployment(Step5-Build-Deploy-ExtensionApplication). Complete the Step 3, 4 and 5 and then continue the next step here**.  


7. Go to Microsoft Azure Portal and choose the IoT Central Application you created. Choose **Data Export** and then choose **Destinations** tab to create new destination.

    ![plot](./images/create-destination.png)

8. Enter **Send to SAP Event Mesh** as value for name of the destination.

9. In the **Destination Type** dropdown menu, select **Webhook**.

10. Write instruction to form the callback url.<AJIT> 
In the **Callback URL** field, enter the value of the uri field you copied in Step 3.

11. From the **Authorization** dropdown menu, select **OAuth**.

12. In the **Token URL**, **Client ID** and **Client secret** field, enter the value of the tokenendpoint, clientid, and clientsecret field you copied in Step 3.

13. In the **Scope** field, enter **uaa.resource**.

14. In the **Token request content type​** dropdown menu, choose **Auto**.

15. In the **Headers** section, choose **+Header** and enter the below key-value pair.

    ![plot](./images/update-dest.png)

16. Choose **Save**.