/**
 * Created by syb on 2021/04/25.
 */
Ext.define('MyApp.model.dktj.CustomerProperty', {
    extend: 'Ext.data.Model',

    requires: [],

    identifier: 'negative',

    idProperty: 'id',

    fields: [
        {name: 'id', type: 'int', allowNull: true},
        {name: 'xdCustomerNo', type: 'string'},
        {name: 'customerName', type: 'string'},
        {name: 'customerType', type: 'string'},
        {name: 'identityType', type: 'string'},
        {name: 'identityNo', type: 'string'},
        {name: 'startDate', type: 'date',dateFormat:'Y-m-d'},
        {name: 'endDate', type: 'date',dateFormat:'Y-m-d'},
        {name: 'date', type: 'string'},
        {name: 'createTime', type: 'string'},
        {name: 'remarks', type: 'string'},
        {name: 'status', type: 'string'},
        {name: 'statusFlag', type: 'string'}
    ]
});