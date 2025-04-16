Ext.define('MyApp.view.sys.widget.UserOrganizationWindow', {
    extend: 'Ext.window.Window',

    alias: 'widget.userorganizationwindow',

    requires: [
        'MyApp.ux.form.field.UxTreePicker',
        'MyApp.ux.form.trigger.TriggerClear'
    ],

    itemId: 'userOrganizationWindow',

    title: '用户机构调动',

    width: 700,
    maxHeight: 700,
    y: 100,
    layout: {
        type: 'fit'
    },
    resizable: true,
    scrollable: true,
    modal: false,   //模态窗口设为false, 在显示时设置是否为模态窗口
    closeAction: 'hide',
    closable: false,
    padding: '0 5 0 5',

    items: [{
        xtype: 'form',
        reference: 'userOrganizationForm',

        scrollable: true,
        border: false,
        modelValidation: true,

        defaults: {
            //form 内部组件离 form 的距离: 上/右/下/左
            padding: '0 5 0 5'
        },

        fieldDefaults: {
            msgTarget: 'side',
            labelAlign: 'right',
            labelWidth: 74,
            flex: 1,
            margin: '0 10 5 0'  //form内各field离fieldset的距离
        },

        items: [{
            xtype: 'fieldset',
            title: '用户当前在职机构',
            layout: 'anchor',
            defaults: {
                anchor: '100%'
            },
            items: [{
                xtype: 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'textfield',
                    fieldLabel: '编号/柜员号',
                    readOnly: true,
                    bind: {
                        value: '{current.record.userCode}'
                    }
                }, {
                    xtype: 'textfield',
                    fieldLabel: '姓名',
                    readOnly: true,
                    bind: {
                        value: '{current.record.userName}'
                    }
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'textfield',
                    fieldLabel: '机构名称',
                    readOnly: true,
                    bind: {
                        value: '{current.record.organizationName}'
                    }
                }, {
                    xtype: 'textfield',
                    fieldLabel: '调入日期',
                    readOnly: true,
                    bind: {
                        value: '{current.record.startDate:date("Y-m-d")}'
                    }
                }]
            }, {
                xtype: 'textareafield',
                grow: true,
                fieldLabel: '备注',
                readOnly: true,
                bind: {
                    value: '{current.record.remarks}'
                }
            }]
        },{
            xtype: 'fieldset',
            reference: 'intoOrganizationFieldset',
            title: '调入机构',
            layout: 'anchor',
            defaults: {
                anchor: '100%'
            },
            items: [{
                xtype: 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'uxtreepicker',
                    reference: 'intoorganizationtreepicker',
                    fieldLabel: '调入机构',
                    displayField: 'name',
                    valueField: 'id',
                    scrollable: true,
                    rootVisible: false,
                    maxPickerHeight: 200,
                    allowBlank: false,
                    blankText: '请选择调入机构!',
                    name: 'organizationId',
                    bind: {
                        store: '{organizationStore}'
                    },
                    triggers: {
                        clear: {
                            type: 'clear',
                            weight: -1
                        }
                    }
                }, {
                    xtype: 'combo',
                    id: 'intoOrganizationTypeCombo',
                    queryMode: 'local',
                    fieldLabel: '调入方式',
                    displayField: 'text',
                    valueField: 'id',
                    editable: false,
                    allowBlank: false,
                    blankText: '请选择调入方式!',
                    name: 'status',
                    bind: {
                        store: '{intoOrganizationTypeStore}'
                    },
                    listeners:{
                        afterrender: 'onIntoOrganizationTypeRender'
                    }
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'textareafield',
                    grow: true,
                    fieldLabel: '备注',
                    name: 'remarks'
                }]
            }]
        }],

        buttons: [{
            text: '保存',
            itemId: 'saveBtn',
            iconCls: 'x-fa fa-floppy-o',
            formBind: true,
            handler: 'onUserOrganizationSaveBtnClick'
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