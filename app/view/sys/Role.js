Ext.define('MyApp.view.sys.Role', {
    extend: 'Ext.panel.Panel',
    xtype: 'sysrole',

    requires: [
        'Ext.layout.container.Border',
        'MyApp.view.sys.RoleController',
        'MyApp.view.sys.RoleModel',
        'MyApp.view.sys.widget.RoleWindow',
        'MyApp.view.sys.widget.RoleEditWindow',
        'MyApp.view.sys.widget.RoleGrid'
    ],

    controller: 'sysrole',
    viewModel: {
        type: 'sysrole'
    },

    border: true,
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    items:[
      {
        xtype: 'rolegrid',
        bind: {
            title: '角色管理' + '{selectionText}'
        },
        flex: 1
    }, {
        xtype: 'rolewindow'
    }, {
        xtype: 'roleeditwindow'
    }
],

    initComponent: function () {
        var me = this;

        this.callParent(arguments);
    }
});
