
Ext.define('MyApp.view.cktj.widget.ModifyEmployeeTaskWindow', {
    extend: 'Ext.window.Window',

    alias: 'widget.modifyemployeetaskwindow',

    requires: [
        'MyApp.ux.form.field.UxTreePicker',
        'MyApp.ux.form.trigger.TriggerClear',
        'MyApp.model.cktj.EmployeeAccount'
    ],

    itemId: 'modifyEmployeeTaskWindow',

    title: '变更揽储人-任务数',

    width: 700,
    height: 340,
    layout: {
        type: 'fit'
    },
    // resizable: false,
    scrollable: true,
    modal: false,   //模态窗口设为false, 在显示时设置是否为模态窗口
    closeAction: 'hide',

    items:[{
        xtype: 'form',
        // region: 'south',
        reference: 'modifyEmployeeTaskForm',

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
            labelWidth: 60,
            flex: 1,
            margin: '0 10 5 0'  //form内各field离fieldset的距离
        },

        items: [{
            xtype: 'fieldset',
            title: '变更后的揽储人信息-任务数',
            layout: 'anchor',
            defaults: {
                anchor: '100%'
            },
            items: [{
                xtype: 'container',
                reference: 'modEmployeeTaskContainer-1',
                hidden: false,
                layout: 'hbox',
                items: [{
                    xtype: 'combobox',
                    reference: 'modifyEmployeeTaskUserCombobox-1',
                    flex: 5,
                    fieldLabel: '员工编号',
                    displayField: 'code',
                    allowBlank: false,
                    anchor: '-15',
                    name: 'rwcode1',
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
                    name: 'rwpercentage1',
                    flex: 3,
                    minValue: 0,
                    maxValue: 1,
                    hidden: false,
                    decimalPrecision: 2,
                    allowBlank: false,
                    allowDecimals: true,
                    reference: 'regEmployeeUserPercentage-1',
                    text: '分成比例'    
                },{
                    xtype: 'radio',
                    flex: 2,
                    boxLabel: '是否主维护人',
                    name: 'mainTeller',
                    checked: true,
                    inputValue: 'radio1'
                }]
            },{
                xtype: 'container',
                reference: 'modEmployeeTaskContainer-2',
                layout: 'hbox',
                hidden: true,
                items: [{
                    xtype: 'combobox',
                    hidden: false,
                    reference: 'modifyEmployeeTaskUserCombobox-2',
                    flex: 5,
                    fieldLabel: '员工编号',
                    displayField: 'code',
                    allowBlank: true,
                    anchor: '-15',
                    name: 'rwcode2',
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
                    name: 'rwpercentage2',
                    flex: 3,
                    minValue: 0,
                    maxValue: 1,
                    hidden: false,
                    decimalPrecision: 2,
                    allowBlank: true,
                    allowDecimals: true,
                    reference: 'modEmployeeUserPercentage-2',
                    text: '分成比例'    
                },{
                    xtype: 'radio',
                    flex: 2,
                    boxLabel: '是否主维护人',
                    name: 'mainTeller',
                    checked: false,
                    inputValue: 'radio2'
                }]
            },{
                xtype: 'container',
                reference: 'modEmployeeTaskContainer-3',
                layout: 'hbox',
                hidden: true,
                items: [{
                    xtype: 'combobox',
                    hidden: false,
                    reference: 'modifyEmployeeTaskUserCombobox-3',
                    flex: 5,
                    fieldLabel: '员工编号',
                    displayField: 'code',
                    allowBlank: true,
                    anchor: '-15',
                    name: 'rwcode3',
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
                    name: 'rwpercentage3',
                    flex: 3,
                    minValue: 0,
                    maxValue: 1,
                    hidden: false,
                    decimalPrecision: 2,
                    allowBlank: true,
                    allowDecimals: true,
                    reference: 'modEmployeeUserPercentage-3',
                    text: '分成比例'    
                },{
                    xtype: 'radio',
                    flex: 2,
                    boxLabel: '是否主维护人',
                    name: 'mainTeller',
                    checked: false,
                    inputValue: 'radio3'
                }]
            },{
                xtype: 'container',
                reference: 'modEmployeeTaskContainer-4',
                layout: 'hbox',
                hidden: true,
                items: [{
                    xtype: 'combobox',
                    hidden: false,
                    reference: 'modifyEmployeeTaskUserCombobox-4',
                    flex: 5,
                    fieldLabel: '员工编号',
                    displayField: 'code',
                    allowBlank: true,
                    anchor: '-15',
                    name: 'rwcode4',
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
                    name: 'rwpercentage4',
                    flex: 3,
                    minValue: 0,
                    maxValue: 1,
                    hidden: false,
                    decimalPrecision: 2,
                    allowBlank: true,
                    allowDecimals: true,
                    reference: 'modEmployeeUserPercentage-4',
                    text: '分成比例'    
                },{
                    xtype: 'radio',
                    flex: 2,
                    boxLabel: '是否主维护人',
                    name: 'mainTeller',
                    checked: false,
                    inputValue: 'radio4'
                }]
            },{
                xtype: 'container',
                reference: 'modEmployeeTaskContainer-5',
                layout: 'hbox',
                hidden: true,
                items: [{
                    xtype: 'combobox',
                    hidden: false,
                    reference: 'modifyEmployeeTaskUserCombobox-5',
                    flex: 5,
                    fieldLabel: '员工编号',
                    displayField: 'code',
                    allowBlank: true,
                    anchor: '-15',
                    name: 'rwcode5',
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
                    name: 'rwpercentage5',
                    flex: 3,
                    minValue: 0,
                    maxValue: 1,
                    hidden: false,
                    decimalPrecision: 2,
                    allowBlank: true,
                    allowDecimals: true,
                    reference: 'modEmployeeUserPercentage-5',
                    text: '分成比例'    
                },{
                    xtype: 'radio',
                    flex: 2,
                    boxLabel: '是否主维护人',
                    name: 'mainTeller',
                    checked: false,
                    inputValue: 'radio5'
                }]
            },{
                xtype: 'container',
                reference: 'modEmployeeTaskContainer-6',
                layout: 'hbox',
                hidden: true,
                items: [{
                    xtype: 'combobox',
                    hidden: false,
                    reference: 'modifyEmployeeTaskUserCombobox-6',
                    flex: 5,
                    fieldLabel: '员工编号',
                    displayField: 'code',
                    allowBlank: true,
                    anchor: '-15',
                    name: 'rwcode6',
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
                    name: 'rwpercentage6',
                    flex: 3,
                    minValue: 0,
                    maxValue: 1,
                    hidden: false,
                    decimalPrecision: 2,
                    allowBlank: true,
                    allowDecimals: true,
                    reference: 'modEmployeeUserPercentage-6',
                    text: '分成比例'    
                },{
                    xtype: 'radio',
                    flex: 2,
                    boxLabel: '是否主维护人',
                    name: 'mainTeller',
                    checked: false,
                    inputValue: 'radio6'
                }]
            },{
                xtype: 'container',
                // layout: 'hbox',
                padding: '0 0 0 500',
                items: [{
                    xtype: 'button',
                    itemId: 'modEmployeeTaskAddPercentageBtn',
                    text: '添加揽储人',
                    handler: 'onAddPercentageBtnClick'
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                padding: '0 15 0 0',
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
            itemId: 'saveModEmployeeTaskBtn',
            iconCls : 'x-fa fa-floppy-o',
            formBind: true,
            handler: 'onModifyEmployeeTaskSaveBtnClick'
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