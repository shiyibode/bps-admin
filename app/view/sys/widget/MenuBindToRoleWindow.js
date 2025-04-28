Ext.define('MyApp.view.sys.widget.MenuBindToRoleWindow', {
    extend: 'Ext.window.Window',

    width: 400,
    closable: false,
    alias: 'widget.menubindtorolewindow',

    requires: [
    ],

    itemId: 'menuBindToRoleWindow',

    // bind: {
        title: '绑定菜单至角色',
    // },

    layout: 'fit',
    resizable: false,
    modal: false,   //模态窗口设为false, 在显示时设置是否为模态窗口
    // defaultFocus: 'firstName',
    closeAction: 'hide',

    items:[{
        xtype: 'form',
        reference: 'menuBindToRoleForm',
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
            fieldLabel: '菜单名称',
            bind: {
                readOnly: true,
                value: '{current.record.name}'
            }
        },{
            xtype: 'textfield',
            fieldLabel: '上级菜单名称',
            bind: {
                readOnly: true,
                value: '{current.record.parentName}'
            }
        }, {
            xtype: 'textfield',
            fieldLabel: '类型',
            bind: {
                readOnly: true,
                value: '{current.record.typeStr}'
            }
        }, {
            xtype: 'combo',
            reference: 'roleCombo',
            fieldLabel: '角色',
            displayField: 'name',
            valueField: 'id',
            editable: true,
            minChars: 2,        // 输入至少2个字符后才触发查询
            queryMode: 'remote',
            typeAhead: true, 
            triggers: {
                clear: {
                    type: 'clear',
                    weight: -1
                }
            },
            forceSelection: true,
            bind: {
                store: '{roleStore}'
            },
            name: 'roleId',
            allowBlank: false,
            queryParam: 'name', //参数名称
            listeners: {
                // 输入变化时触发查询
                change: function(field, newValue) {
                    if (newValue && newValue.length >= field.minChars) {
                        field.getStore().load({
                            params: {
                                name: newValue // 发送到后端的查询参数
                            }
                        });
                    }
                },
                // 特殊键处理
                specialkey: function(field, e) {
                    if (e.getKey() === e.ENTER) {
                        field.onTriggerClick();
                    }
                }
            },
            validator: function(value) {
                // 自定义验证逻辑
                if (!value) {
                    return "必须选择一个有效选项";
                }
                return true;
            }
        }],

        buttons: [
            '->',
            {
                text: '保存',
                itemId: 'saveBtn',
                iconCls: 'x-fa fa-floppy-o',
                formBind: true,
                handler: 'onBindToRoleSaveBtnClick'
            }, {
                text: '关闭',
                itemId: 'cancelBtn',
                handler: 'onBindToRoleCancelBtnClick'
            }],
    
        listeners: {
            close: 'onMenuWindowClose'
        }
    }],

    

});