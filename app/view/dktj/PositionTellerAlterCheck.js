/**
 * create by syb on 2021-05-21
 */
Ext.define('MyApp.view.dktj.PositionTellerAlterCheck',{
    extend: 'Ext.panel.Panel',
    xtype: 'dktjpositiontelleraltercheck',

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
        var me = this,
            moduleId = Ext.util.Cookies.get('currentMenuId');


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
                store: '{positionTellerUncheckStore}',
                title: '岗位责任人' + '{selectionText}'
            },
            moduleId: moduleId
        });

        this.callParent(arguments);
    }
});
