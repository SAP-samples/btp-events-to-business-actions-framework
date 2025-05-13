const axios = require('axios');
const xsenv = require('@sap/xsenv');
xsenv.loadEnv();
const tokenUtil = require('./token');
let services = new Object()
services = xsenv.getServices({ destination: { tag: 'destination' } });
// let xsuaaService = xsenv.getServices({ xsuaa: { tag: 'xsuaa' } });
if (cds.env.profiles.includes('production')) {
    services = xsenv.getServices({ destination: { tag: 'destination' } });
}

module.exports = {
    getAllDestinations: getAllDestinations,
    getDestinationToken: getDestinationToken,
    getDestinationDetails: getDestinationDetails
};

async function getAllDestinations(searchString){

    try {
        let tokenEndpoint = createTokenEndpoint(), aDestinationInfo=[];
        let token = await tokenUtil.getTokenWithClientCreds(tokenEndpoint, services.destination.clientid, services.destination.clientsecret);
        // let token = await tokenUtil.getTokenWithClientCreds(tokenEndpoint, xsuaaService.xsuaa.clientid, xsuaaService.xsuaa.clientsecret);
        console.log(tokenEndpoint);
        console.log(token);
        let options = { method: 'GET', 
                        headers: { Authorization: 'Bearer ' + token },
                        url: services.destination.uri + '/destination-configuration/v1/subaccountDestinations'  }
        let response = await axios(options); 
        console.log("destionations=", JSON.stringify(response.data));       
        for (let i = 0; i < response.data.length; i++) {
            if(searchString == '' || response.data[i].Name.toUpperCase().includes(searchString.toUpperCase())){
                aDestinationInfo.push({
                    name: response.data[i].Name,
                    descr: response.data[i].Description == undefined ? "" : response.data[i].Description,
                    type: response.data[i].Type,
                    url: response.data[i].URL,
                    auth: response.data[i].Authentication,
                    proxy: response.data[i].ProxyType
                });
            }
        }
        return aDestinationInfo;
    } catch (error) {
        console.log("Destination could not be fetched!!")
        console.log(error);
    }

}

async function getDestinationDetails(destinationName){

    try {
        let tokenEndpoint = createTokenEndpoint();
        let token = await tokenUtil.getTokenWithClientCreds(tokenEndpoint, services.destination.clientid, services.destination.clientsecret);
        console.log(tokenEndpoint);
        console.log(token);
        let options = { method: 'GET', 
                        headers: { Authorization: 'Bearer ' + token },
                        url: services.destination.uri + '/destination-configuration/v1/destinations/' + destinationName  }
        let response = await axios(options);        
        console.log("destionations=", JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        console.log("Destination could not be fetched!!")
        console.log(error);
    }

}

async function getDestinationToken(){
    try {
        let tokenEndpoint = createTokenEndpoint();
        let token = await tokenUtil.getTokenWithClientCreds(tokenEndpoint, services.destination.clientid, services.destination.clientsecret);
        return token;
    } catch (error) {
        console.log("Destination token could not be fetched!!")
        throw error;
    }
}

function createTokenEndpoint() {
    // let url = services.destination.url + '/oauth/token?grant_type=client_credentials';
    return services.destination.url + '/oauth/token';
    // return url.replace(/(^https:\/\/)([^.]+)(\..+$)/, '$1' + subdomain + '$3');
}