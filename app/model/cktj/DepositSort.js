
Ext.define('MyApp.model.cktj.DepositSort', {
    extend: 'Ext.data.Model',

    identifier: 'negative',

    idProperty: 'id',

    fields: [
        {name: 'id', type: 'int'},
        {name: 'enName', type: 'string'},
        {name: 'cnName', type: 'string'},
        {name: 'validFlag', type: 'boolean'}
    ]
});