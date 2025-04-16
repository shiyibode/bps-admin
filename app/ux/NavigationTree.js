Ext.define('MyApp.ux.NavigationTree', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.navigationtree',

    requires: [],

    iconCls: 'x-fa fa-list',
    // collapsible: true,
    split: true,
    columnLines: true,
    rootVisible: false,
    displayField: 'name',
    

    tools: [
        {
            type: 'refresh',
            tooltip: '刷新数据',
            handler: 'navigationTreeRefreshBtnClick'
        }
    ],

    reference: 'navigationtree',

    // bind: {
    //     store: '{navigationStore}'
    // },

    listeners: {
        selectionchange: 'onNavigationTreeSelectionChange'
    },


    initComponent: function () {
        var me = this;

        me.callParent(arguments);
    }
});