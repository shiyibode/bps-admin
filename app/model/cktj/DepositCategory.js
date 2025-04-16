
Ext.define('MyApp.model.cktj.DepositCategory', {
    extend: 'MyApp.model.BaseDataModel',

    alias: 'model.cktjdepositcategory',

    requires: [
        'Ext.data.validator.Length',
        'Ext.data.validator.Presence'
    ],

    entityName: 'cktj/depositcategory',

    fields: [
        {name: 'parentId', type: 'int'},
        {name: 'no', type: 'string'},
        {name: 'name', type: 'string'},
        {name: 'depositType', type: 'string'},
        {name: 'customerType', type: 'string'},
        {name: 'customerSubType', type: 'string'},
        {name: 'accountType', type: 'string'},
        {name: 'belongTo', type: 'string'},
        {name: 'subjectNo', type: 'auto', defaultValue: []},
        {name: 'columnGroupFlag', type: 'boolean', defaultValue: true},
        {name: 'intoTotalFlag', type: 'boolean', defaultValue: true},
        {name: 'subtotalFlag', type: 'boolean', defaultValue: false},
        {name: 'prvisnIntFlag', type: 'boolean', defaultValue: true},
        {name: 'payIntFlag', type: 'boolean', defaultValue: true},
        {name: 'validFlag', type: 'boolean', defaultValue: true},
        {name: 'remarks', type: 'string'},
        {name: 'sort', type: 'int'},
        {name: 'isNewRecord', type: 'boolean', defaultValue: true}
    ],

    validators: {
        parentId: [{
            type: 'presence', message: '必须选择上级分类'
        }],

        name: [{
            type: 'presence', message: '必须填写分类名称'
        }, {
            type: 'length', min: 2, minOnlyMessage: '最小长度必须大于2'
        }],

        depositType: [{
            type: 'presence', message: '必须填写选择存款类型'
        }]

        // customerType: [{
        //     type: 'presence', message: '必须填写选择分类类型'
        // }],
        //
        // customerSubType: [{
        //     type: 'presence', message: '必须填写分类目标'
        // }]

        // subjectNo: [{
        //     type: 'presence', message: '必须选择科目'
        // }, {
        //     type: 'length', min: 2, minOnlyMessage: '最小长度必须大于2'
        // }]
    }
});