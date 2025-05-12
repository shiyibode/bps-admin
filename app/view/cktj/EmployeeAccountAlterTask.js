
Ext.define('MyApp.view.cktj.EmployeeAccountAlterTask',{
    extend: 'Ext.panel.Panel',
    xtype: 'cktjemployeeaccountaltertask',

    requires: [
        'Ext.layout.container.Border',
        'MyApp.view.cktj.widget.EmployeeAccountGrid',
        'MyApp.view.cktj.widget.ModifyEmployeeTaskWindow'
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
        dataStore = me.getViewModel().getStore('taskModifiableAccountStore');

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
                title: '变更申请'+'{selectionText}'
            },
            moduleId: 'alterTask',
            store: dataStore
        }, {
            //变更揽储人窗口
            xtype: 'modifyemployeetaskwindow'
        });

        this.callParent(arguments);
    }
});
