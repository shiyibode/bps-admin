/**
 * Created by syb on 2021/05/21.
 */
Ext.define('MyApp.view.dktj.widget.ModifyPositionTellerWindow', {
    extend: 'Ext.window.Window',

    alias: 'widget.dktjmodifypositiontellerwindow',

    requires: [
        'MyApp.ux.form.field.UxTreePicker',
        'MyApp.ux.form.trigger.TriggerClear',
        'MyApp.model.dktj.EmployeeInterest'
    ],

    itemId: 'modifyPositionTellerWindow',

    title: '变更岗位责任人',

    width: 700,
    maxHeight: 660,
    layout: {
        type: 'fit'
    },
    resizable: true,
    scrollable: true,
    modal: false,   //模态窗口设为false, 在显示时设置是否为模态窗口
    closeAction: 'hide',

    items:[{
        xtype: 'form',
        reference: 'modifyPositionTellerForm',

        layout: {
            type: 'form',
            align: 'stretch'
        },
        scrollable: true,
        border: false,
        modelValidation: true,

        defaults: {
            //form 内部组件离 form 的距离: 上/右/下/左
            margin: '-10 5 5 5'
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
            title: '客户信息',
            layout: 'anchor',
            defaults: {
                anchor: '100%'
            },
            items: [{
                xtype: 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'textfield',
                    fieldLabel: '账号',
                    readOnly: true,
                    bind: {
                        value: '{selectionRecord.accountNo}'
                    }
                }, {
                    xtype: 'textfield',
                    fieldLabel: '客户名称',
                    readOnly: true,
                    bind: {
                        value: '{selectionRecord.customerName}'
                    }
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'textfield',
                    fieldLabel: '信贷客户号',
                    readOnly: true,
                    bind: {
                        value: '{selectionRecord.xdCustomerNo}'
                    }
                }, {
                    xtype: 'textfield',
                    fieldLabel: '贷款机构',
                    readOnly: true,
                    bind: {
                        value: '{selectionRecord.lnOrgCode}'
                    }
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'textfield',
                    fieldLabel: '模板',
                    readOnly: true,
                    bind: {
                        value: '{selectionRecord.templateName}'
                    }
                }, {
                    xtype: 'textfield',
                    fieldLabel: '岗位',
                    readOnly: true,
                    bind: {
                        value: '{selectionRecord.positionName}'
                    }
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'textfield',
                    fieldLabel: '柜员号',
                    readOnly: true,
                    bind: {
                        value: '{selectionRecord.tellerCode}'
                    }
                }, {
                    xtype: 'textfield',
                    fieldLabel: '柜员名称',
                    readOnly: true,
                    bind: {
                        value: '{selectionRecord.tellerName}'
                    }
                }]
            }]
        }, {
            xtype: 'fieldset',
            title: '新责任人信息',
            layout: 'anchor',
            defaults: {
                anchor: '100%'
            },
            items: [{
                        xtype: 'combobox',
                        reference: 'modifyPositionTellerUserCombobox',
                        fieldLabel: '柜员号/姓名',
                        displayField: 'userCode',
                        allowBlank: false,
                        anchor: '-15',
                        bind: {
                            store: '{userStore}'
                        },
                        minChars: 2,
                        queryParam: 'userCode', //自动请求时携带的参数名称
                        queryMode: 'remote',
                        listConfig: {
                            itemTpl: [
                                '<div data-qtip="{userCode} - {userName} - {organizationName}">{userCode} - {userName} - {organizationName}</div>'
                            ]
                        },
                        listeners: {
                            change: 'onEmployeeComboboxChange',
                            select: 'onEmployeeComboboxSelect'
                        }
                    }]
        }],

        buttons: [{
            text: '保存',
            itemId: 'saveBtn',
            iconCls : 'x-fa fa-floppy-o',
            formBind: true,
            handler: 'onModifyPositionTellerSaveBtnClick'
        }, {
            text: '关闭',
            itemId: 'cancelBtn',
            handler: 'onCancelBtnClick'
        }]
    }],

    listeners: {
        close: 'onWindowClose',
    }
});