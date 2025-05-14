## Integrating Amazon Rekognition and SAP EHS with SAP BTP for PPE Detection

Safety hazards can exist in every workplace in many different forms: sharp edges, falling objects, flying sparks, chemicals, noise, and other potentially dangerous situations. Safety regulators such as Occupational Safety and Health Administration (OSHA) and European Commission often require that businesses protect their employees and customers from hazards that can cause injury by providing them personal protective equipment (PPE) and ensuring their use.With Amazon Rekognition PPE detection, customers can analyze images from their on-premises cameras across all locations to automatically detect if persons in the images are wearing the required PPE such as face covers, hand covers, and head covers. SAP customers use SAP Environment health and safety module to record these detections manually as safety observations.This solution provides an integration framework between Amazon Rekognition and SAP Envriroment, Health and Safety(EHS).

This project is intended to be sample code only. Not for use in production.

This project will create the following in your AWS cloud environment specified:
* Lambda Layers
* Lambda for detecting Anomalies and creating notifications in SAP
* Roles
* S3 bucket which will be used as a landing zone for images captured from equipment
* S3 Notifications
