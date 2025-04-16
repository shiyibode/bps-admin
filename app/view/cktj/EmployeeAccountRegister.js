
Ext.define('MyApp.view.cktj.EmployeeAccountRegister',{
    extend: 'Ext.panel.Panel',
    xtype: 'cktjemployeeaccountregister',

    requires: [
        'Ext.layout.container.Border',
        'MyApp.view.cktj.widget.EmployeeAccountGrid',
        'MyApp.view.cktj.widget.RegEmployeeWindow',
        'MyApp.view.cktj.widget.ModifyEmployeeWindow'
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
        dataStore = me.getViewModel().getStore('unregisterAccountStore');


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
                title: '登记申请'+'{selectionText}'
            },
            permissiveOpts: me.permissiveOpts,
            moduleId: 'register',
            store: dataStore
        }, {
            //登记揽储人窗口
            xtype: 'regemployeewindow'
        }, {
            //变更揽储人窗口
            xtype: 'modifyemployeewindow'
        });

        this.callParent(arguments);
    }
});
