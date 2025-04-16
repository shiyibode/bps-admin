
/**
 * create by syb on 2020-06-11
 * 新增、修改接口窗口
 */
Ext.define('MyApp.view.sys.widget.ApiWindow', {
    extend: 'Ext.window.Window',
    xtype: 'apiwindow',
    reference: 'apiwindow',
    itemId: 'apiwindow',

    title: I18N.UpdateUserPassword,
    width: 320,
    closable: false,
    closeAction: 'hide',
    items: {
        xtype: 'form',
        bodyPadding: 10,

        defaultType: 'textfield',

        items: [{
            allowBlank: false,
            fieldLabel: '名称',
            labelWidth: 50,
            name: 'name',
            bind:{
                readOnly: '{windowOptions.readOnly}',
                value: '{current.record.name}'
            }
        }, {
            allowBlank: false,
            fieldLabel: 'uri',
            labelWidth: 50,
            name: 'uri',
            bind:{
                readOnly: '{windowOptions.readOnly}',
                value: '{current.record.uri}'
            }
        }, {
            allowBlank: false,
            fieldLabel: '权限',
            labelWidth: 50,
            name: 'permission',
            bind:{
                readOnly: '{windowOptions.readOnly}',
                value: '{current.record.permission}'
            }
        }, {
            allowBlank: false,
            fieldLabel: '备注',
            labelWidth: 50,
            name: 'remarks',
            bind:{
                readOnly: '{windowOptions.readOnly}',
                value: '{current.record.remarks}'
            }
        }],

        buttons: [
            { 
                text: I18N.Cancel,
                handler: function(){
                    var window = this.up('apiwindow');
                    window.close();
                }
            },
            { 
                text: I18N.Ok,
                formBind: true,
                handler: 'onSaveBtnClick'
            }            
        ],

        defaults: {
            anchor: '100%',
            labelWidth: 120
        }
    },

    listeners: {
        close: 'onWindowClose',

        beforeshow: {
            fn: 'onWindowBeforeShow',
            single: true       //只执行一次
        }
    }
 
});