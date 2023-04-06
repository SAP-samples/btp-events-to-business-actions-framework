const cds = require("@sap/cds");
const https = require('https');
const destinationUtil = require('./utils/destination');
// const businessRulesUtil = require('./utils/businessrules');
const actionUtil = require('./utils/action');
const logUtil = require('./utils/logger');
const action = require("./utils/action");

module.exports = cds.service.impl(async function (srv) {

    const { Destinations, Actions, Types, LogStatuses } = this.entities;
    const emMessaging = await cds.connect.to("messaging");
    const httpsAgent = new https.Agent({ rejectUnauthorized: false });

    emMessaging.on('com/sap/paa/industry/event/raised', async (eventMessage) => {
        await actionUtil.convertEventToBusinessAction(eventMessage, httpsAgent);
    })


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
                if (aDestinationInfo != undefined){
                    if(aDestinationInfo.length == 1) req.data.url = aDestinationInfo[0].url
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
            if(req.data.actionCategory_id == 'DEFAULT' && req.data.ID !== undefined){
                let result = await cds.read(Actions).where({actionCategory_id: 'DEFAULT'});
                if(result && result.length>0 && result[0].ID != req.data.ID){
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
        console.log('event re4ceived from advanced event mesh');
        console.log(req);
        console.log(req.data);
    })

    srv.on('getActionsDefaults', async () => {
        return { actionCategory_id: 'ROOT', contentType_id: 'JSON', isCsrfTokenNeeded: false };
    })

})
