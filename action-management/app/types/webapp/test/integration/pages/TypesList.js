sap.ui.define(['sap/fe/test/ListReport'], function(ListReport) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ListReport(
        {
            appId: 'sap.paa.action.mgmt.ui.types',
            componentId: 'TypesList',
            entitySet: 'Types'
        },
        CustomPageDefinitions
    );
});