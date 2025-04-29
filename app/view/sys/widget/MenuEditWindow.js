Ext.define('MyApp.view.sys.widget.MenuEditWindow', {
    extend: 'Ext.window.Window',

    width: 400,
    closable: false,
    alias: 'widget.menueditwindow',

    requires: [
        'MyApp.ux.form.field.UxTreePicker',
        'MyApp.ux.form.trigger.TriggerClear',
        'MyApp.ux.iconcls.Field'
    ],

    itemId: 'menuEditWindow',

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
            xtype: 'textfield',
            fieldLabel: '上级菜单名称',
            bind: {
                readOnly: true,
                value: '{current.record.parentName}'
            }
        },{
            xtype: 'textfield',
            fieldLabel: '名称',
            name: 'name',
            allowBlank: false,
            bind: {
                value: '{current.record.name}'
            }
        }, {
            xtype: 'textfield',
            fieldLabel: '说明',
            name: 'description',
            bind: {
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
                value: '{current.record.type}'
            },
            name: 'type',
            allowBlank: false
        }, {
            xtype: 'textfield',
            fieldLabel: '目标',
            name: 'target',
            allowBlank: false,
            bind: {
                value: '{current.record.target}'
            }
        }, {
            xtype: 'textfield',
            fieldLabel: 'uri',
            name : 'uri',
            bind: {
                value: '{current.record.uri}'
            }
        }, {
            xtype: 'numberfield',
            fieldLabel: '排序',
            name: 'sort',
            bind: {
                value: '{current.record.sort}'
            }
        }, {
            xtype: 'textfield',
            fieldLabel: '图标',
            name: 'icon',
            allowBlank: false,
            bind: {
                value: '{current.record.icon}'
            }
        }, {
            xtype: 'textareafield',
            grow: true,
            fieldLabel: '备注',
            name: 'remarks',
            bind: {
                value: '{current.record.remarks}'
            }
        }, {
            xtype: 'checkboxfield',
            fieldLabel: '启用',
            inputValue: "1",
            uncheckedValue: "0",
            name: 'isShow',
            allowBlank: false,
            bind: {
                value: '{current.record.isShow}'
            }
        }],

        buttons: [
            '->',
            {
                text: '保存',
                formBind: true,
                itemId: 'saveBtn',
                iconCls: 'x-fa fa-floppy-o',
                handler: 'onEditSaveBtnClick'
            }, {
                text: '关闭',
                itemId: 'cancelBtn',
                handler: 'onCancelBtnClick'
            }]
    }],

    

    listeners: {
        close: 'onMenuWindowClose'
    }

});