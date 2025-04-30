Ext.define('MyApp.view.sys.Api', {
    extend: 'Ext.panel.Panel',
    xtype: 'sysapi',

    requires: [
        'MyApp.view.sys.widget.ApiGrid',
        'MyApp.view.sys.widget.ApiWindow',
        'MyApp.view.sys.widget.ApiEditWindow',
        'MyApp.view.sys.widget.ApiBindToRoleWindow',
    ],

    controller: 'sysapi',
    viewModel: {
        type: 'sysapi'
    },

    // frame: false,
    border: true,
    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    items: [
        {
        xtype: 'apigrid',
        bind: {
            title: '接口管理' + '{selectionText}'
        },
        flex: 1,
        permissiveOpts: []
    }
    , {
        //User 添加、修改、查看对话框
        xtype: 'apiwindow'
    }, {
        //User 添加、修改、查看对话框
        xtype: 'apieditwindow'
    }, {
        xtype: 'apibindtorolewindow'
    }
],

    initComponent: function () {
        var me = this;

        this.callParent(arguments);
    }
});
