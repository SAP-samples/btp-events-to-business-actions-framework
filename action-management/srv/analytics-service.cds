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
        };

    entity LogItems    as
        select from db.LogItems {
            *
        };
    entity LogCuntStatus as select from db.LogHeaders distinct{
        status,
        count(ID) as logCount:Integer
    } group by status;
}
