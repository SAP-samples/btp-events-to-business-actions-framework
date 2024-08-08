## Update and Deploy SAP Build Process Automation Decisions Project
In this section, you will update decision table and activate business rule project.

1. In the SAP BTP Cockpit, Navigate to your subaccount -> **Sevices** -> **Instances and Subscriptions** , Open the SAP Build Process Automation Application.

    ![plot](./images/subscriptions.png)

2. In the SAP Build Process Automation Application, In the **Lobby** Tab , Click on **Events-to-Business-Actions-Framework** project.

    ![plot](./images/lobby.png)

3. Choose the **E2BDecision** , On the **Rules** Tab, Click the **DecideAction** Decision table.

    ![plot](./images/E2BDecision.png)

4. Click on the **ActionId** Field. 

    ![plot](./images/FillActionId.png)

5. Paste the `ActionId` copied from the [Step7-Configure-BusinessActions](../Step7-Configure-BusinessActions/README.md). 

    ![plot](./images/ActionId.png)

6. Your rule should look as follows. Now click on **Save** button to save the rule.

    ![plot](./images/ActionId2.png)

7. The Decision is now configured with the Rule successfully. To use the decision in our CAP extension application we need to deploy all the latest changes in the Decision. 

    First click on **Release** to release the Decisions. 
    
    ![plot](./images/RuleCreated.png)

8. Select **Contains only patches**, **Version Number** is autofilled. Now Click on **Release**

    ![plot](./images/ProjectRelease.png)

9. Now that the project is released, it is ready for deployment. Click on the **Deploy**

    ![plot](./images/Deploy1.png)

10. Follow the steps shown in the following screenshots.

    ![plot](./images/Deploy2.png)

    ![plot](./images/Deploy3.png)

    ![plot](./images/Deploy4.png)

11. The Project is successfully Redeployed ! 

    ![plot](./images/Deployed.png)


