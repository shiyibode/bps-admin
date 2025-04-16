Ext.define('MyApp.model.sys.Role', {
    extend: 'MyApp.model.BaseDataModel',

    alias: 'model.sysrole',

    entityName: 'sys/role',

    fields: [
        {name: 'id', type: 'int'},
        {name: 'moduleId', type: 'int'},
        {name: 'name', type: 'string'},
        {name: 'enname', type: 'string'},
        {name: 'roleType', type: 'string', defaultValue: null},
        {name: 'dataScope', type: 'int', defaultValue: null},
        {name: 'sysData', type: 'boolean', defaultValue: true},
        {name: 'useable', type: 'boolean', defaultValue: true},
        {name: 'isNewRecord', type: 'boolean', defaultValue: true},
        {name: 'menuIdList', type: 'auto', defaultValue: []},
        {name: 'organizationIdList', type: 'auto'}
    ],

    validators: {
        // moduleId: [{
        //     type: 'presence', message: '必须选择角色所属模块'
        // }],

        name: [{
            type: 'presence', message: '必须输入角色名称'
        }, {
            type: 'length', min: 2, minOnlyMessage: '角色名称的长度不小于2'
        }],

        // roleType: [{
        //     type: 'presence', message: '必须角色类型'
        // }],

        // dataScope: [{
        //     type: 'presence', message: '必须角色数据范围'
        // }],

        menuIdList: [{
            type: 'presence', message: '必须选择角色菜单'
        }, {
            type: 'length', min: 1, minOnlyMessage: '角色至少需要有一个菜单'
        }]
    }
});