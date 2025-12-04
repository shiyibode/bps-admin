/**
 * Created by syb on 2021/08/03.
 */
Ext.define('MyApp.model.dktj.EmployeeRelation', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.validator.Length',
        // 'Ext.data.validator.Presence'
    ],

    identifier: 'negative',

    idProperty: 'id',

    fields: [
        {name: 'id', type: 'int', allowNull: true},
        {name: 'name', type: 'string'},
        {name: 'identityNo', type: 'string'},
        {name: 'relation', type: 'string'},
        {name: 'relativeName', type: 'string'},
        {name: 'relativeIdentityNo', type: 'string'},
        {name: 'mainStockHolder', type: 'string'},
        {name: 'netCapital', type: 'float'},
        {name: 'remarks', type: 'string'}
    ],

    validators: {
        relativeIdentityNo: [{
            type: 'length',
            min: 18
        }]
    }
});