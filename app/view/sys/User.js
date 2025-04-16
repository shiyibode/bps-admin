Ext.define('MyApp.view.sys.User', {
    extend: 'Ext.panel.Panel',
    xtype: 'sysuser',

    requires: [
        'MyApp.view.sys.UserController',
        'MyApp.view.sys.UserModel',
        'MyApp.view.sys.widget.UserWindow',
        'MyApp.view.sys.widget.UserOrganizationWindow',
        'MyApp.view.sys.widget.UserRoleWindow',
        'MyApp.ux.NavigationTree',
        'MyApp.view.sys.widget.UserGrid'
    ],

    controller: 'sysuser',
    viewModel: {
        type: 'sysuser'
    },

    width: 500,
    height: 700,

    layout: 'border',

    items: [{
        xtype: 'navigationtree',
        region:'west',
        margin: '0 0 0 5',
        collapsible: true,
        layout: 'fit',
        title: '机构信息',
        bind: {
            store: '{organizationStore}'
        },
        width: 220
    }, {
        xtype: 'usergrid',
        region: 'center',
        bind: {
            title: '用户管理' + '{selectionText}'
        },
        // flex: 1,
        permissiveOpts: []
    }
    , {
        //User 添加、修改、查看对话框
        xtype: 'userwindow'
    }
    , {
        //机构调动窗口
        xtype: 'userorganizationwindow'
    }
    , {
        //用户角色窗口
        xtype: 'userrolewindow'
    }
],

    initComponent: function () {
        var me = this;

        this.callParent(arguments);
    }
});
