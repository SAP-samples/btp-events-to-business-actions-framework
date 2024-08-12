## Test the End-to-End Scenario

Now that you have successfully deployed the extension application in SAP BTP and completed the configurations in Microsoft Azure, SAP BTP and SAP S/4HANA, follow these steps to test the application.

### 1. Trigger Process by Enabling Data Export

1. Open [Microsoft Azure IoT Central](https://industry-40.azureiotcentral.com/). Choose **Data Export**. 

    <img src="./images/1.png" width="90%" height="90%" />
    <!-- ![plot](./images/1.png) -->

2. Click on the disabled toggle button to **Enable** the data export.

    <img src="./images/2.png" width="90%" height="90%" />

3. Upon enabling your screen will look as shown below. This might take couple a of minutes to send an event. You can wait for 3-5 minutes.

    <img src="./images/3.png" width="90%" height="90%" />
    <!-- ![plot](./images/2.png) -->

<!-- 2. Choose **Devices** and find your device and check the status. It should be in the **Connected** state.

    ![plot](./images/DeviceStatusWorking.png) -->

4. Log into your SAP S/4HANA System and Search for **Purchase Professional**. Choose the **Manage Puchase Requisitions Professional** application.

    <img src="./images/4.png" width="90%" height="90%" />
    <!-- ![plot](./images/S4HANASearchApp.png) -->

5. The **Manage Purchase Requisitions-Professional** application opens. Choose **Go** to list all the purchase requisitions created. 

    <img src="./images/5.png" width="90%" height="90%" />
    <!-- ![plot](./images/PurchaseRequisitionList.png) -->

6. Choose the latest purchase requisition.

    <img src="./images/6.png" width="90%" height="90%" />

7. You can see that a **Purchase Requisition** was created for your device.

    <img src="./images/7.png" width="90%" height="90%" />
    <!-- ![plot](./images/PurchaseRequsitionWithFillLevel.png) -->

8. Now go back to [Microsoft Azure IOT Central Application](https://industry-40.azureiotcentral.com/) and **Disable** the data export. Then navigate to **Devices**

    <img src="./images/8.png" width="90%" height="90%" />
    <!-- ![plot](./images/DeviceStatusUnderMaintenance.png) -->

9. Choose your device to see if the **status** of your device was updated.

    <img src="./images/9.png" width="90%" height="90%" />

10. You can see that the **status** of your device is updated to **Under Maintenance**

    <img src="./images/10.png" width="90%" height="90%" />


    <!-- ![plot](./images/ActionManagementApplication.png) -->

### 2. Explore the Action Logs

1. Open **action-management** application in your cloud foundry space using BTP Cockpit. Click on the URL provided under the Application Routes section.

    <img src="./images/10.5.png" width="90%" height="90%" />

2. Click on the **Business Action Logs** tile.

    <img src="./images/11.png" width="90%" height="90%" />
    <!-- ![plot](./images/ActionManagementHome.png) -->

3. Choose **Go** to View Logs information, then choose the latest log entry.

    <img src="./images/12.png" width="90%" height="90%" />
    <!-- ![plot](./images/LogsListView.png) -->

4. You can see the detailed logs. It also shows the **Log status** as **COMPLETE** upon successful creation of **Purchase Requisition** in the SAP S/4HANA System.

    <img src="./images/13.png" width="90%" height="90%" />
    <!-- ![plot](./images/LogsDetailView.png) -->


### 3. Congratulations!

Congratulations on completing your Exercise 7! You have successfully completed the end-to-end integration of events to business actions from Microsoft Azure IoT Central to SAP S/4HANA with SAP BTP.

#### For Additional Information on this use-case you can refer following resources:

- Use Case: [Build Events-to-Business Actions scenarios with SAP BTP and Microsoft Azure/AWS](https://github.com/SAP-samples/btp-events-to-business-actions-framework)
- DC mission: [Build Events-to-Business Actions Apps with SAP BTP and MS Azure/AWS](https://discovery-center.cloud.sap/missiondetail/4172/4422/)
- 5 Part Blog Series: [“Events-to-Business Actions”: An event-driven architecture on SAP BTP to implement Industry 4.0 scenarios with Microsoft Azure Services](https://blogs.sap.com/2023/01/27/part-1-events-to-business-actions-architecture-an-event-driven-framework-on-sap-btp-to-implement-industry-4.0-scenarios-with-microsoft-azure-services/)
- [Set Up Connectivity Between SAP BTP and SAP S/4HANA Using Cloud Connector](https://github.com/SAP-samples/btp-events-to-business-actions-framework/blob/main/documentation/Integration-With-Azure-IoT/Scenario1-Inbound-to-SAPS4HANA/Step3a-SetupCloudConnector/README.md)
- [Set Up Connectivity Between SAP BTP and SAP S/4HANA Using SAP Private Link Service](https://github.com/SAP-samples/btp-events-to-business-actions-framework/blob/main/documentation/Integration-With-Azure-IoT/Scenario1-Inbound-to-SAPS4HANA/Step3b-Setup-SAPPrivateLinkService/README.md)

