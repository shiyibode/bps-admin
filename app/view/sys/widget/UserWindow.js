Ext.define('MyApp.view.sys.widget.UserWindow', {
    extend: 'Ext.window.Window',

    alias: 'widget.userwindow',

    requires: [
        'MyApp.ux.form.field.UxTreePicker',
        'MyApp.ux.form.trigger.TriggerClear',
        'MyApp.ux.iconcls.Field',
        'Ext.form.FieldSet',
    ],

    itemId: 'userWindow',

    bind: {
        title: '{windowOptions.title}'
    },

    width: 700,
    // height: 600,
    // minWidth: 700,
    maxHeight: 620,
    layout: {
        type: 'fit'
    },
    resizable: true,
    scrollable: true,
    modal: false,   //模态窗口设为false, 在显示时设置是否为模态窗口
    defaultFocus: 'organizationtreepicker',
    closeAction: 'hide',
    closable: false,
    y: 100,  //距离顶部位置

    items: [{
        xtype: 'form',
        reference: 'userForm',

        // layout: {
        //     type: 'form',
        //     align: 'stretch'
        // },
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
            title: '机构信息',
            layout: 'anchor',
            defaults: {
                anchor: '100%'
            },
            bind: {
                hidden: '{current.operation === "edit"}'
            },
            items: [{
                xtype: 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'uxtreepicker',
                    reference: 'organizationtreepicker',
                    fieldLabel: '入职机构',
                    displayField: 'name',
                    valueField: 'id',
                    scrollable: true,
                    rootVisible: false,
                    maxPickerHeight: 200,
                    // emptyText: '请选择入职机构',
                    triggers: {
                        clear: {
                            type: 'clear',
                            weight: -1
                        }
                    },
                    bind: {
                        readOnly: '{windowOptions.readOnly}',
                        value: '{current.record.organizationId}'
                    }
                }, {
                    xtype: 'datefield',
                    fieldLabel: '入职日期',
                    format: 'Y-m-d',
                    formatText: '年-月-日',
                    maxValue: new Date(),
                    editable: false,
                    // emptyText: '请选择入职日期',
                    triggers: {
                        clear: {
                            type: 'clear',
                            weight: -1
                        }
                    },
                    bind: {
                        readOnly: '{windowOptions.readOnly}',
                        value: '{current.record.userEntryDate}'
                    }
                }]
            }, {
                xtype: 'textareafield',
                grow: true,
                fieldLabel: '备注',
                bind: {
                    readOnly: '{windowOptions.readOnly}',
                    value: '{current.record.remarks}'
                }
            }]

        }, {
            xtype: 'fieldset',
            title: '用户信息',
            layout: 'anchor',
            defaults: {
                anchor: '100%'
            },
            items: [{
                xtype: 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'textfield',
                    fieldLabel: '编号/柜员号',
                    bind: {
                        readOnly: '{current.operation !== "add"}',
                        value: '{current.record.userCode}'
                    }
                }, {
                    xtype: 'textfield',
                    fieldLabel: '姓名',
                    bind: {
                        readOnly: '{windowOptions.readOnly}',
                        value: '{current.record.userName}'
                    }
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'combo',
                    reference: 'userGenderCombo',
                    fieldLabel: '性别',
                    displayField: 'text',
                    valueField: 'value',
                    editable: false,
                    triggers: {
                        clear: {
                            type: 'clear',
                            weight: -1
                        }
                    },
                    bind: {
                        store: '{userGenderStore}',
                        readOnly: '{windowOptions.readOnly}',
                        value: '{current.record.userSex}'
                    }
                }, {
                    xtype: 'combo',
                    reference: 'userTypeCombo',
                    fieldLabel: '类别',
                    displayField: 'text',
                    valueField: 'value',
                    editable: false,
                    // emptyText: '请选择类别',
                    triggers: {
                        clear: {
                            type: 'clear',
                            weight: -1
                        }
                    },
                    bind: {
                        store: '{userTypeStore}',
                        readOnly: '{windowOptions.readOnly}',
                        value: '{current.record.userType}'
                    }
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'combo',
                    reference: 'userPostCombo',
                    fieldLabel: '职务/岗位',
                    displayField: 'text',
                    valueField: 'text',
                    editable: false,
                    // emptyText: '请选择职务',
                    triggers: {
                        clear: {
                            type: 'clear',
                            weight: -1
                        }
                    },
                    bind: {
                        store: '{userPostStore}',
                        readOnly: '{windowOptions.readOnly}',
                        value: '{current.record.userPost}'
                    }
                }, {
                    xtype: 'textfield',
                    fieldLabel: '身份证号',
                    bind: {
                        readOnly: '{windowOptions.readOnly}',
                        value: '{current.record.userIdentityNo}'
                    }
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'datefield',
                    fieldLabel: '出生日期',
                    format: 'Y-m-d',
                    formatText: '年-月-日',
                    maxValue: new Date(),
                    editable: false,
                    // emptyText: '请选择出生日期',
                    triggers: {
                        clear: {
                            type: 'clear',
                            weight: -1
                        }
                    },
                    bind: {
                        readOnly: '{windowOptions.readOnly}',
                        value: '{current.record.userBirthday}'
                    }
                }, {
                    xtype: 'textfield',
                    fieldLabel: '手机',
                    bind: {
                        readOnly: '{windowOptions.readOnly}',
                        value: '{current.record.userMobile}'
                    }
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'textfield',
                    fieldLabel: '住址',
                    bind: {
                        readOnly: '{windowOptions.readOnly}',
                        value: '{current.record.userAddress}'
                    }
                },{
                    xtype: 'combo',
                    fieldLabel: '在职状态',
                    displayField: 'text',
                    valueField: 'value',
                    editable: false,
                    bind: {
                        store: '{userStatusStore}',
                        readOnly: '{windowOptions.readOnly}',
                        value: '{current.record.userStatus}'
                    }
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'textareafield',
                    grow: true,
                    fieldLabel: '备注',
                    bind: {
                        readOnly: '{windowOptions.readOnly}',
                        value: '{current.record.userRemarks}'
                    }
                }]
            }]
        }],


        buttons: [ '->',
            {
                text: '保存',
                itemId: 'saveBtn',
                iconCls: 'x-fa fa-floppy-o',
                bind: {
                    disabled: '{!userSaveOrUpdateStatus.validAndDirty}',
                    hidden: '{windowOptions.saveButtonHidden}'
                },
                handler: 'onSaveBtnClick'
            }, {
                text: '关闭',
                itemId: 'cancelBtn',
                handler: 'onCancelBtnClick'
            }]
    }],

    listeners: {
        close: 'onWindowClose',

        beforeshow: {
            fn: 'onWindowBeforeShow',
            single: true       //只执行一次
        }
    }
});