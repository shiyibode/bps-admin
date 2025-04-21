Ext.define('MyApp.view.sys.Menu', {
    extend: 'Ext.panel.Panel',
    xtype: 'sysmenu',

    requires: [
        'Ext.layout.container.Border',
        'MyApp.view.sys.MenuController',
        'MyApp.view.sys.MenuModel',
        'MyApp.view.sys.widget.MenuWindow',
        'MyApp.view.sys.widget.MenuGrid'
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
    }
],

    initComponent: function () {
        var me = this;

        // me.items = [];
        // me.items.push({
        //     region: 'center',
        //     xtype: 'grid',
        //     bind: {
        //         title: me.title + '{selectionText}'
        //     },
        //     permissiveOpts: me.permissiveOpts
        // }
        // , {
        //     region: 'east',
        //     xtype: 'menudetail',
        //     width: 400,
        //     title: '记录明细',
        //     split: true,
        //     collapsible: true,
        //     collapsed: true,
        //     collapseMode: 'mini'
        // }
        // , {
        //     //Menu 添加、修改、查看对话框
        //     xtype: 'menuwindow'
        // }
        // );

        this.callParent(arguments);
    }
});
