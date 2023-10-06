namespace sap.paa.action.mgmt;

using {
    cuid,
    managed
} from '@sap/cds/common';

entity Methods : cuid, managed {
    name : String;
}

entity ContentTypes {
    key id    : String(20);
        descr : String(50);
}

@cds.persistence.skip
@readonly
entity LogStatuses {
    key id    : String(20);
        descr : String(50);
}

entity ActionCategories {
    key id    : String(10);
        descr : String(100);
}

entity Types : cuid, managed {
    name        : String;
    descr       : String;
    path        : String(200);
    method      : Association to one Methods;
    payload     : String;
    contentType : Association to ContentTypes;
}

entity Actions : cuid, managed {
    name                     : String(100);
    descr                    : String;
    type                     : Association to one Types;
    dest                     : String(100);
    destination              : Association to Destinations
                                   on destination.name = dest;
    url                      : String(200);
    path                     : String(200);
    method                   : Association to one Methods;
    payload                  : String;
    contentType              : Association to one ContentTypes;
    childActions             : Composition of many prepostActions
                                   on childActions.rootAction = $self;
    actionCategory           : Association to ActionCategories;
    isCsrfTokenNeeded        : Boolean;
    defaultActionIdPath      : String;
    apidescription           : String;
    virtual hideChildActions : Boolean default false;
    virtual hideDefaultActionIdPath: Boolean default true;
}

entity prepostActions : cuid {
    flowType   : Association to one flowTypes;
    rootAction : Association to Actions;
    action     : Association to one Actions;
}


entity flowTypes : cuid {
    flowId   : String(20);
    flowName : String(20);
}

@cds.autoexpose : true
@cds.persistence.skip
@readonly
entity Destinations {
    key name  : String(100);
        descr : String(200);
        type  : String(10);
        url   : String(200);
        auth  : String(50);
        proxy : String(30);
}

entity LogHeaders : cuid, managed {
    status        : String(20);
    action        : Association to Actions;
    items         : Composition of many LogItems
                        on items.header = $self;
    virtual count : Integer default 1;
}

entity LogItems : cuid, managed {
    seqNo        : Integer;
    level         : String(10);
    message       : String(200);
    data          : LargeString;
    header        : Association to LogHeaders;
    virtual count : Integer default 1;
}
