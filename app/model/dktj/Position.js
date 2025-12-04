/**
 * Created by syb on 2022/04/01.
 */
Ext.define('MyApp.model.dktj.Position', {
    extend: 'Ext.data.Model',

    requires: [
        // 'Ext.data.validator.Length',
        // 'Ext.data.validator.Presence'
    ],

    identifier: 'negative',

    idProperty: 'id',

    fields: [
        {name: 'id', type: 'int', allowNull: true, default: null},
        {name: 'name', type: 'string'}
    ]
});