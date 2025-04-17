Ext.define('MyApp.view.sys.widget.MenuGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.menugrid',

    requires: [
        'MyApp.ux.GridToolBar',
        'MyApp.ux.ButtonTransparent'
    ],

    reference: 'menugrid',
    // id: 'menugrid',
    scrollable: true,

    bind: {
        store: '{menuStore}'
    },

    columnLines: true,

    bbar: {
        xtype: 'pagingtoolbar',
        reference: 'menugridpagingtoolbar',
        bind: {
            store: '{menuStore}'
        },
        displayInfo: true,
        emptyMsg: "没有需要显示的数据",
        plugins: [ 'progressbarpager' ]
    },

    sortableColumns: false,

    columns: {
        defaults: {
            flex: 1,
            align: 'left'
        },
        items: [
            {
                text: '名称',
                dataIndex: 'name',
                searchable: true
            }, {
                text: '上级菜单名称',
                dataIndex: 'parentName'
            }, {
                text: '图标',
                dataIndex: 'icon'
            }, {
                text: 'uri',
                dataIndex: 'uri'
            },{
                text: '类型',
                dataIndex: 'typeStr'
            },{
                text: '权限',
                dataIndex: 'permission'
            }, {
                text: '排序',
                dataIndex: 'sort'
            }
            , {
                text: '创建时间',
                dataIndex: 'createTime'
            }
        ]
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

        var maincontainerwrap = me.up('app-main');
        var mainController = maincontainerwrap.getController();

        Ext.Msg.wait(I18N.GetMenuInfo);
        Ext.Ajax.request({
            url: CFG.getGlobalPath() + '/sys/menu/currentUser/currentMenuPermission',
            method: 'POST',
            params: {
                uri: '/sys/menu'
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