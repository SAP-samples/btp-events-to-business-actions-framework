# Build Events-to-Business Actions Scenarios with SAP BTP and Microsoft Azure

In this event-driven scenario, based on the real-time status of the IoT Devices, actionable events are sent to SAP BTP to decide on the critical business actions to be taken in the SAP Enterprise Business systems based on business rules defined in the system.

In this scenario, Microsoft Azure IoT Events are sent to SAP Integration Suite, advanced event mesh using the Data Export functionality in Azure IoT Central Application. The Node.js extension application subscribes to the SAP Integration Suite, advanced event mesh queue and executes the action that is required to be taken based on the event details.


## Table of Contents

[Scenario](#scenario)\
[Business Process Flow](#business-process-flow)\
[Solution Architecture](#solution-architecture)\
[Requirements](#requirements)\
[Implementation: Configuration and Development](#configuration-and-development)\

## Scenario

The business scenario you will be implementing here is to integrate real-time events generated from the Microsoft Azure IoT Platform into SAP business processes to enrich the outcome of enterprise operations and facilitate rapid decision-making. The framework can be extended to any platform and any kind of event.

You can choose to configure and integrate events with any SAP LoB solution.

## Business Process Flow

In this event-driven scenario, based on the real-time status of the IoT Devices from Microsoft Azure IoT Central, actionable events are sent to SAP BTP to decide on the critical business actions to be taken in the SAP Enterprise Business systems based on business rules defined in the system.

![plot](./images/businessprocess.png)

1. Data from IoT Devices are sent to Microsoft Azure IoT Central/AWS IoT which includes all the streaming data from the devices.

2. Based on the rules in Microsoft Azure IoT/AWS IoT, the data is published to SAP Advanced Event Mesh/SAP Event Mesh in case of any actions that attention. This is configured in IoT Rules in the IOT Platform. Similar decisions can be configured in other systems and applications as well.

3. SAP BTP acts as a consumer. Once the event details are received, the SAP BTP extension application which is configured with all necessary actions (For example, configuring the decisions in SAP Build Process Automation to decide on the action to be taken, executing the chain of actions that to be taken based on the event received, configure the OData API call to be executed etc) executes the respective chain of actions.

4. The extension application in SAP BTP executes the business actions in respective SAP Enterprise systems.

## Solution Architecture

The key services leveraged from Microsoft Azure are the Azure IoT Central, Azure Blob Storage, Azure Event Grid and Azure Active Directory.

The services used by SAP BTP are the Cloud Foundry Runtime, SAP Integration Suite, advanced event mesh, SAP Connectivity service, SAP Private Link service, SAP Build Process Automation and SAP Destination service. 

SAP Private Link service is used for connectivity between SAP BTP and SAP S/4HANA when both systems are running on Microsoft Azure Infrastructure. Alternatively, you can use SAP Connectivity service and Cloud Connector for integration of SAP BTP and SAP S/4HANA as well. 

![plot](./images/Azure-IoTC-PL.png) **Figure-1: High-level architecture (with SAP S/4HANA on Azure)**

    
![plot](./images/AzureIoTC-CC.png) **Figure-2:High-level architecture with SAP S/4HANA on-premise and private cloud**

The following steps depict the information flow across systems (in both scenarios)

1. An application administrator logs into the SAP BTP Extension application based on Events to Business Actions Framework via SAP Build Work Zone, advanced edition, to configure the business rules/decisions and the business actions that need to be triggered in the business systems.

2. An event is triggered from the Microsoft Azure IoT Platform (in the case of the IoT scenario) or any other system.

3. These events are published to SAP Integration Suite, advanced event mesh. As the processor module's (part of the Events-to-Business-Action framework) endpoint subscribes to advanced event mesh, the event is received.

4. The Processor module (part of the Events-to-Business-Action framework) leverages the Decisions capability of SAP Build Process Automation to derive business action (for example, purchase order requisition creation in SAP S/4HANA) based on certain characteristics of incoming events.

5. The defined action is triggered in SAP S/4HANA using the SAP Destination service and SAP Connectivity service leveraging cloud connector setup. In case SAP S/4HANA and SAP BTP are on the same Hyperscaler, communication with SAP S/4HANA happens via SAP Private Link service.

## Requirements 

These are the technical prerequisites for integration between Microsoft Azure IoT Central, SAP BTP and SAP S/4HANA. 

**Services in SAP BTP**
- Cloud Foundry Runtime
    > - Foundation for running the CAP extension application for translating events to business actions.
    > - Required for the trust between Microsoft Azure Active Directory and SAP BTP
- Memory/Runtime quota
    > - Required for deploying and running the extension application in SAP BTP
- Authorization & Trust Management Service
    > - Required for securing the extension application in SAP BTP
- SAP Integration Suite, advanced event mesh 
    >- Required to receive events from Azure IoT Platform
- SAP HANA Cloud 
    >- Required to store action configuration and logs for CAP application
- SAP Build Process Automation
    >- 	Digitize and automate decision making with SAP Build Process Automation- Decisions capability to increase flexibility and compliance.

**Microsoft Azure**
- A valid Microsoft Azure subscription
- A Microsoft Azure Active Directory
    > - Required for the trust between Microsoft Azure Active Directory and SAP BTP
    > - User management
    > - Application registrations to allow access to Microsoft Azure IoT Central REST API and SAP BTP

- An Azure IoT Central Service
    > - Service for configuring Azure IoT Central Application
    > - Required for configuring device template, event producer and event routing.


## Configuration and Development

This repository is documented for Inbound to SAP S/4HANA from Azure IoT Central scenarios:

These are the steps to configure SAP S/4HANA, SAP BTP and Microsoft Azure for **Scenario 1 - Inbound to SAP S/4HANA from Azure IoT Central**.

[Step 1: Set Up the Subaccount in SAP BTP](./Scenario1-Inbound-to-SAPS4HANA/Step1-Setup-SAPBTP-Subaccount/README.md)

[Step 2: SAP S/4HANA Readiness](./Scenario1-Inbound-to-SAPS4HANA/Step2-SAPS4HANA-Readiness/README.md)

Step 3: Connect SAP BTP and SAP S/4HANA

   - [(Option 1) Using SAP BTP Connectivity Service](./Scenario1-Inbound-to-SAPS4HANA/Step3a-SetupCloudConnector/README.md)

   - [(Option 2) Using SAP Private Link Service](./Scenario1-Inbound-to-SAPS4HANA/Step3b-Setup-SAPPrivateLinkService/README.md)

[Step 4: Build and Deploy the Extension Application](./Scenario1-Inbound-to-SAPS4HANA/Step4-Build-Deploy-ExtensionApplication/README.md)

[Step 5: Configure SAP Advanced Event Mesh](./Scenario1-Inbound-to-SAPS4HANA/Step5-Advanced-Event-Mesh-Configuration/README.md)

[Step 6: Setup Microsoft Azure IoT](./Scenario1-Inbound-to-SAPS4HANA/Step6-Setup-AzureIoT/README.md)

[Step 7: Configure  Decisions Project in SAP Build Process Automation](./Scenario1-Inbound-to-SAPS4HANA/Step7-Configure-Decisions-Part1/README.md)

[Step 8: Configure SAP S/4HANA Business Actions in the extension application](./Scenario1-Inbound-to-SAPS4HANA/Step8-Configure-BusinessActions/README.md)

[Step 9: Update Decisions Project in SAP Build Process Automation](./Scenario1-Inbound-to-SAPS4HANA/Step9-Configure-Decisions-Part2/README.md)

[Step 10: Test the Extension Application](./Scenario1-Inbound-to-SAPS4HANA/Step10-Test-ExtensionApplication/README.md)
