## Check SAP S/4HANA Readiness
In this section, you will activate the APIs related to purchase requisition for this scenario.

### Activate the API_PURCHASEREQ_PROCESS_SRV Service

1. In your SAP S/4HANA system, open the **/n/IWFND/MAINT_SERVICE** transaction.

2. Activate the API_PURCHASEREQ_PROCESS_SRV service.

![Activate](./images/s4pr-service.png)

Based on your business scenario, expose the respective APIs (For example, Plant maintenance Workorder, Purchase Order, Sales Order etc.).

In the next step, you can choose to either set up a cloud connector or SAP Private Link Service based on the SAP S/4HANA installation.