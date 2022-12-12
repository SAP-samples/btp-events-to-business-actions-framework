using AdminService as service from '../../srv/admin-service';

annotate service.Actions @(
    Common : {  
        SideEffects #DestinationChanged : {
            SourceProperties : ['dest'],
            TargetProperties : ['url']
        },
        SideEffects #TypeChanged : {
            SourceProperties : ['type_ID'],
            TargetProperties : ['path', 'payload', 'method_ID', 'contentType_id']
        },
        SideEffects #ActionCategoryChanged : {
            SourceProperties : ['actionCategory_id'],
            TargetProperties : ['hideChildActions']
        },

        DefaultValuesFunction: 'getActionsDefaults'
    }
);


annotate service.Actions with @(Common.SemanticKey : [ID]);
annotate service.prepostActions with @(Common.SemanticKey : [ID]);

annotate service.Actions with @(UI.LineItem : [
    {
        $Type             : 'UI.DataField',
        Label             : 'Action Name',
        Value             : name,
        ![@UI.Importance] : #High,
    },
    {
        $Type             : 'UI.DataField',
        Label             : 'Description',
        Value             : descr,
        ![@UI.Importance] : #Medium,
    },
    {
        $Type             : 'UI.DataField',
        Label             : 'Destination',
        Value             : dest,
        ![@UI.Importance] : #High,
    },
    {
        $Type             : 'UI.DataField',
        Label             : 'URL',
        Value             : url,
        ![@UI.Importance] : #Low,
    },
    {
        $Type             : 'UI.DataField',
        Label             : 'Path',
        Value             : path,
        ![@UI.Importance] : #Low,
    },
    {
        $Type : 'UI.DataField',
        Value : method_ID,
        Label : 'Method',
        ![@UI.Importance] : #High,
    },
    {
        $Type : 'UI.DataField',
        Value : actionCategory_id,
        Label : 'Action Category',
        ![@UI.Importance] : #High,
    },
    {
        $Type : 'UI.DataField',
        Value : payload,
        Label : 'Payload',
        ![@UI.Importance] : #Low,
    },
]);

annotate service.Actions with @(
    UI.FieldGroup #GeneratedGroup1 : {
        $Type : 'UI.FieldGroupType',
        Data  : [
            {
                $Type : 'UI.DataField',
                Label : 'Action Name',
                Value : name,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Description',
                Value : descr,
            },
            {
                $Type : 'UI.DataField',
                Value : actionCategory_id,
                Label : 'Category',
            },
            {
                $Type : 'UI.DataField',
                Value : type_ID,
                Label : 'Action Type',
            },
        ],
    },
    UI.Facets                      : [
        {
            $Type  : 'UI.ReferenceFacet',
            ID     : 'BasicFacet',
            Label  : 'Basic Information',
            Target : '@UI.FieldGroup#GeneratedGroup1',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'HTTP Information',
            ID : 'HTTPInformation',
            Target : '@UI.FieldGroup#HTTPInformation',
        },
        {
            $Type  : 'UI.ReferenceFacet',
            Label  : 'Related Actions',
            ID     : 'Childctions',
            Target : 'childActions/@UI.LineItem#ChildActions',
            ![@UI.Hidden] : hideChildActions
        },
    ]
);

annotate service.Actions with {
    method @Common.Text : {
        $value                 : method.name,
        ![@UI.TextArrangement] : #TextOnly,
    }
};

annotate service.Actions with @(UI.SelectionPresentationVariant #table : {
    $Type               : 'UI.SelectionPresentationVariantType',
    PresentationVariant : {
        $Type          : 'UI.PresentationVariantType',
        Visualizations : ['@UI.LineItem', ],
    },
    SelectionVariant    : {
        $Type         : 'UI.SelectionVariantType',
        SelectOptions : [],
    },
});

annotate service.Actions with @(UI.HeaderInfo : {
    TypeName       : 'Action',
    TypeNamePlural : 'Actions',
    Description    : {
        $Type : 'UI.DataField',
        Value : descr,
    },
    TypeImageUrl   : '',
    Title          : {
        $Type : 'UI.DataField',
        Value : name,
    },
});

annotate service.prepostActions with @(UI.LineItem #ChildActions : [
    {
        $Type             : 'UI.DataField',
        Value             : ID,
        Label             : 'Relation ID',
        ![@UI.Importance] : #High,
    },
    {
        $Type             : 'UI.DataField',
        Value             : flowType_ID,
        Label             : 'Flow Type',
        ![@UI.Importance] : #High,
    },
    {
        $Type : 'UI.DataField',
        Value : action_ID,
        Label : 'Action',
    },
]);

annotate service.prepostActions with {
    flowType @Common.Text : {
        $value                 : flowType.flowName,
        ![@UI.TextArrangement] : #TextOnly,
    }
};

annotate service.prepostActions with {
    action @Common.Text : {
        $value                 : action.name,
        ![@UI.TextArrangement] : #TextOnly,
    }
};

annotate service.Actions with {
    dest @(
        Common.ValueList                : {
            $Type          : 'Common.ValueListType',
            CollectionPath : 'Destinations',
            Parameters     : [
                {
                    $Type             : 'Common.ValueListParameterInOut',
                    LocalDataProperty : dest,
                    ValueListProperty : 'name',
                },
                {
                    $Type : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty : 'descr',
                },
                {
                    $Type             : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty : 'auth',
                },
            ]
        },
        Common.ValueListWithFixedValues : false
    )
};

annotate service.Destinations with {
    name @Common.Text : descr
};

annotate service.Actions with {
    contentType @(
        Common.ValueList                : {
            $Type          : 'Common.ValueListType',
            CollectionPath : 'ContentTypes',
            Parameters     : [{
                $Type             : 'Common.ValueListParameterInOut',
                LocalDataProperty : contentType_id,
                ValueListProperty : 'id',
            }, ],
        },
        Common.ValueListWithFixedValues : true
    )
};

annotate service.ContentTypes with {
    id @Common.Text : {
        $value                 : descr,
        ![@UI.TextArrangement] : #TextLast,
    }
};

annotate service.Actions with {
    contentType @Common.Text : {
        $value                 : contentType.descr,
        ![@UI.TextArrangement] : #TextLast,
    }
};

annotate service.Actions with {
    payload @UI.MultiLineText : true
};

annotate service.Actions with @(UI.Identification : []);

annotate service.prepostActions with @(
    UI.Facets                       : [{
        $Type  : 'UI.ReferenceFacet',
        Label  : 'Basic Information',
        ID     : 'BasicInformation',
        Target : '@UI.FieldGroup#BasicInformation',
    }, ],
    UI.FieldGroup #BasicInformation : {
        $Type : 'UI.FieldGroupType',
        Data  : [
            {
                $Type : 'UI.DataField',
                Value : ID,
                Label : 'ID',
            },
            {
                $Type : 'UI.DataField',
                Value : flowType_ID,
                Label : 'flowType_ID',
            },
            {
                $Type : 'UI.DataField',
                Value : action_ID,
                Label : 'action_ID',
            },
        ],
    }
);

annotate service.prepostActions with {
    flowType @(
        Common.ValueList                : {
            $Type          : 'Common.ValueListType',
            CollectionPath : 'flowTypes',
            Parameters     : [
                {
                    $Type             : 'Common.ValueListParameterInOut',
                    LocalDataProperty : flowType_ID,
                    ValueListProperty : 'ID',
                },
                {
                    $Type             : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty : 'flowId',
                },
            ],
        },
        Common.ValueListWithFixedValues : true
    )
};

annotate service.flowTypes with {
    ID @Common.Text : flowName
};

annotate service.prepostActions with {
    action @(
        Common.ValueList                : {
            $Type          : 'Common.ValueListType',
            CollectionPath : 'NonQueueActions',
            Parameters     : [{
                $Type             : 'Common.ValueListParameterInOut',
                LocalDataProperty : action_ID,
                ValueListProperty : 'ID',
            }, {
                    $Type             : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty : 'name',
                } ],
        },
        Common.ValueListWithFixedValues : false
    )
};

annotate service.Actions with {
    ID @Common.Text : name
};

annotate service.NonQueueActions with {
    ID @Common.Text : name
};

annotate service.Actions with {
    type @Common.Text : {
            $value : type.name,
            ![@UI.TextArrangement] : #TextOnly,
        }
};

annotate service.Actions with {
    type @(
        Common.ValueList                : {
            $Type          : 'Common.ValueListType',
            CollectionPath : 'Types',
            Parameters     : [{
                $Type             : 'Common.ValueListParameterInOut',
                LocalDataProperty : type_ID,
                ValueListProperty : 'ID',
            },
                {
                    $Type : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty : 'descr',
                }, ],
        },
        Common.ValueListWithFixedValues : false
    )
};


annotate service.Actions with @(UI.SelectionPresentationVariant #table1 : {
    $Type               : 'UI.SelectionPresentationVariantType',
    PresentationVariant : {
        $Type          : 'UI.PresentationVariantType',
        Visualizations : ['@UI.LineItem', ],
    },
    SelectionVariant    : {
        $Type         : 'UI.SelectionVariantType',
        SelectOptions : [],
    },
});
annotate service.Actions with {
    method @(Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'Methods',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : method_ID,
                    ValueListProperty : 'ID',
                },
            ],
        },
        Common.ValueListWithFixedValues : true
)};
annotate service.Actions with {
    name @Common.FieldControl : #Mandatory
};
annotate service.Actions with {
    dest @Common.FieldControl : #Mandatory
};
annotate service.Actions with {
    url @Common.FieldControl : #Mandatory
};
annotate service.Actions with {
    method @Common.FieldControl : #Mandatory
};
annotate service.Actions with {
    contentType @Common.FieldControl : #Mandatory
};
annotate service.Actions with @(
    UI.FieldGroup #HTTPInformation : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'Destination',
                Value : dest,
            },
            {
                $Type : 'UI.DataField',
                Label : 'URL',
                Value : url,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Content Type',
                Value : contentType_id,
            },
            {
                $Type : 'UI.DataField',
                Value : method_ID,
                Label : 'Method',
            },
            {
                $Type : 'UI.DataField',
                Label : 'Relative Path',
                Value : path,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Payload',
                Value : payload,
            },
            {
                $Type : 'UI.DataField',
                Value : defaultActionIdPath,
                Label : 'Action Id Path in Response',
                ![@UI.Hidden] : hideDefaultActionIdPath
            },
            {
                $Type : 'UI.DataField',
                Value : isCsrfTokenNeeded,
                Label : 'Is Csrf Token Needed?',
            },],
    }
);
annotate service.Actions with {
    actionCategory @Common.Text : {
            $value : actionCategory.descr,
            ![@UI.TextArrangement] : #TextOnly,
        }
};
annotate service.Actions with {
    actionCategory @(Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'ActionCategories',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : actionCategory_id,
                    ValueListProperty : 'id',
                },
            ],
        },
        Common.ValueListWithFixedValues : true
)};
annotate service.ActionCategories with {
    id @Common.Text : {
        $value : descr,
        ![@UI.TextArrangement] : #TextOnly,
    }
};
annotate service.Actions with {
    actionCategory @Common.FieldControl : #Mandatory
};
