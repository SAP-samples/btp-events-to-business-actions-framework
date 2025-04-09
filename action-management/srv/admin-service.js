const cds = require("@sap/cds");
const core = require('@sap-cloud-sdk/core');
const axios = require('axios');
const destinationUtil = require('./utils/destination');
const JsonData = require('./utils/payload');
const token = require('./utils/token')
const qs = require('qs');


module.exports = cds.service.impl(async function (srv) {

    const { Destinations, Actions, Types, LogStatuses } = this.entities;


    //const JsonString = JSON.stringify(JsonData);
    const accesstoken =JSON.stringify(token);

   //const user_query = `Given the following JSON data from Amazon Monitron, generate a summary report in string of valid JSON format that includes the following sections as keys: 6. Long Text to summarize what caused issue, mention the values or levels which might have impacted and what is the issue. 1. Header with Timestamp, Event ID, Project, Site, Asset, and Sensor Position 2. Measurements section summarizing the acceleration, temperature, and velocity values 3. Model Outputs section listing the persistent/pointwise outputs from Temperature ML, Vibration ISO, and Vibration ML models 4. Asset State section showing the new and previous states in the payload under assetState-newState and previousState 5. Recommended Actions Avoid using escape or special characters in the response. Use concise language to summarize the key information from the JSON payload in an easy to read report format ${JSON.stringify(JsonData)}`;
   const user_query = `Given the following JSON data from Amazon Monitron, generate a detailed summary report in string format with the key "LongTextSummary." The report should: Identify and describe the root cause of the issue.
   Mention any relevant values or levels that may have contributed to or impacted the issue.
   Clearly state what the issue is.
   Provide the information in a format suitable for creating a Maintenance ticket.
   Use the data provided: ${JSON.stringify(JsonData)}`; 

    // srv.before("getSummary", async (req) =>{


    //     // OAuth server token endpoint
    //     const tokenUrl = 'https://tfe-india-genai-9gqs3m10.authentication.eu10.hana.ondemand.com/oauth/token';

    //     // Client credentials
    //     const clientId = 'sb-b20be619-6fc3-449f-a899-ac2333da55f6!b391340|aicore!b540';
    //     const clientSecret = '66aea0db-7b66-43bb-8a46-2eb46bae4287$LnKTZvZ2WWtGs0tcM1M7I5S6GnIuhCAssMhpxNZdAkc=';

    //     // Request to obtain the access token
    //     axios.post(tokenUrl, qs.stringify({
    //         grant_type: 'client_credentials',
    //         client_id: clientId,
    //         client_secret: clientSecret
    //     }), {
    //         headers: {
    //             'Content-Type': 'application/x-www-form-urlencoded'
    //         }
    //     })
    //     .then(response => {
    //         // Access token
    //         const accessToken = response.data.access_token;
            
    //         // Use the access token in subsequent requests
    //         //const result = makeAuthenticatedRequest(accessToken);
    //         return accessToken;
    //     })
    //     .catch(error => {
    //         console.error('Error obtaining access token:', error);
    //     });

    // });

   


    srv.on("getSummary", async (req) => {
        //console.log(user_query);
        //const response={};
        const modelBaseUrl = 'https://api.ai.prod.eu-central-1.aws.ml.hana.ondemand.com/v2/inference/deployments/da2f6587d7312192/invoke', httpHeaders = {};
        
        //const vectorplugin = await cds.connect.to("cap-llm-plugin");
        const accessToken = "eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vdGZlLWluZGlhLWdlbmFpLTlncXMzbTEwLmF1dGhlbnRpY2F0aW9uLmV1MTAuaGFuYS5vbmRlbWFuZC5jb20vdG9rZW5fa2V5cyIsImtpZCI6ImRlZmF1bHQtand0LWtleS1hNzQyOGE0NWM2IiwidHlwIjoiSldUIiwiamlkIjogImJwbkZvZHdJRjJkUHVDWEpqcEFFOGFuVC9JcGxwK1NxSFZUU2xyWmxQa1U9In0.eyJqdGkiOiJkNTNjYjI3N2Y2NDk0MjUwYmJiN2FhZjUyYzM5ZjZhYiIsImV4dF9hdHRyIjp7ImVuaGFuY2VyIjoiWFNVQUEiLCJzdWJhY2NvdW50aWQiOiI1YzJjMmYyNy0zZGNmLTQ4OWMtOGIwMS1hYTc2MzljNGQ2ODEiLCJ6ZG4iOiJ0ZmUtaW5kaWEtZ2VuYWktOWdxczNtMTAiLCJzZXJ2aWNlaW5zdGFuY2VpZCI6ImIyMGJlNjE5LTZmYzMtNDQ5Zi1hODk5LWFjMjMzM2RhNTVmNiJ9LCJzdWIiOiJzYi1iMjBiZTYxOS02ZmMzLTQ0OWYtYTg5OS1hYzIzMzNkYTU1ZjYhYjM5MTM0MHxhaWNvcmUhYjU0MCIsImF1dGhvcml0aWVzIjpbImFpY29yZSFiNTQwLmRvY2tlcnJlZ2lzdHJ5c2VjcmV0LmNyZWRlbnRpYWxzLnVwZGF0ZSIsImFpY29yZSFiNTQwLm1sZmNvbm5lY3Rpb24uY3JlZGVudGlhbHMuY3JlYXRlIiwiYWljb3JlIWI1NDAuZG9ja2VycmVnaXN0cnlzZWNyZXQuY3JlZGVudGlhbHMuZGVsZXRlIiwiYWljb3JlIWI1NDAucmVwb3NpdG9yaWVzLnJlYWQiLCJhaWNvcmUhYjU0MC5kb2NrZXJyZWdpc3RyeXNlY3JldC5jcmVkZW50aWFscy5yZWFkIiwiYWljb3JlIWI1NDAuc2NlbmFyaW9zLmV4ZWN1dGlvbnNjaGVkdWxlcy5jcmVhdGUiLCJhaWNvcmUhYjU0MC5tZXRhLnJlYWQiLCJhaWNvcmUhYjU0MC5zZWNyZXRzLmNyZWF0ZSIsImFpY29yZSFiNTQwLmRhdGFzZXRzLnVwbG9hZCIsImFpY29yZSFiNTQwLmV4ZWN1dGlvbnMubG9ncy5yZWFkIiwiYWljb3JlIWI1NDAubG9ncy5yZWFkIiwiYWljb3JlIWI1NDAub2JqZWN0c3RvcmVzZWNyZXQuY3JlZGVudGlhbHMuY3JlYXRlIiwiYWljb3JlIWI1NDAuc2NlbmFyaW9zLmV4ZWN1dGlvbnMuZGVsZXRlIiwiYWljb3JlIWI1NDAuc2NlbmFyaW9zLm1ldHJpY3MuZGVsZXRlIiwiYWljb3JlIWI1NDAuc2NlbmFyaW9zLnJlYWQiLCJhaWNvcmUhYjU0MC5rcGlzLnJlYWQiLCJ1YWEucmVzb3VyY2UiLCJhaWNvcmUhYjU0MC5yZXNvdXJjZWdyb3VwLmNyZWF0ZSIsImFpY29yZSFiNTQwLm1sZmNvbm5lY3Rpb24uY3JlZGVudGlhbHMucmVhZCIsImFpY29yZSFiNTQwLm9iamVjdHN0b3Jlc2VjcmV0LmNyZWRlbnRpYWxzLnVwZGF0ZSIsImFpY29yZSFiNTQwLnNlY3JldHMucmVhZCIsImFpY29yZSFiNTQwLmFwcGxpY2F0aW9ucy51cGRhdGUiLCJhaWNvcmUhYjU0MC5zY2VuYXJpb3MuZXhlY3V0aW9ucy5jYW5jZWwiLCJhaWNvcmUhYjU0MC5zY2VuYXJpb3MuZGVwbG95bWVudHMudXBkYXRlIiwiYWljb3JlIWI1NDAuc2NlbmFyaW9zLmNvbmZpZ3VyYXRpb25zLmNyZWF0ZSIsImFpY29yZSFiNTQwLnJlcG9zaXRvcmllcy5kZWxldGUiLCJhaWNvcmUhYjU0MC5kb2NrZXJyZWdpc3RyeXNlY3JldC5jcmVkZW50aWFscy5jcmVhdGUiLCJhaWNvcmUhYjU0MC5zZWNyZXRzLmRlbGV0ZSIsImFpY29yZSFiNTQwLm9iamVjdHN0b3Jlc2VjcmV0LmNyZWRlbnRpYWxzLnJlYWQiLCJhaWNvcmUhYjU0MC5zY2VuYXJpb3MuY29uZmlndXJhdGlvbnMucmVhZCIsImFpY29yZSFiNTQwLnNjZW5hcmlvcy5kZXBsb3ltZW50cy5jcmVhdGUiLCJhaWNvcmUhYjU0MC5zZWNyZXRzLnVwZGF0ZSIsImFpY29yZSFiNTQwLnNlcnZpY2VzLnJlYWQiLCJhaWNvcmUhYjU0MC5hcHBsaWNhdGlvbnMuY3JlYXRlIiwiYWljb3JlIWI1NDAuc2NlbmFyaW9zLmV4ZWN1dGlvbnMuY3JlYXRlIiwiYWljb3JlIWI1NDAucmVzb3VyY2Vncm91cC5yZWFkIiwiYWljb3JlIWI1NDAuc2NlbmFyaW9zLm1ldHJpY3MucmVhZCIsImFpY29yZSFiNTQwLnNjZW5hcmlvcy5tZXRyaWNzLmNyZWF0ZSIsImFpY29yZSFiNTQwLnNjZW5hcmlvcy5leGVjdXRpb25zY2hlZHVsZXMucmVhZCIsImFpY29yZSFiNTQwLm1sZmNvbm5lY3Rpb24uY3JlZGVudGlhbHMuZGVsZXRlIiwiYWljb3JlIWI1NDAuc2NlbmFyaW9zLmV4ZWN1dGFibGVzLnJlYWQiLCJhaWNvcmUhYjU0MC5kYXRhc2V0cy5kZWxldGUiLCJhaWNvcmUhYjU0MC5zY2VuYXJpb3MuZXhlY3V0aW9uc2NoZWR1bGVzLmRlbGV0ZSIsImFpY29yZSFiNTQwLnNjZW5hcmlvcy5leGVjdXRpb25zY2hlZHVsZXMudXBkYXRlIiwiYWljb3JlIWI1NDAuc2NlbmFyaW9zLmRlcGxveW1lbnRzLnByZWRpY3QiLCJhaWNvcmUhYjU0MC5tbGZjb25uZWN0aW9uLmNyZWRlbnRpYWxzLnVwZGF0ZSIsImFpY29yZSFiNTQwLmRlcGxveW1lbnRzLmxvZ3MucmVhZCIsImFpY29yZSFiNTQwLnNjZW5hcmlvcy5kZXBsb3ltZW50cy5yZWFkIiwiYWljb3JlIWI1NDAuYXBwbGljYXRpb25zLnJlYWQiLCJhaWNvcmUhYjU0MC5vYmplY3RzdG9yZXNlY3JldC5jcmVkZW50aWFscy5kZWxldGUiLCJhaWNvcmUhYjU0MC5yZXBvc2l0b3JpZXMuY3JlYXRlIiwiYWljb3JlIWI1NDAuc2NlbmFyaW9zLmFydGlmYWN0cy5jcmVhdGUiLCJhaWNvcmUhYjU0MC5yZXNvdXJjZWdyb3VwLmRlbGV0ZSIsImFpY29yZSFiNTQwLnNjZW5hcmlvcy5leGVjdXRpb25zLnJlYWQiLCJhaWNvcmUhYjU0MC5zY2VuYXJpb3MuYXJ0aWZhY3RzLnJlYWQiLCJhaWNvcmUhYjU0MC5zY2VuYXJpb3MuZGVwbG95bWVudHMuZGVsZXRlIiwiYWljb3JlIWI1NDAuYXBwbGljYXRpb25zLmRlbGV0ZSIsImFpY29yZSFiNTQwLmRhdGFzZXRzLmRvd25sb2FkIiwiYWljb3JlIWI1NDAucmVwb3NpdG9yaWVzLnVwZGF0ZSJdLCJzY29wZSI6WyJhaWNvcmUhYjU0MC5kb2NrZXJyZWdpc3RyeXNlY3JldC5jcmVkZW50aWFscy51cGRhdGUiLCJhaWNvcmUhYjU0MC5tbGZjb25uZWN0aW9uLmNyZWRlbnRpYWxzLmNyZWF0ZSIsImFpY29yZSFiNTQwLmRvY2tlcnJlZ2lzdHJ5c2VjcmV0LmNyZWRlbnRpYWxzLmRlbGV0ZSIsImFpY29yZSFiNTQwLnJlcG9zaXRvcmllcy5yZWFkIiwiYWljb3JlIWI1NDAuZG9ja2VycmVnaXN0cnlzZWNyZXQuY3JlZGVudGlhbHMucmVhZCIsImFpY29yZSFiNTQwLnNjZW5hcmlvcy5leGVjdXRpb25zY2hlZHVsZXMuY3JlYXRlIiwiYWljb3JlIWI1NDAubWV0YS5yZWFkIiwiYWljb3JlIWI1NDAuc2VjcmV0cy5jcmVhdGUiLCJhaWNvcmUhYjU0MC5kYXRhc2V0cy51cGxvYWQiLCJhaWNvcmUhYjU0MC5leGVjdXRpb25zLmxvZ3MucmVhZCIsImFpY29yZSFiNTQwLmxvZ3MucmVhZCIsImFpY29yZSFiNTQwLm9iamVjdHN0b3Jlc2VjcmV0LmNyZWRlbnRpYWxzLmNyZWF0ZSIsImFpY29yZSFiNTQwLnNjZW5hcmlvcy5leGVjdXRpb25zLmRlbGV0ZSIsImFpY29yZSFiNTQwLnNjZW5hcmlvcy5tZXRyaWNzLmRlbGV0ZSIsImFpY29yZSFiNTQwLnNjZW5hcmlvcy5yZWFkIiwiYWljb3JlIWI1NDAua3Bpcy5yZWFkIiwidWFhLnJlc291cmNlIiwiYWljb3JlIWI1NDAucmVzb3VyY2Vncm91cC5jcmVhdGUiLCJhaWNvcmUhYjU0MC5tbGZjb25uZWN0aW9uLmNyZWRlbnRpYWxzLnJlYWQiLCJhaWNvcmUhYjU0MC5vYmplY3RzdG9yZXNlY3JldC5jcmVkZW50aWFscy51cGRhdGUiLCJhaWNvcmUhYjU0MC5zZWNyZXRzLnJlYWQiLCJhaWNvcmUhYjU0MC5hcHBsaWNhdGlvbnMudXBkYXRlIiwiYWljb3JlIWI1NDAuc2NlbmFyaW9zLmV4ZWN1dGlvbnMuY2FuY2VsIiwiYWljb3JlIWI1NDAuc2NlbmFyaW9zLmRlcGxveW1lbnRzLnVwZGF0ZSIsImFpY29yZSFiNTQwLnNjZW5hcmlvcy5jb25maWd1cmF0aW9ucy5jcmVhdGUiLCJhaWNvcmUhYjU0MC5yZXBvc2l0b3JpZXMuZGVsZXRlIiwiYWljb3JlIWI1NDAuZG9ja2VycmVnaXN0cnlzZWNyZXQuY3JlZGVudGlhbHMuY3JlYXRlIiwiYWljb3JlIWI1NDAuc2VjcmV0cy5kZWxldGUiLCJhaWNvcmUhYjU0MC5vYmplY3RzdG9yZXNlY3JldC5jcmVkZW50aWFscy5yZWFkIiwiYWljb3JlIWI1NDAuc2NlbmFyaW9zLmNvbmZpZ3VyYXRpb25zLnJlYWQiLCJhaWNvcmUhYjU0MC5zY2VuYXJpb3MuZGVwbG95bWVudHMuY3JlYXRlIiwiYWljb3JlIWI1NDAuc2VjcmV0cy51cGRhdGUiLCJhaWNvcmUhYjU0MC5zZXJ2aWNlcy5yZWFkIiwiYWljb3JlIWI1NDAuYXBwbGljYXRpb25zLmNyZWF0ZSIsImFpY29yZSFiNTQwLnNjZW5hcmlvcy5leGVjdXRpb25zLmNyZWF0ZSIsImFpY29yZSFiNTQwLnJlc291cmNlZ3JvdXAucmVhZCIsImFpY29yZSFiNTQwLnNjZW5hcmlvcy5tZXRyaWNzLnJlYWQiLCJhaWNvcmUhYjU0MC5zY2VuYXJpb3MubWV0cmljcy5jcmVhdGUiLCJhaWNvcmUhYjU0MC5zY2VuYXJpb3MuZXhlY3V0aW9uc2NoZWR1bGVzLnJlYWQiLCJhaWNvcmUhYjU0MC5tbGZjb25uZWN0aW9uLmNyZWRlbnRpYWxzLmRlbGV0ZSIsImFpY29yZSFiNTQwLnNjZW5hcmlvcy5leGVjdXRhYmxlcy5yZWFkIiwiYWljb3JlIWI1NDAuZGF0YXNldHMuZGVsZXRlIiwiYWljb3JlIWI1NDAuc2NlbmFyaW9zLmV4ZWN1dGlvbnNjaGVkdWxlcy5kZWxldGUiLCJhaWNvcmUhYjU0MC5zY2VuYXJpb3MuZXhlY3V0aW9uc2NoZWR1bGVzLnVwZGF0ZSIsImFpY29yZSFiNTQwLnNjZW5hcmlvcy5kZXBsb3ltZW50cy5wcmVkaWN0IiwiYWljb3JlIWI1NDAubWxmY29ubmVjdGlvbi5jcmVkZW50aWFscy51cGRhdGUiLCJhaWNvcmUhYjU0MC5kZXBsb3ltZW50cy5sb2dzLnJlYWQiLCJhaWNvcmUhYjU0MC5zY2VuYXJpb3MuZGVwbG95bWVudHMucmVhZCIsImFpY29yZSFiNTQwLmFwcGxpY2F0aW9ucy5yZWFkIiwiYWljb3JlIWI1NDAub2JqZWN0c3RvcmVzZWNyZXQuY3JlZGVudGlhbHMuZGVsZXRlIiwiYWljb3JlIWI1NDAucmVwb3NpdG9yaWVzLmNyZWF0ZSIsImFpY29yZSFiNTQwLnNjZW5hcmlvcy5hcnRpZmFjdHMuY3JlYXRlIiwiYWljb3JlIWI1NDAucmVzb3VyY2Vncm91cC5kZWxldGUiLCJhaWNvcmUhYjU0MC5zY2VuYXJpb3MuZXhlY3V0aW9ucy5yZWFkIiwiYWljb3JlIWI1NDAuc2NlbmFyaW9zLmFydGlmYWN0cy5yZWFkIiwiYWljb3JlIWI1NDAuc2NlbmFyaW9zLmRlcGxveW1lbnRzLmRlbGV0ZSIsImFpY29yZSFiNTQwLmFwcGxpY2F0aW9ucy5kZWxldGUiLCJhaWNvcmUhYjU0MC5kYXRhc2V0cy5kb3dubG9hZCIsImFpY29yZSFiNTQwLnJlcG9zaXRvcmllcy51cGRhdGUiXSwiY2xpZW50X2lkIjoic2ItYjIwYmU2MTktNmZjMy00NDlmLWE4OTktYWMyMzMzZGE1NWY2IWIzOTEzNDB8YWljb3JlIWI1NDAiLCJjaWQiOiJzYi1iMjBiZTYxOS02ZmMzLTQ0OWYtYTg5OS1hYzIzMzNkYTU1ZjYhYjM5MTM0MHxhaWNvcmUhYjU0MCIsImF6cCI6InNiLWIyMGJlNjE5LTZmYzMtNDQ5Zi1hODk5LWFjMjMzM2RhNTVmNiFiMzkxMzQwfGFpY29yZSFiNTQwIiwiZ3JhbnRfdHlwZSI6ImNsaWVudF9jcmVkZW50aWFscyIsInJldl9zaWciOiIyZDMwYzA2NCIsImlhdCI6MTcyNDIxNTEzMCwiZXhwIjoxNzI0MjU4MzMwLCJpc3MiOiJodHRwczovL3RmZS1pbmRpYS1nZW5haS05Z3FzM20xMC5hdXRoZW50aWNhdGlvbi5ldTEwLmhhbmEub25kZW1hbmQuY29tL29hdXRoL3Rva2VuIiwiemlkIjoiNWMyYzJmMjctM2RjZi00ODljLThiMDEtYWE3NjM5YzRkNjgxIiwiYXVkIjpbImFpY29yZSFiNTQwLm9iamVjdHN0b3Jlc2VjcmV0LmNyZWRlbnRpYWxzIiwic2ItYjIwYmU2MTktNmZjMy00NDlmLWE4OTktYWMyMzMzZGE1NWY2IWIzOTEzNDB8YWljb3JlIWI1NDAiLCJhaWNvcmUhYjU0MC5kYXRhc2V0cyIsImFpY29yZSFiNTQwLmtwaXMiLCJhaWNvcmUhYjU0MC5kb2NrZXJyZWdpc3RyeXNlY3JldC5jcmVkZW50aWFscyIsImFpY29yZSFiNTQwLmRlcGxveW1lbnRzLmxvZ3MiLCJhaWNvcmUhYjU0MC5tZXRhIiwidWFhIiwiYWljb3JlIWI1NDAuc2NlbmFyaW9zLmFydGlmYWN0cyIsImFpY29yZSFiNTQwLnJlcG9zaXRvcmllcyIsImFpY29yZSFiNTQwLnNjZW5hcmlvcy5leGVjdXRpb25zY2hlZHVsZXMiLCJhaWNvcmUhYjU0MC5zY2VuYXJpb3MuZXhlY3V0YWJsZXMiLCJhaWNvcmUhYjU0MC5tbGZjb25uZWN0aW9uLmNyZWRlbnRpYWxzIiwiYWljb3JlIWI1NDAubG9ncyIsImFpY29yZSFiNTQwLnNjZW5hcmlvcy5kZXBsb3ltZW50cyIsImFpY29yZSFiNTQwLnNjZW5hcmlvcy5leGVjdXRpb25zIiwiYWljb3JlIWI1NDAuc2NlbmFyaW9zLmNvbmZpZ3VyYXRpb25zIiwiYWljb3JlIWI1NDAuc2VydmljZXMiLCJhaWNvcmUhYjU0MC5zY2VuYXJpb3MiLCJhaWNvcmUhYjU0MC5hcHBsaWNhdGlvbnMiLCJhaWNvcmUhYjU0MC5yZXNvdXJjZWdyb3VwIiwiYWljb3JlIWI1NDAuc2VjcmV0cyIsImFpY29yZSFiNTQwLnNjZW5hcmlvcy5tZXRyaWNzIiwiYWljb3JlIWI1NDAuZXhlY3V0aW9ucy5sb2dzIl19.E4EPmJCkON2mGA9_-2fhUwlTKGDrNG99Q7LWt0AgitTuGGFxvNoiQ2voDrbGxez4gxR7dqZ-Y6nMR1NWwDyI8DpQoaDt2NgMPppUbqbthiu3lKJQne_sUugqX9Mt79-mhygF11CzvJdhYycv-3WTv9gAtdx_tVi4JBD5xmyIOBDXl41N8AjaH1-4SpsK79XyYX2wlRgWR5YAJS-sPq7L3ufYgLkH20p6I3c6C2pWIl03yVQAut7BNg_XaObpxyrw3d_pdILXRr4j-zJRi1XBbPwDo4AaIavzoEvLAu7WE-bjxbbWfanV3UtPxYFki9Tyx0eoUCS--IihwbvB_JCSbA";

        let jsonPayload={
            "anthropic_version": "bedrock-2023-05-31",
            "max_tokens": 8000,
            "messages": [
                {
                "role": "user", 
                "content": `"${user_query}"`
                }
            ]
          }

        try {
        const response = await axios.post(modelBaseUrl, jsonPayload, {
            headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json' ,
            'AI-Resource-Group':'default'
            }
        });
        
        // Handle success
        console.log('Response data:', response.data);
        return response.data;
        } catch (error) {
            if (error.response) {
              console.error('Error Response Data:', error.response.data);
              console.error('Error Response Status:', error.response.status);
              console.error('Error Response Headers:', error.response.headers);
            } else if (error.request) {
              console.error('Error Request Data:', error.request);
            } else {
              console.error('Error Message:', error.message);
            }
          }


    });

    srv.on('READ', Destinations, async (req) => {
        try {
            let searchString = req.query.SELECT.search === undefined ? '' : req.query.SELECT.search[0].val;
            return await destinationUtil.getAllDestinations(searchString);
        } catch (error) {
            console.log(error);
            throw error
        }
    });

    srv.on('READ', LogStatuses, async () => {
        return [{ id: 'INPROCESS', descr: 'In Process' }, { id: 'ERROR', descr: 'Error' }, { id: 'COMPLETE', descr: 'Completed' }]
    });

    srv.after('READ', Actions, async (data, req) => {
        let actionCategoryID = '';
        if ((req._.event === 'READ' || req._.event === 'EDIT') && !Array.isArray(data)) {
            if (data.actionCategory_id == undefined) {
                let actionId = data.ID === undefined ? req.data.ID : data.ID;
                let result = await cds.read(Actions.drafts).limit(1).where({ ID: actionId }).columns(['actionCategory_id']);
                result.length > 0 ? actionCategoryID = result[0].actionCategory_id : '';
            } else {
                actionCategoryID = data.actionCategory_id;
            }
            actionCategoryID == 'ROOT' ? data.hideChildActions = false : data.hideChildActions = true;
            actionCategoryID == 'DEFAULT' ? data.hideDefaultActionIdPath = false : data.hideDefaultActionIdPath = true;
        }
        return data;
    })

    srv.before('PATCH', Actions, async (req) => {
        try {
            if (req.data.dest !== undefined) {
                let aDestinationInfo = await destinationUtil.getAllDestinations(req.data.dest);
                if (aDestinationInfo != undefined) {
                    if (aDestinationInfo.length == 1) req.data.url = aDestinationInfo[0].url
                    else req.data.url = '';
                }
            }
            if (req.data.type_ID !== undefined && req.data.type_ID !== null) {
                let result = await cds.read(Types).where({ ID: req.data.type_ID });
                req.data.path = result[0].path;
                req.data.payload = result[0].payload;
                req.data.method_ID = result[0].method_ID;
                req.data.contentType_id = result[0].contentType_id;
            } else if (req.data.type_ID === null) {
                req.data.path = req.data.payload = req.data.method_ID = req.data.contentType_id = '';
            }
            if (req.data.actionCategory_id == 'DEFAULT' && req.data.ID !== undefined) {
                let result = await cds.read(Actions).where({ actionCategory_id: 'DEFAULT' });
                if (result && result.length > 0 && result[0].ID != req.data.ID) {
                    req.reject(501, 'Only one default action can be created');
                }
            }
        } catch (error) {
            console.log(error);
            throw error
        }
    });

    srv.on('getUrlByDestination', Actions, async (req) => {
        // console.log('==> POST getUrlByDestination Called')
        const query = SELECT.one.from(Actions.drafts).where(req.params[0]), tx = srv.tx(req);
        let response = await tx.run(query);
        // console.log(JSON.stringify(response));
        // console.log('POST call finished <==')
        return response;
    });

    srv.on('getRelatedActionsVisibility', Actions, async (req) => {
        let response = await cds.read(Actions.drafts).where(req.params[0]);
        if (response[0].actionCategory_id == 'ROOT') {
            return true;
        } else {
            return false;
        }
    })

    srv.on('postEvent', async (req) => {
        console.log('event received from advanced event mesh');
        console.log(req);
        console.log(req.data);
    })

    srv.on('getActionsDefaults', async () => {
        return { actionCategory_id: 'ROOT', contentType_id: 'JSON', isCsrfTokenNeeded: false };
    })

})
