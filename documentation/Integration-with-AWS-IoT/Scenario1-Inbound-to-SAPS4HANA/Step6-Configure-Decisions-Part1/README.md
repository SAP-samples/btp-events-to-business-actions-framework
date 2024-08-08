In this section, you will configure SAP Build Process Automation project where a Decision will be used to determine which business action should be executed for an event. You will also configure a decision table in the decision project

### 1. Create SAP Build Process Automation Project

1. In the SAP BTP Cockpit, Navigate to your subaccount -> **Sevices** -> **Instances and Subscriptions** , Open the SAP Build Process Automation Application.

    ![plot](./images/subscriptions.png)

2. In the SAP Build Process Automation Application, In the **Lobby** Tab , Click on **Create** button to create a new project.

    ![plot](./images/lobby.png)

3. Choose the **Build an Automated Process Tile**. 

    ![plot](./images/automatedprocess.png)

    Choose **Business Process** Tile.

    ![plot](./images/process.png)

4. Fill the project name as **Events-to-Business-Actions-Framework** and Choose **Create**

    ![plot](./images/createproject2.png)

    **Accept** the disclaimer if prompted!

    ![plot](./images/AcceptDisclaimer.png)    

5. The Project is now created , click on **Cancel** for the **Create Process** pop-up , as we will be creating **Decisions** and it's related **Data Types** in the following steps.

    ![plot](./images/ProjectCreated.png)

6. Under the **Artifacts** Tab of your project, Click on **Create** and then choose **Decision** .

    ![plot](./images/CreateDecision.png)

    Fill in the Decision Name as **E2BDecision** and Click on **Create**.

    ![plot](./images/DecisionName.png)

    You will see the following screeen as the decision is created successfully.

    ![plot](./images/DecisionCreated.png)   

### 2. Configure SAP Build Process Automation Decisions

1. The **Decision** configuration requires the **Input and Ouput parameters** as well as the business **Rule** that maps the incoming event to it's associated business action. To configure the Input/Output parameters we need to create the Custom Data Type with the fields that the incoming event payload contains.

 Under the**Artifacts** Tab, Click on **Create** and choose **Data Types**.

 ![plot](./images/CreateDataType.png)

2. We will be creating two data types namely **eventInfo** and **actionInfo** which will have the structure of the incoming event payload and the action Id respectively. To create the datatypes follow the steps shown below:

    **a.** Create Data Type called **eventInfo**

    ![plot](./images/eventInfoDT.png)

    **b.**  Click on **New Field** and Enter the **Field Details** as listed in the table below and click on **Save**.
     **Note:** The values are case-sensitive.

  
    | Name | Type |
    |---------|-------------|
    | SourceSystem | String |
    | DeviceType | String |
    | DeviceLocation | String |

    ![plot](./images/eventDTFields.png)

    **c.** Under the**Artifacts** Tab, Click on **Create** and choose **Data Types**.

    ![plot](./images/actionInfoDT.png)

    **d.** Create data type called **actionInfo** 

    ![plot](./images/actionDTname.png)

    **e.** Click on **New Field** and Enter the **Field Details** as listed in the table below and click on **Save**

    | Name | Type |
    |---------|-------------|
    | ActionId | String |

    ![plot](./images/actionDTFields.png)

3. As we have now created the required data types , let us go to the **E2BDecision** and configure the Input/Output parameters as shown below. Fill the Input Paramter Name as **EventInfo** and Choose the Type from the drop down as **eventInfo** created previously. Fill the Output Parameter Name as **ActionInfo** and choose the Type from the as **actionInfo**.

    ![plot](./images/addIpOp.png)

4. Next let us configure the **Rules**. 

    **a.** Click on **Add Rule**

    ![plot](./images/addRule.png)

    **b.** Fill in the **Rule Name** as **DecideAction** and click on **Next Step** button.

    ![plot](./images/CreateRule1.png)

    **c.** To configure the **Conditions** follow the steps shown below. and Click on **Next Step** button.

    ![plot](./images/CreateRule2.png)

    **d.** To configure the **Results** follow the steps shown below, and Click on **Next Step** button.

    ![plot](./images/CreateRule3.png)

    **e.** Verify the **Review** Tab and click on **Create** button

    ![plot](./images/CreateRule4.png)

    **f.** An empty **Decision Table** will be created.

    ![plot](./images/CreateRule5.png)

    **g.** Fill the fields with following values: **Note:** Paste the values along with **equals-to** operator. 

    | SourceSystem | DeviceType |DeviceLocation | ActionId |
    |---------|-------------|---------|-------------|
    | = 'sap-monitron'   | = 'Motor'   |= '1017'   |  |


    Leave the **ActionId** field empty as it is to be filled later.
 
    ![plot](./images/RuleField.png)

5. We need to configure another decision, which provides with the "Plant Details" of the plant that needs maintenance. As configured above, the **Decision** configuration requires the **Input and Ouput parameters** as well as the business **Rule** that maps the incoming event to it's associated business action. To configure the Input/Output parameters we need to create the Custom Data Type with the fields that the incoming event payload contains.

 Under the**Artifacts** Tab, Click on **Create** and choose **Data Types**.

 ![plot](./images/DT1.png)

6. We will be creating two data types namely **eventInfo** and **actionInfo** which will have the structure of the incoming event payload and the action Id respectively. To create the datatypes follow the steps shown below:

    **a.** Create Data Type called **BucketInfo**

    ![plot](./images/DT2.png)

    **b.**  Click on **New Field** and Enter the **Field Details** as listed in the table below and click on **Save**.
     **Note:** The values are case-sensitive. After saving, Navigate to **Overview** Tab.

  
    | Name | Type |
    |---------|-------------|
    | BucketName | String |

    ![plot](./images/DT3.png)

    **c.** Under the**Artifacts** Tab, Click on **Create** and choose **Data Types**.

    ![plot](./images/DT4.png)

    **d.** Create data type called **EquipmentDetails** 

    ![plot](./images/DT5.png)

    **e.** Click on **New Field** and Enter the **Field Details** as listed in the table below and click on **Save**

    | Name | Type |
    |---------|-------------|
    | Location | String |
    | Equipment | String |

    ![plot](./images/DT6.png)

7. Under the **Artifacts** Tab of your project, Click on **Create** and then choose **Decision** .

    ![plot](./images/DT7.png)

    Fill in the Decision Name as **Plant_Details** and Click on **Create**.

    ![plot](./images/DT8.png)

8. As we have now created the required data types for the decision, let us go to the **Plant_Details** and configure the Input/Output parameters as shown below. 

    ![plot](./images/DT9.png)

9. Fill the Input Paramter Name as **BucketInfo** and Choose the Type from the drop down as **BucketInfo** created previously. Fill the Output Parameter Name as **EquipmentDetails** and choose the Type from the as **EquipmentDetails**.

    ![plot](./images/DT10.png)

10. Next let us configure the **Rules**. Click on the **Rules** Tab.

    ![plot](./images/DT11.png)

11. Let us configure the rules.

    **a.** Click on **Add Rule**

    ![plot](./images/DT12.png)

    **b.** Fill in the **Rule Name** as **FetchEquipmentDetails** and other details as shown in the picture below. click on **Next Step** button.

    ![plot](./images/DT13.png)

    **c.** To configure the **Conditions** follow the steps shown below and click on **Next Step** button.


    ![plot](./images/DT14.png)

    **d.** To configure the **Results** follow the steps shown below and click on **Next Step** button.

    ![plot](./images/DT15.png)

    **e.** Verify the **Review** Tab, and Click on **Create** button.

    ![plot](./images/DT16.png)

    **f.** An empty **Decision Table** will be created.

    ![plot](./images/DT17.png)

    **g.** Fill the fields with values listed in the table below, and then click on the **Save** button. 
    **Note:** Make sure the Location and Equipment are already maintained in your SAP S/4HANA system, or use the values of those that are already created in your SAP S/4HANA.

    | BucketName | Location |Equipment |
    |---------|-------------|---------|
    | `<your_s3_bucket_name>`   | '1010-SPA-SAC-PLAR1-DMIV'    |'210100019'   |

 
    ![plot](./images/DT18.png)

12. To use the decision in our CAP extension application we need to deploy the Decision created. 

    First click on **Release** to release the Decisions. 
    
    ![plot](./images/DT19.png)

    Click on **Release**

    ![plot](./images/ProjectRelease.png)

13. Now that the project is released, it is ready for deployment. Click on the **Deploy**

    ![plot](./images/Deploy1.png)

    Follow the steps shown in the following screenshots.

    ![plot](./images/Deploy2.png)

    ![plot](./images/Deploy3.png)

    ![plot](./images/Deploy4.png)

14. The Project is successfully deployed ! 

    ![plot](./images/Deployed.png)


15. Go to **E2BDecision** , Click on the three dots to **View Details** and Click on **View Details**

    ![plot](./images/ViewDetails.png)

    Copy the **Id** from the **Decision Details** , which will be used in the Next Step for **default action configuration**, (remember this as **E2BDecisionId**).

    ![plot](./images/ViewDetails2.png)

16. Go to **Plant_Details** , Click on the three dots to **View Details** and Click on **View Details**

    ![plot](./images/VD.png)

    Copy the **Id** from the **Decision Details** , which will be used in the Next Step for **pre-action configuration**,(remember this as **Plant_Details_Id**).

    ![plot](./images/VD2.png)
 




