Ext.define('MyApp.view.cktj.widget.DepositGrid', {
    extend: 'Ext.pivot.Grid',
    alias: 'widget.depositgrid',

    requires: [
        'MyApp.ux.GridToolBar'
    ],

    reference: 'depositgrid',

    tools: [{
        type: 'refresh',
        tooltip: '刷新数据',
        handler: 'refreshBtnClick'
    }],

    collapsible: false,

    initComponent: function () {
        var me = this;
        var searchItems = [{
            xtype: 'datefield',
            fieldLabel: '起始日期',
            name: 'startDate',
            // value: Ext.Date.add(new Date(), Ext.Date.MONTH, -1),
            maxValue: Ext.Date.add(new Date(), Ext.Date.DAY, -1),
            format: 'Y-m-d',
            formatText: '年-月-日',
            listeners: {
                change: function(datefield, newValue, oldValue, eOpts) {
                    if (datefield.isValid() && newValue && newValue != oldValue) {
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
        }, {
            fieldLabel: '存款机构',
            name: 'dpOrgCode'
        }, {
            xtype: 'combobox',
            name: 'depositSortId',
            fieldLabel: '账户种类',
            displayField: 'cnName',
            valueField: 'id',
            allowBlank: false,
            anchor: '-15',
            bind: {
                store: '{depositSortStore}'
            },
            minChars: 2,
            value: 1
        }];

        switch (me.moduleId) {
            //员工时点
            case 'employeetask':
                searchItems.push({
                    fieldLabel: '柜员号',
                    name: 'tellerCode'
                }, {
                    fieldLabel: '员工姓名',
                    name: 'tellerName'
                }, {
                    xtype: 'combo',
                    reference: 'depositTypeCombo',
                    fieldLabel: '存款类型',
                    displayField: 'text',
                    valueField: 'id',
                    editable: false,
                    name: 'depositType',
                    queryMode: 'local',
                    bind: {
                        store: '{empDepositTypeStore}',
                    },
                    value: 0,
                    listConfig: {
                        itemTpl: [
                            '<div data-qtip="{text}: {tips}">{text}</div>'
                        ]
                    }
                });
                break;
            //员工日均
            case 'empavgtask':
                searchItems.push({
                    fieldLabel: '柜员号',
                    name: 'tellerCode'
                }, {
                    fieldLabel: '员工姓名',
                    name: 'tellerName'
                }, {
                    xtype: 'combo',
                    reference: 'depositTypeCombo',
                    fieldLabel: '存款类型',
                    displayField: 'text',
                    valueField: 'id',
                    editable: false,
                    name: 'depositType',
                    queryMode: 'local',
                    bind: {
                        store: '{empDepositTypeStore}',
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
            case 'org':
                searchItems.push({
                    xtype: 'combo',
                    reference: 'depositTypeCombo',
                    fieldLabel: '存款类型',
                    displayField: 'text',
                    valueField: 'id',
                    editable: false,
                    name: 'depositType',
                    queryMode: 'local',
                    bind: {
                        store: '{orgDepositTypeStore}',
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
            case 'orgavg':
                searchItems.push({
                    xtype: 'combo',
                    reference: 'depositTypeCombo',
                    fieldLabel: '存款类型',
                    displayField: 'text',
                    valueField: 'id',
                    editable: false,
                    name: 'depositType',
                    queryMode: 'local',
                    bind: {
                        store: '{orgDepositTypeStore}',
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
            collapseExpandButton: true,
            searchBox: true,
            grid: this,
            searchItems: searchItems,
            searchAllBtnHidden: true
        });

        me.callParent(arguments);
    }

});