/**
 * create by syb on 2021-05-21
 */
Ext.define('MyApp.view.dktj.PositionTeller',{
    extend: 'Ext.panel.Panel',
    xtype: 'dktjpositionteller',

    requires: [
        'Ext.layout.container.Border',
        'MyApp.view.dktj.PositionTellerController',
        'MyApp.view.dktj.PositionTellerModel',
        'MyApp.view.dktj.widget.PositionTellerGrid',
        'MyApp.view.dktj.widget.ModifyPositionTellerWindow'
    ],

    controller: 'dktjpositionteller',
    viewModel: {
        type: 'dktjpositionteller'
    },

    // session: true,

    width: 500,
    height: 700,
    layout : 'border',

    initComponent: function() {
        var me = this;

        //表格的数据存储器
        var dataStore = null;
        switch (me.moduleId) {
            //变更申请
            case 536:
                dataStore = me.getViewModel().getStore('positionTellerAlterStore');
                break;
            //变更复核
            case 538:
                dataStore = me.getViewModel().getStore('positionTellerUncheckStore');
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
            xtype : 'positiontellergrid',
            bind: {
                title: me.title + '{selectionText}'
            },
            permissiveOpts: me.permissiveOpts,
            moduleId: me.moduleId,
            store: dataStore
        }
        , {
            //变更揽储人窗口
            xtype: 'dktjmodifypositiontellerwindow'
        }
        );

        this.callParent(arguments);
    }
});
