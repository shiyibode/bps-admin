Ext.define('MyApp.view.sys.widget.RoleEditWindow', {
    extend: 'Ext.window.Window',

    alias: 'widget.roleeditwindow',

    requires: [
        'MyApp.ux.form.trigger.TriggerClear'
    ],

    itemId: 'roleEditWindow',

    bind: {
        title: '{windowOptions.title}'
    },

    closable: false,
    width: 300,
    modal: false,   //模态窗口设为false, 在显示时设置是否为模态窗口
    closeAction: 'hide',
    bodyStyle: 'padding: 10px',

    items: [{
        xtype: 'form',
        modelValidation: true,//启用model中的validators
        reference: 'roleEditForm',
            layout: 'anchor',
            defaults: {
                anchor: '100%'
            },
        items: [
            {
                xtype: 'textfield',
                fieldLabel: '名称',
                labelAlign: 'right',
                labelWidth: 60,
                name: 'name',
                allowBlank: false,
                bind: {
                    value: '{current.record.name}'
                }
            }, {
                xtype: 'textfield',
                fieldLabel: '英文名称',
                labelAlign: 'right',
                labelWidth: 60,
                name: 'enName',
                bind: {
                    value: '{current.record.enName}'
                }
            },{
                xtype: 'textareafield',
                grow: true,
                labelAlign: 'right',
                labelWidth: 60,
                fieldLabel: '备注',
                name: 'remarks',
                bind: {
                    value: '{current.record.remarks}'
                }
            }
        ],
        buttons: [ '->',
            {
                text: '保存',
                itemId: 'saveBtn',
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
        close: 'onWindowClose'
    },

    initComponent: function () {
        var me = this;

        me.callParent(arguments);
    }
});