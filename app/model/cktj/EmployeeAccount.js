
Ext.define('MyApp.model.cktj.EmployeeAccount', {
    extend: 'Ext.data.Model',

    requires: [
        // 'Ext.data.validator.Length',
        // 'Ext.data.validator.Presence'
    ],

    identifier: 'negative',

    idProperty: 'id',

    fields: [
        {name: 'id', type: 'int', allowNull: true},
        {name: 'depositAccountId', type: 'int'},
        {name: 'unboundAccountId'},
        {name: 'orgCode', type: 'string'},
        {name: 'accountNo', type: 'string'},
        {name: 'cardNo', type: 'string'},
        {name: 'closeAcctFlag', type: 'string'},
        {name: 'customerNo', type: 'string'},
        {name: 'customerName', type: 'string'},
        {name: 'customerType', type: 'string'},
        {name: 'identityType', type: 'string'},
        {name: 'identityNo', type: 'string'},
        {name: 'accountOpenDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'closeDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'accountType', type: 'string'},
        {name: 'tellerCode', type: 'string'},
        {name: 'startDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'endDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'opTellerCode', type: 'string'},
        {name: 'createTime', type: 'string'},
        {name: 'checkTellerCode', type: 'string'},
        {name: 'checkTime', type: 'string'},
        {name: 'registerType', type: 'int'},
        {name: 'status', type: 'int'},
        {name: 'userStatusStr', type: 'string'},
        {name: 'locked', type: 'boolean'}
    ]
});