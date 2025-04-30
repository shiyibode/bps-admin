Ext.define('MyApp.view.sys.widget.UserEditWindow', {
    extend: 'Ext.window.Window',

    alias: 'widget.usereditwindow',

    requires: [
        'MyApp.ux.form.field.UxTreePicker',
        'MyApp.ux.form.trigger.TriggerClear',
        'MyApp.ux.iconcls.Field',
        'Ext.form.FieldSet',
    ],

    itemId: 'userEditWindow',

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

        items: [ {
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
                        value: '{current.record.code}'
                    },
                    name: 'code',
                    readOnly: true,
                    allowBlank: false
                }, {
                    xtype: 'textfield',
                    fieldLabel: '姓名',
                    bind: {
                        value: '{current.record.name}'
                    },
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
                        store: '{userGenderStore}',
                        value: '{current.record.sex}'
                    },
                    name: 'sex'
                }, {
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
                        store: '{userLoginUsableStore}',
                        value: '{current.record.loginUsable}'
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
                        store: '{userPostStore}',
                        value: '{current.record.post}'
                    },
                    name: 'post',
                    allowBlank: false
                }, {
                    xtype: 'textfield',
                    fieldLabel: '身份证号',
                    bind: {
                        value: '{current.record.identityNo}'
                    },
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
                    bind: {
                        value: '{current.record.birthday}'
                    },
                    name: 'birthday',
                    allowBlank: true
                }, {
                    xtype: 'textfield',
                    fieldLabel: '手机',
                    bind: {
                        value: '{current.record.mobile}'
                    },
                    name: 'mobile',
                    allowBlank: true
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'textfield',
                    fieldLabel: '住址',
                    bind: {
                        value: '{current.record.address}'
                    },
                    name: 'address',
                    allowBlank: true
                },{
                    xtype: 'combo',
                    fieldLabel: '在职状态',
                    displayField: 'name',
                    valueField: 'code',
                    editable: false,
                    bind: {
                        store: '{userStatusStore}',
                        value: '{current.record.status}'
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
                    bind: {
                        value: '{current.record.remarks}'
                    },
                    name: 'remarks',
                    allowBlank: true
                }]
            }]
        }],


        buttons: [ '->',
            {
                text: '保存',
                iconCls: 'x-fa fa-floppy-o',
                formBind: true,
                handler: 'onEditSaveBtnClick'
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