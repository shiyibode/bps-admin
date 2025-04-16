Ext.define('MyApp.view.sys.widget.MenuWindow', {
    extend: 'Ext.window.Window',

    width: 400,
    closable: false,
    alias: 'widget.menuwindow',

    requires: [
        'MyApp.ux.form.field.UxTreePicker',
        'MyApp.ux.form.trigger.TriggerClear',
        'MyApp.ux.iconcls.Field'
    ],

    itemId: 'menuWindow',

    bind: {
        title: '{windowOptions.title}'
    },

    layout: 'fit',
    resizable: true,
    modal: false,   //模态窗口设为false, 在显示时设置是否为模态窗口
    defaultFocus: 'firstName',
    closeAction: 'hide',

    items:[{
        xtype: 'form',
        reference: 'menuForm',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        border: false,
        bodyPadding: 10,
        fieldDefaults: {
            msgTarget: 'side',
            labelAlign: 'right',
            labelWidth: 60
        },
        items:[{
            xtype: 'uxtreepicker',
            reference: 'uxtreepicker',
            fieldLabel: '上级菜单',
            displayField: 'text',
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
            bind: {
                readOnly: '{windowOptions.readOnly}',
                value: '{current.record.parentId}'
            },
            listeners: {
                change: 'onUxTreePickerChange'
            }
        }, {
            xtype: 'textfield',
            fieldLabel: '名称',
            bind: {
                readOnly: '{windowOptions.readOnly}',
                value: '{current.record.name}'
            }
        }, {
            xtype: 'textfield',
            fieldLabel: '说明',
            bind: {
                readOnly: '{windowOptions.readOnly}',
                value: '{current.record.description}'
            }
        }, {
            xtype: 'combo',
            reference: 'menuTypeCombo',
            fieldLabel: '类型',
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
                store: '{menuTypeStore}',
                readOnly: '{windowOptions.readOnly}',
                value: '{current.record.type}'
            }
        }, {
            xtype: 'textfield',
            fieldLabel: '目标',
            bind: {
                readOnly: '{windowOptions.readOnly}',
                value: '{current.record.target}'
            }
        }, {
            xtype: 'textfield',
            fieldLabel: '权限',
            bind: {
                readOnly: '{windowOptions.readOnly}',
                value: '{current.record.permission}'
            }
        }, {
            xtype: 'numberfield',
            fieldLabel: '排序',
            bind: {
                readOnly: '{windowOptions.readOnly}',
                value: '{current.record.sort}'
            }
        }, {
            xtype: 'textfield',
            fieldLabel: '图标',
            bind: {
                readOnly: '{windowOptions.readOnly}',
                value: '{current.record.iconCls}'
            }
        }, {
            xtype: 'textareafield',
            grow: true,
            fieldLabel: '备注',
            bind: {
                readOnly: '{windowOptions.readOnly}',
                value: '{current.record.remarks}'
            }
        }, {
            xtype: 'checkboxfield',
            fieldLabel: '启用',
            inputValue: "1",
            uncheckedValue: "0",
            bind: {
                readOnly: '{windowOptions.readOnly}',
                value: '{current.record.isShow}'
            }
        }]
    }],

    buttons: [
        '->',
        {
            text: '保存',
            itemId: 'saveBtn',
            iconCls: 'x-fa fa-floppy-o',
            bind: {
                disabled: '{!menuStatus.validAndDirty}',
                hidden: '{windowOptions.saveButtonHidden}'
            },
            handler: 'onSaveBtnClick'
        }, {
            text: '关闭',
            itemId: 'cancelBtn',
            handler: 'onCancelBtnClick'
        }],

    listeners: {
        close: 'onMenuWindowClose',

        beforeshow: {
            fn: 'onMenuWindowBeforeShow',
            single: true       //只执行一次
        }
    }

});