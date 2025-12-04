/**
 * create by syb on 2019-10-14
 */
Ext.define('MyApp.view.dktj.CustomerProperty',{
    extend: 'Ext.panel.Panel',
    xtype: 'dktjcustomerproperty',

    requires: [
        'Ext.layout.container.Border',
        'MyApp.view.dktj.CustomerPropertyController',
        'MyApp.view.dktj.CustomerPropertyModel',
        'MyApp.view.dktj.widget.CustomerPropertyGrid'
    ],

    controller: 'dktjcustomerproperty',
    viewModel: {
        type: 'dktjcustomerproperty'
    },

    // session: true,

    frame : false,
    border : false,
    layout : 'border',

    initComponent: function() {
        let me = this;

        //表格的数据存储器
        let dataStore;
        dataStore = me.getViewModel().getStore('customerPropertyStore');

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
            xtype : 'customerpropertygrid',
            bind: {
                title: me.title + '{selectionText}'
            },
            permissiveOpts: me.permissiveOpts,
            moduleId: me.moduleId,
            store: dataStore
        }
        //     {
        //     region : 'east',
        //     xtype : 'EmployeeCustomerdetail',
        //     width : 400,
        //     title : '记录明细',
        //     split : true,
        //     collapsible : true,
        //     collapsed : true,
        //     collapseMode : 'mini'
        // },
            );

        // dataStore.load();
        this.callParent(arguments);
    }
});
