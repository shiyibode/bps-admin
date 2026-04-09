/**
 * Created by syb on 21/05/12.
 */
Ext.define('MyApp.view.dktj.widget.PositionTellerGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.positiontellergrid',

    requires: [
        'Ext.toolbar.Paging',
        'MyApp.ux.GridToolBar'
    ],

    reference: 'positiontellergrid',

    listeners: {
        selectionchange: 'onPositionTellerGridSelectionChange'
    },

    columnLines: true,


    initComponent: function () {
        var me = this,
            storeName;

        switch(me.moduleId){
            case '536':
                storeName = '{positionTellerAlterStore}'
                break;
            //变更复核
            case '538':
                storeName = '{positionTellerUncheckStore}'
                break;
        }
        

        //底部分页工具栏
        me.bbar = {
            xtype:'pagingtoolbar',
            reference:'positiontellergridpagingtoolbar',
            bind: {
                store: storeName
            },
            // store : me.store,
            displayInfo: true,
            emptyMsg: "没有需要显示的数据",
            plugins: [ 'progressbarpager' ]
        };


        var searchItems = [
            {
                xtype: 'combo',
                reference: 'positionCombo',
                fieldLabel: '岗位类型',
                displayField: 'name',
                valueField: 'id',
                editable: false,
                name: 'positionId',
                bind: {
                    store: '{positionStore}'
                }
            }
        ];

        me.columns = [{
            text: '机构号',
            dataIndex: 'lnOrgCode',
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
            text: '模板名称',
            dataIndex: 'templateName',
            flex: 1
        },{
            text: '岗位类型',
            dataIndex: 'positionName',
            flex: 1
        },{
            text: '柜员号',
            dataIndex: 'tellerCode',
            searchable: true,
            flex: 1
        },{
            text: '柜员名称',
            dataIndex: 'tellerName',
            flex: 1
        },{
            text: '起始日期',
            dataIndex: 'startDate',
            flex: 1
        },{
            text: '终止日期',
            dataIndex: 'endDate',
            flex: 1
        }];

        switch (me.moduleId) {
            //变更申请
            // case '536':
            //     break;
            //变更复核
            case '538':
                me.columns.push({
                    text: '原柜员号',
                    dataIndex: 'oldTellerCode',
                    flex: 1
                },{
                    text: '原柜员名称',
                    dataIndex: 'oldTellerName',
                    flex: 1
                });
                // me.selModel = { mode: 'MULTI' };
                // me.selType = 'checkboxmodel';
                break;
        }

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
        var uri = '';

        switch(me.moduleId){
            case '536':
                uri = 'positiontelleralterlist';
                break;
            case '538':
                uri = 'positiontellerchecklist';
                break;
        }

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