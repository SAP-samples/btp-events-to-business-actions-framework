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
        console.log('Event processed successfully. Sending 200 OK.');
        res.status(200).json({ message: "Event Processed. Please check logs for details." });
    } catch(error){
        console.error('Error processing event:', error.message);
        if (error.stack) {
            console.error(error.stack);
        }
        res.status(500).json({
            error: "Failed to process event.",
            details: "An internal server error occurred. Please check application logs for more details."
        });
    }
    });
    app.use(proxy());
})

module.exports = cds.server