Ext.define('MyApp.view.sys.widget.UserRoleWindow', {
    extend: 'Ext.window.Window',

    alias: 'widget.userrolewindow',

    requires: [
        'MyApp.ux.form.field.UxTreePicker',
        'MyApp.ux.form.trigger.TriggerClear',
        'Ext.form.FieldSet'
    ],

    itemId: 'userRoleWindow',

    title: '用户角色修改',

    width: 700,
    height: 600,
    layout: {
        type: 'border'
    },
    y: 100,
    resizable: false,
    scrollable: true,
    modal: false,   //模态窗口设为false, 在显示时设置是否为模态窗口
    closeAction: 'hide',
    closable: false,
    padding: '0 5 0 5',

    items: [{
        xtype: 'form',
        region: 'north',
        reference: 'userRoleForm',

        scrollable: true,
        border: false,
        modelValidation: true,

        defaults: {
            //form 内部组件离 form 的距离: 上/右/下/左
            // margin: '-10 5 10 5'
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
                    readOnly: true,
                    bind: {
                        value: '{current.record.code}'
                    }
                }, {
                    xtype: 'textfield',
                    fieldLabel: '姓名',
                    readOnly: true,
                    bind: {
                        value: '{current.record.name}'
                    }
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'textfield',
                    fieldLabel: '所在机构',
                    readOnly: true,
                    bind: {
                        value: '{current.record.organizationName}'
                    }
                }, {
                    xtype: 'textfield',
                    fieldLabel: '调入日期',
                    readOnly: true,
                    bind: {
                        value: '{current.record.startDate:date("Y-m-d")}'
                    }
                }]
            }, {
                xtype: 'textareafield',
                // margin: '0 10 -5 0',
                grow: true,
                fieldLabel: '备注',
                readOnly: true,
                bind: {
                    value: '{current.record.userOrganizationRemarks}'
                }
            }]
        }]
    }, {
        xtype: 'container',
        region: 'south',
        style: {
            backgroundColor: 'white'
        },
        height: 280,
        layout: 'anchor',
        defaults: {
            anchor: '100%'
        },
        items: [{
            xtype: 'container',
            // margin: '0 10 0 10',
            border: 1,
            style: {
                borderColor: 'silver',
                borderStyle: 'solid'
            },
            items: [{
                xtype: 'grid',
                reference: 'userRoleGrid',
                height: 270,
                title: '角色列表',
                bind: {
                    store: '{roleStore}'
                },

                selModel: {
                    mode: 'SIMPLE'
                },

                columnLines: true,
                selType: 'checkboxmodel',
                columns: [{
                    text: '名称',
                    dataIndex: 'name',
                    flex: 1
                }],

                listeners: {
                    selectionchange: 'onUserRoleGridSelectionChange'
                }
            }]
        }]
    }],


    buttons: [{
        text: '保存',
        itemId: 'saveBtn',
        iconCls: 'x-fa fa-floppy-o',
        bind: {
            disabled: '{userRoleWindowSaveBtnDisabled}'
        },
        handler: 'onUserRoleSaveBtnClick'
    }, {
        text: '关闭',
        itemId: 'cancelBtn',
        handler: 'onCancelBtnClick'
    }],

    listeners: {
        close: 'onWindowClose',
        beforeshow: {
            fn: 'onUserRoleWindowBeforeShow'
        }
    }
});