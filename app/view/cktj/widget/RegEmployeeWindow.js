Ext.define('MyApp.view.cktj.widget.RegEmployeeWindow', {
    extend: 'Ext.window.Window',

    alias: 'widget.regemployeewindow',

    requires: [
        'MyApp.ux.form.trigger.TriggerClear'
    ],

    itemId: 'regEmployeeWindow',

    title: '登记揽储人',

    width: 700,
    // height: 600,
    // minWidth: 700,
    height: 660,
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
            labelWidth: 74,
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
                    fieldLabel: '开户机构',
                    readOnly: true,
                    bind: {
                        value: '{selectionRecord.orgCode}'
                    }
                }, {
                    xtype: 'textfield',
                    fieldLabel: '开户日期',
                    readOnly: true,
                    bind: {
                        value: '{selectionRecord.accountOpenDate:date("Y-m-d")}'
                    }
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'textfield',
                    fieldLabel: '客户号',
                    readOnly: true,
                    bind: {
                        value: '{selectionRecord.customerNo}'
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
                    fieldLabel: '证件类型',
                    readOnly: true,
                    bind: {
                        value: '{selectionRecord.identityTypeStr}'
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
                    fieldLabel: '客户类型',
                    readOnly: true,
                    bind: {
                        value: '{selectionRecord.customerTypeStr}'
                    }
                },{
                    xtype: 'combobox',
                    name: 'depositSortId',
                    fieldLabel: '存款种类',
                    displayField: 'cnName',
                    valueField: 'id',
                    allowBlank: false,
                    anchor: '-15',
                    bind: {
                        store: '{depositSortStore}'
                    },
                    minChars: 2,
                    queryParam: 'depositSortId',
                    queryMode: 'remote'
                }]
            }]
        }, {
            xtype: 'fieldset',
            title: '揽储人信息',
            layout: 'anchor',
            defaults: {
                anchor: '100%'
            },
            items: [{
                xtype: 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'combobox',
                    reference: 'regEmployeeUserCombobox',
                    fieldLabel: '柜员号/姓名',
                    displayField: 'userCode',
                    allowBlank: false,
                    anchor: '-15',
                    bind: {
                        store: '{userStoreReg}'
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
                        value: '{accountEmployee.userStatusStr}'
                    }
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'textareafield',
                    grow: true,
                    fieldLabel: '登记说明',
                    name: 'remarks'
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