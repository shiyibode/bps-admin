/**
 * Created by syb on 2021/05/11.
 */
Ext.define('MyApp.model.dktj.EmployeeInterestReadd', {
    extend: 'Ext.data.Model',

    requires: [
        // 'Ext.data.validator.Length',
        // 'Ext.data.validator.Presence'
    ],

    identifier: 'negative',

    idProperty: 'id',

    fields: [
        {name: 'id', type: 'int', allowNull: true},
        {name: 'accountNo', type: 'string'},
        {name: 'xdCustomerNo', type: 'string'},
        {name: 'accountOpenDate', type: 'string'},
        {name: 'customerName', type: 'string'},
        {name: 'orgCode', type: 'string'},
        {name: 'identityType', type: 'string'},
        {name: 'identityNo', type: 'string'},
        {name: 'customerType', type: 'string'},
        {name: 'customerTypeStr', type: 'string'},
        {name: 'orgName', type: 'string'},
        {name: 'tellerCode', type: 'string'}
    ]
});