/**
 * create by syb on 2025-12-13
 */
Ext.define('MyApp.view.dktj.EmployeeCustomerAlter',{
    extend: 'Ext.panel.Panel',
    xtype: 'dktjemployeecustomeralter',

    requires: [
        'Ext.layout.container.Border',
        'MyApp.view.dktj.EmployeeCustomerController',
        'MyApp.view.dktj.EmployeeCustomerModel',
        'MyApp.view.dktj.widget.EmployeeCustomerGrid',
        'MyApp.view.dktj.widget.RegEmployeeWindow',
        'MyApp.view.dktj.widget.ModifyEmployeeWindow'
    ],

    controller: 'dktjemployeecustomer',
    viewModel: {
        type: 'dktjemployeecustomer'
    },

    // session: true,

    // frame : false,
    // border : false,
    width: 500,
    height: 700,
    layout : 'border',

    initComponent: function() {
        var moduleId = Ext.util.Cookies.get('currentMenuId');
        var me = this;

        //表格的数据存储器
        var dataStore = me.getViewModel().getStore('modifiableCustomerStore');

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
            xtype : 'employeecustomergrid',
            bind: {
                title: '{selectionText}'
            },
            permissiveOpts: me.permissiveOpts,
            moduleId: moduleId,
            store: dataStore
        }, {
            //变更揽储人窗口
            xtype: 'dktjmodifyemployeewindow'
        }
    );

        this.callParent(arguments);
    }
});
