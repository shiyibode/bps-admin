
/**
 * create by syb on 2020/06/17.
 * 新增、修改接口窗口
 */
Ext.define('MyApp.view.sys.widget.PermissionWindow', {
    extend: 'Ext.window.Window',
    xtype: 'permissionwindow',
    reference: 'permissionwindow',
    itemId: 'permissionwindow',

    requires: [
        'MyApp.ux.form.field.CheckableUxTreePicker',
        'MyApp.ux.form.trigger.TriggerClear'
    ],

    bind:{
        title: '{windowOptions.title}'
    },
    width: 380,
    closable: false,
    closeAction: 'hide',
    items: {
        xtype: 'form',
        bodyPadding: 10,

        defaultType: 'textfield',

        items: [{
            xtype: 'combo',
            allowBlank: false,
            fieldLabel: '角色名称',
            labelWidth: 70,
            name: 'roleId',
            disabled: true,
            displayField: 'name',
            valueField: 'id',

            bind:{
                store: '{permissionRoleStore}',
                value: '{currentRole.id}'
            }
        }, {
            xtype: 'combo',
            allowBlank: false,
            fieldLabel: '接口名称',
            labelWidth: 70,
            name: 'apiId',
            displayField: 'name',
            valueField: 'id',

            bind:{
                disabled: '{windowOptions.readOnly}',
                store: '{permissionApiStore}',
                value: '{current.record.apiId}'
            },
            listeners:{
                'select': function(combo,record){
                    var me = this,
                        viewModel = me.up('syspermission').getViewModel();
                    
                    viewModel.set('currentApi',record);
                    viewModel.set('current.record.apiPermission',record.get('permission'));
                    viewModel.set('current.record.apiUri',record.get('uri'));
                }
            }
        }, {
            allowBlank: false,
            fieldLabel: '接口权限',
            labelWidth: 70,
            name: 'apiPermission',
            readOnly: true,
            bind:{
                disabled: '{windowOptions.readOnly}',
                value: '{current.record.apiPermission}'
            }
        }, {
            allowBlank: false,
            fieldLabel: '接口路径',
            labelWidth: 70,
            readOnly: true,
            name: 'apiUri',
            bind:{
                disabled: '{windowOptions.readOnly}',
                value: '{current.record.apiUri}'
            }
        },{
            xtype: 'combo',
            allowBlank: false,
            fieldLabel: '数据范围',
            labelWidth: 70,
            name: 'dataScopte',
            displayField: 'text',
            valueField: 'id',

            bind: {
                disabled: '{windowOptions.readOnly}',
                store: '{dataScopeStore}',
                value: '{current.record.dataScope}'
            }
        },{
            xtype: 'checkableuxtreepicker',
            reference: 'permissiondatascopetreepicker',
            fieldLabel: '数据范围',
            displayField: 'name',
            valueField: 'id',
            labelWidth: 70,
            scrollable: true,
            rootVisible: false,
            maxPickerHeight: 200,
            checkable: true,
            allowBlank: false,
            blankText: '请选择按明细设置的数据范围!',
            triggers: {
                clear: {
                    type: 'clear',
                    weight: -1
                }
            },
            bind: {
                readOnly: '{windowOptions.readOnly}',
                disabled: '{current.record.dataScope !== "5"}',
                value: '{current.record.organizationIdList}'
            }
        }],

        buttons: [
            { 
                text: I18N.Cancel,
                handler: function(){
                    var window = this.up('permissionwindow');
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