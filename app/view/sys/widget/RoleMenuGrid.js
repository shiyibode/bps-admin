/**
 * Created by syb on 25/04/16.
 */
Ext.define('MyApp.view.sys.widget.RoleMenuGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.rolemenugrid',

    requires: [
        'MyApp.ux.GridToolBar',
        'MyApp.ux.ButtonTransparent'
    ],

    reference: 'rolemenugrid',
    bind: {
        store: '{roleMenuStore}'
    },
    columnLines: true,


    bbar: {
        xtype: 'pagingtoolbar',
        reference: 'rolemenugridpagingtoolbar',
        bind: {
            store: '{roleMenuStore}'
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
        items: [{
            xtype: 'rownumberer',
            flex: 0
        }, {
            text: '角色名称',
            searchable: true,
            dataIndex: 'roleName'
        }, {
            text: '菜单名称',
            searchable: true,
            dataIndex: 'menuName'
        }, {
            text: '菜单目标',
            dataIndex: 'menuTarget'
        }, {
            text: '菜单图标',
            dataIndex: 'menuIcon'
        },{
            text: '菜单描述',
            dataIndex: 'menuDescription'
        },{
            text: '角色id',
            dataIndex: 'roleId'
        }, {
            text: '菜单id',
            dataIndex: 'menuId'
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
                uri: '/sys/rolemenu'
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