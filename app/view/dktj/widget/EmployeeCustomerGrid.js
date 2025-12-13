/**
 * Created by syb on 19/10/14.
 */
Ext.define('MyApp.view.dktj.widget.EmployeeCustomerGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.employeecustomergrid',

    requires: [
        'Ext.toolbar.Paging',
        'MyApp.ux.GridToolBar'
    ],

    reference: 'employeecustomergrid',

    columnLines: true,

    tools: [
        {
            type: 'refresh',
            tooltip: '刷新数据',
            handler: 'refreshBtnClick'
        }
    ],

    listeners: {
        selectionchange: 'onCustomerGridSelectionChange'
    },

    initComponent: function () {
        var me = this;

        //表格顶部工具栏
        me.dockedItems = [];

        //底部分页工具栏
        me.bbar = {
            xtype:'pagingtoolbar',
            reference:'employeecustomergridpagingtoolbar',
            store : me.store,
            displayInfo: true,
            // displayMsg: '{0} - {1} of {2}',
            emptyMsg: "没有需要显示的数据",
            plugins: [ 'progressbarpager' ]
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
        },{
            xtype: 'combobox',
            fieldLabel: '固定流动',
            displayField: 'text',
            valueField: 'value',
            editable: false,
            name: 'status',
            triggers : {
                clear : {
                    type : 'clear',
                    weight : -1
                }
            },
            bind: {
                store: '{customerStatusStore}',
            }
        }];

        //表格列
        me.columns = [];

        var customerColumn = {
            text: '客户信息',
            flex: 2,
            columns: [{
                text: '机构编号',
                dataIndex: 'orgCode',
                sortable: false,
                flex: 1
            }, {
                text: '机构名称',
                dataIndex: 'organizationName',
                sortable: false,
                flex: 1
            }, {
                text: '账号',
                dataIndex: 'accountNo',
                sortable: false,
                searchable: true,
                flex: 1
            }, {
                text: '信贷客户号',
                dataIndex: 'xdCustomerNo',
                sortable: false,
                searchable: true,
                flex: 1
            }, {
                text: '客户名称',
                dataIndex: 'customerName',
                sortable: false,
                searchable: true,
                flex: 1
            }, {
                text: '客户类型',
                dataIndex: 'customerType',
                sortable: false,
                flex: 1,
                renderer: function(value, metaData, record) {
                    return record.get('customerTypeStr');
                }
            }, {
                text: '证件号码',
                dataIndex: 'identityNo',
                sortable: false,
                flex: 1
            }, {
                text: '固定/流动客户',
                dataIndex: 'status',
                sortable: false,
                flex: 1,
                renderer: function (val) {
                    switch (val) {
                        case "1": return '固定';
                        case "2": return '流动';
                        default: return '未知';
                    }
                }
            }, {
                text: '日期',
                dataIndex: 'startDate',
                sortable: false,
                flex: 1
                }
            ]
        };

        var employeeColumn = {
            text: '营销人员信息',
            flex: 2,
            columns: [{
                text: '柜员编号',
                dataIndex: 'tellerCode',
                sortable: false,
                searchable: true,
                flex: 1
            }, {
                text: '姓名',
                dataIndex: 'tellerName',
                sortable: false,
                searchable: true,
                flex: 1
            }, {
                text: '在职机构编号',
                dataIndex: 'tellerOrgCode',
                sortable: false,
                flex: 1
            }, {
                text: '在职机构名称',
                dataIndex: 'tellerOrgName',
                sortable: false,
                flex: 1
            }, {
                text: '登记人',
                dataIndex: 'opTellerCode',
                sortable: false,
                flex: 1
            }, {
                text: '登记方式',
                dataIndex: 'registerType',
                sortable: false,
                flex: 1,
                renderer: function (val) {
                    switch (val) {
                    case 1:
                        return '新客户登记';
                    case 2:
                        return '释放客户登记';
                     case 3:
                         return '变更营销人员';
                    case 4:
                        return '流动转固定释放客户';
                    }
                    return '未知'
                }
            }, {
                text: '复核',
                dataIndex: 'registerCheckStatus',
                sortable: false,
                flex: 1,
                renderer: function (val) {
                    switch (val) {
                        case "0":
                            return '未复核';
                        case "1":
                            return '已复核';
                    }
                    return '未知状态'
                }
            }]
        };

        switch (me.moduleId){
            //登记揽储人
            case '502':
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
                customerColumn.columns.push({
                        text: '客户来源',
                        dataIndex: 'flagStr',
                        flex: 1
                    },{
                        text: '开户日期',
                        dataIndex: 'accountOpenDate',
                        flex: 1
                    });
                me.columns.push(customerColumn);
                break;
            //复核登记申请
            case '504':
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
                employeeColumn.columns.push({
                    text: '统计贷款起始日',
                    dataIndex: 'startDate',
                    flex: 1
                });
                customerColumn.columns.push({
                    text: '客户来源',
                    dataIndex: 'registerType',
                    flex: 1,
                    renderer: function (val) {
                        switch (val) {
                            case 1: return '新客户';
                            case 2: return '释放客户';
                            case 3: return '变更客户';
                            case 4: return '流动转固定释放客户';
                            default: return '未知';
                        }
                    }
                });
                me.columns.push(employeeColumn);
                me.columns.push(customerColumn);
                break;
            //变更揽储人申请
            case '507':
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
                employeeColumn.columns.pop();

                employeeColumn.columns.push({
                    text: '登记复核状态',
                    dataIndex: 'registerCheckStatus',
                    flex: 1,
                    sortable: false,
                    renderer: function (val) {
                        switch (val) {
                            case "0":
                                return '未复核';
                            case "1":
                                return '已复核';
                        }
                        return ''
                    }
                },{
                    text: '登记复核人',
                    dataIndex: 'registerCheckTellerCode',
                    sortable: false,
                    flex: 1,
                }, {
                    text: '登记复核时间',
                    dataIndex: 'registerCheckTime',
                    sortable: false,
                    flex: 1
                },{
                    text: '变更复核状态',
                    dataIndex: 'alterCheckStatus',
                    flex: 1,
                    sortable: false,
                    renderer: function (val) {
                        switch (val) {
                            case "0":
                                return '未复核';
                            case "1":
                                return '已复核';
                        }
                        return ''
                    }
                },{
                    text: '变更复核人',
                    dataIndex: 'alterCheckTellerCode',
                    sortable: false,
                    flex: 1,
                }, {
                    text: '变更复核时间',
                    dataIndex: 'alterCheckTime',
                    sortable: false,
                    flex: 1
                }, {
                    text: '统计贷款起始日',
                    dataIndex: 'startDate',
                    sortable: false,
                    flex: 1
                }, {
                    text: '原营销人员柜员号',
                    dataIndex: 'oldTellerCode',
                    sortable: false,
                    searchable: true,
                    flex: 1
                }, {
                    text: '原营销人员姓名',
                    dataIndex: 'oldTellerName',
                    sortable: false,
                    searchable: true,
                    flex: 1
                });
                customerColumn.columns.unshift({
                    text: '贷款账号',
                    dataIndex: 'accountNo',
                    sortable: false,
                    flex: 1
                },{
                    text: '开户时间',
                    dataIndex: 'accountOpenDate',
                    sortable: false,
                    flex: 1
                });
                customerColumn.columns.push({
                    text: '客户来源',
                    dataIndex: 'registerType',
                    flex: 1,
                    sortable: false,
                    renderer: function (val) {
                        switch (val) {
                            case 1: return '新客户';
                            case 2: return '释放客户';
                            case 3: return '变更客户';
                            case 4: return '流动转固定释放客户';
                            default: return '未知';
                        }
                    }
                });
                me.columns.push(employeeColumn);
                me.columns.push(customerColumn);
                break;
            //复核变更揽储人申请
            case '509':
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
                customerColumn.columns.unshift({
                    text: '贷款账号',
                    dataIndex: 'accountNo',
                    sortable: false,
                    flex: 1
                },{
                    text: '开户时间',
                    dataIndex: 'accountOpenDate',
                    sortable: false,
                    flex: 1
                });
                employeeColumn.columns.pop(); //删除登记审核状态
                employeeColumn.columns.push({ //增加变更审核状态
                    text: '复核',
                    dataIndex: 'alterCheckStatus',
                    sortable: false,
                    flex: 1,
                    renderer: function (val) {
                        switch (val) {
                            case "0":
                                return '未复核';
                            case "1":
                                return '已复核';
                        }
                        return '未知状态'
                    }
                },{
                    text: '原营销人员柜员号',
                    dataIndex: 'oldTellerCode',
                    sortable: false,
                    flex: 1
                }, {
                    text: '原营销人员姓名',
                    sortable: false,
                    dataIndex: 'oldTellerName',
                    flex: 1
                });
                customerColumn.columns.push({
                    text: '客户来源',
                    dataIndex: 'registerType',
                    flex: 1,
                    sortable: false,
                    renderer: function (val) {
                        switch (val) {
                            case 1: return '新客户';
                            case 2: return '释放客户';
                            case 3: return '变更客户';
                            case 4: return '流动转固定释放客户';
                            default: return '未知';
                        }
                    }
                });
                me.columns.push(employeeColumn);
                me.columns.push(customerColumn);
                break;
            //维护人贷款客户
            case '512':
                me.selModel = { mode: 'SINGLE' };
                me.dockedItems.push({
                    xtype: 'gridtoolbar',
                    dock: 'top',
                    collapseExpandButton: false,
                    searchBox: true,
                    searchItems: searchItems,
                    grid: this,
                    permissiveOpts: me.permissiveOpts
                });
                employeeColumn.columns.pop();
                employeeColumn.columns.push({
                    text: '登记复核状态',
                    dataIndex: 'registerCheckStatus',
                    flex: 1,
                    sortable: false,
                    renderer: function (val) {
                        switch (val) {
                            case "0":
                                return '未复核';
                            case "1":
                                return '已复核';
                        }
                        return ''
                    }
                },{
                    text: '登记复核人',
                    dataIndex: 'registerCheckTellerCode',
                    sortable: false,
                    flex: 1,
                }, {
                    text: '登记复核时间',
                    dataIndex: 'registerCheckTime',
                    sortable: false,
                    flex: 1
                },{
                    text: '变更复核状态',
                    dataIndex: 'alterCheckStatus',
                    sortable: false,
                    flex: 1,
                    renderer: function (val) {
                        switch (val) {
                            case "0":
                                return '未复核';
                            case "1":
                                return '已复核';
                        }
                        return ''
                    }
                },{
                    text: '变更复核人',
                    dataIndex: 'alterCheckTellerCode',
                    sortable: false,
                    flex: 1,
                }, {
                    text: '变更复核时间',
                    dataIndex: 'alterCheckTime',
                    sortable: false,
                    flex: 1
                },{
                    text: '原营销人员柜员号',
                    dataIndex: 'oldTellerCode',
                    sortable: false,
                    searchable: true,
                    flex: 1
                }, {
                    text: '原营销人员姓名',
                    sortable: false,
                    dataIndex: 'oldTellerName',
                    searchable: true,
                    flex: 1
                }, {
                    text: '统计贷款起始日',
                    sortable: false,
                    dataIndex: 'startDate',
                    flex: 1
                }, {
                    text: '统计贷款结束日',
                    sortable: false,
                    dataIndex: 'endDate',
                    flex: 1
                }, {
                    xtype: 'booleancolumn',
                    sortable: false,
                    text: '可变更营销人员',
                    trueText: '可变更',
                    falseText: '不可变更',
                    dataIndex: 'validFlag',
                    flex: 1
                });
                me.columns.push({
                    xtype: 'rownumberer',
                    flex: 0
                });
                customerColumn.columns.unshift({
                    text: '贷款账号',
                    dataIndex: 'accountNo',
                    sortable: false,
                    flex: 1
                },{
                    text: '开户时间',
                    dataIndex: 'accountOpenDate',
                    sortable: false,
                    flex: 1
                });
                customerColumn.columns.push({
                    text: '客户来源',
                    dataIndex: 'registerType',
                    sortable: false,
                    flex: 1,
                    renderer: function (val) {
                        switch (val) {
                            case 1: return '新客户';
                            case 2: return '释放客户';
                            case 3: return '变更客户';
                            case 4: return '流动转固定释放客户';
                            default: return '未知';
                        }
                    }
                });
                me.columns.push(employeeColumn);
                me.columns.push(customerColumn);
                break;
        }

        me.callParent(arguments);


    },

    afterRender: function(){
        var me = this;
        var uri = '';

        switch(me.moduleId){
            case '502':
                uri = 'getUnregisterCustomer';
                break;
            case '504':
                uri = 'getUncheckedCustomer';
                break;
            case '507':
                uri = 'getModifiableCustomer';
                break;
            case '509':
                uri = 'getModifiedUncheckedCustomer';
                break;
            case '512':
                uri = 'get';
                break;
        }

        Ext.Msg.wait(I18N.GetRoleInfo);
        Ext.Ajax.request({
            url: CFG.getGlobalPath() + '/sys/menu/currentUser/currentMenuPermission',
            method: 'POST',
            params: {
                uri: '/dktj/employeecustomer/' + uri
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