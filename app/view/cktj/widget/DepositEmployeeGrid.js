Ext.define('MyApp.view.cktj.widget.DepositEmployeeGrid', {
    extend: 'Ext.pivot.Grid',
    alias: 'widget.depositemployeegrid',

    requires: [
        'MyApp.ux.GridToolBar'
    ],

    reference: 'depositemployeegrid',

    tools: [{
        type: 'refresh',
        tooltip: '刷新数据',
        handler: 'refreshBtnClick'
    }],

    bbar: {
        xtype: 'pagingtoolbar',
        reference: 'depositgridpagingtoolbar',
        bind: {
            store: '{employeeDepositTaskStore}'
        },
        displayInfo: true,
        emptyMsg: "没有需要显示的数据",
        plugins: [ 'progressbarpager' ]
    },

    collapsible: false,

    initComponent: function () {
        var me = this;
        var searchItems = [{
            xtype: 'datefield',
            fieldLabel: '起始日期',
            name: 'startDate',
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
                    // value: 0,
                    listConfig: {
                        itemTpl: [
                            '<div data-qtip="{text}: {tips}">{text}</div>'
                        ]
                    }
                });
                break;
            case 'employeepayment':
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
                    // value: 0,
                    listConfig: {
                        itemTpl: [
                            '<div data-qtip="{text}: {tips}">{text}</div>'
                        ]
                    }
                });
                break;
            case 'empavgpayment':
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
                    // value: 0,
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
    },


    afterRender: function(){
        var me = this;
        var uri;
        switch (me.moduleId) {
            //员工时点
            case 'employeetask':
                uri = 'empDepositTask'
                break;
            case 'empavgtask':
                uri = 'empDepositAvgTask'
                break;
            case 'employeepayment':
                uri = 'empDepositPayment'
                break;
            case 'empavgpayment':
                uri = 'empDepositAvgPayment'
                break;
        }
        Ext.Msg.wait(I18N.GetRoleInfo);
        Ext.Ajax.request({
            url: CFG.getGlobalPath() + '/sys/menu/currentUser/currentMenuPermission',
            method: 'POST',
            params: {
                uri: '/cktj/deposit/' + uri
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