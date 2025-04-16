
Ext.define('MyApp.view.cktj.widget.EmployeeAccountGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.employeeaccountgrid',

    requires: [
        'Ext.toolbar.Paging',
        'MyApp.ux.GridToolBar'
    ],

    reference: 'employeeaccountgrid',

    columnLines: true,

    listeners: {
        selectionchange: 'onAccountGridSelectionChange'
    },

    initComponent: function () {
        var me = this;

        //表格顶部工具栏
        me.dockedItems = [];

        //底部分页工具栏
        me.bbar = {
            xtype:'pagingtoolbar',
            reference:'employeeaccountgridpagingtoolbar',
            store : me.store,
            displayInfo: true,
            emptyMsg: "没有需要显示的数据"
        };

        //搜索框自定义项
        var searchItems = [{
            xtype: 'combobox',
            fieldLabel: '客户类型',
            displayField: 'text',
            valueField: 'value',
            editable: false,
            name: 'customerType',
            triggers : {
                clear : {
                    type : 'clear',
                    weight : -1
                }
            },
            bind: {
                store: '{customerTypeStore}',
            }
        }, {
            xtype: 'datefield',
            fieldLabel: '开户日期',
            name: 'accountOpenDate',
            format: 'Y-m-d',
            formatText: '年-月-日',
            triggers : {
                clear : {
                    type : 'clear',
                    weight : -1
                }
            }
        }];

        //表格列
        me.columns = [];

        var depositAccountColumn = {
            text: '账户信息',
            flex: 1,
            columns: [{
                text: '机构编号',
                dataIndex: 'orgCode',
                flex: 1
            }, {
                text: '账号',
                dataIndex: 'accountNo',
                searchable: true,
                flex: 1
            }, {
                text: '卡号',
                dataIndex: 'cardNo',
                searchable: true,
                flex: 1
            }, {
                text: '账户类型',
                dataIndex: 'accountType',
                flex: 1,
                renderer: function(value, metaData, record) {
                    return record.get('accountTypeStr');
                }
            }, {
                text: '客户编号',
                dataIndex: 'customerNo',
                flex: 1
            }, {
                text: '客户名称',
                dataIndex: 'customerName',
                searchable: true,
                flex: 1
            }, {
                text: '客户类型',
                dataIndex: 'customerType',
                flex: 1,
                renderer: function(value, metaData, record) {
                    return record.get('customerTypeStr');
                }
            }, {
                text: '证件类型',
                dataIndex: 'identityType',
                flex: 1,
                renderer: function(value, metaData, record) {
                    return record.get('identityTypeStr');
                }
            }, {
                text: '证件号码',
                dataIndex: 'identityNo',
                searchable: true,
                flex: 1
            }, {
                text: '开户日期',
                dataIndex: 'accountOpenDate',
                formatter: 'date("Y-m-d")',
                flex: 1
            }, {
                text: '开销户状态',
                dataIndex: 'closeAcctFlag',
                flex: 1,
                renderer: function(value, metaData, record) {
                    return record.get('closeAcctFlagStr');
                }
            }, {
                text: '销户日期',
                dataIndex: 'closeDate',
                formatter: 'date("Y-m-d")',
                flex: 1
            }]
        };

        var employeeAccountColumn = {
            text: '揽储人信息',
            flex: 1,
            columns: [{
                text: '柜员编号',
                dataIndex: 'tellerCode',
                searchable: true,
                flex: 1
            }, {
                text: '姓名',
                dataIndex: 'tellerName',
                searchable: true,
                flex: 1
            }, {
                text: '在职机构编号',
                dataIndex: 'tellerOrgCode',
                flex: 1
            }, {
                text: '在职机构名称',
                dataIndex: 'tellerOrgName',
                flex: 1
            }, {
                text: '登记时间',
                dataIndex: 'createTime',
                flex: 1
            }, {
                text: '登记人',
                dataIndex: 'opTellerCode',
                flex: 1
            }, {
                text: '登记方式',
                dataIndex: 'registerType',
                flex: 1,
                renderer: function (val) {
                    switch (val) {
                    case 0:
                        return '登记揽储人';
                    case 1:
                        return '变更揽储人';
                    }
                    return '未知'
                }
            }, {
                text: '登记复核',
                dataIndex: 'registerCheckStatus',
                flex: 1,
                renderer: function (val) {
                    switch (val) {
                        case '0':
                            return '未复核';
                        case '1':
                            return '已复核';
                    }
                    return '未知状态'
                }
            }]
        };

        switch (me.moduleId){
            //登记揽储人
            case 'register':
                me.dockedItems.push({
                    xtype: 'gridtoolbar',
                    dock: 'top',
                    collapseExpandButton: false,
                    searchBox: true,
                    searchItems: searchItems,
                    grid: this,
                    permissiveOpts: me.permissiveOpts
                });
                me.selModel = { mode: 'SINGLE' };
                me.selType = 'checkboxmodel';
                me.columns.push(depositAccountColumn);
                break;
            //复核登记申请
            case 'check':
                searchItems.push({
                    xtype: 'datefield',
                    fieldLabel: '登记时间',
                    name: 'createTime',
                    format: 'Y-m-d H:i:s',
                    formatText: '年-月-日',
                    triggers : {
                        clear : {
                            type : 'clear',
                            weight : -1
                        }
                    }
                });
                me.dockedItems.push({
                    xtype: 'gridtoolbar',
                    dock: 'top',
                    collapseExpandButton: false,
                    searchBox: true,
                    searchItems: searchItems,
                    grid: this,
                    permissiveOpts: me.permissiveOpts
                });
                me.selModel = { mode: 'SIMPLE' };
                me.selType = 'checkboxmodel';
                employeeAccountColumn.columns.push({
                    text: '统计存款起始日',
                    dataIndex: 'startDate',
                    formatter: 'date("Y-m-d")',
                    flex: 1
                });
                me.columns.push(employeeAccountColumn);
                me.columns.push(depositAccountColumn);
                break;
            //变更揽储人申请
            case 'alter':
                searchItems.push({
                    xtype: 'datefield',
                    fieldLabel: '登记时间',
                    name: 'createTime',
                    format: 'Y-m-d H:i:s',
                    formatText: '年-月-日',
                    triggers : {
                        clear : {
                            type : 'clear',
                            weight : -1
                        }
                    }
                });
                me.dockedItems.push({
                    xtype: 'gridtoolbar',
                    dock: 'top',
                    collapseExpandButton: false,
                    searchBox: true,
                    searchItems: searchItems,
                    // otherItems: tbarOtherItems,
                    grid: this
                });
                me.selModel = { mode: 'SIMPLE' };
                me.selType = 'checkboxmodel';
                employeeAccountColumn.columns.push({
                    text: '登记复核人',
                    dataIndex: 'registerCheckTellerCode',
                    flex: 1,
                }, {
                    text: '登记复核时间',
                    dataIndex: 'registerCheckTime',
                    flex: 1
                }, {
                    text: '统计存款起始日',
                    dataIndex: 'startDate',
                    formatter: 'date("Y-m-d")',
                    flex: 1
                }, {
                    text: '原揽储人柜员号',
                    dataIndex: 'oldTellerCode',
                    searchable: true,
                    flex: 1
                }, {
                    text: '原揽储人姓名',
                    dataIndex: 'oldTellerName',
                    searchable: true,
                    flex: 1
                });
                me.columns.push(employeeAccountColumn);
                me.columns.push(depositAccountColumn);
                break;
            //复核变更揽储人申请
            case 'altercheck':
                searchItems.push({
                    xtype: 'datefield',
                    fieldLabel: '登记时间',
                    name: 'createTime',
                    format: 'Y-m-d H:i:s',
                    formatText: '年-月-日',
                    triggers : {
                        clear : {
                            type : 'clear',
                            weight : -1
                        }
                    }
                });
                me.dockedItems.push({
                    xtype: 'gridtoolbar',
                    dock: 'top',
                    collapseExpandButton: false,
                    searchBox: true,
                    searchItems: searchItems,
                    // otherItems: tbarOtherItems,
                    grid: this
                });
                me.selModel = { mode: 'SIMPLE' };
                me.selType = 'checkboxmodel';
                employeeAccountColumn.columns.push({
                    text: '原揽储人柜员号',
                    dataIndex: 'oldTellerCode',
                    flex: 1
                }, {
                    text: '原揽储人姓名',
                    dataIndex: 'oldTellerName',
                    flex: 1
                });
                me.columns.push(employeeAccountColumn);
                me.columns.push(depositAccountColumn);
                break;
            //揽储人存款账户
            case 'list':
                searchItems.push({
                    xtype: 'datefield',
                    fieldLabel: '登记时间',
                    name: 'createTime',
                    format: 'Y-m-d H:i:s',
                    formatText: '年-月-日',
                    triggers : {
                        clear : {
                            type : 'clear',
                            weight : -1
                        }
                    }
                });
                me.dockedItems.push({
                    xtype: 'gridtoolbar',
                    dock: 'top',
                    collapseExpandButton: false,
                    searchBox: true,
                    searchItems: searchItems,
                    // otherItems: tbarOtherItems,
                    grid: this
                });
                employeeAccountColumn.columns.push({
                    text: '变更复核',
                    dataIndex: 'alterCheckStatus',
                    flex: 1,
                    renderer: function (val) {
                        switch (val) {
                            case '0':
                                return '未复核';
                            case '1':
                                return '已复核';
                        }
                        return '未知状态'
                    }
                },{
                    text: '原揽储人柜员号',
                    dataIndex: 'oldTellerCode',
                    searchable: true,
                    flex: 1
                }, {
                    text: '原揽储人姓名',
                    dataIndex: 'oldTellerName',
                    searchable: true,
                    flex: 1
                }, {
                    text: '统计存款起始日',
                    dataIndex: 'startDate',
                    formatter: 'date("Y-m-d")',
                    flex: 1
                }, {
                    text: '统计存款结束日',
                    dataIndex: 'endDate',
                    formatter: 'date("Y-m-d")',
                    flex: 1
                }, {
                    xtype: 'booleancolumn',
                    text: '可变更揽储人',
                    trueText: '不可变更',
                    falseText: '可变更',
                    dataIndex: 'locked',
                    flex: 1
                });
                depositAccountColumn.columns.push({
                    text: '存款分类',
                    dataIndex: 'depositSortStr',
                    flex: 1
                });
                me.columns.push({
                    xtype: 'rownumberer',
                    flex: 0
                });
                me.columns.push(employeeAccountColumn);
                me.columns.push(depositAccountColumn);
                break;
        }

        me.callParent(arguments);


    },

    //加载菜单按钮
    afterRender: function(){
        var me = this;
        var dataJson;
        switch(me.moduleId){
            case 'register':
                dataJson = {
                    path: '/cktj/employeeaccount/getUnregisterAccount'
                }
                break;
            case 'check' :
                dataJson = {
                    path: '/cktj/employeeaccount/getRegisterUncheckedAccount'
                }
                break;
            case 'alter' :    
                dataJson = {
                    path: '/cktj/employeeaccount/getModifiableAccount'
                }
                break;
            case 'altercheck' :    
                dataJson = {
                    path: '/cktj/employeeaccount/getModifiedUncheckedAccount'
                }
                break;    
            case 'list' :    
                dataJson = {
                    path: '/cktj/employeeaccount/get'
                }
                break;        
            default: dataJson = {
                path: undefined
            }        
        }
         
        Ext.Msg.wait(I18N.GetRoleInfo);
        Ext.Ajax.request({
            url: '/sys/menu/currentUser/currentMenuPermission',
            method: 'POST',
            jsonData: dataJson,
            success: function(response, opts) {
                Ext.Msg.hide();
                var obj = Ext.decode(response.responseText, true);
                
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