Ext.define('MyApp.view.dktj.widget.ModifyAccountTemplateWindow', {
    extend: 'Ext.window.Window',

    alias: 'widget.dktjmodifyaccounttemplatewindow',

    requires: [
        'MyApp.ux.form.trigger.TriggerClear'
    ],

    title: '变更模板',

    itemId: 'modifyAccountTemplateWindow',

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
        reference: 'modifyAccountTemplateForm',

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
                    fieldLabel: '证件号码',
                    readOnly: true,
                    bind: {
                        value: '{selectionRecord.identityNo}'
                    }
                },{
                    xtype: 'textfield',
                    fieldLabel: '开户机构',
                    readOnly: true,
                    bind: {
                        value: '{selectionRecord.orgCode}'
                    }
                }]
            }, {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [{
                        xtype: 'combobox',
                        name: 'userCode',
                        reference: 'modifyAccountTemplateUserCombobox',
                        fieldLabel: '维护人',
                        displayField: 'userCode',
                        valueField: 'userCode',
                        allowBlank: false,
                        anchor: '-15',
                        bind: {
                            store: '{userStore}',
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
                    }, {
                        xtype: 'combobox',
                        name: 'templateId',
                        fieldLabel: '新模板类型',
                        reference: 'templateCombo',
                        allowBlank: false,
                        displayField: 'name',
                        valueField: 'id',
                        editable: false,
                        bind: {
                            store: '{templateStore}'
                        },
                        listeners: {
                            change: 'onTemplateComboboxChange'
                        }
                    }]
                }]
        }, {
            xtype: 'container',
            reference: 'templateDetailContainer',
            height: 276,
            margin: '10 5 0 5',
            border: 1,
            style: {
                borderColor: 'silver',
                borderStyle: 'solid'
            },
            items: [{
                xtype: 'grid',
                reference: 'templateDetailGrid',
                title: '分成模板',
                height: 256,
                layout: 'fit',
                bind: {
                    store: '{templateDetailStore}'
                },
                columns:[{
                    text: '岗位类型',
                    dataIndex: 'positionName',
                    width: 200,
                    sortable: false
                },{
                    text: '员工号',
                    sortable: false,
                    dataIndex: 'tellerCode',
                    width: 150,
                    editor: {
                        xtype: 'combo',
                        triggerAction: 'all',
                        forceSelection: true,
                        bind: {
                            store: '{availableUserStore}'
                        },
                        displayField: 'userCode',
                        queryParam: 'userCodeOrName', //自动请求时携带的参数名称
                        queryMode: 'remote',
                        listConfig: {
                                        itemTpl: [
                                            '<div data-qtip="{userCode} - {userName} - {organizationName}">{userCode} - {userName} - {organizationName}</div>'
                                        ]
                                    }
                    }
                }],
                plugins:{
                    ptype: 'cellediting',
                    clicksToEdit: 1
                }
            }]
        }],

        buttons: [{
            text: '保存',
            itemId: 'saveBtn',
            iconCls : 'x-fa fa-floppy-o',
            formBind: true,
            handler: 'onModifyAccountTemplateSaveBtnClick'
        }, {
            text: '关闭',
            itemId: 'cancelBtn',
            handler: 'onCancelBtnClick'
        }]
    }],

    listeners: {
        close: 'onWindowClose',

        beforeshow : {
            fn : 'onWindowBeforeShow'
        }
    }
});