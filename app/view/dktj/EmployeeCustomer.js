/**
 * create by syb on 2019-10-14
 */
Ext.define('MyApp.view.dktj.EmployeeCustomer',{
    extend: 'Ext.panel.Panel',
    xtype: 'dktjemployeecustomer',

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
        var dataStore = null;
        switch (moduleId) {
            //登记申请
            case 502:
                dataStore = me.getViewModel().getStore('unregisterCustomerStore');
                break;
            //登记复核
            case 504:
                dataStore = me.getViewModel().getStore('registerUncheckedCustomerStore');
                break;
            //变更申请
            case 507:
                dataStore = me.getViewModel().getStore('modifiableCustomerStore');
                break;
            //变更复核
            case 509:
                dataStore = me.getViewModel().getStore('modifiedUncheckedCustomerStore');
                break;
            //维护人贷款客户
            case 512:
                dataStore = me.getViewModel().getStore('employeeCustomerStore');
                break;
        };

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
                title: me.title + '{selectionText}'
            },
            permissiveOpts: me.permissiveOpts,
            moduleId: moduleId,
            store: dataStore
        }, {
            //登记揽储人窗口
            xtype: 'dktjregemployeewindow'
        }, {
            //变更揽储人窗口
            xtype: 'dktjmodifyemployeewindow'
        }
    );

        this.callParent(arguments);
    }
});
