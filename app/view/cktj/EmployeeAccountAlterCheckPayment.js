
Ext.define('MyApp.view.cktj.EmployeeAccountAlterCheckPayment',{
    extend: 'Ext.panel.Panel',
    xtype: 'cktjemployeeaccountaltercheckpayment',

    requires: [
        'Ext.layout.container.Border',
        'MyApp.view.cktj.widget.EmployeeAccountGrid'
    ],

    controller: 'cktjemployeeaccount',
    viewModel: {
        type: 'cktjemployeeaccount'
    },

    width: 500,
    height: 700,
    layout : 'border',

    initComponent: function() {
        var me = this;

        //表格的数据存储器
        var dataStore = null;
        dataStore = me.getViewModel().getStore('paymentModifiedUncheckedAccountStore');

        me.items = [];
        me.items.push({
            region : 'west',
            xtype : 'navigationtree',
            title: '机构信息',
            bind: {
                store: '{organizationStore}'
            },
            width: 220
        }, {
            region : 'center',
            xtype : 'employeeaccountgrid',
            bind: {
                title: '变更复核'+'{selectionText}'
            },
            // permissiveOpts: me.permissiveOpts,
            moduleId: 'alterCheckPayment',
            store: dataStore
        });

        this.callParent(arguments);
    }
});
