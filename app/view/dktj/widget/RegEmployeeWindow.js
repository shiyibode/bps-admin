Ext.define('MyApp.view.dktj.widget.RegEmployeeWindow', {
    extend: 'Ext.window.Window',

    alias: 'widget.dktjregemployeewindow',

    requires: [
        'MyApp.ux.form.trigger.TriggerClear'
    ],

    itemId: 'regDkEmployeeWindow',

    title: '登记营销人员',

    width: 700,
    maxHeight: 660,
    layout: {
        type: 'fit'
    },
    resizable: true,
    scrollable: true,
    modal: false,   //模态窗口设为false, 在显示时设置是否为模态窗口
    closeAction: 'hide',

    items:[{
        xtype: 'form',
        reference: 'regDkEmployeeForm',

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
            labelWidth: 74,
            flex: 1,
            margin: '0 10 5 0'  //form内各field离fieldset的距离
        },

        items: [{
            xtype: 'fieldset',
            title: '客户信息',
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
                    readOnly: true,
                    bind: {
                        value: '{selectionRecord.accountNo}'
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
                    fieldLabel: '客户类型',
                    readOnly: true,
                    bind: {
                        value: '{selectionRecord.customerTypeStr}'
                    }
                }, {
                    xtype: 'textfield',
                    fieldLabel: '证件号码',
                    readOnly: true,
                    bind: {
                        value: '{selectionRecord.identityNo}'
                    }
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'textfield',
                    fieldLabel: '开户机构',
                    readOnly: true,
                    bind: {
                        value: '{selectionRecord.orgCode}'
                    }
                }, {
                    xtype: 'textfield',
                    fieldLabel: '日期',
                    readOnly: true,
                    bind: {
                        value: '{selectionRecord.date}'
                    }
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'textfield',
                    fieldLabel: '客户来源',
                    readOnly: true,
                    bind: {
                        value: '{selectionRecord.flagStr}'
                    }
                }, {
                    xtype: 'combo',
                    reference: 'customerStatusCombo',
                    fieldLabel: '客户状态',
                    displayField: 'text',
                    valueField: 'value',
                    allowBlank: false,
                    editable: false,
                    triggers : {
                        clear : {
                            type : 'clear',
                            weight : -1
                        }
                    },
                    bind: {
                        store: '{customerStatusStore}',
                        value: '{selectionRecord.status}'
                    }
                }]
            },{
                    xtype: 'container',
                    layout: 'hbox',
                    items: [{
                        xtype: 'combobox',
                        name: 'userCode',
                        reference: 'regDkEmployeeUserCombobox',
                        fieldLabel: '主营销人员',
                        displayField: 'userCode',
                        valueField: 'userCode',
                        allowBlank: false,
                        anchor: '-15',
                        bind: {
                            store: '{userStore}',
                        },
                        minChars: 2,
                        queryParam: 'userCodeOrName', //自动请求时携带的参数名称
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
                        xtype: 'combobox',
                        name: 'templateId',
                        fieldLabel: '模板类型',
                        reference: 'templateCombo',
                        allowBlank: false,
                        displayField: 'name',
                        valueField: 'id',
                        editable: false,
                        bind: {
                            store: '{templateStore}'
                        },
                        listeners: {
                            change: 'onTemplateComboboxChange'
                        }
                    }]
                }
                // ,{
                // xtype: 'container',
                // layout: 'hbox',
                // items: [{
                //     xtype: 'combobox',
                //     name: 'specialAccountTypeId',
                //     fieldLabel: '特殊标记',
                //     reference: 'specialAccountTypeCombo',
                //     allowBlank: true,
                //     displayField: 'name',
                //     valueField: 'id',
                //     editable: false,
                //     bind: {
                //         store: '{specialAccountTypeStore}'
                //     }
                // }]
                // }
            ]
        }, {
            xtype: 'container',
            reference: 'templateDetailContainer',
            height: 276,
            margin: '10 5 0 5',
            border: 1,
            style: {
                borderColor: 'silver',
                borderStyle: 'solid'
            },
            items: [{
                xtype: 'grid',
                reference: 'templateDetailGrid',
                title: '计酬分成模板',
                height: 256,
                layout: 'fit',
                bind: {
                    store: '{templateDetailStore}'
                },
                columns:[{
                    text: '岗位类型',
                    dataIndex: 'positionName',
                    width: 200,
                    sortable: false,
                    align: 'center'
                }
                // ,{
                //     text: '分成比例',
                //     sortable: false,
                //     dataIndex: 'percentage'
                // }
                ,{
                    text: '员工号',
                    sortable: false,
                    dataIndex: 'tellerCode',
                    width: 150,
                    editor: {
                        xtype: 'combo',
                        triggerAction: 'all',
                        forceSelection: true,
                        bind: {
                            store: '{availableUserStore}'
                        },
                        displayField: 'userCode',
                        queryParam: 'userCodeOrName', //自动请求时携带的参数名称
                        queryMode: 'remote',
                        listConfig: {
                                        itemTpl: [
                                            '<div data-qtip="{userCode} - {userName} - {organizationName}">{userCode} - {userName} - {organizationName}</div>'
                                        ]
                                    }
                    }
                }],
                plugins:{
                    ptype: 'cellediting',
                    clicksToEdit: 1
                }
            }]
        },
        // 任务分成
        {
            xtype: 'fieldset',
            title: '任务数分成比例',
            layout: 'anchor',
            margin: '5 5 0 5',
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
                    reference: 'regDkEmployeeTaskCheckBox',
                    name: 'taskAllBelongMainTellerFlag',
                    checked: true,
                    listeners: {
                        change: 'onDkTaskCheckBoxChange'
                    }
                }]
            },{
                xtype: 'container',
                layout: 'hbox',
                hidden: true,
                reference: 'regDkEmployeeContainer-1',
                items: [{
                    xtype: 'combobox',
                    reference: 'regDkEmployeeUserCombobox-1',
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
                    reference: 'regDkEmployeeUserPercentage-1',
                    text: '分成比例'    
                }]
            },{
                xtype: 'container',
                layout: 'hbox',
                hidden: true,
                reference: 'regDkEmployeeContainer-2',
                items: [{
                    xtype: 'combobox',
                    reference: 'regDkEmployeeUserCombobox-2',
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
                    reference: 'regDkEmployeeUserPercentage-2',
                    text: '分成比例'    
                }]
            },{
                xtype: 'container',
                layout: 'hbox',
                hidden: true,
                reference: 'regDkEmployeeContainer-3',
                items: [{
                    xtype: 'combobox',
                    reference: 'regDkEmployeeUserCombobox-3',
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
                    reference: 'regDkEmployeeUserPercentage-3',
                    text: '分成比例'    
                }]
            },{
                xtype: 'container',
                layout: 'hbox',
                hidden: true,
                reference: 'regDkEmployeeContainer-4',
                items: [{
                    xtype: 'combobox',
                    reference: 'regDkEmployeeUserCombobox-4',
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
                    reference: 'regDkEmployeeUserPercentage-4',
                    text: '分成比例'    
                }]
            },{
                xtype: 'container',
                layout: 'hbox',
                hidden: true,
                reference: 'regDkEmployeeContainer-5',
                items: [{
                    xtype: 'combobox',
                    reference: 'regDkEmployeeUserCombobox-5',
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
                    reference: 'regDkEmployeeUserPercentage-5',
                    text: '分成比例'    
                }]
            },{
                xtype: 'container',
                layout: 'hbox',
                hidden: true,
                reference: 'regDkEmployeeContainer-6',
                items: [{
                    xtype: 'combobox',
                    reference: 'regDkEmployeeUserCombobox-6',
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
                    reference: 'regDkEmployeeUserPercentage-6',
                    text: '分成比例'    
                }]
            },{
                xtype: 'container',
                padding: '0 0 0 500',
                reference: 'regDkEmployeeAddPercentageBtn',
                hidden: true,
                items: [{
                    xtype: 'button',
                    text: '添加分成人',
                    handler: 'onAddPercentageBtnClick'
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