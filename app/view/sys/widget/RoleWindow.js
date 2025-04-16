Ext.define('MyApp.view.sys.widget.RoleWindow', {
    extend: 'Ext.window.Window',

    alias: 'widget.rolewindow',

    requires: [
        'MyApp.ux.form.field.CheckableUxTreePicker',
        'MyApp.ux.form.trigger.TriggerClear',
        'MyApp.ux.iconcls.Field',
        'Ext.form.FieldSet',
        'Ext.form.RadioGroup'
    ],

    itemId: 'roleWindow',

    bind: {
        title: '{windowOptions.title}'
    },

    // maxWidth: 700,
    closable: false,
    width: 300,
    // maxHeight: 600,
    // layout: {
    //     type: 'fit'
    // },
    // resizable: true,
    // scrollable: true,
    modal: false,   //模态窗口设为false, 在显示时设置是否为模态窗口
    // defaultFocus: 'organizationtreepicker',
    closeAction: 'hide',
    bodyStyle: 'padding: 10px',

    items: [{
        xtype: 'form',
        // scrollable: true,
        // border: false,
        modelValidation: true,//启用model中的validators
        

        // defaults: {
        //     //form 内部组件离 form 的距离: 上/右/下/左
        //     margin: '-10 5 5 5'
        // },

        
        // fieldDefaults: {
        //     msgTarget: 'side',
        //     labelAlign: 'right',
        //     labelWidth: 35,
        //     flex: 1,
        //     margin: '0 10 5 0'  //form内各field离fieldset的距离
        // },
        reference: 'roleForm',
        // items: [{
        //     xtype: 'fieldset',
        //     title: '角色信息',
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
                    bind: {
                        readOnly: '{windowOptions.readOnly}',
                        value: '{current.record.name}'
                    }
                }, {
                    xtype: 'textfield',
                    fieldLabel: '英文名称',
                    labelAlign: 'right',
                    labelWidth: 60,
                    bind: {
                        readOnly: '{windowOptions.readOnly}',
                        value: '{current.record.enname}'
                    }
                },{
                    xtype: 'checkableuxtreepicker',
                    reference: 'menutreepicker',
                    fieldLabel: '菜单',
                    labelAlign: 'right',
                    labelWidth: 60,
                    displayField: 'name',
                    valueField: 'id',
                    scrollable: true,
                    rootVisible: false,
                    maxPickerHeight: 200,
                    checkable: true,
                    triggers : {
                        clear : {
                            type : 'clear',
                            weight : -1
                        }
                    },
                    bind: {
                        readOnly: '{windowOptions.readOnly}',
                        value: '{current.record.menuIdList}'
                    }
                },{
                    xtype: 'textareafield',
                    // grow: true,
                    labelAlign: 'right',
                    labelWidth: 60,
                    fieldLabel: '备注',
                    bind: {
                        readOnly: '{windowOptions.readOnly}',
                        value: '{current.record.remarks}'
                    }
                }]
            // }],
    }],

    buttons: [ '->',
        {
            text: '保存',
            itemId: 'saveBtn',
            iconCls: 'x-fa fa-floppy-o',
            formBind: true,
            bind: {
                disabled: '{!roleStatus.validAndDirty}',
                hidden: '{windowOptions.saveButtonHidden}'
            },
            handler: 'onSaveBtnClick'
        }, {
            text: '关闭',
            itemId: 'cancelBtn',
            handler: 'onCancelBtnClick'
        }],

    listeners: {
        close: 'onWindowClose',

        beforeshow: {
            fn: 'onWindowBeforeShow',
            single: true       //只执行一次
        }
    },

    initComponent: function () {
        var me = this;

        me.callParent(arguments);
    }
});