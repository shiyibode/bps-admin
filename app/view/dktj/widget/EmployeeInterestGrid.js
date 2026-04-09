/**
 * Created by syb on 21/05/12.
 */
Ext.define('MyApp.view.dktj.widget.EmployeeInterestGrid', {
    extend: 'Ext.pivot.Grid',
    alias: 'widget.employeeinterestgrid',

    requires: [
        'MyApp.ux.GridToolBar',
        'Ext.pivot.plugin.Exporter'
    ],

    reference: 'employeeinterestgrid',

    // tools: [{
    //     type: 'refresh',
    //     tooltip: '刷新数据',
    //     handler: 'refreshBtnClick'
    // }],

    // title: 'employeeinterestgrid',
    // collapsible: false,

    // multiSelect: true,

    // selModel: {
    //     // type: 'spreadsheet',
    //     mode: 'SINGLE'
    // },

    // plugins: [{
    //     ptype: 'pivotexporter'
    // }],


    initComponent: function () {
        var me = this;
        var storeName;
        var searchItems = [{
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
        }];

        switch (me.moduleId) {
            //员工时点
            case '528':
                storeName = '{employeeInterestStore}'
                searchItems.push({
                    fieldLabel: '柜员号',
                    name: 'tellerCode'
                }, {
                    fieldLabel: '员工姓名',
                    name: 'tellerName'
                }, {
                    xtype: 'combo',
                    reference: 'interestLoanTypeCombo',
                    fieldLabel: '贷款类型',
                    displayField: 'text',
                    valueField: 'id',
                    editable: false,
                    name: 'queryType',
                    bind: {
                        store: '{empLoanTypeStore}'
                    },
                    value: 0,
                    listConfig: {
                        itemTpl: [
                            '<div data-qtip="{text}: {tips}">{text}</div>'
                        ]
                    }
                });
                break;
            员工日均
            case '529':
                storeName = '{employeeAvgInterestStore}'
                searchItems.push({
                    fieldLabel: '柜员号',
                    name: 'tellerCode'
                }, {
                    fieldLabel: '员工姓名',
                    name: 'tellerName'
                }, {
                    xtype: 'combo',
                    reference: 'interestLoanTypeCombo',
                    fieldLabel: '贷款类型',
                    displayField: 'text',
                    valueField: 'id',
                    editable: false,
                    name: 'queryType',
                    bind: {
                        store: '{empLoanTypeStore}'
                    },
                    value: 0,
                    listConfig: {
                        itemTpl: [
                            '<div data-qtip="{text}: {tips}">{text}</div>'
                        ]
                    }
                });
                break;
            //机构时点
            case '530':
                searchItems.push({
                    xtype: 'combo',
                    reference: 'interestLoanTypeCombo',
                    fieldLabel: '贷款类型',
                    displayField: 'text',
                    valueField: 'id',
                    editable: false,
                    name: 'queryType',
                    bind: {
                        store: '{orgLoanTypeStore}'
                    },
                    value: 0,
                    listConfig: {
                        itemTpl: [
                            '<div data-qtip="{text}: {tips}">{text}</div>'
                        ]
                    }
                });
                break;
            //机构日均
            case '531':
                searchItems.push({
                    xtype: 'combo',
                    reference: 'interestLoanTypeCombo',
                    fieldLabel: '贷款类型',
                    displayField: 'text',
                    valueField: 'id',
                    editable: false,
                    name: 'queryType',
                    bind: {
                        store: '{orgLoanTypeStore}'
                    },
                    value: 0,
                    listConfig: {
                        itemTpl: [
                            '<div data-qtip="{text}: {tips}">{text}</div>'
                        ]
                    }
                });
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

        switch (me.moduleId){
            case '528':
                me.dockedItems.push({
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    reference: 'empinterestgridpagingtoolbar',
                    bind: {
                        store: storeName
                    },
                    displayInfo: true,
                    emptyMsg: "没有需要显示的数据",
                    plugins: [ 'progressbarpager' ]
                });
                break;
            case '529':
                me.dockedItems.push({
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    reference: 'empavginterestgridpagingtoolbar',
                    bind: {
                        store: storeName
                    },
                    displayInfo: true,
                    emptyMsg: "没有需要显示的数据",
                    plugins: [ 'progressbarpager' ]
                });
                break;
        }

        me.callParent(arguments);
    }

});