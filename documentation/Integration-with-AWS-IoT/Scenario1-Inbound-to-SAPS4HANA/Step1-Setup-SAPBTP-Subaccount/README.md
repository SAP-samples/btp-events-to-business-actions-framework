## Set Up the Subaccount in SAP BTP

### 1. Create or Use an Already Existing Subaccount in SAP BTP

You can use both trial and enterprise account in SAP BTP. To set up a trial account, see the [Get a Free Account on SAP BTP Trial](https://developers.sap.com/tutorials/hcp-create-trial-account.html) at SAP Tutorial Navigator.

You can use an existing subaccount or you can create a new one.

You need to have the Global Account Administrator role collection assigned to your user.

If you are new to SAP BTP, follow the [Get Ready to Develop on SAP BTP](https://developers.sap.com/group.scp-1-get-ready.html) tutorial at SAP Tutorial Navigator to get started with SAP BTP, create subaccounts. enable cloud foundry environment and assign entitlements.

1. Log in to SAP BTP cockpit, navigate to your global account and create a subaccount or use an existing one.

2. Choose **Cloud Foundry Environment** tab and then choose **Enable Cloud Foundry**.

3. Choose **Create Space** once the Cloud Foundry Environment is enabled.

4. Assign the following entitlements:

Service | Service Plan | Usage Scenario |
--- | --- | --- |
|[Authorization and Trust Management Service](https://discovery-center.cloud.sap/serviceCatalog/authorization-and-trust-management-service?region=all&tab=feature) | application | Manage application authorizations and connections to identity providers.|
|[SAP Build Process Automation](https://discovery-center.cloud.sap/serviceCatalog/sap-build-process-automation?region=all) | standard | Digitize and automate decision making with business rules to increase flexibility and compliance.|
[Cloud Foundry Runtime](https://discovery-center.cloud.sap/serviceCatalog/cloud-foundry-runtime?region=all) | MEMORY | Create polyglot applications.The chosen quota defines the available amount of memory in GB.|
[SAP Connectivity Service](https://discovery-center.cloud.sap/serviceCatalog/connectivity-service?service_plan=lite&region=all&commercialModel=cloud) | lite | Establish connections between cloud applications and on-premise systems.|
[Destination Service](https://discovery-center.cloud.sap/serviceCatalog/destination?service_plan=lite&region=all&commercialModel=cloud) | lite | Destination service lets you find the destination information required to access a remote service or system from your extension application.|
[SAP Integration Suite,Advanced Event Mesh](https://discovery-center.cloud.sap/serviceCatalog/advanced-event-mesh?service_plan=default&region=all&commercialModel=cloud) | default | A complete event streaming, event management, and monitoring platform that incorporates best practices, expertise, and technology for event-driven architecture (EDA) on a single platform.|
[SAP Private Link Service](https://discovery-center.cloud.sap/serviceCatalog/private-link-service?service_plan=standard&region=all&commercialModel=cloud) | standard | Available only in Enterprise account. Establishes a private connection between selected SAP BTP services and selected services in your own IaaS provider accounts.|
[SAP Business Application Studio](https://discovery-center.cloud.sap/serviceCatalog/business-application-studio?region=all) | trial <br> standard-edition(Application) | Available in Trial as well as Enterprise account.
[SAP HANA Cloud](https://discovery-center.cloud.sap/serviceCatalog/sap-hana-cloud?tab=customerreference&region=all)  | hana | Application database for CAP Application
[SAP HANA Cloud](https://discovery-center.cloud.sap/serviceCatalog/sap-hana-cloud?tab=customerreference&region=all)  | tools | Application for HANA database creation
[SAP HANA Schemas & HDI Containers](https://help.sap.com/docs/SAP_HANA_PLATFORM/3823b0f33420468ba5f1cf7f59bd6bd9/e28abca91a004683845805efc2bf967c.html?version=2.0.04&locale=en-US) | hd-shared | Application database for CAP Application

**Note:** Service instances for SAP HANA Schemas & HDI Containers, Connectivity service, Destination service and SAP Authorization and Trust Management Service will be created programmatically during deployment. 


### 2. Set Up SAP Integration Suite, Advanced Event Mesh

To set up SAP Integration Suite, Advanced Event Mesh for this scenario, follow these steps:

1. In the SAP BTP cockpit, navigate to your subaccount and choose **Services** > **Service Marketplace** and then choose **SAP Integration Suite, Advanced Event Mesh.**.

    ![plot](./images/aem-btp.png)

2. Under **Application Plans** find the **default** application plan, choose the options menu on the right side of the row, and then choose **Create**

    ![plot](./images/aem-btp-create.png)

3. In the **New Instance or Subscription** dialog box, leave the prepopulated **Service** and **Plan** settings and choose **Next**.

    ![plot](./images/aem-btp-plan.png)
        

4. Add the email address for the user who is the subaccount administrator and then choose **Next**.
    **Note** The user must be a valid user in the Identity Authentication tenant that has a trust configuration established with the subaccount. Refer to Managing Security Administrators in Your Subaccount.(https://help.sap.com/docs/btp/sap-business-technology-platform/managing-security-administrators-in-your-subaccount-fsa)

    ![plot](./images/aem-btp-adminemail.png)


5. Review the details and choose **Create**.

    ![plot](./images/aem-btp-finalscreen.png)
    

### 3. Set Up SAP HANA Cloud Instance

Refer [Create SAP HANA Cloud Database](https://developers.sap.com/tutorials/hana-cloud-deploying.html) to create an instance of SAP HANA Cloud in SAP BTP and map it to your Cloud Foundry space. 

If you already have an existing HANA Instance, you can map it to your BTP Cloud Foundry space by refering Step 2, point 2 of the above link.

### 4. Set Up SAP Business Application Studio

1. Refer [Subscribe to SAP Business Application Studio](https://help.sap.com/docs/bas/sap-business-application-studio/subscribe-to-sap-business-application-studio) and subscribe to SAP Business Application Studio.

2. Refer [Manage Authorizations and Roles](https://help.sap.com/docs/SAP%20Business%20Application%20Studio/9d1db9835307451daa8c930fbd9ab264/01e69c53003c4b0a8a64310a3f08867d.html) to assign permissions to users for accessing SAP Business Application Studio.

