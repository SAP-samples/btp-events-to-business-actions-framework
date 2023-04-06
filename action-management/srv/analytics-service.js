const cds = require("@sap/cds");
const actionUtil = require('./utils/action');
const https = require('https');

module.exports = cds.service.impl(async function (srv) {

    const { LogStatuses, LogHeaders, LogItems } = this.entities;
    const httpsAgent = new https.Agent({ rejectUnauthorized: false });
    srv.on('READ', LogStatuses, async () => {
        return [{id:'INPROCESS', descr:'In Process'},{id:'ERROR', descr:'Error'},{id:'COMPLETE', descr:'Completed'}]
     });
    srv.on('reProcess', LogHeaders, async req => {
        console.log("------------------reprocess started-------");
        //get eventmessage from log items
        const logHeaderId = req.params[0];
        let eventMessage = "";
        let logEventMessage = await cds.read(LogItems).limit(1).where({header_ID: logHeaderId, seqNo: 1}).columns(['data']);
        logEventMessage.length > 0 ? eventMessage = logEventMessage[0].data : "";
        if(eventMessage && eventMessage.length > 0){
            try{
                await actionUtil.convertEventToBusinessAction(JSON.parse(eventMessage), httpsAgent, logHeaderId);
            } catch(error){
                throw error;
            }
            return true;
        } else {
            throw new Error("Event message not found");
        }
      });
});
