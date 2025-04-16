Ext.define('MyApp.view.sys.Role', {
    extend: 'Ext.panel.Panel',
    xtype: 'sysrole',

    requires: [
        'Ext.layout.container.Border',
        // 'MyApp.view.sys.RoleController',
        // 'MyApp.view.sys.RoleModel',
        'MyApp.view.sys.widget.RoleWindow',
        // 'MyApp.ux.NavigationTree',
        'MyApp.view.sys.widget.RoleGrid'
    ],

    controller: 'sysrole',
    viewModel: {
        type: 'sysrole'
    },

    // frame: false,
    border: true,
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    items:[
    //     {
    //     xtype: 'navigationtree',
    //     title: '系统模块',
    //     frame: true,

    //     bind: {
    //         store: '{navigationStore}'
    //     },
    //     width: 220
    // },
      {
        xtype: 'rolegrid',
        bind: {
            title: '角色管理' + '{selectionText}'
        },
        flex: 1
    }
    , {
        xtype: 'rolewindow'
    }
    // ,{
    //     xtype: 'roleapiwindow'
    // }
],

    initComponent: function () {
        var me = this;

        this.callParent(arguments);
    }
});
