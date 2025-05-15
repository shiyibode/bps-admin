
Ext.define('MyApp.view.cktj.EmployeeAccountListTask',{
    extend: 'Ext.panel.Panel',
    xtype: 'cktjemployeeaccounttask',

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
        dataStore = me.getViewModel().getStore('taskEmployeeAccountStore');

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
                title: '揽储人账户'+'{selectionText}'
            },
            permissiveOpts: me.permissiveOpts,
            moduleId: 'listTask',
            store: dataStore
        });

        this.callParent(arguments);
    }
});
