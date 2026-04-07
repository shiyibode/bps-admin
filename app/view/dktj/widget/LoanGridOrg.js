/**
 * Created by syb on 25/12/14.
 */
Ext.define('MyApp.view.dktj.widget.LoanGridOrg', {
    extend: 'Ext.pivot.Grid',
    alias: 'widget.loangridorg',

    requires: [
        'MyApp.ux.GridToolBar'
        // 'Ext.pivot.plugin.Exporter'
    ],

    reference: 'loangridorg',

    // collapsible: false,

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

        switch (me.moduleId) {
            //机构时点
            case 'loanorg':
                searchItems.push({
                    xtype: 'combo',
                    reference: 'loanTypeComboOrg',
                    fieldLabel: '贷款类型',
                    displayField: 'text',
                    valueField: 'id',
                    editable: false,
                    name: 'loanType',
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
            case 'loanorgavg':
                searchItems.push({
                    xtype: 'combo',
                    reference: 'loanTypeComboOrgAvg',
                    fieldLabel: '贷款类型',
                    displayField: 'text',
                    valueField: 'id',
                    editable: false,
                    name: 'loanType',
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

        me.callParent(arguments);
    }

});