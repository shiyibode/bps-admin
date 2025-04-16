Ext.define('MyApp.model.sys.Menu', {
    extend: 'MyApp.model.BaseDataModel',

    alias: 'model.sysmenu',

    requires: [
        'Ext.data.validator.Length',
        'Ext.data.validator.Presence'
    ],

    entityName: 'sys/menu',

    fields: [
        {name: 'parentId', type: 'int'},
        {name: 'name', type: 'string'},
        {name: 'sort', type: 'int'},
        {name: 'type', type: 'string'},
        {name: 'uri', type: 'string'},
        {name: 'target', type: 'string'},
        {name: 'iconCls', type: 'string'},
        {name: 'isShow', type: 'string', defaultValue: '1'},
        {name: 'permission', type: 'string'},
        {name: 'description', type: 'string'},
        {name: 'remarks', type: 'string'},
        {name: 'isNewRecord', type: 'boolean', defaultValue: true}
    ],

    validators: {
        parentId: [{
            type: 'presence', message: '必须选择上级菜单'
        }],

        name: [{
            type: 'presence', message: '必须填写菜单名称'
        }, {
            type: 'length', min: 2, minOnlyMessage: '最小长度必须大于2'
        }],

        type: [{
            type: 'presence', message: '必须填写选择菜单类型'
        }],

        target: [{
            type: 'presence', message: '必须填写菜单目标'
        }, {
            type: 'length', min: 2, minOnlyMessage: '最小长度必须大于2'
        }],

        permission: [{
            type: 'presence', message: '必须填写菜单权限'
        }, {
            type: 'length', min: 2, minOnlyMessage: '最小长度必须大于2'
        }]
    }
});