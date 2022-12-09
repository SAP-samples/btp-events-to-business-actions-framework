## Configure SAP S/4HANA Business Actions in the extension application

In this section, you will define business action in action-management extension application in SAP BTP. Ensure your application's **Requested State** is **Started**.

### 1. Create Destinations

1. Choose **action-management** application in your Cloud Foundry space and then choose **Service Bindings**. Select **action-management-rules** service bing and choose **Show sensitive data**.

    ![plot](./images/ActionManagementServiceBinding.png)

2. Copy the values of clientid, clientsecret, url and rule_runtime_url.

    ![plot](./images/BusinessRulesDestinationInfo.png)

3. In the SAP BTP cockpit, navigate to your subaccount and choose **Connectivity > Destinations**.

    ![plot](./images/BTPCockpitDestinations.png)

4. Create a new destination with the name **ACTION_BUSINESS_RULES** and enter the following configuration values. This is used for calling SAP Business Rules.

    - Copy the values of rule_runtime_url, clientid, clientsecret and url from Step 2 and update it for URL, Client ID, Client Secret and Token Service URL.

    ```
    Name: ACTION_BUSINESS_RULES
    Type: HTTP
    URL: <rule_runtime_url>/rules-service/rest/v2
    Proxy: Internet
    Authentication: OAuth2ClientCredentials
    Client ID: <clientid>
    Client Secret: <clientsercret>
    Token Service URL Type: Dedicated
    Token Service URL: <url>/oauth/token

    Additional Properties:
    HTML5.DynamicDestination: true
    ```
    Your destination configuration should look like this:

    ![plot](./images/BusinessRulesDestination.png)

5. Create another destination with the name **azure-iot-device-api** and enter the following configuration values. This is used to call Microsoft Azure IoT Device API.

   - Copy the value of the IoT Central Application URL from IoT Central Application in Microsoft Azure Portal and append the url with /api/devices/. Update this value for URL parameter.
   - For **URL.headers.Authorization** parameter, refer [Authentication and authorization](https://learn.microsoft.com/en-us/rest/api/iotcentral/authentication) to generate API Token.

    ```
    Name: azure-iot-device-api
    Type: HTTP
    URL: https://btp-events-s4-poc.azureiotcentral.com/api/devices/
    Proxy: Internet
    Authentication: NoAuthentication

    Additional Properties:
        HTML5.DynamicDestination: true
        HTML5.PreserveHostHeader: true
        URL.headers.Authorization: <API Token>
    ```

    Your destination configuration should look like this:

    ![plot](./images/AzureDeviceAPIDestination.png)

6. Create another destination with the name **ACTION_MODELER_S4** and enter the following configuration values. 

    - Change host name in URL, User, Password as per your SAP S/4HANA system details. In case of on-premise instance, choose Proxy as **OnPremise**.

    ```
    Name: ACTION_MODELER_S4
    Type: HTTP
    URL: https://<<hostname>/sap/opu/odata/sap
    Proxy: Internet
    Authentication: BasicAuthentication
    User: <SAP S4HANA User>
    Password: <SAP S4HANA Password>
    ```
    Your destination configuration should look like this:

    ![plot](./images/S4HANACloudDestination.png)

### 2. Configure Business Actions in  Manage Actions application

In this section, you will configure the different business actions that needs to be executed based on the event received.

1. In the SAP BTP cockpit, navigate to your subaccount and choose **Cloud Foundry** > **Spaces**.  Choose your space and then choose **action-management** application. Choose the url provided under **Application Routes** section.

    ![plot](./images/ActionManagementApplication.png)

2. Choose **Manage Actions** tile.

    ![plot](./images/ActionManagementHome.png)

3. Choose **Create** to create default action entry.

    ![plot](./images/createaction.png)


4. In the **Basic Information** section, enter the following configuration values. 

    ```
    Action Name: Determine Action from Event Information
    Description: Determine Action from Event Information
    Category: Default Action
    Action Type: Service Integration

    ```
5. In the **HTTP Information** section, enter the following configuration values. 

    **Note**: Replace **Rule Service ID** with the value copied from Create Business Rules Project section of the **Step6-Configure-BusinessRules-Part1** page.

    ```
    Destination: ACTION_BUSINESS_RULES
    Content-Type: application/json
    Method: POST
    Relative Path: /workingset-rule-services
    Payload: { "RuleServiceId": "<RulesServiceID>",
                "Vocabulary": [ {   "EventInfo":{ "SourceSystem": "${{event.data.enrichments.System}}",
                                    "DeviceTemple": "${{event.data.enrichments.DeviceTemplate}}",
                                    "DeviceLocation": "${{event.data.enrichments.Location}}" }  } ] }
    Action Id Path in Response: Result[0].ActionInfo.ActionId
    ```

    Your configuration should look like this:

    ![plot](./images/NewBusinessRulesAction.png)

7. Choose **Create**.

8. Create another business action with name **Update Device Cloud Property** and enter the following configuration values.

    ```
    Basic Information:
    
    Action Name: Update Device Cloud Property
    Description: Update Device Cloud Property
    Category: Pre/Post Action
    Action Type: Service Integration

    HTTP Information:
    Destination: azure-iot-device-api
    Content-Type: application/json
    Method: PATCH
    Relative Path: ${{event.data.deviceId}}/properties?api-version=2022-07-31
    Payload: {  "Status": "Under Maintainence"  }
    ```
    
    Your configuration should look like this:

    ![plot](./images/UpdateDeviceAction.png)

    
3. Create another business action with name **Create Purchase Requisition** and enter the following  configuration values.

    ```
    Basic Information:

    Action Name: Create Purchase Requisition
    Description: Create Purchase Requisition
    Category: Main Action
    Action Type: Service Integration
    
    HTTP Information:
    Destination: ACTION_MODELER_S4
    Content-Type: application/json
    Method: POST
    Relative Path: /API_PURCHASEREQ_PROCESS_SRV/A_PurchaseRequisitionHeader
    Payload: {
                "PurchaseRequisition": "",
                "PurchaseRequisitionType": "NB",
                "PurReqnDescription": "Purchase Req from Event ",
                "SourceDetermination": false,
                "PurReqnDoOnlyValidation": false,
                "to_PurchaseReqnItem": {
                    "results": [
                    {
                        "PurchaseRequisition": "",
                        "PurchaseRequisitionItem": "10",
                        "PurchaseRequisitionType": "NB",
                        "PurchaseRequisitionItemText": "Fill Level ${{event.data.enrichments.FillingLevel}}",
                        "Material": "TG10",
                        "MaterialGroup": "L001",
                        "RequestedQuantity": "1",
                        "PurchasingOrganization": "1710",
                        "PurchasingGroup": "001",
                        "Plant": "1710",
                        "OrderedQuantity": "1",
                        "DeliveryDate": "2022-11-15T00:00:00"
                    }
                    ]
                }
             }
    Is Csrf Token Needed?: true
    Related Actions: 
        Flow Type: Post Action
        Action: Update Device Cloud Property
    ```

    Your configuration should look like this:

    ![plot](./images/CreatePurchaseRequisitionAction.png)

