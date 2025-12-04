/**
 * Created by syb on 21/05/12.
 */
Ext.define('MyApp.view.dktj.widget.EmployeeInterestDetailGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.employeeinterestdetailgrid',

    requires: [
        'Ext.toolbar.Paging',
        'MyApp.ux.GridToolBar'
    ],

    reference: 'employeeinterestdetailgrid',

    listeners: {
        selectionchange: 'onEmployeeInterestDetailGridSelectionChange'
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
            store : '{employeeInterestDetailStore}'
        },
        displayInfo: true,
        emptyMsg: "没有需要显示的数据",
        plugins: [ 'progressbarpager' ]
    },

    columns: {
        items: [
            {
                text:'网点',
                searchable: true,
                dataIndex:'lnOrgCode',
                renderer: function (val, metaData, record) {
                    return  record.get('lnOrgName') + '['+ val + ']';
                }
            },{
                text:'归属网点',
                searchable: true,
                dataIndex:'belongOrgCode',
                renderer: function (val, metaData, record) {
                    return  record.get('belongOrgName') + '['+ val + ']';
                }
            },{
                text: '柜员',
                searchable: true,
                dataIndex: 'tellerCode'
            },{
                text: '日期',
                dataIndex: 'date',
                renderer: Ext.util.Format.dateRenderer('Y-m-d')
            },{
                text: '金额',
                dataIndex: 'balance'
            },{
                text: '分成比例',
                dataIndex: 'percentage'
            },{
                text:'账号',
                searchable: true,
                dataIndex: 'accountNo'
            },{
                text: '客户名称',
                dataIndex: 'customerName'
            },{
                text: '客户号',
                searchable: true,
                dataIndex: 'xdCustomerNo'
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
        searchItems = [{
            xtype: 'datefield',
            fieldLabel: '起始日期',
            name: 'startDate',
            maxValue: Ext.Date.add(new Date(), Ext.Date.DAY, -1),
            format: 'Y-m-d',
            formatText: '年-月-日',
            listeners: {
                change: function(datefield, newValue, oldValue, eOpts) {
                    if (newValue && newValue != oldValue) {
                        var endDate = this.up('form').down('datefield[name=endDate]');

                        var endDateMaxValue = Ext.Date.add(Ext.Date.add(newValue, Ext.Date.MONTH, 12), Ext.Date.DAY, -1);

                        var currDate = Ext.Date.add(new Date, Ext.Date.DAY, -1);

                        if (endDateMaxValue > currDate) {
                            endDateMaxValue = currDate;
                        }
                        endDate.setMaxValue(endDateMaxValue);

                        if (endDate.getValue() && !Ext.Date.between(endDate.getValue(), newValue, endDateMaxValue)) {
                            endDate.setValue(endDateMaxValue);
                        }
                    }
                }
            }
        },{
            xtype: 'datefield',
            fieldLabel: '终止日期',
            name: 'endDate',
            maxValue: Ext.Date.add(new Date(), Ext.Date.DAY, -1),
            format: 'Y-m-d',
            formatText: '年-月-日'
        }
        ];

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
    }
});