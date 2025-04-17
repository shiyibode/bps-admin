Ext.define('MyApp.view.sys.widget.OrganizationGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.organizationgrid',

    requires: [
        'Ext.toolbar.Paging',
        'MyApp.ux.GridToolBar'
    ],

    reference: 'organizationgrid',

    bind: {
        store: '{organizationStore}'
    },

    columnLines: true,

    sortableColumns: false,

    bbar: {
        xtype: 'pagingtoolbar',
        reference: 'organizationgridpagingtoolbar',
        bind: {
            store: '{organizationStore}'
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
        items: [
            {
                text: '名称',
                dataIndex: 'name',
                searchable: true,
            },{
                text: '编号',
                dataIndex: 'code',
                searchable: true,
            }, {
                text: '上级机构名称',
                dataIndex: 'parentName'
            },{
                text: '图标',
                dataIndex: 'icon'
            }, {
                text: '排序',
                dataIndex: 'sort'
            },{
                text: '类型',
                dataIndex: 'typeStr'
            }, {
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
        Ext.Msg.wait(I18N.GetOrganizationInfo);
        Ext.Ajax.request({
            url: CFG.getGlobalPath() + '/sys/menu/currentUser/currentMenuPermission',
            method: 'POST',
            params: {
                uri: '/sys/organization'
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