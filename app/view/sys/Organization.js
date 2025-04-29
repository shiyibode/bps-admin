Ext.define('MyApp.view.sys.Organization', {
    extend: 'Ext.panel.Panel',
    xtype: 'sysorganization',

    requires: [
        'Ext.layout.container.Border',
        'MyApp.view.sys.OrganizationController',
        'MyApp.view.sys.OrganizationModel',
        'MyApp.view.sys.widget.OrganizationWindow',
        'MyApp.view.sys.widget.OrganizationEditWindow',
        'MyApp.view.sys.widget.OrganizationGrid'
    ],

    controller: 'sysorganization',
    viewModel: {
        type: 'sysorganization'
    },

    frame: false,
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    items:[{
        xtype: 'organizationgrid',
        bind: {
            title: '机构管理' + '{selectionText}'
        },
        flex: 1
    }, {
        //Organization 添加、修改、查看对话框
        xtype: 'organizationwindow'
    }, {
        xtype: 'organizationeditwindow'
    }],

    initComponent: function () {
        var me = this;

        this.callParent(arguments);
    }
});
