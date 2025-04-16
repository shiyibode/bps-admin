Ext.define('MyApp.model.sys.Module', {
    extend: 'Ext.data.Model',

    alias: 'model.Module',
    schema: {
        namespace: 'MyApp.model'
    },

    idProperty: 'id',

    
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
        {name: 'isNewRecord', type: 'boolean', defaultValue: true},
        {
            name: 'expanded',
            convert: function(v,record) {
                return true
            }
        }
    ],

    


});
