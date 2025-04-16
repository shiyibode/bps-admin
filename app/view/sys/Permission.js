Ext.define('MyApp.view.sys.Permission', {
    extend: 'Ext.panel.Panel',
    xtype: 'syspermission',

    requires: [
        'MyApp.view.sys.widget.PermissionGrid'
    ],

    controller: 'syspermission',
    viewModel: {
        type: 'syspermission'
    },

    width: 500,
    height: 700,
    layout: 'border',

    items: [
        {
        xtype: 'permissiongrid',
        region: 'center',
        margin: '5 0 0 5',
        bind: {
            title: '接口管理' + '{selectionText}'
        },
        // flex: 1,
        permissiveOpts: []
    }
    , {
        //User 添加、修改、查看对话框
        xtype: 'permissionwindow'
    }],

    initComponent: function () {
        var me = this;

        this.callParent(arguments);
    },

    listeners: {
        resize: function(){
            var me = this;

            var availableHeight = document.body.clientHeight - 64,
                currentHeight = me.getHeight();

            if(availableHeight !== currentHeight){
                me.setHeight(availableHeight);
            }    
        }
    }

});
