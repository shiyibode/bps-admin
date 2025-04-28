Ext.define('MyApp.view.sys.Menu', {
    extend: 'Ext.panel.Panel',
    xtype: 'sysmenu',

    requires: [
        'Ext.layout.container.Border',
        'MyApp.view.sys.MenuController',
        'MyApp.view.sys.MenuModel',
        'MyApp.view.sys.widget.MenuWindow',
        'MyApp.view.sys.widget.MenuEditWindow',
        'MyApp.view.sys.widget.MenuGrid',
        'MyApp.view.sys.widget.MenuBindToRoleWindow'
    ],

    controller: 'sysmenu',
    viewModel: {
        type: 'sysmenu'
    },

    // session: true,

    frame: false,

    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    items:[{
        xtype: 'menugrid',
        bind:{
            title: '菜单管理'+'{selectionText}'
        },
        flex: 1
    }
    ,{
        xtype: 'menuwindow'
    },{
        xtype: 'menubindtorolewindow'
    },{
        xtype: 'menueditwindow'
    }
],

    initComponent: function () {
        var me = this;

        this.callParent(arguments);
    }
});
