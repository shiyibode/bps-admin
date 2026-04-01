/**
 * Created by syb on 2019/10/30.
 */
Ext.define('MyApp.view.dktj.widget.ModifyEmployeeWindow', {
    extend: 'Ext.window.Window',

    alias: 'widget.dktjmodifyemployeewindow',

    requires: [
        'MyApp.ux.form.field.UxTreePicker',
        'MyApp.ux.form.trigger.TriggerClear',
        'MyApp.model.dktj.EmployeeCustomer'
    ],

    itemId: 'modifyEmployeeWindow',

    title: '变更主营销人员',

    width: 700,
    height: 540,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    // resizable: false,
    scrollable: 'y',
    modal: false,   //模态窗口设为false, 在显示时设置是否为模态窗口
    closeAction: 'hide',

    items:[{
        xtype: 'container',
        // region: 'north',
        style: {
            backgroundColor: 'white'
        },
        height: 184,
        layout: 'anchor',
        defaults: {
            anchor: '100%'
        },
        items: [{
            xtype: 'container',
            margin: '10 10 0 10',
            border: 1,
            style: {
                borderColor: 'silver',
                borderStyle: 'solid'
            },
            items: [{
                xtype: 'grid',
                reference: 'modifyEmployeeWindowCustomerGrid',
                height: 170,
                header: false,
                title: '客户信息',
                store: Ext.create('Ext.data.Store', {
                    storeId: 'modifyEmployeeWindowCustomerStore' //在beforeWindowShow中给该store赋值
                }),

                columnLines: true,
                columns: [{
                    text: '维护人柜员号',
                    dataIndex: 'tellerCode'
                },{
                    text: '维护人姓名',
                    dataIndex: 'tellerName'
                },{
                    text: '统计贷款开始日期',
                    dataIndex: 'startDate'
                },{
                    text: '信贷客户号',
                    dataIndex: 'xdCustomerNo'
                }, {
                    text: '客户名称',
                    dataIndex: 'customerName'
                }, {
                    text: '证件号码',
                    dataIndex: 'identityNo'
                }]
            }]
        }]
    }, {
        xtype: 'form',
        // region: 'south',
        reference: 'modifyEmployeeForm',

        layout: {
            type: 'form',
            align: 'stretch'
        },
        scrollable: true,
        border: false,
        modelValidation: true,

        defaults: {
            //form 内部组件离 form 的距离: 上/右/下/左
            margin: '0 0 0 0'
        },

        fieldDefaults: {
            msgTarget: 'side',
            labelAlign: 'right',
            labelWidth: 74,
            flex: 1,
            margin: '0 10 5 0'  //form内各field离fieldset的距离
        },

        items: [
            {
            xtype: 'fieldset',
            title: '变更后的主营销人员信息',
            layout: 'anchor',
            defaults: {
                anchor: '100%'
            },
            items: [{
                xtype: 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'combobox',
                    reference: 'modifyDkEmployeeUserCombobox',
                    fieldLabel: '柜员号/姓名',
                    displayField: 'userCode',
                    allowBlank: false,
                    anchor: '-15',
                    bind: {
                        store: '{userStore}'
                    },
                    minChars: 2,
                    queryParam: 'userCode',
                    queryMode: 'remote',
                    listConfig: {
                        itemTpl: [
                            '<div data-qtip="{userCode} - {userName} - {organizationName}">{userCode} - {userName} - {organizationName}</div>'
                        ]
                    },
                    listeners: {
                        change: 'onEmployeeComboboxChange',
                        select: 'onEmployeeComboboxSelect'
                    }
                }, {
                    xtype: 'textfield',
                    fieldLabel: '姓名',
                    allowBlank: false,
                    readOnly: true,
                    bind: {
                        value: '{accountEmployee.userName}'
                    }
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'textfield',
                    fieldLabel: '机构编号',
                    allowBlank: false,
                    readOnly: true,
                    bind: {
                        value: '{accountEmployee.organizationCode}'
                    }
                }, {
                    xtype: 'textfield',
                    fieldLabel: '机构名称',
                    allowBlank: false,
                    readOnly: true,
                    bind: {
                        value: '{accountEmployee.organizationName}'
                    }
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'textfield',
                    fieldLabel: '调入日期',
                    readOnly: true,
                    bind: {
                        value: '{accountEmployee.startDate:date("Y-m-d")}'
                    }
                }, {
                    xtype: 'textfield',
                    fieldLabel: '当前状态',
                    readOnly: true,
                    bind: {
                        value: '{accountEmployee.statusStr}'
                    }
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'textareafield',
                    fieldLabel: '变更原因',
                    grow: true,
                    allowBlank: false,
                    name: 'remarks'
                }]
            }]
        },{
            xtype: 'fieldset',
            title: '变更后的任务数分成比例',
            layout: 'anchor',
            margin: '0 0 0 0',
            defaults: {
                anchor: '100%'
            },
            items: [{
                xtype: 'container',
                layout: 'hbox',
                hidden: false,
                items: [{
                    xtype: 'checkbox',
                    boxLabel: '100%归属于主营销人员',
                    reference: 'modDkEmployeeTaskCheckBox',
                    name: 'taskAllBelongMainTellerFlag',
                    checked: true,
                    listeners: {
                        change: 'onDkTaskCheckBoxChangeModWindow'
                    }
                }]
            },{
                xtype: 'container',
                layout: 'hbox',
                hidden: true,
                reference: 'modDkEmployeeContainer-1',
                items: [{
                    xtype: 'combobox',
                    reference: 'modDkEmployeeUserCombobox-1',
                    flex: 5,
                    fieldLabel: '员工编号',
                    displayField: 'code',
                    name: 'rwcode1',
                    anchor: '-15',
                    bind: {
                        store: '{userStoreReg}'
                    },
                    minChars: 2,
                    queryParam: 'code',
                    queryMode: 'remote',
                    listConfig: {
                        itemTpl: [
                            '<div data-qtip="{code} - {name} - {organizationName}">{code} - {name} - {organizationName}</div>'
                        ]
                    },
                    listeners: {
                        change: 'onEmployeeComboboxChange1',
                        select: 'onEmployeeComboboxSelect1'
                    }
                },{
                    xtype: 'numberfield',
                    fieldLabel: '比例',
                    name: 'rwpercentage1',
                    flex: 3,
                    minValue: 0,
                    maxValue: 1,
                    hidden: false,
                    decimalPrecision: 2,
                    allowDecimals: true,
                    reference: 'modDkEmployeeUserPercentage-1',
                    text: '分成比例'    
                }]
            },{
                xtype: 'container',
                layout: 'hbox',
                hidden: true,
                reference: 'modDkEmployeeContainer-2',
                items: [{
                    xtype: 'combobox',
                    reference: 'modDkEmployeeUserCombobox-2',
                    fieldLabel: '员工编号',
                    flex: 5,
                    displayField: 'code',
                    name: 'rwcode2',
                    anchor: '-15',
                    bind: {
                        store: '{userStoreReg}'
                    },
                    minChars: 2,
                    queryParam: 'code',
                    queryMode: 'remote',
                    listConfig: {
                        itemTpl: [
                            '<div data-qtip="{code} - {name} - {organizationName}">{code} - {name} - {organizationName}</div>'
                        ]
                    },
                    listeners: {
                        change: 'onEmployeeComboboxChange2',
                        select: 'onEmployeeComboboxSelect2'
                    }
                },{
                    xtype: 'numberfield',
                    fieldLabel: '比例',
                    flex: 3,
                    name: 'rwpercentage2',
                    minValue: 0,
                    maxValue: 1,
                    hidden: false,
                    decimalPrecision: 2,
                    allowDecimals: true,
                    reference: 'modDkEmployeeUserPercentage-2',
                    text: '分成比例'    
                }]
            },{
                xtype: 'container',
                layout: 'hbox',
                hidden: true,
                reference: 'modDkEmployeeContainer-3',
                items: [{
                    xtype: 'combobox',
                    reference: 'modDkEmployeeUserCombobox-3',
                    flex: 5,
                    fieldLabel: '员工编号',
                    displayField: 'code',
                    name: 'rwcode3',
                    anchor: '-15',
                    bind: {
                        store: '{userStoreReg}'
                    },
                    minChars: 2,
                    queryParam: 'code',
                    queryMode: 'remote',
                    listConfig: {
                        itemTpl: [
                            '<div data-qtip="{code} - {name} - {organizationName}">{code} - {name} - {organizationName}</div>'
                        ]
                    },
                    listeners: {
                        change: 'onEmployeeComboboxChange3',
                        select: 'onEmployeeComboboxSelect3'
                    }
                },{
                    xtype: 'numberfield',
                    fieldLabel: '比例',
                    name: 'rwpercentage3',
                    flex: 3,
                    minValue: 0,
                    maxValue: 1,
                    hidden: false,
                    decimalPrecision: 2,
                    allowDecimals: true,
                    reference: 'modDkEmployeeUserPercentage-3',
                    text: '分成比例'    
                }]
            },{
                xtype: 'container',
                layout: 'hbox',
                hidden: true,
                reference: 'modDkEmployeeContainer-4',
                items: [{
                    xtype: 'combobox',
                    reference: 'modDkEmployeeUserCombobox-4',
                    fieldLabel: '员工编号',
                    flex: 5,
                    displayField: 'code',
                    name: 'rwcode4',
                    anchor: '-15',
                    bind: {
                        store: '{userStoreReg}'
                    },
                    minChars: 2,
                    queryParam: 'code',
                    queryMode: 'remote',
                    listConfig: {
                        itemTpl: [
                            '<div data-qtip="{code} - {name} - {organizationName}">{code} - {name} - {organizationName}</div>'
                        ]
                    },
                    listeners: {
                        change: 'onEmployeeComboboxChange4',
                        select: 'onEmployeeComboboxSelect4'
                    }
                },{
                    xtype: 'numberfield',
                    fieldLabel: '比例',
                    flex: 3,
                    name: 'rwpercentage4',
                    minValue: 0,
                    maxValue: 1,
                    hidden: false,
                    decimalPrecision: 2,
                    allowDecimals: true,
                    reference: 'modDkEmployeeUserPercentage-4',
                    text: '分成比例'    
                }]
            },{
                xtype: 'container',
                layout: 'hbox',
                hidden: true,
                reference: 'modDkEmployeeContainer-5',
                items: [{
                    xtype: 'combobox',
                    reference: 'modDkEmployeeUserCombobox-5',
                    fieldLabel: '员工编号',
                    flex: 5,
                    displayField: 'code',
                    name: 'rwcode5',
                    anchor: '-15',
                    bind: {
                        store: '{userStoreReg}'
                    },
                    minChars: 2,
                    queryParam: 'code',
                    queryMode: 'remote',
                    listConfig: {
                        itemTpl: [
                            '<div data-qtip="{code} - {name} - {organizationName}">{code} - {name} - {organizationName}</div>'
                        ]
                    },
                    listeners: {
                        change: 'onEmployeeComboboxChange5',
                        select: 'onEmployeeComboboxSelect5'
                    }
                },{
                    xtype: 'numberfield',
                    fieldLabel: '比例',
                    flex: 3,
                    name: 'rwpercentage5',
                    minValue: 0,
                    maxValue: 1,
                    hidden: false,
                    decimalPrecision: 2,
                    allowDecimals: true,
                    reference: 'modDkEmployeeUserPercentage-5',
                    text: '分成比例'    
                }]
            },{
                xtype: 'container',
                layout: 'hbox',
                hidden: true,
                reference: 'modDkEmployeeContainer-6',
                items: [{
                    xtype: 'combobox',
                    reference: 'modDkEmployeeUserCombobox-6',
                    flex: 5,
                    fieldLabel: '员工编号',
                    displayField: 'code',
                    name: 'rwcode6',
                    anchor: '-15',
                    bind: {
                        store: '{userStoreReg}'
                    },
                    minChars: 2,
                    queryParam: 'code',
                    queryMode: 'remote',
                    listConfig: {
                        itemTpl: [
                            '<div data-qtip="{code} - {name} - {organizationName}">{code} - {name} - {organizationName}</div>'
                        ]
                    },
                    listeners: {
                        change: 'onEmployeeComboboxChange6',
                        select: 'onEmployeeComboboxSelect6'
                    }
                },{
                    xtype: 'numberfield',
                    fieldLabel: '比例',
                    flex: 3,
                    name: 'rwpercentage6',
                    minValue: 0,
                    maxValue: 1,
                    hidden: false,
                    decimalPrecision: 2,
                    allowDecimals: true,
                    reference: 'modDkEmployeeUserPercentage-6',
                    text: '分成比例'    
                }]
            },{
                xtype: 'container',
                padding: '0 0 0 500',
                reference: 'modDkEmployeeAddPercentageBtn',
                hidden: true,
                items: [{
                    xtype: 'button',
                    text: '添加分成人',
                    handler: 'onAddPercentageBtnClickModWindow'
                }]
            }]
        }],

        buttons: [{
            text: '保存',
            itemId: 'saveBtn',
            iconCls : 'x-fa fa-floppy-o',
            formBind: true,
            handler: 'onModifyEmployeeSaveBtnClick'
        }, {
            text: '关闭',
            itemId: 'cancelBtn',
            handler: 'onCancelBtnClick'
        }],
    }],




    listeners: {
        close: 'onWindowClose',
        beforeshow : {
            fn: 'onWindowBeforeShow'
        },
        show: 'onWindowShow'
    }
});