/**
 * Created by syb on 20/3/26.
 */
Ext.define('MyApp.view.sys.widget.RoleGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.rolegrid',

    requires: [
        'Ext.toolbar.Paging',
        'MyApp.ux.GridToolBar'
    ],

    reference: 'rolegrid',

    bind: {
        store: '{roleStore}'
    },

    columnLines: true,

    bbar: {
        xtype: 'pagingtoolbar',
        reference: 'rolegridpagingtoolbar',
        bind: {
            store: '{roleStore}'
        },
        displayInfo: true,
        emptyMsg: "没有需要显示的数据",
        plugins: [ 'progressbarpager' ]
    },


    columns: {
        defaults: {
            flex: 1,
            align: 'left'
        },
        items: [{
            xtype: 'rownumberer',
            flex: 0
        } , {
            text: '名称',
            dataIndex: 'name'
        }, {
            text: '英文名称',
            dataIndex: 'enname'
        }, {
            text: '创建时间',
            dataIndex: 'createTime'
        }, {
            text: '更新时间',
            dataIndex: 'updateTime'
        }]
    },

    initComponent: function () {
        var me = this;

        //表格顶部工具栏
        me.dockedItems = [];
        me.dockedItems.push({
            xtype: 'gridtoolbar',
            dock: 'top',
            collapseExpandButton: false,
            permissiveOpts: []
        });

        me.callParent(arguments);
    },

    afterRender: function(){
        var me = this;

        Ext.Msg.wait(I18N.GetRoleInfo);
        Ext.Ajax.request({
            url: CFG.getGlobalPath() + '/sys/menu/currentUser/currentMenuPermission',
            method: 'POST',
            params: {
                uri: '/sys/role'
            },
            success: function(response, opts) {
                Ext.Msg.hide();
                var obj = Ext.decode(response.responseText, true);
                
                if(obj.success == false && obj.code ==='401'){
                    // mainController.setCurrentView('lockscreen');
                    window.location.href='/#lockscreen';
                    return;
                }
                
                if(obj.data){
                    permissiveOpts = obj.data;
                    
                    for(var i=0;i<permissiveOpts.length;i++){
                        var button = permissiveOpts[i];
                        var btn = Ext.widget('buttontransparent',{
                            text: button.text,
                            iconCls: button.iconCls,
                            handler: button.viewType,
                            tooltip: button.description
                        });
                        me.down('gridtoolbar').add(btn);
                    }
                }
                Ext.Msg.hide();
            },
            failure: FAILED.ajax,
            scope: me
        });

        me.callParent(arguments);
    }
});