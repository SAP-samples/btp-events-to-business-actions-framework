const cds = require("@sap/cds");

module.exports = cds.service.impl(async function (srv) {

    const { LogStatuses } = this.entities;
    srv.on('READ', LogStatuses, async () => {
        return [{id:'INPROCESS', descr:'In Process'},{id:'ERROR', descr:'Error'},{id:'COMPLETE', descr:'Completed'}]
     });
});
