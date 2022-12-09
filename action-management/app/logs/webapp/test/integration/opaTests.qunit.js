sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'sap/paa/action/mgmt/ui/logs/test/integration/FirstJourney',
		'sap/paa/action/mgmt/ui/logs/test/integration/pages/LogHeadersList',
		'sap/paa/action/mgmt/ui/logs/test/integration/pages/LogHeadersObjectPage',
		'sap/paa/action/mgmt/ui/logs/test/integration/pages/LogItemsObjectPage'
    ],
    function(JourneyRunner, opaJourney, LogHeadersList, LogHeadersObjectPage, LogItemsObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('sap/paa/action/mgmt/ui/logs') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheLogHeadersList: LogHeadersList,
					onTheLogHeadersObjectPage: LogHeadersObjectPage,
					onTheLogItemsObjectPage: LogItemsObjectPage
                }
            },
            opaJourney.run
        );
    }
);