/**
 * create by syb on 2019-10-14
 */
Ext.define('MyApp.view.dktj.EmployeeCustomerDetail',{
    extend: 'Ext.panel.Panel',
    xtype: 'dktjemployeecustomerdetail',

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
        var dataStore = me.getViewModel().getStore('employeeCustomerStore');

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
        }
    );

        this.callParent(arguments);
    }
});
