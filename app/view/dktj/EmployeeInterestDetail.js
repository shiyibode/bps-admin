/**
 * create by syb on 2021-05-14
 */
Ext.define('MyApp.view.dktj.EmployeeInterestDetail',{
    extend: 'Ext.panel.Panel',
    xtype: 'dktjemployeeinterestdetail',

    requires: [
        'Ext.layout.container.Border',
        'MyApp.view.dktj.EmployeeInterestDetailController',
        'MyApp.view.dktj.EmployeeInterestDetailModel',
        'MyApp.view.dktj.widget.EmployeeInterestDetailGrid'
    ],

    controller: 'dktjemployeeinterestdetail',
    viewModel: {
        type: 'dktjemployeeinterestdetail'
    },

    width: 500,
    height: 700,
    layout : 'border',

    initComponent: function() {
        let me = this;

        //表格的数据存储器
        let dataStore;
        dataStore = me.getViewModel().getStore('employeeInterestDetailStore');

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
            xtype : 'employeeinterestdetailgrid',
            bind: {
                title: me.title + '{selectionText}'
            },
            permissiveOpts: me.permissiveOpts,
            moduleId: me.moduleId,
            store: dataStore
        });

        this.callParent(arguments);
    }
});
