using AnalyticsService as service from '../../srv/analytics-service';

annotate service.LogHeaders with @(
    Aggregation.ApplySupported : {
        Transformations        : [
            'aggregate',
            'topcount',
            'bottomcount',
            'identity',
            'concat',
            'groupby',
            'filter',
            'expand',
            'search'
        ],
        Rollup                 : #None,
        PropertyRestrictions   : true,
        AggregatableProperties : [
            {Property : action_ID},
            {Property : ID},
            {Property : TotCount},
            {Property : count}
        ],
        GroupableProperties    : [
            action_ID,
            actionName,
            status,
            createdDate,
            createdAt
        ]
    },
    Analytics                  : {AggregatedProperties : [{
        $Type                : 'Analytics.AggregatedPropertyType',
        Name                 : 'TotCount',
        AggregationMethod    : 'countdistinct',
        AggregatableProperty : ID,
        ![@Common.Label]     : 'Total Count'
    }]}
);

annotate service.LogHeaders with @(
  Aggregation.CustomAggregate #count : 'Edm.Decimal',
  Common.SemanticKey : [ID],
) {
  ID    @ID : 'ID';
  count @Analytics.Measure: true  @Aggregation.default: #SUM;
};

annotate service.LogHeaders with @UI.PresentationVariant : {
    GroupBy        : [ // default grouping in table
    status],
    Total          : [TotCount],
    Visualizations : [
        '@UI.Chart',
        '@UI.LineItem',
    ],
    SortOrder : [
        {
            Property : createdAt,
            Descending : true
        }
    ]
};

annotate service.LogHeaders with @UI.Chart : {
    Title               : 'Logs',
    ChartType           : #Column,
    Measures            : [TotCount],
    Dimensions          : [
        actionName,
        status
    ],
    MeasureAttributes   : [{
        Measure : TotCount,
        Role    : #Axis1
    }],
    DimensionAttributes : [
        {
            Dimension : actionName,
            Role      : #Category
        },
        {
            Dimension : status,
            Role      : #Category
        }
    ]
};

annotate service.LogHeaders with @(UI.LineItem : [
    {
        $Type : 'UI.DataField',
        Value : ID,
        Label : 'ID',
        ![@HTML5.CssDefaults] : {width : '300px'}
    },
    {
        $Type             : 'UI.DataField',
        Label             : 'Log Status',
        Value             : status,
        ![@UI.Importance] : #High,
    },
    {
        $Type             : 'UI.DataField',
        Label             : 'Action Name',
        Value             : actionName,
        ![@UI.Importance] : #High,
    },
        {
        $Type             : 'UI.DataField',
        Label             : 'Action Description',
        Value             : actionDescr,
        ![@UI.Importance] : #High,
    },
    {
        $Type             : 'UI.DataField',
        Label             : 'Created On',
        Value             : createdAt,
        ![@UI.Importance] : #High,
    }
]);

// Selection Filters

annotate service.LogHeaders with @(
    UI.PresentationVariant #pvAction : {Visualizations : ['@UI.Chart#chartAction']},
    UI.Chart #chartAction            : {
        Title               : 'Logs Count by Action',
        ChartType           : #Bar,
        Measures            : [TotCount],
        Dimensions          : [actionName],
        MeasureAttributes   : [{
            Measure : TotCount,
            Role    : #Axis1,
        }],
        DimensionAttributes : [{
            Dimension : actionName,
            Role      : #Category
        }]
    }
) {
    actionName @(
        Common.ValueList #vlAction      : {
            Label                        : 'Action',
            CollectionPath               : 'LogHeaders',
            SearchSupported              : false,
            DistinctValuesSupported      : true,
            PresentationVariantQualifier : 'pvAction',
            Parameters                   : [{
                $Type             : 'Common.ValueListParameterInOut',
                LocalDataProperty : actionName,
                ValueListProperty : 'actionName'
            }]
        },
        Common.ValueListWithFixedValues : true
    );
};

annotate service.LogHeaders with @(
    UI.PresentationVariant #pvCreatedOn : {Visualizations : ['@UI.Chart#chartCreatedDate']},
    UI.Chart #chartCreatedDate          : {
        Title               : 'Logs Count by Created On',
        ChartType           : #Bar,
        Measures            : [TotCount],
        Dimensions          : [createdDate],
        MeasureAttributes   : [{
            Measure : TotCount,
            Role    : #Axis1,
        }],
        DimensionAttributes : [{
            Dimension : createdDate,
            Role      : #Category
        }]
    }
) {
    createdDate @(
        Common.ValueList #vlCreatedOn   : {
            Label                        : 'Created On',
            CollectionPath               : 'LogHeaders',
            DistinctValuesSupported      : true,
            SearchSupported              : false,
            PresentationVariantQualifier : 'pvCreatedOn',
            Parameters                   : [{
                $Type             : 'Common.ValueListParameterInOut',
                LocalDataProperty : createdDate,
                ValueListProperty : 'createdDate'
            }]
        },
        Common.ValueListWithFixedValues : true
    );
};

annotate service.LogHeaders with @(
    UI.PresentationVariant #pvqLogStatus : {Visualizations : ['@UI.Chart#vfLogStatus']},
    UI.Chart #vfLogStatus                : {
        $Type               : 'UI.ChartDefinitionType',
        Title               : 'Count by Status',
        ChartType           : #Bar,
        Dimensions          : [status],
        Measures            : [TotCount],
        MeasureAttributes   : [{
            Measure : TotCount,
            Role    : #Axis1
        }],
        DimensionAttributes : [{
            Dimension : status,
            Role      : #Category
        }]
    }
) {
    status @(
        Common.ValueList #vlqLogStatus  : {
            $Type                        : 'Common.ValueListType',
            CollectionPath               : 'LogHeaders',
            PresentationVariantQualifier : 'pvqLogStatus',
            Parameters                   : [{
                $Type             : 'Common.ValueListParameterInOut',
                LocalDataProperty : status,
                ValueListProperty : 'status',
            }, ],
        },
        Common.ValueListWithFixedValues : true
    )
}

annotate service.LogHeaders with @(
    UI.FieldGroup #GeneratedGroup1 : {
        $Type : 'UI.FieldGroupType',
        Data  : [
            {
                $Type : 'UI.DataField',
                Label : 'Log Status',
                Value : status,
            },
            {
                $Type : 'UI.DataField',
                Value : actionName,
                Label : 'Action Name',
            },
            {
                $Type : 'UI.DataField',
                Label : 'Count',
                Value : count,
            }
        ],
    },
    UI.Facets                      : [
        {
            $Type  : 'UI.ReferenceFacet',
            ID     : 'GeneratedFacet1',
            Label  : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup1',
        },
        {
            $Type  : 'UI.ReferenceFacet',
            Label  : 'Log Items',
            ID     : 'LogItems',
            Target : 'items/@UI.LineItem#LogItems',
        },
    ]
);

annotate service.LogHeaders with {
    count       @Common.Label : 'Count';
    actionName  @Common.Label : 'Action Name';
    status      @Common.Label : 'Log Status';
    action      @Common.Label : 'Action';
    createdAt @Common.Label : 'Created On';
};

annotate service.LogHeaders with @(readonly: true);

annotate service.LogItems with @(UI.LineItem #LogItems : [
    {
        $Type : 'UI.DataField',
        Value : seqNo,
        Label : 'Seq. No',
    },
    {
        $Type                 : 'UI.DataField',
        Value                 : ID,
        Label                 : 'ID',
        ![@UI.Importance]     : #High,
        ![@HTML5.CssDefaults] : {width : '300px'}
    },
    {
        $Type : 'UI.DataField',
        Value : level,
        Label : 'Level',
    },
    {
        $Type : 'UI.DataField',
        Value : message,
        Label : 'Log Message',
    },
    {
        $Type : 'UI.DataField',
        Value : data,
        Label : 'Log Data',
    },
    {
        $Type                 : 'UI.DataField',
        Value                 : createdAt,
        ![@HTML5.CssDefaults] : {width : '200px'}
    },
]);


annotate service.LogHeaders with @(UI.HeaderInfo : {
    TypeName       : 'Log Detail',
    TypeNamePlural : 'Log Details',
    Title          : {
        $Type : 'UI.DataField',
        Value : ID,
    },
    Description    : {
        $Type : 'UI.DataField',
        Value : status,
    }
});

annotate service.LogHeaders with @(UI.Identification : [
    {
        $Type : 'UI.DataFieldForAction',
        Label : 'Re-Process',
        Action : 'AnalyticsService.reProcess',
        ![@UI.Importance] : #High,
        ![@UI.Hidden] : {$edmJson : {$Ne : [{$Path : 'status'}, 'ERROR']}}
    }
]);

annotate service.LogItems with @(UI.HeaderInfo : {
    TypeName       : 'Log Item Detail',
    TypeNamePlural : 'Log Item Details',
    Title          : {
        $Type : 'UI.DataField',
        Value : ID,
    },
});


annotate service.LogItems with @(
    UI.Facets                  : [
        {
            $Type  : 'UI.ReferenceFacet',
            Label  : 'Information',
            ID     : 'Information',
            Target : '@UI.FieldGroup#Information',
        },
        {
            $Type  : 'UI.ReferenceFacet',
            Label  : 'Data',
            ID     : 'Data',
            Target : '@UI.FieldGroup#Data',
        },
    ],
    UI.FieldGroup #Information : {
        $Type : 'UI.FieldGroupType',
        Data  : [
            {
                $Type : 'UI.DataField',
                Value : level,
                Label : 'Level',
            },
            {
                $Type : 'UI.DataField',
                Value : createdAt,
            },
            {
                $Type : 'UI.DataField',
                Value : message,
                Label : 'Message',
            },
        ],
    }
);

annotate service.LogItems with @(UI.FieldGroup #Data : {
    $Type : 'UI.FieldGroupType',
    Data  : [{
        $Type : 'UI.DataField',
        Value : data,
        Label : 'data',
    }]
});

annotate service.LogItems with {
    data @UI.MultiLineText : true
};
 

/* KPI Definitions */
annotate service.LogHeaders with @(UI.KPI #myKPI1 : {
    DataPoint        : {
        $Type       : 'UI.DataPointType',
        Value       : count,
        Title       : 'Events Received',
        Criticality : 3
    },
    Detail           : {DefaultPresentationVariant : {Visualizations : []}},
    SelectionVariant : {SelectOptions : []}
});


/*

.sapUiMDCChart {
    background: #fff;
    border-radius: 0.75rem;
     padding-bottom: 1rem; 
    margin-bottom: 1rem;
}

*/