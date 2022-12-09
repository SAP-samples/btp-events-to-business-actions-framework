using {sap.paa.action.mgmt as db} from '../db/schema';

@path : 'service/admin'
service AdminService {

    entity Methods              as projection on db.Methods;
    entity ContentTypes         as projection on db.ContentTypes;
    entity Types                as projection on db.Types;
    entity flowTypes            as projection on db.flowTypes;
    entity ActionCategories     as projection on db.ActionCategories;

    @cds.redirection.target : true
    entity Actions               as projection on db.Actions actions {
        action getUrlByDestination()         returns Actions;
        action getRelatedActionsVisibility() returns Boolean;
    };

    entity prepostActions       as projection on db.prepostActions;
    entity NonQueueActions      as projection on db.Actions where actionCategory.id = 'CHILD';
    entity Destinations         as projection on db.Destinations;
    entity LogStatuses          as projection on db.LogStatuses;

    entity ActionDetails        as
        select from Actions {
            ID,
            dest,
            path,
            payload,
            isCsrfTokenNeeded,
            contentType.descr    as ma_contentType,
            method.name          as ma_method,
            actionCategory.id    as categoryId,
            actionCategory.descr as categoryDescr,
            defaultActionIdPath  as defaultActionIdPath,
        };

    entity PrePostActionDetails as
        select from prepostActions {
            ID                          as prepostAction_ID,
            flowType.flowId             as flowId,
            rootAction.ID               as ma_ID,
            action.dest                 as ca_dest,
            action.ID                   as ca_ID,
            action.path                 as ca_path,
            action.payload              as ca_payload,
            action.contentType.descr    as ca_contentType,
            action.method.name          as ca_method,
            action.isCsrfTokenNeeded    as ca_isCsrfTokenNeeded,
            action.actionCategory.id    as ca_categoryId,
            action.actionCategory.descr as ca_categoryDescr,
        };

    entity LogHeaders           as projection on db.LogHeaders;
    entity LogItems             as projection on db.LogItems;
    function getActionsDefaults() returns Actions;
}
