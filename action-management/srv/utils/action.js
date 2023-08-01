const cds = require("@sap/cds");
const { SELECT } = cds.ql;
const core = require('@sap-cloud-sdk/http-client');
const logUtil = require('./logger');
const xsenv = require('@sap/xsenv');
const destinationUtil = require('./destination');
xsenv.loadEnv();
// const { ActionDetails, PrePostActionDetails } = cds.entities;

function buildActionObject(path, dest, method, payload, contentType) {
    const actionObject = {
        url: path,
        destination: dest,
        method: method,
        data: payload,
        contentType: contentType
    };
    return actionObject;
}

function replaceTemplateData(eventData, actionResponses, actionTemplateData) {
    let actionData = actionTemplateData.split('${{'), templatePath, parsedValue, subpathList, jsonData;
    if (actionData.length > 1) {
        for (let i = 0; i < actionData.length; i++) {
            if (actionData[i].includes('}}')) {
                templatePath = actionData[i].split('}}')[0];
                subpathList = templatePath.split('.');
                switch ((subpathList[0]).toUpperCase()) {
                    case 'EVENT':
                        jsonData = eventData;
                        subpathList.splice(0, 1);
                        break;
                    case 'DEFAULT':
                        jsonData = actionResponses.defaultActionResponses[subpathList[1]];
                        subpathList.splice(0, 2);
                        break;
                    case 'MAIN':
                        jsonData = actionResponses.mainActionResponses[subpathList[1]];
                        subpathList.splice(0, 2);
                        break;
                    case 'PRE':
                        jsonData = actionResponses.preActionResponses[subpathList[1]];
                        subpathList.splice(0, 2);
                        break;
                    case 'POST':
                        jsonData = actionResponses.postActionResponses[subpathList[1]];
                        subpathList.splice(0, 2);
                        break;
                }
                parsedValue = getValueByJSONPath(jsonData, subpathList.join('.'));
                actionTemplateData = actionTemplateData.replace('${{' + templatePath + '}}', parsedValue);
            }
        }
    }
    return actionTemplateData;

    // actionData = actionData.replace('INFO', eventData.telemetry.FillingLevel);
    // return actionData;
}

async function getDefaultAction(logHeadId) {
    // let { ActionDetails } = cds.entities;
    let defaultActionDetails = await SELECT.one.from('AdminService.ActionDetails').where({ categoryId: 'DEFAULT' });
    await logUtil.createLogItem(logHeadId, 'INFO', 'Default Action Details fetched', JSON.stringify(defaultActionDetails));
    return defaultActionDetails;
}

function getValueByJSONPath(data, jsonPath) {
    let subpaths = jsonPath.split('.'), subpath, index, output = data;
    for (let i = 0; i < subpaths.length; i++) {
        subpath = subpaths[i];
        output = output[subpath.split('[')[0]];
        if (subpath.includes('[') == true) {
            index = subpath.split('[')[1].split(']')[0];
            output = output[index];
        }
    }
    return output;
}

async function getActionInformations(actionId, logHeadId) {
    let mainActionDetails = await SELECT.one.from('AdminService.ActionDetails').where({ ID: actionId });
    await logUtil.createLogItem(logHeadId, 'INFO', 'Main Action Details fetched', JSON.stringify(mainActionDetails));

    let relatedPreActions = await SELECT.from('AdminService.PrePostActionDetails').where({ "ma_ID": actionId, "flowId": "Pre-Action" });
    await logUtil.createLogItem(logHeadId, 'INFO', 'Related Pre-Action Details fetched', JSON.stringify(relatedPreActions));

    let relatedPostActions = await SELECT.from('AdminService.PrePostActionDetails').where({ "ma_ID": actionId, "flowId": "Post-Action" });
    await logUtil.createLogItem(logHeadId, 'INFO', 'Related Post-Action Details fetched', JSON.stringify(relatedPostActions));

    return { mainActionDetails, relatedPreActions, relatedPostActions };
}

async function buildDataAndExecuteAction(eventMessage, actionResponses, reqActionDetails, destToken, httpsAgent, logHeadId) {
    const actionCategoryId = reqActionDetails.categoryId == undefined ? reqActionDetails.ca_categoryId : reqActionDetails.categoryId;
    const actionCategoryDesc = reqActionDetails.categoryDescr == undefined ? reqActionDetails.ca_categoryDescr : reqActionDetails.categoryDescr;

    const actionId = actionCategoryId === 'CHILD' ? reqActionDetails.ca_ID : reqActionDetails.ID;
    const templatePayload = actionCategoryId === 'CHILD' ? reqActionDetails.ca_payload : reqActionDetails.payload;
    const templatePath = actionCategoryId === 'CHILD' ? reqActionDetails.ca_path : reqActionDetails.path;
    const dest = actionCategoryId === 'CHILD' ? reqActionDetails.ca_dest : reqActionDetails.dest;
    const method = actionCategoryId === 'CHILD' ? reqActionDetails.ca_method : reqActionDetails.ma_method;
    const contentType = actionCategoryId === 'CHILD' ? reqActionDetails.ca_contentType : reqActionDetails.ma_contentType;
    const isTokenNeeded = actionCategoryId === 'CHILD' ? reqActionDetails.ca_isCsrfTokenNeeded : reqActionDetails.isCsrfTokenNeeded;
    //replace template with dynamic data in payload and url path
    let payload = templatePayload;
    if(templatePayload && templatePayload !== null){
        payload = replaceTemplateData(eventMessage, actionResponses, templatePayload);
    }

    await logUtil.createLogItem(logHeadId, 'INFO', `[${actionCategoryDesc}] For Action:${actionId}, Final Payload`, JSON.stringify(payload));

    let path = templatePath;
    if(templatePath && templatePath !== null){
        path = replaceTemplateData(eventMessage, actionResponses, templatePath);
    }
    await logUtil.createLogItem(logHeadId, 'INFO', `[${actionCategoryDesc}] For Action:${actionId}, Final URL path`, JSON.stringify(path));

    const actionObject = buildActionObject(path, dest, method, payload, contentType);
    const actionResponse = await executeAction(actionObject, destToken, httpsAgent, isTokenNeeded, logHeadId);
    await logUtil.createLogItem(logHeadId, 'INFO', `[${actionCategoryDesc}] For Action:${actionId}, execution is successful`, JSON.stringify(actionResponse.data));
    return actionResponse;
}

async function executeAction(actionObject, destinationToken, httpsAgent, isTokenNeeded, logHeadId) {
    try {
        let destinationConfig, actionRequestConfig, actionResponse, actionHeaders = {};
        destinationConfig = { destinationName: actionObject.destination };

        //Fetch Token If Needed
        // let tokenRequestConfig, tokenResponse;
        // if (isTokenNeeded) {
        //     tokenRequestConfig = { method: "GET", url: actionObject.url, headers: { 'x-csrf-token': 'fetch' }, httpsAgent: httpsAgent };
        //     tokenResponse = await core.executeHttpRequest(destinationConfig, tokenRequestConfig);
        //     actionHeaders["x-csrf-token"] = tokenResponse.headers['x-csrf-token'];
        //     actionHeaders["Cookie"] = tokenResponse.headers['set-cookie'].join("; ");
        // }

        //Execute [Pre/Post] Action Call
        if(actionObject.data && actionObject.data !=null){
            actionHeaders["Content-Type"] = actionObject.contentType;
            actionRequestConfig = { method: actionObject.method, url: actionObject.url, data: actionObject.data, headers: actionHeaders, httpsAgent: httpsAgent }
        } else {
            actionRequestConfig = { method: actionObject.method, url: actionObject.url, httpsAgent: httpsAgent }
        }
        actionResponse = await core.executeHttpRequest(destinationConfig, actionRequestConfig, { fetchCsrfToken: Boolean(isTokenNeeded) });

        return actionResponse;
    } catch (error) {
        if (error.message !== undefined) await logUtil.createLogItem(logHeadId, 'ERROR', error.message, '');
        if (error.cause?.message !== undefined) await logUtil.createLogItem(logHeadId, 'ERROR', error.cause?.message, '');
        if (error.rootCause?.message !== undefined) await logUtil.createLogItem(logHeadId, 'ERROR', error.rootCause?.message, '');
        if (error.rootCause?.response?.data !== undefined) await logUtil.createLogItem(logHeadId, 'ERROR', error.rootCause?.response?.data, '');
        throw error;
    }
}

async function convertEventToBusinessAction(eventMessage, httpsAgent, logHeaderId){
    let actionResponses = { defaultActionResponses: {}, preActionResponses: {}, mainActionResponses: {}, postActionResponses: {} };
    let logHeadId = '';
    if(logHeaderId){
        logHeadId = logHeaderId;
        await logUtil.updateLogHeader(logHeadId, { status: 'INPROCESS' });
    } else {
        logHeadId = await logUtil.createLogHeader('INPROCESS');
    }
    await logUtil.createLogItem(logHeadId, 'INFO', 'Event Received', JSON.stringify(eventMessage));

    try {
        const destToken = await destinationUtil.getDestinationToken();
       
        await logUtil.createLogItem(logHeadId, 'INFO', 'Destination Service Token fetched', '');

        //Get Default Action - To Use it to determine Relevant Action
        let defaultActionDetails = await getDefaultAction(logHeadId);
        let defaultActionResponse = await buildDataAndExecuteAction(eventMessage, actionResponses, defaultActionDetails, destToken, httpsAgent, logHeadId);
        const actionId = getValueByJSONPath(defaultActionResponse.data, defaultActionDetails.defaultActionIdPath);
        await logUtil.createLogItem(logHeadId, 'INFO', 'Action Determined Successfully', actionId);
        await logUtil.updateLogHeader(logHeadId, { action_ID: actionId });
        actionResponses.defaultActionResponses[defaultActionDetails.ID] = defaultActionResponse.data;


        //Get Action and Pre/Post Action Details
        let { mainActionDetails, relatedPreActions, relatedPostActions } = await getActionInformations(actionId, logHeadId);

        //Execute Pre Action Details - One By One
        if (relatedPreActions && relatedPreActions.length > 0) {
            for (let i = 0; i < relatedPreActions.length; i++) {
                let preActionResponse = await buildDataAndExecuteAction(eventMessage, actionResponses, relatedPreActions[i], destToken, httpsAgent, logHeadId);
                actionResponses.preActionResponses[relatedPreActions[i].prepostAction_ID] = preActionResponse.data;
            }
        }

        //Execute Main Action
        const mainActionResponse = await buildDataAndExecuteAction(eventMessage, actionResponses, mainActionDetails, destToken, httpsAgent, logHeadId);
        actionResponses.mainActionResponses[mainActionDetails.ID] = mainActionResponse.data;

        //Execute Post Action Dtails - One By One
        if (relatedPostActions && relatedPostActions.length > 0) {
            for (let i = 0; i < relatedPostActions.length; i++) {
                let postActionResponse =await buildDataAndExecuteAction(eventMessage, actionResponses, relatedPostActions[i], destToken, httpsAgent, logHeadId);
                actionResponses.postActionResponses[relatedPostActions[i].prepostAction_ID] = postActionResponse.data;
            }
        }

        await logUtil.updateLogHeader(logHeadId, { status: 'COMPLETE' });
    }
    catch (error) {
        await logUtil.updateLogHeader(logHeadId, { status: 'ERROR' });
    }
}

module.exports = {
    getDefaultAction: getDefaultAction,
    getActionInformations: getActionInformations,
    getValueByJSONPath: getValueByJSONPath,
    executeAction: executeAction,
    buildDataAndExecuteAction: buildDataAndExecuteAction,
    convertEventToBusinessAction: convertEventToBusinessAction
};
