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
                    triggers: {
                        clear: {
                            type: 'clear',
                            weight: -1
                        }
                    },
                    name: 'organizationId',
                    allowBlank: false
                }, {
                    xtype: 'datefield',
                    fieldLabel: '入职日期',
                    format: 'Y-m-d',
                    formatText: '年-月-日',
                    maxValue: new Date(),
                    editable: false,
                    triggers: {
                        clear: {
                            type: 'clear',
                            weight: -1
                        }
                    },
                    name: 'entryDate',
                    allowBlank: false
                }]
            }, {
                xtype: 'textareafield',
                grow: true,
                fieldLabel: '备注',
                name: 'userOrganizationRemarks'
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
                    name: 'code',
                    allowBlank: false
                }, {
                    xtype: 'textfield',
                    fieldLabel: '姓名',
                    name: 'name',
                    allowBlank: false
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
                        store: '{userGenderStore}'
                    },
                    name: 'sex'
                },{
                    xtype: 'combo',
                    reference: 'userLoginUsableCombo',
                    fieldLabel: '允许登录',
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
                        store: '{userLoginUsableStore}'
                    },
                    name: 'loginUsable',
                    allowBlank: false
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'combo',
                    reference: 'userPostCombo',
                    fieldLabel: '职务/岗位',
                    displayField: 'name',
                    valueField: 'code',
                    editable: false,
                    // emptyText: '请选择职务',
                    triggers: {
                        clear: {
                            type: 'clear',
                            weight: -1
                        }
                    },
                    bind: {
                        store: '{userPostStore}'
                    },
                    name: 'post',
                    allowBlank: false
                }, {
                    xtype: 'textfield',
                    fieldLabel: '身份证号',
                    name: 'identityNo',
                    allowBlank: false
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
                    name: 'birthday',
                    allowBlank: true
                }, {
                    xtype: 'textfield',
                    fieldLabel: '手机',
                    name: 'mobile',
                    allowBlank: true
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'textfield',
                    fieldLabel: '住址',
                    name: 'address',
                    allowBlank: true
                },{
                    xtype: 'combo',
                    fieldLabel: '在职状态',
                    displayField: 'name',
                    valueField: 'code',
                    editable: false,
                    bind: {
                        store: '{userStatusStore}'
                    },
                    name: 'status',
                    allowBlank: false
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'textareafield',
                    grow: true,
                    fieldLabel: '备注',
                    name: 'remarks',
                    allowBlank: true
                }]
            }]
        }],


        buttons: [ '->',
            {
                text: '保存',
                itemId: 'saveBtn',
                formBind: true,
                iconCls: 'x-fa fa-floppy-o',
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