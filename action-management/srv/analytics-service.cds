using {sap.paa.action.mgmt as db} from '../db/schema';

@path : 'service/analytics'
service AnalyticsService {
    entity LogStatuses as projection on db.LogStatuses;

    @cds.redirection.target
    entity LogHeaders  as
        select from db.LogHeaders {
            *,
            TO_DATE(createdAt) as createdDate : Date,
            action.name as actionName,
            action.descr as actionDescr,
        } actions {
            @(cds.odata.bindingparameter.name : '_it',
                Common.SideEffects : {TargetProperties : ['_it/status'], TargetEntities:['_it/items']})
            action reProcess() returns Boolean;
        };

    entity LogItems    as
        select from db.LogItems {
            *
        } order by seqNo desc;
    entity LogCuntStatus as select from db.LogHeaders distinct{
        status,
        count(ID) as logCount:Integer
    } group by status;
}
