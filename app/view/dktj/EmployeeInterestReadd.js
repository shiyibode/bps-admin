/**
 * create by syb on 2021-05-10
 */
Ext.define('MyApp.view.dktj.EmployeeInterestReadd',{
    extend: 'Ext.panel.Panel',
    xtype: 'dktjemployeeinterestreadd',

    requires: [
        'Ext.layout.container.Border',
        'MyApp.view.dktj.EmployeeInterestReaddController',
        'MyApp.view.dktj.EmployeeInterestReaddModel',
        'MyApp.view.dktj.widget.EmployeeInterestReaddGrid',
        'MyApp.view.dktj.widget.ReaddEmployeeInterestWindow'
    ],

    controller: 'dktjemployeeinterestreadd',
    viewModel: {
        type: 'dktjemployeeinterestreadd'
    },

    width: 500,
    height: 700,
    layout : 'border',

    initComponent: function() {
        let me = this;

        //表格的数据存储器
        let dataStore;
        dataStore = me.getViewModel().getStore('employeeInterestReaddStore');

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
                xtype : 'employeeinterestreaddgrid',
                bind: {
                    title: me.title + '{selectionText}'
                },
                permissiveOpts: me.permissiveOpts,
                moduleId: me.moduleId,
                store: dataStore
            },{
                //补登记分成规则窗口
                xtype: 'dktjreaddemployeeinterestwindow'
            }
        );

        this.callParent(arguments);
    }
});
