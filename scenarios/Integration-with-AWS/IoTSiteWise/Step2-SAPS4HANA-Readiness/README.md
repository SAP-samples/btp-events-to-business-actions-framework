## Check SAP S/4HANA Readiness
In this section, you will activate the APIs related to plant maintenance notification for this scenario.
API_MAINTNOTIFICATION API is supported from SAP S/4HANA 2022 onwards. Make sure to read this document for the necessary business user roles needed. [Find Maintenance Notifications](https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/#/detail/Apps('F4633')/S30PCE)

### Activate the API_MAINTNOTIFICATION Service

1. In your SAP S/4HANA system, open the **/n/IWFND/MAINT_SERVICE** trasaction.

2. Click on **Add Service** button.

![plot](./images/add-service1.png)

3. In the **External Service Name** field, enter API_MAINTNOTIFICATION and then click on **Get Services** button

![plot](./images/get-services.png)

4. Select the service **API_MAINTNOTIFICATION** and then click on **Add Selected Services** button

![plot](./images/add-service2.png)

5. Click on **Local Object** button and then clik on tick mark button to add the service.

![plot](./images/add-service3.png)


Based on your business scenario, expose the respective APIs (For example, create plant maintenance notification etc.).

In the next step, you can choose to either setup cloud connector or SAP Private Link Service based on the SAP S/4HANA installation.
