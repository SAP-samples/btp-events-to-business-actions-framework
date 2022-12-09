## Set Up Connectivity Between SAP BTP and SAP S/4HANA Using SAP Private Link Service

### Prerequisites
These are the prerequisities that you need to consider.

- SAP S/4HANA system running on Microsoft Azure

- SAP Private Link service
    Required to connect SAP BTP and Microsoft Azure.

    >Note: The SAP BTP Private Link service is currently available only for enterprise accounts in SAP BTP.

- Microsoft Azure Private Link service
    Required to connect Microsoft Azure and SAP S/4HANA.


### 1. Set Up the SAP Private Link Service and Microsoft Azure Private Link Service 

To configure these services for the SAP S/4HANA system, follow the 
 [Enhance core ERP business processes with resilient applications on SAP BTP - SAP Private Link Service](https://github.com/SAP-samples/btp-build-resilient-apps/tree/extension-privatelink/tutorials/05-PrivateLink) tutorial and complete the steps until the **Prepare Extension Application** section.


### 2. Create Destinations in Your Subaccount in SAP BTP

Follow these steps to create the destination in BTP for S/4HANA system.

1. In the SAP BTP cockpit, navigate to you subaccount and choose **Connectivity** > **Destinations**.

2. Create a destination with the name **S4HANA_NP**.

    1. Choose **New Destination** and enter the following configuration values:

        key | value |
        --- | --- |
        Name | S4HANA_NP |
        Type | HTTP |
        URL | http://your-private-hostname |
        Proxy Type | PrivateLink |
        Authentication | Basic Authentication |
        User ID | User Id of the user who has access to create Purchase Requisition in S/4HANA system |
        Password | Password for the above user |
        
    2. Add the additional properties:  

        key | value |
        --- | --- |
        sap-client | your SAP Client no |
        TrustAll | true |
        HTML5.DynamicDestination | true |
        WebIDEEnabled | true |
        WebIDEUsage | odata_abap |

For additional details about the SAP Private Link service and the Microsoft Azure Private Link service, refer to the [az-private-linky](https://github.com/MartinPankraz/az-private-linky) GitHub repository.
