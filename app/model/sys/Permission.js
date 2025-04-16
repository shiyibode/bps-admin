Ext.define('MyApp.model.sys.Permission', {
    extend: 'MyApp.model.BaseDataModel',

    alias: 'model.syspermission',

    entityName: 'sys/permission',

    fields: [
        {name: 'roleId', type: 'int'},
        {name: 'roleName', type: 'string'},
        {name: 'apiId', type: 'int'},
        {name: 'apiName', type: 'string'},
        {name: 'apiUri', type: 'string'},
        {name: 'apiPermission', type: 'string'},
        {name: 'dataScope', type: 'string'},
        {name: 'dataScopeStr', type: 'string'},
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