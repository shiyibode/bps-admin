/**
 * Created by syb on 2021/03/22.
 */
Ext.define('MyApp.model.dktj.Template', {
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
        {name: 'sort', type: 'int'},
        {name: 'validFlag', type: 'boolean'},
        {name: 'createTime', type: 'string'}
    ]
});