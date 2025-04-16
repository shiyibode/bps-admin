Ext.define('MyApp.model.sys.Organization', {
    extend: 'MyApp.model.BaseDataModel',

    alias: 'model.sysorganization',

    requires: [
        'Ext.data.validator.Length',
        'Ext.data.validator.Presence'
    ],

    entityName: 'sys/organization',

    fields: [
        {name: 'parentId', type: 'int', defaultValue: -1},
        {name: 'code', type: 'string'},
        {name: 'name', type: 'string'},
        {name: 'sort', type: 'int'},
        {name: 'iconCls', type: 'string'},
        {name: 'areaId', type: 'int', defaultValue: -1},
        {name: 'type', type: 'string'},
        {name: 'grade', type: 'string'},
        {name: 'address', type: 'string'},
        {name: 'zipCode', type: 'string'},
        {name: 'master', type: 'string'},
        {name: 'phone', type: 'string'},
        {name: 'fax', type: 'string'},
        {name: 'email', type: 'string'},
        {name: 'useable', type: 'string'},
        {name: 'primaryPerson', type: 'int'},
        {name: 'deputyPerson', type: 'int'},
        {name: 'remarks', type: 'string'},
        {name: 'isNewRecord', type: 'boolean', defaultValue: true}
    ],

    validators: {
        parentId: [{
            type: 'presence', message: '必须选择上级机构'
        }],

        code: [{
            type: 'presence', message: '必须填写机构编码'
        }, {
            type: 'length', min: 2, minOnlyMessage: '最小长度必须大于2'
        }],

        name: [{
            type: 'presence', message: '必须填写机构名称'
        }, {
            type: 'length', min: 2, minOnlyMessage: '最小长度必须大于2'
        }],

        type: [{
            type: 'presence', message: '必须填写选择机构类型'
        }]
    }
});