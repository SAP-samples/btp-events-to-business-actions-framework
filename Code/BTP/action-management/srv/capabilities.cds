using {AdminService} from './admin-service';



annotate AdminService.Types with @(odata.draft.enabled : true);
annotate AdminService.Actions with @(odata.draft.enabled : true);
annotate AdminService.ActionDetails @(readonly : true);
annotate AdminService.PrePostActionDetails @(readonly : true);
// annotate AdminService.LogHeaders with @(readonly : true);
// annotate AdminService.LogItems with @(readonly : true);
