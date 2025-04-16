Ext.define('MyApp.model.BaseDataModel', {
    extend: 'Ext.data.Model',

    requires: [
        'MyApp.ux.data.proxy.Format',
        'Ext.data.identifier.Negative'
    ],

    identifier: 'negative',

    idProperty: 'id',

    fields: [
        {name: 'id', type: 'int', allowNull: true}
    ],

    schema: {
        namespace: 'MyApp.model',
        urlPrefix: CFG.getGlobalPath(),
        proxy: {
            type: 'format',

            api: {
                read: '{prefix}/{entityName:lowercase}/get',
                create: '{prefix}/{entityName:lowercase}/create',
                update: '{prefix}/{entityName:lowercase}/update',
                destroy: '{prefix}/{entityName:lowercase}/delete'
            }
        }
    }
});