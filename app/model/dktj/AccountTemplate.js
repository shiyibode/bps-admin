/**
 * Created by syb on 2022/08/05.
 */
Ext.define('MyApp.model.dktj.AccountTemplate', {
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
        {name: 'accountNo', type: 'string'},
        {name: 'startDate', type: 'string'},
        {name: 'endDate', type: 'string'},
        {name: 'orgCode', type: 'string'},
        {name: 'customerName', type: 'string'},
        {name: 'accountOpenDate', type: 'string'},
        {name: 'identityNo', type: 'string'},
        {name: 'xdCustomerNo', type: 'string'},
        {name: 'templateName', type: 'string'},
        {name: 'employeeCustomerId', type: 'int'},
        {name: 'createTime', type: 'string'}
    ]
});