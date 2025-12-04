/**
 * Created by syb on 2022/04/13.
 */
Ext.define('MyApp.model.dktj.SpecialAccountType', {
    extend: 'Ext.data.Model',

    requires: [
        // 'Ext.data.validator.Length',
        // 'Ext.data.validator.Presence'
    ],

    identifier: 'negative',

    idProperty: 'id',

    fields: [
        {name: 'id', type: 'int', allowNull: true},
        {name: 'name', type: 'string'},
        {name: 'enName', type: 'string'},
        {name: 'validFlag', type: 'boolean'}
    ]
});