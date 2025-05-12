
Ext.define('MyApp.view.cktj.widget.ModifyEmployeePaymentWindow', {
    extend: 'Ext.window.Window',

    alias: 'widget.modifyemployeepaymentwindow',

    requires: [
        'MyApp.ux.form.field.UxTreePicker',
        'MyApp.ux.form.trigger.TriggerClear',
        'MyApp.model.cktj.EmployeeAccount'
    ],

    itemId: 'modifyEmployeePaymentWindow',

    title: '变更揽储人',

    width: 600,
    height: 340,
    layout: {
        type: 'fit'
    },
    scrollable: true,
    modal: false,   //模态窗口设为false, 在显示时设置是否为模态窗口
    closeAction: 'hide',

    items:[{
        xtype: 'form',
        // region: 'south',
        reference: 'modifyEmployeePaymentForm',

        layout: {
            type: 'form',
            align: 'stretch'
        },
        scrollable: true,
        border: false,
        modelValidation: true,

        defaults: {
            // margin: '-10 5 5 5'
            // padding: '0 0 0 0'
        },

        fieldDefaults: {
            msgTarget: 'side',
            labelAlign: 'right',
            labelWidth: 60,
            flex: 1,
            margin: '0 0 5 0'  //form内各field离fieldset的距离
        },

        items: [{
            xtype: 'fieldset',
            margin: '-10 0 0 0',
            title: '变更后的揽储人信息-任务数',
            layout: 'anchor',
            defaults: {
                anchor: '100%',
                padding: '0 25 0 0'
            },
            items: [{
                xtype: 'container',
                reference: 'modEmployeePaymentContainer-1',
                hidden: false,
                layout: 'hbox',
                items: [{
                    xtype: 'combobox',
                    reference: 'modifyEmployeePaymentUserCombobox-1',
                    flex: 5,
                    fieldLabel: '员工编号',
                    displayField: 'code',
                    allowBlank: false,
                    anchor: '-15',
                    name: 'jccode1',
                    bind: {
                        store: '{userStoreMod}'
                    },
                    minChars: 2,
                    queryParam: 'code',
                    queryMode: 'remote',
                    listConfig: {
                        itemTpl: [
                            '<div data-qtip="{code} - {name} - {organizationName}">{code} - {name} - {organizationName}</div>'
                        ]
                    },
                    listeners: {
                        change: 'onEmployeeComboboxChange1',
                        select: 'onEmployeeComboboxSelect1'
                    }
                },{
                    xtype: 'numberfield',
                    fieldLabel: '比例',
                    name: 'jcpercentage1',
                    flex: 3,
                    minValue: 0,
                    maxValue: 1,
                    hidden: false,
                    decimalPrecision: 2,
                    allowBlank: false,
                    allowDecimals: true,
                    reference: 'regEmployeeUserPercentage-1',
                    text: '分成比例'    
                }]
            },{
                xtype: 'container',
                reference: 'modEmployeePaymentContainer-2',
                layout: 'hbox',
                hidden: true,
                items: [{
                    xtype: 'combobox',
                    hidden: false,
                    reference: 'modifyEmployeePaymentUserCombobox-2',
                    flex: 5,
                    fieldLabel: '员工编号',
                    displayField: 'code',
                    allowBlank: true,
                    anchor: '-15',
                    name: 'jccode2',
                    bind: {
                        store: '{userStoreMod}'
                    },
                    minChars: 2,
                    queryParam: 'code',
                    queryMode: 'remote',
                    listConfig: {
                        itemTpl: [
                            '<div data-qtip="{code} - {name} - {organizationName}">{code} - {name} - {organizationName}</div>'
                        ]
                    },
                    listeners: {
                        change: 'onEmployeeComboboxChange2',
                        select: 'onEmployeeComboboxSelect2'
                    }
                },{
                    xtype: 'numberfield',
                    fieldLabel: '比例',
                    name: 'jcpercentage2',
                    flex: 3,
                    minValue: 0,
                    maxValue: 1,
                    hidden: false,
                    decimalPrecision: 2,
                    allowBlank: true,
                    allowDecimals: true,
                    reference: 'modEmployeeUserPercentage-2',
                    text: '分成比例'    
                }]
            },{
                xtype: 'container',
                reference: 'modEmployeePaymentContainer-3',
                layout: 'hbox',
                hidden: true,
                items: [{
                    xtype: 'combobox',
                    hidden: false,
                    reference: 'modifyEmployeePaymentUserCombobox-3',
                    flex: 5,
                    fieldLabel: '员工编号',
                    displayField: 'code',
                    allowBlank: true,
                    anchor: '-15',
                    name: 'jccode3',
                    bind: {
                        store: '{userStoreMod}'
                    },
                    minChars: 2,
                    queryParam: 'code',
                    queryMode: 'remote',
                    listConfig: {
                        itemTpl: [
                            '<div data-qtip="{code} - {name} - {organizationName}">{code} - {name} - {organizationName}</div>'
                        ]
                    },
                    listeners: {
                        change: 'onEmployeeComboboxChange3',
                        select: 'onEmployeeComboboxSelect3'
                    }
                },{
                    xtype: 'numberfield',
                    fieldLabel: '比例',
                    name: 'jcpercentage3',
                    flex: 3,
                    minValue: 0,
                    maxValue: 1,
                    hidden: false,
                    decimalPrecision: 2,
                    allowBlank: true,
                    allowDecimals: true,
                    reference: 'modEmployeeUserPercentage-3',
                    text: '分成比例'    
                }]
            },{
                xtype: 'container',
                reference: 'modEmployeePaymentContainer-4',
                layout: 'hbox',
                hidden: true,
                items: [{
                    xtype: 'combobox',
                    hidden: false,
                    reference: 'modifyEmployeePaymentUserCombobox-4',
                    flex: 5,
                    fieldLabel: '员工编号',
                    displayField: 'code',
                    allowBlank: true,
                    anchor: '-15',
                    name: 'jccode4',
                    bind: {
                        store: '{userStoreMod}'
                    },
                    minChars: 2,
                    queryParam: 'code',
                    queryMode: 'remote',
                    listConfig: {
                        itemTpl: [
                            '<div data-qtip="{code} - {name} - {organizationName}">{code} - {name} - {organizationName}</div>'
                        ]
                    },
                    listeners: {
                        change: 'onEmployeeComboboxChange4',
                        select: 'onEmployeeComboboxSelect4'
                    }
                },{
                    xtype: 'numberfield',
                    fieldLabel: '比例',
                    name: 'jcpercentage4',
                    flex: 3,
                    minValue: 0,
                    maxValue: 1,
                    hidden: false,
                    decimalPrecision: 2,
                    allowBlank: true,
                    allowDecimals: true,
                    reference: 'modEmployeeUserPercentage-4',
                    text: '分成比例'    
                }]
            },{
                xtype: 'container',
                reference: 'modEmployeePaymentContainer-5',
                layout: 'hbox',
                hidden: true,
                items: [{
                    xtype: 'combobox',
                    hidden: false,
                    reference: 'modifyEmployeePaymentUserCombobox-5',
                    flex: 5,
                    fieldLabel: '员工编号',
                    displayField: 'code',
                    allowBlank: true,
                    anchor: '-15',
                    name: 'jccode5',
                    bind: {
                        store: '{userStoreMod}'
                    },
                    minChars: 2,
                    queryParam: 'code',
                    queryMode: 'remote',
                    listConfig: {
                        itemTpl: [
                            '<div data-qtip="{code} - {name} - {organizationName}">{code} - {name} - {organizationName}</div>'
                        ]
                    },
                    listeners: {
                        change: 'onEmployeeComboboxChange5',
                        select: 'onEmployeeComboboxSelect5'
                    }
                },{
                    xtype: 'numberfield',
                    fieldLabel: '比例',
                    name: 'jcpercentage5',
                    flex: 3,
                    minValue: 0,
                    maxValue: 1,
                    hidden: false,
                    decimalPrecision: 2,
                    allowBlank: true,
                    allowDecimals: true,
                    reference: 'modEmployeeUserPercentage-5',
                    text: '分成比例'    
                }]
            },{
                xtype: 'container',
                reference: 'modEmployeePaymentContainer-6',
                layout: 'hbox',
                hidden: true,
                items: [{
                    xtype: 'combobox',
                    hidden: false,
                    reference: 'modifyEmployeePaymentUserCombobox-6',
                    flex: 5,
                    fieldLabel: '员工编号',
                    displayField: 'code',
                    allowBlank: true,
                    anchor: '-15',
                    name: 'jccode6',
                    bind: {
                        store: '{userStoreMod}'
                    },
                    minChars: 2,
                    queryParam: 'code',
                    queryMode: 'remote',
                    listConfig: {
                        itemTpl: [
                            '<div data-qtip="{code} - {name} - {organizationName}">{code} - {name} - {organizationName}</div>'
                        ]
                    },
                    listeners: {
                        change: 'onEmployeeComboboxChange6',
                        select: 'onEmployeeComboboxSelect6'
                    }
                },{
                    xtype: 'numberfield',
                    fieldLabel: '比例',
                    name: 'jcpercentage6',
                    flex: 3,
                    minValue: 0,
                    maxValue: 1,
                    hidden: false,
                    decimalPrecision: 2,
                    allowBlank: true,
                    allowDecimals: true,
                    reference: 'modEmployeeUserPercentage-6',
                    text: '分成比例'    
                }]
            },{
                xtype: 'container',
                padding: '0 0 0 400',
                items: [{
                    xtype: 'button',
                    itemId: 'modEmployeePaymentAddPercentageBtn',
                    text: '添加揽储人',
                    handler: 'onAddPercentageBtnClick'
                }]
            }, {
                xtype: 'container',
                anchor: '100%',
                layout: 'hbox',
                items: [{
                    xtype: 'textareafield',
                    fieldLabel: '变更原因',
                    grow: true,
                    allowBlank: false,
                    name: 'remarks'
                }]
            }]
        }],

        buttons: [{
            text: '保存',
            itemId: 'saveModEmployeePaymentBtn',
            iconCls : 'x-fa fa-floppy-o',
            formBind: true,
            handler: 'onModifyEmployeePaymentSaveBtnClick'
        }, {
            text: '关闭',
            itemId: 'cancelBtn',
            handler: 'onCancelBtnClick'
        }]
    }],




    listeners: {
        close: 'onWindowClose',
        beforeshow : {
            fn: 'onWindowBeforeShow'
        },
        show: 'onWindowShow'
    }
});