Ext.define('MyApp.view.cktj.widget.RegEmployeeWindow', {
    extend: 'Ext.window.Window',

    alias: 'widget.regemployeewindow',

    requires: [
        'MyApp.ux.form.trigger.TriggerClear'
    ],

    itemId: 'regEmployeeWindow',

    title: '登记揽储人',

    width: 700,
    height: 620,
    // height: 680,
    layout: {
        type: 'fit'
    },
    resizable: true,
    scrollable: true,
    modal: false,   //模态窗口设为false, 在显示时设置是否为模态窗口
    closeAction: 'hide',

    items:[{
        xtype: 'form',
        reference: 'regEmployeeForm',

        layout: {
            type: 'form',
            align: 'stretch'
        },
        scrollable: true,
        border: false,
        modelValidation: true,

        defaults: {
            //form 内部组件离 form 的距离: 上/右/下/左
            margin: '-10 5 5 5'
        },

        fieldDefaults: {
            msgTarget: 'side',
            labelAlign: 'right',
            labelWidth: 60,
            flex: 1,
            margin: '0 10 5 0'  //form内各field离fieldset的距离
        },

        items: [{
            xtype: 'fieldset',
            title: '账户信息',
            layout: 'anchor',
            defaults: {
                anchor: '100%'
            },
            items: [{
                xtype: 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'textfield',
                    fieldLabel: '账号',
                    name: 'accountNo',
                    readOnly: true,
                    bind: {
                        value: '{selectionRecord.accountNo}'
                    }
                }, {
                    xtype: 'textfield',
                    fieldLabel: '卡号',
                    readOnly: true,
                    bind: {
                        value: '{selectionRecord.cardNo}'
                    }
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'textfield',
                    fieldLabel: '子账号',
                    name: 'childAccountNo',
                    readOnly: true,
                    bind: {
                        value: '{selectionRecord.childAccountNo}'
                    }
                }, {
                    xtype: 'textfield',
                    fieldLabel: '开户机构',
                    readOnly: true,
                    bind: {
                        value: '{selectionRecord.orgCode}'
                    }
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'textfield',
                    fieldLabel: '开户日期',
                    readOnly: true,
                    bind: {
                        value: '{selectionRecord.accountOpenDate:date("Y-m-d")}'
                    }
                }, {
                    xtype: 'textfield',
                    fieldLabel: '客户名称',
                    readOnly: true,
                    bind: {
                        value: '{selectionRecord.customerName}'
                    }
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'textfield',
                    fieldLabel: '证件号码',
                    readOnly: true,
                    bind: {
                        value: '{selectionRecord.identityNo}'
                    }
                }, {
                    xtype: 'combobox',
                    fieldLabel: '自动绑定',
                    name: 'autoBindRule',
                    bind:{
                        store: '{depositAccountAutoBindRuleStore}',
                        disabled: '{selectionRecord.childAccountNo!=null&&selectionRecord.childAccountNo!="000000"}'
                    },
                    queryMode: 'remote', // 使用远程查询
                    displayField: 'name', // 显示在界面上的字段
                    valueField: 'code', // 实际值的字段
                    editable: false, // 是否可编辑
                    allowBlank: false, // 是否允许为空
                    forceSelection: true, // 必须选择列表中的项
                    listeners: {
                        afterrender: function(combo) {
                            combo.setValue('DEPOSIT_ACCOUNT_AUTO_BIND_LEVEL_ACCOUNT');
                        }
                    }
                }]
            }]
        }, {
            xtype: 'fieldset',
            title: '揽储人信息-任务数',
            layout: 'anchor',
            defaults: {
                anchor: '100%'
            },
            items: [{
                xtype: 'container',
                layout: 'hbox',
                hidden: false,
                reference: 'regEmployeeContainer-1',
                items: [{
                    xtype: 'combobox',
                    reference: 'regEmployeeUserCombobox-1',
                    flex: 5,
                    fieldLabel: '员工编号',
                    displayField: 'code',
                    name: 'rwcode1',
                    allowBlank: false,
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
                    allowBlank: false,
                    allowDecimals: true,
                    reference: 'regEmployeeUserPercentage-1',
                    text: '分成比例'    
                },{
                    xtype: 'radio',
                    flex: 2,
                    boxLabel: '是否主维护人',
                    name: 'mainTeller',
                    checked: true,
                    inputValue: 'radio1'
                }]
            },{
                xtype: 'container',
                layout: 'hbox',
                hidden: true,
                reference: 'regEmployeeContainer-2',
                items: [{
                    xtype: 'combobox',
                    reference: 'regEmployeeUserCombobox-2',
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
                    reference: 'regEmployeeUserPercentage-2',
                    text: '分成比例'    
                },{
                    xtype: 'radio',
                    flex: 2,
                    boxLabel: '是否主维护人',
                    name: 'mainTeller',
                    inputValue: 'radio2'
                }]
            },{
                xtype: 'container',
                layout: 'hbox',
                hidden: true,
                reference: 'regEmployeeContainer-3',
                items: [{
                    xtype: 'combobox',
                    reference: 'regEmployeeUserCombobox-3',
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
                    reference: 'regEmployeeUserPercentage-3',
                    text: '分成比例'    
                },{
                    xtype: 'radio',
                    flex: 2,
                    boxLabel: '是否主维护人',
                    name: 'mainTeller',
                    inputValue: 'radio3'
                }]
            },{
                xtype: 'container',
                layout: 'hbox',
                hidden: true,
                reference: 'regEmployeeContainer-4',
                items: [{
                    xtype: 'combobox',
                    reference: 'regEmployeeUserCombobox-4',
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
                    reference: 'regEmployeeUserPercentage-4',
                    text: '分成比例'    
                },{
                    xtype: 'radio',
                    flex: 2,
                    boxLabel: '是否主维护人',
                    name: 'mainTeller',
                    inputValue: 'radio4'
                }]
            },{
                xtype: 'container',
                layout: 'hbox',
                hidden: true,
                reference: 'regEmployeeContainer-5',
                items: [{
                    xtype: 'combobox',
                    reference: 'regEmployeeUserCombobox-5',
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
                    reference: 'regEmployeeUserPercentage-5',
                    text: '分成比例'    
                },{
                    xtype: 'radio',
                    flex: 2,
                    boxLabel: '是否主维护人',
                    name: 'mainTeller',
                    inputValue: 'radio5'
                }]
            },{
                xtype: 'container',
                layout: 'hbox',
                hidden: true,
                reference: 'regEmployeeContainer-6',
                items: [{
                    xtype: 'combobox',
                    reference: 'regEmployeeUserCombobox-6',
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
                    reference: 'regEmployeeUserPercentage-6',
                    text: '分成比例'    
                },{
                    xtype: 'radio',
                    flex: 2,
                    boxLabel: '是否主维护人',
                    name: 'mainTeller',
                    inputValue: 'radio6'
                }]
            },{
                xtype: 'container',
                // layout: 'hbox',
                padding: '0 0 0 500',
                items: [{
                    xtype: 'button',
                    itemId: 'regEmployeeAddPercentageBtn',
                    text: '添加揽储人',
                    handler: 'onAddPercentageBtnClick'
                }]
            }
            // , {
            //     xtype: 'container',
            //     layout: 'hbox',
            //     items: [{
            //         xtype: 'textareafield',
            //         grow: true,
            //         fieldLabel: '登记说明',
            //         name: 'remarks'
            //     }]
            // }
        ]
        }, {
            xtype: 'fieldset',
            title: '揽储人信息-计酬数',
            layout: 'anchor',
            defaults: {
                anchor: '100%'
            },
            items: [{
                xtype: 'container',
                layout: 'hbox',
                hidden: false,
                items: [{
                    xtype: 'checkbox',
                    boxLabel: '计酬比例与任务分成比例一致',
                    reference: 'regEmployeePaymentCheckBox',
                    name: 'taskPaymentSameFlag',
                    checked: true,
                    listeners: {
                        change: 'onPaymentCheckBoxChange'
                    }
                }]
            },{
                xtype: 'container',
                layout: 'hbox',
                hidden: true,
                reference: 'regEmployeePaymentContainer-1',
                items: [{
                    xtype: 'combobox',
                    reference: 'regEmployeePaymentUserCombobox-1',
                    fieldLabel: '员工编号',
                    displayField: 'code',
                    name: 'jccode1',
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
                        change: 'onEmployeePaymentComboboxChange1',
                        select: 'onEmployeePaymentComboboxSelect1'
                    }
                },{
                    xtype: 'numberfield',
                    fieldLabel: '比例',
                    name: 'jcpercentage1',
                    minValue: 0,
                    maxValue: 1,
                    hidden: false,
                    decimalPrecision: 2,
                    allowDecimals: true,
                    reference: 'regEmployeePaymentUserPercentage-1',
                    text: '分成比例'    
                }]
            },{
                xtype: 'container',
                layout: 'hbox',
                hidden: true,
                reference: 'regEmployeePaymentContainer-2',
                items: [{
                    xtype: 'combobox',
                    reference: 'regEmployeePaymentUserCombobox-2',
                    fieldLabel: '员工编号',
                    displayField: 'code',
                    name: 'jccode2',
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
                        change: 'onEmployeePaymentComboboxChange2',
                        select: 'onEmployeePaymentComboboxSelect2'
                    }
                },{
                    xtype: 'numberfield',
                    fieldLabel: '比例',
                    name: 'jcpercentage2',
                    minValue: 0,
                    maxValue: 1,
                    hidden: false,
                    decimalPrecision: 2,
                    allowDecimals: true,
                    reference: 'regEmployeePaymentUserPercentage-2',
                    text: '分成比例'    
                }]
            },{
                xtype: 'container',
                layout: 'hbox',
                hidden: true,
                reference: 'regEmployeePaymentContainer-3',
                items: [{
                    xtype: 'combobox',
                    reference: 'regEmployeePaymentUserCombobox-3',
                    fieldLabel: '员工编号',
                    displayField: 'code',
                    name: 'jccode3',
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
                        change: 'onEmployeePaymentComboboxChange3',
                        select: 'onEmployeePaymentComboboxSelect3'
                    }
                },{
                    xtype: 'numberfield',
                    fieldLabel: '比例',
                    name: 'jcpercentage3',
                    minValue: 0,
                    maxValue: 1,
                    hidden: false,
                    decimalPrecision: 2,
                    allowDecimals: true,
                    reference: 'regEmployeePaymentUserPercentage-3',
                    text: '分成比例'    
                }]
            },{
                xtype: 'container',
                layout: 'hbox',
                hidden: true,
                reference: 'regEmployeePaymentContainer-4',
                items: [{
                    xtype: 'combobox',
                    reference: 'regEmployeePaymentUserCombobox-4',
                    fieldLabel: '员工编号',
                    displayField: 'code',
                    name: 'jccode4',
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
                        change: 'onEmployeePaymentComboboxChange4',
                        select: 'onEmployeePaymentComboboxSelect4'
                    }
                },{
                    xtype: 'numberfield',
                    fieldLabel: '比例',
                    name: 'jcpercentage4',
                    minValue: 0,
                    maxValue: 1,
                    hidden: false,
                    decimalPrecision: 2,
                    allowDecimals: true,
                    reference: 'regEmployeePaymentUserPercentage-4',
                    text: '分成比例'    
                }]
            },{
                xtype: 'container',
                layout: 'hbox',
                hidden: true,
                reference: 'regEmployeePaymentContainer-5',
                items: [{
                    xtype: 'combobox',
                    reference: 'regEmployeePaymentUserCombobox-5',
                    fieldLabel: '员工编号',
                    displayField: 'code',
                    name: 'jccode5',
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
                        change: 'onEmployeePaymentComboboxChange5',
                        select: 'onEmployeePaymentComboboxSelect5'
                    }
                },{
                    xtype: 'numberfield',
                    fieldLabel: '比例',
                    name: 'jcpercentage5',
                    minValue: 0,
                    maxValue: 1,
                    hidden: false,
                    decimalPrecision: 2,
                    allowDecimals: true,
                    reference: 'regEmployeePaymentUserPercentage-5',
                    text: '分成比例'    
                }]
            },{
                xtype: 'container',
                layout: 'hbox',
                hidden: true,
                reference: 'regEmployeePaymentContainer-6',
                items: [{
                    xtype: 'combobox',
                    reference: 'regEmployeePaymentUserCombobox-6',
                    fieldLabel: '员工编号',
                    displayField: 'code',
                    name: 'jccode6',
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
                        change: 'onEmployeePaymentComboboxChange6',
                        select: 'onEmployeePaymentComboboxSelect6'
                    }
                },{
                    xtype: 'numberfield',
                    fieldLabel: '比例',
                    name: 'jcpercentage6',
                    minValue: 0,
                    maxValue: 1,
                    hidden: false,
                    decimalPrecision: 2,
                    allowDecimals: true,
                    reference: 'regEmployeePaymentUserPercentage-6',
                    text: '分成比例'    
                }]
            },{
                xtype: 'container',
                // layout: 'hbox',
                padding: '0 0 0 500',
                reference: 'regEmployeePaymentAddPercentageBtn',
                hidden: true,
                items: [{
                    xtype: 'button',
                    text: '添加揽储人',
                    handler: 'onAddPaymentPercentageBtnClick'
                }]
            }]
        }],

        buttons: [{
            text: '保存',
            itemId: 'saveBtn',
            iconCls : 'x-fa fa-floppy-o',
            formBind: true,
            handler: 'onRegisterEmployeeSaveBtnClick'
        }, {
            text: '关闭',
            itemId: 'cancelBtn',
            handler: 'onCancelBtnClick'
        }]
    }],

    listeners: {
        close: 'onWindowClose',

        beforeshow : {
            fn : 'onWindowBeforeShow'
        }
    }
});