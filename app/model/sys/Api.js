Ext.define('MyApp.model.sys.Api', {
    extend: 'MyApp.model.BaseDataModel',

    alias: 'model.sysapi',

    entityName: 'sys/api',

    fields: [
        {name: 'id', type: 'int'},
        {name: 'name', type: 'string'},
        {name: 'uri', type: 'string'},
        {name: 'permission', type: 'string', defaultValue: null},
        {name: 'remarks', type: 'string', defaultValue: null},
        {name: 'isNewRecord', type: 'boolean', defaultValue: true}
    ],

    validators: {
        uri: [{
            type: 'presence', message: '必须输入接口uri'
        }],

        name: [{
            type: 'presence', message: '必须输入接口名称'
        }, {
            type: 'length', min: 2, minOnlyMessage: '接口名称的长度不小于2'
        }],

        permission: [{
            type: 'presence', message: '必须角色的权限字段'
        }]        
    }
});