/**
 * Created by syb on 2019/10/14.
 */
Ext.define('MyApp.model.dktj.EmployeeCustomer', {
    extend: 'Ext.data.Model',

    requires: [
        // 'Ext.data.validator.Length',
        // 'Ext.data.validator.Presence'
    ],

    identifier: 'negative',

    idProperty: 'id',

    fields: [
        {name: 'id', type: 'int', allowNull: true},
        {name: 'orgCode', type: 'string'},
        {name: 'customerNo', type: 'string'},
        {name: 'accountNo', type: 'string'},
        {name: 'customerName', type: 'string'},
        {name: 'customerType', type: 'string'},
        {name: 'identityType', type: 'string'},
        {name: 'identityNo', type: 'string'},
        {name: 'endDate', type: 'string'},
        {name: 'tellerCode', type: 'string'},
        {name: 'startDate', type: 'string'},
        {name: 'endDate', type: 'string'},
        {name: 'opTellerCode', type: 'string'},
        {name: 'createTime', type: 'string'},
        {name: 'checkTellerCode', type: 'string'},
        {name: 'checkTime', type: 'string'},
        {name: 'registerType', type: 'int'},
        {name: 'status', type: 'string'},
        {name: 'validFlag', type: 'boolean'},
        {name: 'organizationName', type: 'string'},
        {name: 'xdCustomerNo', type: 'string'},
        {name: 'tellerName', type: 'string'},
        {name: 'tellerOrgCode', type: 'string'},
        {name: 'tellerOrgName', type: 'string'},
        {name: 'hxCustomerNo', type: 'string'},
        {name: 'flagStr', type: 'string'},
        {name: 'checkStatus', type: 'string'}
    ]
});