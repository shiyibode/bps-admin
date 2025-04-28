Ext.define('MyApp.view.sys.RoleMenu', {
    extend: 'Ext.panel.Panel',
    xtype: 'sysrolemenu',

    requires: [
        'MyApp.view.sys.RoleMenuController',
        'MyApp.view.sys.RoleMenuModel',
        'MyApp.view.sys.widget.RoleMenuGrid'
    ],

    controller: 'sysrolemenu',
    viewModel: {
        type: 'sysrolemenu'
    },

    frame: false,

    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    items:[{
        xtype: 'rolemenugrid',
        bind:{
            title: '角色菜单管理'+'{selectionText}'
        },
        flex: 1
    }],

    initComponent: function () {
        var me = this;

        this.callParent(arguments);
    }

});
