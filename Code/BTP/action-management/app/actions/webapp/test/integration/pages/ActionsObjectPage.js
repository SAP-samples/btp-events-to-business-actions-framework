sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'sap.paa.action.mgmt.ui.actions',
            componentId: 'ActionsObjectPage',
            entitySet: 'Actions'
        },
        CustomPageDefinitions
    );
});