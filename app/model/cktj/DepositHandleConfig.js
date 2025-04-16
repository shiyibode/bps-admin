
Ext.define('MyApp.model.cktj.DepositHandleConfig', {
    extend: 'MyApp.model.BaseDataModel',

    alias: 'model.cktjdeposithandleconfig',

    requires: [
        'Ext.data.validator.Length',
        'Ext.data.validator.Presence'
    ],

    entityName: 'cktj/deposithandleconfig',

    fields: [
        {name: 'orgCode', type: 'string'},
        {name: 'dpCurrDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'dpNextDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'dpHzCurrDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'dpHzNextDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'isNewRecord', type: 'boolean', defaultValue: true}
    ],

    validators: {
        orgCode: [{
            type: 'presence', message: '机构不能为空'
        }],

        dpNextDate: [{
            type: 'presence', message: '下次统计存款的日期不能为空'
        }],

        prvisnIntNextDate: [{
            type: 'presence', message: '下次统计计提利息的日期不能为空'
        }],

        payIntNextDate: [{
            type: 'presence', message: '下次统计兑付利息的日期不能为空'
        }],
    }
});