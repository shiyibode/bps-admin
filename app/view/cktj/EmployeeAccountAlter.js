
Ext.define('MyApp.view.cktj.EmployeeAccountAlter',{
    extend: 'Ext.panel.Panel',
    xtype: 'cktjemployeeaccountalter',

    requires: [
        'Ext.layout.container.Border',
        'MyApp.view.cktj.widget.EmployeeAccountGrid',
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
        dataStore = me.getViewModel().getStore('modifiableAccountStore');

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
            moduleId: 'alter',
            store: dataStore
        }, {
            //变更揽储人窗口
            xtype: 'modifyemployeewindow'
        });

        this.callParent(arguments);
    }
});
