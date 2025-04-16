Ext.define('MyApp.view.sys.widget.OrganizationWindow', {
    extend: 'Ext.window.Window',

    alias: 'widget.organizationwindow',

    requires: [
        'MyApp.ux.form.field.UxTreePicker',
        'MyApp.ux.form.trigger.TriggerClear',
        'MyApp.ux.iconcls.Field'
    ],

    itemId: 'organizationWindow',

    bind: {
        title: '{windowOptions.title}'
    },

    width: 400,
    // height: 500,
    minWidth: 300,
    // minHeight: 380,
    layout: 'fit',
    resizable: true,
    modal: false,   //模态窗口设为false, 在显示时设置是否为模态窗口
    defaultFocus: 'firstName',
    closeAction: 'hide',
    closable: false,

    items: [{
        xtype: 'form',
        reference: 'organizationForm',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        border: false,
        bodyPadding: 10,
        modelValidation: true,

        fieldDefaults: {
            msgTarget: 'side',
            labelAlign: 'right',
            labelWidth: 60
        },

        items:[{
                xtype: 'uxtreepicker',
                reference: 'uxtreepicker',
                fieldLabel: '上级机构',
                displayField: 'name',
                valueField: 'id',
                maxPickerHeight: 200,
                rootVisible: false,
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
                fieldLabel: '编码',
                bind: {
                    readOnly: '{windowOptions.readOnly}',
                    value: '{current.record.code}'
                }
            }, {
                xtype: 'textfield',
                fieldLabel: '名称',
                bind: {
                    readOnly: '{windowOptions.readOnly}',
                    value: '{current.record.name}'
                }
            }, {
                xtype: 'combo',
                reference: 'organizationTypeCombo',
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
                    store: '{organizationTypeStore}',
                    readOnly: '{windowOptions.readOnly}',
                    value: '{current.record.type}'
                }
            }, {
                xtype: 'numberfield',
                fieldLabel: '排序',
                bind: {
                    readOnly: '{windowOptions.readOnly}',
                    value: '{current.record.sort}'
                }
            }, {
                xtype: 'textareafield',
                grow: true,
                fieldLabel: '备注',
                bind: {
                    readOnly: '{windowOptions.readOnly}',
                    value: '{current.record.remarks}'
                }
            }

        ],

        buttons: [
         '->',
            {
                text: '保存',
                itemId: 'saveBtn',
                iconCls: 'x-fa fa-floppy-o',
                bind: {
                    disabled: '{!organizationStatus.validAndDirty}',
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