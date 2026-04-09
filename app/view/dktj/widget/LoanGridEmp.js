/**
 * Created by syb on 25/12/14.
 */
Ext.define('MyApp.view.dktj.widget.LoanGridEmp', {
    extend: 'Ext.pivot.Grid',
    alias: 'widget.loangridemp',

    requires: [
        'MyApp.ux.GridToolBar'
        // 'Ext.pivot.plugin.Exporter'
    ],

    reference: 'loangridemp',

    // bbar: {
    //     xtype: 'pagingtoolbar',
    //     reference: 'loangridpagingtoolbar',
    //     bind: {
    //         store: '{employeeLoanStore}'
    //     },
    //     displayInfo: true,
    //     emptyMsg: "没有需要显示的数据",
    //     plugins: [ 'progressbarpager' ]
    // },

    // collapsible: false,

    // multiSelect: true,

    // selModel: {
    //     type: 'spreadsheet'
    // },

    // plugins: [{
    //     ptype: 'pivotexporter'
    // }],


    initComponent: function () {
        var me = this,
            storeName;

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
            //员工时点
            case 'loanemp':
                storeName = '{employeeLoanStore}'
                searchItems.push({
                    fieldLabel: '柜员号',
                    name: 'tellerCode'
                }, {
                    fieldLabel: '员工姓名',
                    name: 'tellerName'
                }, {
                    xtype: 'combo',
                    reference: 'loanTypeComboEmp',
                    fieldLabel: '贷款类型',
                    displayField: 'text',
                    valueField: 'id',
                    editable: false,
                    name: 'loanType',
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
            //员工日均
            case 'loanempavg':
                storeName = '{employeeAvgLoanStore}'
                searchItems.push({
                    fieldLabel: '柜员号',
                    name: 'tellerCode'
                }, {
                    fieldLabel: '员工姓名',
                    name: 'tellerName'
                }, {
                    xtype: 'combo',
                    reference: 'loanTypeComboEmpAvg',
                    fieldLabel: '贷款类型',
                    displayField: 'text',
                    valueField: 'id',
                    editable: false,
                    name: 'loanType',
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
        }

        //表格顶部工具栏
        me.dockedItems = [];
        me.dockedItems.push({
            xtype: 'gridtoolbar',
            dock: 'top',
            searchBox: true,
            grid: this,
            searchItems: searchItems,
            searchAllBtnHidden: true,
            collapseExpandButton: false,
            permissiveOpts: me.permissiveOpts
        },{
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            reference: 'loangridpagingtoolbar',
            bind: {
                store: storeName
            },
            // store: me.getStore(),
            displayInfo: true,
            emptyMsg: "没有需要显示的数据",
            plugins: [ 'progressbarpager' ]
        });


        me.callParent(arguments);
    },


    afterRender: function(){
        var me = this;
        var uri;
        switch (me.moduleId) {
            //员工时点
            case 'loanemp':
                uri = 'employee'
                break;
            case 'loanempavg':
                uri = 'empAverage'
                break;
            // case 'employeepayment':
            //     uri = 'empDepositPayment'
            //     break;
            // case 'empavgpayment':
            //     uri = 'empDepositAvgPayment'
            //     break;
        }

        var bbar = me.down('pagingtoolbar');


        Ext.Msg.wait(I18N.GetRoleInfo);
        Ext.Ajax.request({
            url: CFG.getGlobalPath() + '/sys/menu/currentUser/currentMenuPermission',
            method: 'POST',
            params: {
                uri: '/dktj/loan/' + uri
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