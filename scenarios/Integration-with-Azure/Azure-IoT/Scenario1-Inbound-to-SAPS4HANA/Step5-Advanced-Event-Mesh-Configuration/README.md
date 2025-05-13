## SAP Integration Suite, advanced event mesh Configuration

 1. To access the SAP Integration Suite, advanced event mesh, navigate to **Services** > and choose **Instances and Subscriptions**.
    Choose the row for the SAP Integration Suite, advanced event mesh subscription and choose **Go to Application**

    ![plot](./images/access-aem.png)

2. Choose **Cluster Manager** in the SAP Integration Suite, advanced event mesh Application. 

    ![plot](./images/aem-application.png)

3. Click on **Create Service**.

    ![plot](./images/aem-create-service.png)
    
    Fill in the **Service Name** of your choice, here we have named it as **events-to-business-actions** and select **Service Type** as **Standard**. Select **Microsoft Azure** from the dropdown menu for **Cloud**, Choose the region of your choice, we have chosen **East US 2( Virginia)** as the **Region** from the Map, and leave the prepopulated version for **Broker Version**, for this tutorial.

    Click on **Create Service**

    ![plot](./images/aem-service-created.png)


4. Click on the created service **events-to-business-actions**

    ![plot](./images/aem-service-screen1.png)

    Click on the **connect** tab and expand the **REST** tile to get the messaging connectivity information.

    ![plot](./images/aem-connect.png)

5. Configuring a **REST Delivery Point**
     Next, you must configure a queue and a REST delivery point on Message VPN.

     **a.** Click on **Open Broker Manager**.

     ![plot](./images/aem-openbrokermanager.png)

     **b.** The **Broker Manager** application loads. The next step is to create a queue, on the left pane click on **Queues**  

     ![plot](./images/aem-click-on-queue.png)

     **c.** Create a Queue by name **Q/rdp1/input**

     ![plot](./images/aem-create-queue.png)

     Enable both incoming and outgoing configuration and Click on **Apply** button.

     ![plot](./images/aem-queue2.png)    

     Queue successfully created.

     ![plot](./images/aem-queue-created.png)    

     **d.** Add a **Topic Subscription** to the queue.

     Click on the queue created and then click on the **Subscriptions** Tab.

     Then click on **+ Subscription** to add a topic.

     ![plot](./images/aem-addtopicsubscription.png)

     In the **Create Subscription** screen, type in the topic name as **e2b/messages** and click **Create**

     ![plot](./images/aem-topic-name.png)    

     Topic Subscription successfully created. 

     ![plot](./images/aem-topic-created.png)

     **e.** Create a **REST Delivery Point** object

     On the left pane click on **Clients** and then Navigate to **REST** tab.

     ![plot](./images/aem-rest-client.png)

     Click on **+ REST Delivery Point** and Fill the **RDP Name** as **rdp1**

     ![plot](./images/aem-rdp-name.png)

     Configure the REST Delivery Point

     ![plot](./images/aem-rdp-config.png)  

     REST Delivery Point successfully created
     
     ![plot](./images/aem-rdp-created.png)  

6.  Create a Queue Binding object

     Create a queue binding to the queue you created previously. This will tell the RDP where to fetch messages from. **Note:** that REST Delivery Points (RDPs) can be bound to multiple queues.

     Click on the **rdp1** created in the previous step. Click on **Queue Bindings** Tab.

     ![plot](./images/aem-queue-binding.png)

     Create a queue binding - **Q/rdp1/input**

     ![plot](./images/aem-queue-binding-name.png)

     Set the POST target where the requests would be sent - **/api/events**

     ![plot](./images/aem-binding-config.png)

     **Note:** that the RDP is down - it will automatically start up when a REST consumer makes a connection to the RDP.

     ![plot](./images/aem-binding-completed.png)

7. Create a **REST Consumer** object.

     Navigate to the **REST Consumers** Tab and click on **+ REST Conusmer**

     ![plot](./images/aem-rest-consumer.png)

8. Fill in the **REST Consumer Name** as **rc1** 

     ![plot](./images/aem-consumer-name.png)

9. Enable the **REST Consumer** and set HOST: PORT details of the message HTTP listener. 

     To Fill the **Host**, Navigate to the Cloud Foundry Space where the application is deployed and Click on **action-management-srv**.

     ![plot](./images/aem-consumer-host.png)

     Copy the link under **Application Routes**. **Note:** Strip the **https://** before pasting the value in the **Host** field.

     ![plot](./images/aem-consumer-host-link.png)

10. Fill in the following Value

    | Field | Value |
    |------|------|
    | Enabled  | Enable toggle |
    | Port | 443 |
    | HTTP Method |  POST |
    | TLS | Enable toggle |
    | Outgoing Connection Count | 1 |
    | Max Response Wait Time (sec) | 30 |
    | Connection Retry Delay (sec) | 300 |
    | Authentication Scheme | OAuth 2.0 Client Credentials |
    | Client Id | `clientid`|
    | Client Secret | `clientsecret`|
    | Token Endpoint URL | `url`/oauth/token |
    | Token Exipry Default |900 |
    | Scope | uaa.resource |

    Follow the steps below to fetch the value of Client Id, Client Secret and Token Endpoint URL


11. Go back to the SAP BTP Cockpit and then to Cloud Foundry Space. Navigate to **Services** > **Instances** and under the **Instances** select **action-management-auth**. 

    <!-- <img src="./images/aem-30.png" width="90%" height="90%" /> -->
    ![plot](./images/aem-30.png)

    Under the **Service Keys** the key named **action-management-auth-key** is already created. Click on the **View** Option to get the **OAuth 2.0 Client Credentials**.  

    <!-- <img src="./images/aem-31.png" width="90%" height="90%" /> -->
    ![plot](./images/aem-31.png)

12. Copy the **clientid**, **clientsecret** and **url** and paste it on the **REST Consumer** configuration as below:
    - Client ID : ```clientid```
    - Client Secret: ```clientsecret```
    - Token Endpoint URL: ```url```/oauth/token 

    ![plot](./images/aem-32.png)

    Make sure to follow steps 9 to 13 carefully and Fill the remaining fields as shown in the screenshot below. Then choose **Apply**.

    ![plot](./images/aem-consumer-config.png)  

    
    REST Consumer was successfully created.

     ![plot](./images/aem-consumer-created.png)  

    A final, configured **RDP settings** would look like this.

     ![plot](./images/aem-rdp-final.png)