/**
 * Created by syb on 2021/03/22.
 */
Ext.define('MyApp.model.dktj.TemplateDetail', {
    extend: 'Ext.data.Model',

    requires: [
        // 'Ext.data.validator.Length',
        // 'Ext.data.validator.Presence'
    ],

    identifier: 'negative',

    idProperty: 'id',

    fields: [
        {name: 'id', type: 'int', allowNull: true},
        {name: 'templateId', type: 'int'},
        {name: 'positionId', type: 'int'},
        {name: 'percentage', type: 'float'},
        {name: 'remarks', type: 'string'},
        {name: 'positionName', type: 'string'},
        {name: 'tellerCode', type: 'string'}
    ]
});