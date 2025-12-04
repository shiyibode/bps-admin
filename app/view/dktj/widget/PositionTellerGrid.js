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

    tools: [{
        type: 'refresh',
        tooltip: '刷新数据',
        handler: 'refreshBtnClick'
    }],


    initComponent: function () {
        var me = this;

        //底部分页工具栏
        me.bbar = {
            xtype:'pagingtoolbar',
            reference:'positiontellergridpagingtoolbar',
            store : me.store,
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
            case 536:
                break;
            //变更复核
            case 538:
                me.columns.push({
                    text: '原柜员号',
                    dataIndex: 'oldTellerCode',
                    flex: 1
                },{
                    text: '原柜员名称',
                    dataIndex: 'oldTellerName',
                    flex: 1
                });
                me.selModel = { mode: 'MULTI' };
                me.selType = 'checkboxmodel';
                break;
        }

        //表格顶部工具栏
        me.dockedItems = [];
        me.dockedItems.push({
            xtype: 'gridtoolbar',
            dock: 'top',
            collapseExpandButton: true,
            searchBox: true,
            grid: this,
            searchItems: searchItems,
            searchAllBtnHidden: true,
            permissiveOpts: me.permissiveOpts
        });

        me.callParent(arguments);
    }

});