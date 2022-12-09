const BR_SERVICES_ENDPOINT = "/rules-service/rest/v2/workingset-rule-services";
const BR_RULE_ID = "e74801505f304a729429958f51526403";
const axios = require('axios');
const tokenUtil = require('./token')
const xsenv = require('@sap/xsenv');
xsenv.loadEnv();
let services = xsenv.getServices({ businessrules: { tag: 'business-rules' } });
const brInfo = services.businessrules;
const brRuntimeUrl = brInfo.endpoints.rule_runtime_url + BR_SERVICES_ENDPOINT;
const brUaa = brInfo.uaa;
const brUaaTokenUrl = brUaa.url+"/oauth/token";
async function getActionId(sourceSystem,deviceTemplate,deviceLocation) {
    try {
        let token = await tokenUtil.getTokenWithClientCreds(brUaaTokenUrl, brUaa.clientid, brUaa.clientsecret);
        console.log(token);
        let options = {
            method: 'POST',
            headers: { 
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            url: brRuntimeUrl,
            data: {
                "RuleServiceId": BR_RULE_ID,
                "Vocabulary": [
                   {
                      "EventInfo": {
                         "SourceSystem": sourceSystem,
                         "DeviceTemple": deviceTemplate,
                         "DeviceLocation": deviceLocation
                      }
                   }
                ]
            }
        };
        let response = await axios(options);
        const actionId = response.data.Result[0].ActionInfo.ActionId;
        console.log("actions=", JSON.stringify(response.data));
        return actionId;
    } catch (error) {
        console.log("Action could not be fetched!!")
        console.log(error);
        throw error;
    }
}

module.exports = { getActionId: getActionId};
