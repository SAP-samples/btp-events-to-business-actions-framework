# Build Events-to-Business Actions Scenarios with SAP BTP and Microsoft Azure/AWS

[![REUSE status](https://api.reuse.software/badge/github.com/SAP-samples/btp-events-to-business-actions-framework)](https://api.reuse.software/info/github.com/SAP-samples/btp-events-to-business-actions-framework)

This repository contains code samples and instructions for developing an extension application in SAP BTP. The sample application has been developed in a partner collaboration to help customers integrate any type of events from systems into SAP ecosystem via SAP BTP. This application helps to configure  actions that needs to be taken in SAP LoB systems based on the events that is received in SAP Event Mesh. The application scenario you will develop in this tutorial leverages Event-To-Business actions framework (extension application). 

This framework can be used in combination with any hyperscalar/telco IoT.



There are two scenarios described in this repository. In this tutorial, the events are received from Azure IoT Platform and the actions for these events are taken in SAP S/4HANA. You can use this application to further customize it for other systems as well.

1. Inbound to SAP S/4HANA

    In this scenario, Azure IoT Events are sent to SAP Event Mesh using the Data Export functionality in Azure IoT Central Application. The Node.js extension application subscribes to SAP Event Mesh queue and executes the action that is required to be taken based on the event details.  

2. Outbound from SAP S/4HANA

    In this scenario, any event that is triggerred from SAP S/4HANA is sent to SAP Event Grid Connectivity Bridge. With the latest Beta releease of SAP Event Mesh Connectivity Bridge plan, event is propogated to Azure Event Grid with direct connectivity. This service plan is currently available for only events from SAP S/4HANA to Azure Event Grid. In this scenario, the events from Azure Event Grid is consumed in Azure Function app to send outlook notification to the user. You can further enhance the scenario as per your requirement.

> **Important Note** : Please be aware that this GitHub repository is still work in progress for improvements and additional scenarios. Make sure you're pulling the repository from time to time and redeploying it in SAP BTP.


## Table of Contents

[Scenario](#scenario)\
[Business Process Flow](#business-process-flow)\
[Solution Architecture](#solution-architecture)\
[Implementation: Configuration and Development](#configuration-and-development)\
[Additional Resources](#additional-resources)\
[Known Issues](#known-issues)\
[Reference](#reference)\
[Disclaimer](#disclaimer)\
[How to Obtain Support](#how-to-obtain-support)\
[Code of Conduct](#codeofconduct)\
[Contributing](#contributing)\
[License](#license)

## Scenario

The business scenario you will be implementing here is to integrate real time events generated from Microsoft Azure IoT Platform/AWS IoT into SAP business processes to enrich the outcome of enterprise operations and facilitate rapid decision making. The framework can be extended to any platform and to any kind of event.

You can choose to configure and integrate events with any SAP LoB solution.

## Business Process Flow

In this event-driven scenario, based on the real-time status of the IoT Devices , actionable events are sent to SAP BTP to decide on the critical business actions to be taken in the SAP Enteprise Business systems based on business rules defined in the system.

![plot](./images/businessprocess.png)

1. Data from IoT Devices are sent to Microsoft Azure IoT Central/AWS IoT.

2. Rules in Microsoft Azure IoT/AWS IoT triggers an call to SAP Event Mesh in case of any actions which needs attention. This is defined in IoT Rules for devices.

3. SAP Event Mesh receives the events.

4. Extension application is configured with all necessary actions (For example, calling SAP Business Rules API to read the decision tables to decide on action to be taken, configure the OData API call to be executed , service call back to the device) to be taken.

5. Extension application executes the business actions.

6. For this sample application, based on the fill level of waste container/silo a new Purchase Order Requisition is created in SAP S/4HANA.

## Solution Architecture

The solution architecture and detailed documentation for integrating with Azure IoT can be found at

[Integration-With-Azure-IoT](./documentation/Integration-With-Azure-IoT/README.md).

The solution architecture and detailed documentation for integrating with Azure IoT can be found at

[Integration-with-AWS-IoT](./documentation/Integration-with-AWS-IoT/README.md).

## Additional Resources

This project has been implemented based on the following SAP CAP sample repository.

- [Cloud-cap-samples](https://github.com/SAP-samples/cloud-cap-samples/)

## Known Issues

No known issues.

## Reference

### Creation of Azure IoT solutions

[Azure IoT Central](https://azure.microsoft.com/en-in/products/iot-central/)

### Creation of AWS IoT solutions

[AWS IoT](https://docs.aws.amazon.com/iot/latest/developerguide/what-is-aws-iot.html)


## Disclaimer

This project has been a proof of concept, including several limitations and prerequisites. The objective was to build a extension application for receiving and automating the actions in SAP S/4HANA. For this reason, the coding should not be seen as any recommendation for productive implementation. It fulfils the purpose and requirements of a proof of concept and is not intended for productive usage. It has been declared as pure proof of concept only to give the development teams ideas for solving potential challenges when integrating events from other platforms and SAP S/4HANA using SAP BTP. This can be extended to integrate with any other SAP LoB system as well.

## How to Obtain Support

[Create an issue](https://github.com/SAP-samples/<repository-name>/issues) in this repository if you find a bug or have questions about the content.
For additional support, [ask a question in the SAP Community](https://answers.sap.com/questions/ask.html).

## Contributing

If you wish to contribute code, offer fixes or improvements,  send a pull request. Due to legal reasons, contributors will be asked to accept a DCO when they create the first pull request to this project. This happens in an automated fashion during the submission process. SAP uses [the standard DCO text of the Linux Foundation](https://developercertificate.org/).

Refer to the [CONTRIBUTING](CONTRIBUTING.md) file for guidelines to contributions from external parties.

For additional support, [ask a question in the SAP Community](https://answers.sap.com/questions/ask.html).

## Code of Conduct

Refer to the [CODE OF CONDUCT](CODE_OF_CONDUCT.md) file.

## License

Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved. This project is licensed under the Apache Software License, version 2.0, except as noted otherwise in the [LICENSE](LICENSE) file.
