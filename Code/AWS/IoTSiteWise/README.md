# Integrate Events from AWS IoT SiteWise with SAP S/4HANA using SAP BTP and Gen AI Hub

**AWS IoT SiteWise** is a managed service with which you can collect, store, organize and monitor data from industrial equipment at scale to help you make better, data-driven decisions. You can use AWS IoT SiteWise to monitor operations across facilities, quickly compute common industrial performance metrics, and create applications that analyze industrial equipment data to prevent costly equipment issues and reduce gaps in production.

However, the events only provides valuable results if any business action is taken on them. To reduce the burden of change management and ensure action is taken on the AWS IoT SiteWise events, this sample project has demonstrated how to automatically record the AWS IoT SiteWise inferences in SAP Plant maintenance/asset management. 

This project is intended to be sample code only. Not for use in production.

This project will create the following in your AWS cloud environment specified:
* Lambda Layers
* Lambda for detecting Anomalies and creating notifications in SAP
* Roles
* S3 Notifications

