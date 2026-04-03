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
        // modelValidation: true,

        fieldDefaults: {
            msgTarget: 'side',
            labelAlign: 'right',
            labelWidth: 60
        },

        items:[{
            xtype: 'textfield',
            fieldLabel: '上级机构名称',
            bind: {
                readOnly: true,
                value: '{current.record.name}'
                }
            }, {
                xtype: 'textfield',
                fieldLabel: '编码',
                name: 'code',
                allowBlank: false
            }, {
                xtype: 'textfield',
                fieldLabel: '名称',
                name: 'name',
                allowBlank: false
            }, {
                xtype: 'combo',
                name: 'type',
                reference: 'organizationTypeCombo',
                fieldLabel: '类型',
                displayField: 'name',
                valueField: 'code',
                editable: false,
                triggers: {
                    clear: {
                        type: 'clear',
                        weight: -1
                    }
                },
                queryMode: 'remote',  // 使用远程查询模式
                forceSelection: true,  // 强制选择列表中的项
                bind: {
                    store: '{organizationTypeStore}'
                },
                allowBlank: false
            }, {
                xtype: 'numberfield',
                fieldLabel: '层级',
                name: 'grade',
                allowBlank: false
            }, {
                xtype: 'numberfield',
                fieldLabel: '排序',
                name: 'sort',
                allowBlank: false
            }, {
                xtype: 'textareafield',
                grow: true,
                fieldLabel: '备注',
                name: 'remarks'
            }

        ],

        buttons: [
         '->',
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
        close: 'onWindowClose'
    }
});