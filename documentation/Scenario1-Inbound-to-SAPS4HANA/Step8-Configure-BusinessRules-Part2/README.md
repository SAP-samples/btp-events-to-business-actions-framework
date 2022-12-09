## Update and Activate SAP Business Rule Project
In this section, you will update decision table and activate business rule project.

### 1. Activate all objects in SAP Business Rule Project

1. In the SAP BTP cockpit, navigate to your subaccount and choose **Cloud Foundry** > **Spaces**.  Choose your space and then choose **action-management** application. Choose the url provided under **Application Routes** section.
    ![plot](./images/ActionManagementApplication.png)

2. Choose **Manage Business Rules** tile.
    ![plot](./images/ActionManagementHome.png)

3. Select **Events to Actions Rules Project** project and choose **Edit** and **Activate**.
    ![plot](./images/ActivateBusinessRulesProject.png)

2. Choose **Data Objects** tab. Select **EventInfo** and then choose **Edit** and **Validate**.

    ![plot](./images/DataObjects.png)

    Choose **Activate**.

    ![plot](./images/ActivateEventInfoDataObject.png)

3. Repeat above step for **ActionInfo** data object.

4. Choose **Rule Services** tab and select **DetermineAction** and then choose **Edit** and **Activate**..
    ![plot](./images/ActivateRuleServices.png)

5. Choose **Rules** tab and select **DecideAction** and then choose **Edit**.

    ![plot](./images/ActivateRules.png)

6. In the **Decision Table** section, go to **Action Id** column and select **Fixed Value** node.

    ![plot](./images/ActionIdInput.png)

7. Select **Create Purchase Requisition** entry in the value help pop up.

    ![plot](./images/ActionIdValueHelp.png)

8. Choose **Activate**.

    ![plot](./images/ActivateDecideActionRule.png)

9. Choose **Rulesets** tab and select **DetermineActionRuleSet** and then choose **Edit** and **Activate**.

    ![plot](./images/ActivateRuleSet.png)

10. Choose **Rule Services** tab and choose **Deploy**.

    ![plot](./images/DeployRuleServices.png)

11. Choose **Cloud Runtime** from the **Select a system to Deploy** list.

    ![plot](./images/SelectSystem.png)


