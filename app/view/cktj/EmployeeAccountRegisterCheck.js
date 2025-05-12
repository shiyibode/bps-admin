
Ext.define('MyApp.view.cktj.EmployeeAccountRegisterCheck',{
    extend: 'Ext.panel.Panel',
    xtype: 'cktjemployeeaccountcheck',

    requires: [
        'Ext.layout.container.Border',
        'MyApp.view.cktj.widget.EmployeeAccountGrid',
        'MyApp.view.cktj.widget.RegEmployeeWindow'
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
        dataStore = me.getViewModel().getStore('registerUncheckedAccountStore');

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
                title: '登记复核'+'{selectionText}'
            },
            permissiveOpts: me.permissiveOpts,
            moduleId: 'check',
            store: dataStore
        }, {
            //登记揽储人窗口
            xtype: 'regemployeewindow'
        });

        this.callParent(arguments);
    }
});
