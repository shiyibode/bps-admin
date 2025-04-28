Ext.define('MyApp.model.sys.RoleMenu', {
    extend: 'MyApp.model.BaseDataModel',

    alias: 'model.rolemenu',

    entityName: 'sys/rolemenu',

    fields: [
        {name: 'roleId', type: 'int'},
        {name: 'roleName', type: 'string'},
        {name: 'menuId', type: 'int'},
        {name: 'menuName', type: 'string'},
        {name: 'menuTarget', type: 'string'},
        {name: 'menuIcon', type: 'string'}
    ]
});