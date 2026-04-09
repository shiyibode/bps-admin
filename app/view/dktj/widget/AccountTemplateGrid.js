/**
 * Created by syb on 22/08/05.
 */
Ext.define('MyApp.view.dktj.widget.AccountTemplateGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.accounttemplategrid',

    requires: [
        'Ext.toolbar.Paging',
        'MyApp.ux.GridToolBar'
    ],

    reference: 'accounttemplategrid',

    listeners: {
        selectionchange: 'onAccountTemplateGridSelectionChange'
    },

    columnLines: true,

    // tools: [{
    //     type: 'refresh',
    //     tooltip: '刷新数据',
    //     handler: 'refreshBtnClick'
    // }],


    initComponent: function () {
        var me = this;

        //底部分页工具栏
        me.bbar = {
            xtype:'pagingtoolbar',
            reference:'accounttemplategridpagingtoolbar',
            store : me.store,
            displayInfo: true,
            emptyMsg: "没有需要显示的数据",
            plugins: [ 'progressbarpager' ]
        };


        var searchItems = [];

        me.columns = [{
            text: '核心机构号',
            dataIndex: 'orgCode',
            flex: 1
        },{
            text: '客户名称',
            dataIndex: 'customerName',
            searchable: true,
            flex: 1
        },{
            text: '信贷客户号',
            dataIndex: 'xdCustomerNo',
            searchable: true,
            flex: 1
        },{
            text: '贷款账号',
            dataIndex: 'accountNo',
            searchable: true,
            flex: 1
        },{
            text: '证件号',
            dataIndex: 'identityNo',
            flex: 1
        },{
            text: '模板名称',
            dataIndex: 'templateName',
            flex: 1
        },{
            text: '起始日期',
            dataIndex: 'startDate',
            flex: 1
        }];


        //表格顶部工具栏
        me.dockedItems = [];
        me.dockedItems.push({
            xtype: 'gridtoolbar',
            dock: 'top',
            collapseExpandButton: false,
            searchBox: true,
            grid: this,
            searchItems: searchItems,
            searchAllBtnHidden: true,
            permissiveOpts: me.permissiveOpts
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
                uri: '/dktj/template/getaccounttemplatelist'
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