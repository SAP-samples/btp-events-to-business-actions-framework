const proxy = require('@sap/cds-odata-v2-adapter-proxy')
const cds = require('@sap/cds')
const https = require('https');
const httpsAgent = new https.Agent({ rejectUnauthorized: false });
const actionUtil = require('./utils/action');
const bodyParser = require('body-parser');
const cors = require('cors');
cds.on('bootstrap', app => {
    app.use(bodyParser.json());
    app.use(cors());
    app.post('/api/events', async (req, res) => {
    try{
        const eventMessage = req.body;
        await actionUtil.convertEventToBusinessAction(eventMessage, httpsAgent);
        return "Event Processed. Please check logs for status.";

    } catch(error){
        throw error;

    }
    });
    app.use(proxy());

})

module.exports = cds.server