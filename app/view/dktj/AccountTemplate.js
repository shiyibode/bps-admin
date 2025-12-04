/**
 * create by syb on 2022-08-05
 */
Ext.define('MyApp.view.dktj.AccountTemplate',{
    extend: 'Ext.panel.Panel',
    xtype: 'dktjaccounttemplate',

    requires: [
        'Ext.layout.container.Border',
        'MyApp.view.dktj.AccountTemplateController',
        'MyApp.view.dktj.AccountTemplateModel',
        'MyApp.view.dktj.widget.AccountTemplateGrid',
        'MyApp.view.dktj.widget.ModifyAccountTemplateWindow'
    ],

    controller: 'dktjaccounttemplate',
    viewModel: {
        type: 'dktjaccounttemplate'
    },

    // session: true,

    frame : false,
    border : false,
    layout : 'border',

    initComponent: function() {
        var me = this;

        //表格的数据存储器
        var dataStore = me.getViewModel().getStore('accountTemplateStore');


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
            xtype : 'accounttemplategrid',
            bind: {
                title: me.title + '{selectionText}'
            },
            permissiveOpts: me.permissiveOpts,
            moduleId: me.moduleId,
            store: dataStore
        },{
            //变更模板窗口
            xtype: 'dktjmodifyaccounttemplatewindow'
        });

        this.callParent(arguments);
    }
});
