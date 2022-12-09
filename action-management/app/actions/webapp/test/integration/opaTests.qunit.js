sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'sap/paa/action/mgmt/ui/actions/test/integration/FirstJourney',
		'sap/paa/action/mgmt/ui/actions/test/integration/pages/ActionsList',
		'sap/paa/action/mgmt/ui/actions/test/integration/pages/ActionsObjectPage',
		'sap/paa/action/mgmt/ui/actions/test/integration/pages/prepostActionsObjectPage'
    ],
    function(JourneyRunner, opaJourney, ActionsList, ActionsObjectPage, prepostActionsObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('sap/paa/action/mgmt/ui/actions') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheActionsList: ActionsList,
					onTheActionsObjectPage: ActionsObjectPage,
					onTheprepostActionsObjectPage: prepostActionsObjectPage
                }
            },
            opaJourney.run
        );
    }
);