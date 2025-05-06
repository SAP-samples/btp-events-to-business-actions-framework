const cds = require("@sap/cds");
const LOG = cds.log('EAP');
module.exports = {createLogHeader:createLogHeader, createLogItem:createLogItem, updateLogHeader:updateLogHeader};

async function createLogHeader(initialStatus){
    let logHeader = {status: initialStatus, actionId: ''};
    let result = await cds.create('AdminService.LogHeaders', logHeader);
    return result.req.data.ID;
}

async function createLogItem(logHeadId, level, msg, data){
    LOG[level.toLowerCase()](msg);
    LOG[level.toLowerCase()](JSON.stringify(data));
    //get log count for the header
    let logSeqNo = 1;
    let logCountResult = await cds.read('AdminService.LogItems').limit(1).where({header_ID: logHeadId}).orderBy({ref:['seqNo'],sort:'desc'}).columns(['seqNo']);
    logCountResult.length > 0 ? logSeqNo = logCountResult[0].seqNo + 1 : 1;
    let logItem = {header_ID: logHeadId, level: level, message: msg, data: data, seqNo: logSeqNo};
    let result = await cds.create('AdminService.LogItems', logItem);
    return result.req.data;
}

async function updateLogHeader(logHeadId, data){
    return await cds.update('AdminService.LogHeaders').where({ID: logHeadId}).with(data);
}