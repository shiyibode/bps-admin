/**
 * Created by syb on 20/06/11.
 */
Ext.define('MyApp.view.sys.widget.ApiGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.apigrid',

    requires: [
        'Ext.toolbar.Paging',
        'MyApp.ux.GridToolBar'
    ],
    reference: 'apigrid',
    bind: {
        store: '{apiStore}'
    },
    columnLines: true,

    sortableColumns: false,

    bbar: {
        xtype: 'pagingtoolbar',
        reference: 'apigridpagingtoolbar',
        bind: {
            store: '{apiStore}'
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
        }, {
            text: '接口名称',
            searchable: true,
            dataIndex: 'name'
        }, {
            text: 'uri',
            searchable: true,
            dataIndex: 'uri'
        }, {
            text: '权限',
            searchable: true,
            dataIndex: 'permission'
        }, {
            text: '备注',
            dataIndex: 'remarks'
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
            searchBox: true,
            pageSize: CFG.getDefaultPageSize(),
            grid: this,
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
                uri: '/sys/api'
            },
            success: function(response, opts) {
                Ext.Msg.hide();
                var obj = Ext.decode(response.responseText, true);
                
                if(obj.success == false && obj.code ==='401'){
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