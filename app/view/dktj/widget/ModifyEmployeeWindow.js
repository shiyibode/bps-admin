/**
 * Created by syb on 2019/10/30.
 */
Ext.define('MyApp.view.dktj.widget.ModifyEmployeeWindow', {
    extend: 'Ext.window.Window',

    alias: 'widget.dktjmodifyemployeewindow',

    requires: [
        'MyApp.ux.form.field.UxTreePicker',
        'MyApp.ux.form.trigger.TriggerClear',
        'MyApp.model.dktj.EmployeeCustomer'
    ],

    itemId: 'modifyEmployeeWindow',

    title: '变更揽储人',

    width: 700,
    height: 640,
    layout: {
        type: 'border'
    },
    resizable: false,
    scrollable: true,
    modal: false,   //模态窗口设为false, 在显示时设置是否为模态窗口
    closeAction: 'hide',

    items:[{
        xtype: 'container',
        region: 'north',
        style: {
            backgroundColor: 'white'
        },
        height: 276,
        layout: 'anchor',
        defaults: {
            anchor: '100%'
        },
        items: [{
            xtype: 'container',
            margin: '10 10 0 10',
            border: 1,
            style: {
                borderColor: 'silver',
                borderStyle: 'solid'
            },
            items: [{
                xtype: 'grid',
                reference: 'modifyEmployeeWindowCustomerGrid',
                height: 270,
                title: '客户信息',
                store: Ext.create('Ext.data.Store', {
                    storeId: 'modifyEmployeeWindowCustomerStore' //在beforeWindowShow中给该store赋值
                }),

                columnLines: true,
                columns: [{
                    text: '维护人柜员号',
                    dataIndex: 'tellerCode'
                },{
                    text: '维护人姓名',
                    dataIndex: 'tellerName'
                },{
                    text: '统计贷款开始日期',
                    dataIndex: 'startDate'
                },{
                    text: '信贷客户号',
                    dataIndex: 'xdCustomerNo'
                }, {
                    text: '客户名称',
                    dataIndex: 'customerName'
                }, {
                    text: '证件号码',
                    dataIndex: 'identityNo'
                }]
            }]
        }]
    }, {
        xtype: 'form',
        region: 'south',
        reference: 'modifyEmployeeForm',

        layout: {
            type: 'form',
            align: 'stretch'
        },
        scrollable: true,
        border: false,
        modelValidation: true,

        defaults: {
            //form 内部组件离 form 的距离: 上/右/下/左
            margin: '0 0 0 0'
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
            title: '变更后的维护人信息',
            layout: 'anchor',
            defaults: {
                anchor: '100%'
            },
            items: [{
                xtype: 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'combobox',
                    reference: 'modifyEmployeeUserCombobox',
                    fieldLabel: '柜员号/姓名',
                    displayField: 'userCode',
                    allowBlank: false,
                    anchor: '-15',
                    bind: {
                        store: '{userStore}'
                    },
                    minChars: 2,
                    queryParam: 'userCode',
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
                    xtype: 'textfield',
                    fieldLabel: '姓名',
                    allowBlank: false,
                    readOnly: true,
                    bind: {
                        value: '{accountEmployee.userName}'
                    }
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'textfield',
                    fieldLabel: '机构编号',
                    allowBlank: false,
                    readOnly: true,
                    bind: {
                        value: '{accountEmployee.organizationCode}'
                    }
                }, {
                    xtype: 'textfield',
                    fieldLabel: '机构名称',
                    allowBlank: false,
                    readOnly: true,
                    bind: {
                        value: '{accountEmployee.organizationName}'
                    }
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'textfield',
                    fieldLabel: '调入日期',
                    readOnly: true,
                    bind: {
                        value: '{accountEmployee.startDate:date("Y-m-d")}'
                    }
                }, {
                    xtype: 'textfield',
                    fieldLabel: '当前状态',
                    readOnly: true,
                    bind: {
                        value: '{accountEmployee.statusStr}'
                    }
                }]
            }, {
                xtype: 'container',
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
            itemId: 'saveBtn',
            iconCls : 'x-fa fa-floppy-o',
            formBind: true,
            handler: 'onModifyEmployeeSaveBtnClick'
        }, {
            text: '关闭',
            itemId: 'cancelBtn',
            handler: 'onCancelBtnClick'
        }],
    }],




    listeners: {
        close: 'onWindowClose',
        beforeshow : {
            fn: 'onWindowBeforeShow'
        },
        show: 'onWindowShow'
    }
});