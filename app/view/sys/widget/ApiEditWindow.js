
/**
 * create by syb on 2025-04-30
 * 新增、修改接口窗口
 */
Ext.define('MyApp.view.sys.widget.ApiEditWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.apieditwindow',
    itemId: 'apiEditWindow',

    width: 320,
    closable: false,

    bind: {
        title: '{windowOptions.title}'
    },

    layout: 'fit',
    resizable: true,
    modal: false,   //模态窗口设为false, 在显示时设置是否为模态窗口
    closeAction: 'hide',
    items:[{
        xtype: 'form',
        reference: 'apiForm',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        border: false,
        bodyPadding: 10,
        fieldDefaults: {
            msgTarget: 'side',
            labelAlign: 'right',
            labelWidth: 50
        },
        items:[{
            xtype: 'textfield',
            allowBlank: false,
            fieldLabel: '名称',
            name: 'name',
            bind: {
                value: '{current.record.name}'
            }
        }, {
            xtype: 'textfield',
            allowBlank: false,
            fieldLabel: 'uri',
            name: 'uri',
            bind: {
                value: '{current.record.uri}'
            }
        }, {
            xtype: 'textfield',
            allowBlank: false,
            fieldLabel: '权限',
            name: 'permission',
            bind: {
                value: '{current.record.permission}'
            }
        }, {
            xtype: 'textfield',
            allowBlank: true,
            fieldLabel: '备注',
            name: 'remarks',
            bind: {
                value: '{current.record.remarks}'
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
        close: 'onWindowClose'
    }
 
});