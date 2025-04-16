
Ext.define('MyApp.view.cktj.EmployeeAccountList',{
    extend: 'Ext.panel.Panel',
    xtype: 'cktjemployeeaccount',

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
        Ext.log('EmployeeAccount view initComponent');
        
        var me = this;

        //表格的数据存储器
        var dataStore = null;
        dataStore = me.getViewModel().getStore('employeeAccountStore');

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
            moduleId: 'list',
            store: dataStore
        });

        this.callParent(arguments);
    }
});
