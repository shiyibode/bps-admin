/**
 * Created by syb on 21/05/11.
 */
Ext.define('MyApp.view.dktj.widget.EmployeeInterestReaddGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.employeeinterestreaddgrid',

    requires: [
        'Ext.toolbar.Paging',
        'MyApp.ux.GridToolBar'
    ],

    reference: 'employeeinterestreaddgrid',

    listeners: {
        selectionchange: 'onEmployeeInterestReaddGridSelectionChange'
    },

    columnLines: true,
    multiSelect: false,

    tools: [
        {
            type: 'refresh',
            tooltip: '刷新数据',
            handler: 'refreshBtnClick'
        }
    ],

    bbar:{
        xtype:'pagingtoolbar',
        reference:'gridpagingtoolbar',
        bind :{
            store : '{employeeInterestReaddStore}'
        },
        displayInfo: true,
        emptyMsg: "没有需要显示的数据",
        plugins: [ 'progressbarpager' ]
    },

    columns: {
        items: [
            {
                text:'网点号',
                searchable: true,
                dataIndex:'orgCode'
            },{
                text: '客户名称',
                searchable: true,
                dataIndex: 'customerName'
            },{
                text: '客户号',
                searchable: true,
                dataIndex: 'xdCustomerNo'
            },
            {
                text:'账号',
                searchable: true,
                dataIndex: 'accountNo'
            },{
                text: '开户日期',
                dataIndex: 'accountOpenDate',
                renderer: Ext.util.Format.dateRenderer('Y-m-d')
            },{
                text: '证件号',
                searchable: true,
                dataIndex: 'identityNo'
            },{
                text: '类型',
                dataIndex: 'customerType',
                renderer:function (val) {
                    if (val === '1') return '个人';
                    else if (val === '2') return '对公';
                    else return '前端无法识别的客户类型';
                }
            },{
                text: '创建时间',
                dataIndex: 'createTime'
            }
        ],
        defaults: {
            flex: 1
        }
    },

    initComponent: function () {
        let me = this,
            searchItems=[];

        //表格顶部工具栏
        me.dockedItems = [];
        me.dockedItems.push({
            xtype: 'gridtoolbar',
            dock: 'top',
            searchBox: true,
            searchItems:searchItems,
            grid: this,
            permissiveOpts: me.permissiveOpts
        });

        me.callParent(arguments);
    },

afterRender: function(){
        var me = this;
        var uri = 'readd';
        Ext.Msg.wait(I18N.GetRoleInfo);
        Ext.Ajax.request({
            url: CFG.getGlobalPath() + '/sys/menu/currentUser/currentMenuPermission',
            method: 'POST',
            params: {
                uri: '/dktj/employeeinterest/' + uri
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