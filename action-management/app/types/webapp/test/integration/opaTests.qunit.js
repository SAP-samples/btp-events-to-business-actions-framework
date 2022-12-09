sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'sap/paa/action/mgmt/ui/types/test/integration/FirstJourney',
		'sap/paa/action/mgmt/ui/types/test/integration/pages/TypesList',
		'sap/paa/action/mgmt/ui/types/test/integration/pages/TypesObjectPage'
    ],
    function(JourneyRunner, opaJourney, TypesList, TypesObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('sap/paa/action/mgmt/ui/types') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheTypesList: TypesList,
					onTheTypesObjectPage: TypesObjectPage
                }
            },
            opaJourney.run
        );
    }
);