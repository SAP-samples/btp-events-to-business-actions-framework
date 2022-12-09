using AdminService as service from '../../srv/admin-service';

annotate service.Types with @(
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Value : name,
            Label : 'Name',
            ![@UI.Importance] : #High,
        },
        {
            $Type : 'UI.DataField',
            Value : descr,
            Label : 'Description',
            ![@UI.Importance] : #High,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Content Type',
            Value : contentType_id,
            ![@UI.Importance] : #Medium,
        },
        {
            $Type : 'UI.DataField',
            Value : method_ID,
            Label : '{@i18n>MethodId}',
            ![@UI.Importance] : #Medium,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Path',
            Value : path,
            ![@UI.Importance] : #Low,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Payload',
            Value : payload,
            ![@UI.Importance] : #Low,
        },
    ]
);
annotate service.Types with @(
    UI.FieldGroup #GeneratedGroup1 : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : contentType_id,
                Label : '{@i18n>ContentTypeId}',
            },
            {
                $Type : 'UI.DataField',
                Value : method_ID,
                Label : '{@i18n>MethodId}',
            },
            {
                $Type : 'UI.DataField',
                Label : '{@i18n>TypePath}',
                Value : path,
            },
            {
                $Type : 'UI.DataField',
                Label : '{@i18n>TypePayload}',
                Value : payload,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Basic Information',
            ID : 'BasicInformation',
            Target : '@UI.FieldGroup#BasicInformation',
        },
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'HTTP Information',
            Target : '@UI.FieldGroup#GeneratedGroup1',
        },
    ]
);
annotate service.Types with @(
    UI.HeaderInfo : {
        TypeName : 'Action Type',
        TypeNamePlural : 'Action Types',
        Title : {
            $Type : 'UI.DataField',
            Value : ID,
        },
        Description : {
            $Type : 'UI.DataField',
            Value : name,
        },
    }
);
annotate service.Types with {
    name @Common.FieldControl : #Mandatory
};
annotate service.Types with {
    payload @UI.MultiLineText : true
};
annotate service.Types with {
    method @Common.Text : {
            $value : method.name,
            ![@UI.TextArrangement] : #TextOnly,
        }
};
annotate service.Types with {
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
annotate service.Methods with {
    ID @Common.Text : name
};



annotate service.Types with {
    contentType @(Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'ContentTypes',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : contentType_id,
                    ValueListProperty : 'id',
                },
            ],
        },
        Common.ValueListWithFixedValues : true
)};
annotate service.Types with {
    ID @Common.Text : {
            $value : name,
            ![@UI.TextArrangement] : #TextOnly,
        }
};
annotate service.Types with @(
    UI.FieldGroup #BasicInformation : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : '{@i18n>TypeName}',
                Value : name,
            },
            {
                $Type : 'UI.DataField',
                Label : '{@i18n>TypeDescr}',
                Value : descr,
            },],
    }
);
