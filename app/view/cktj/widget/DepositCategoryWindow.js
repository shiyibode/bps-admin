
Ext.define('MyApp.view.cktj.widget.DepositCategoryWindow', {
    extend: 'Ext.window.Window',

    alias: 'widget.depositcategorywindow',

    requires: [
        'MyApp.ux.form.field.UxTreePicker',
        'MyApp.ux.form.trigger.TriggerClear'
    ],

    itemId: 'depositcategoryWindow',

    bind: {
        title: '{windowOptions.title}'
    },

    width: 700,
    height: 650,
    layout: {
        type: 'border'
    },
    resizable: false,
    scrollable: true,
    modal: false,   //模态窗口设为false, 在显示时设置是否为模态窗口
    closeAction: 'hide',

    items:[{
        xtype: 'form',
        region: 'north',
        reference: 'depositCategoryForm',

        layout: {
            type: 'form',
            align: 'stretch'
        },
        scrollable: true,
        border: false,
        modelValidation: true,

        defaults: {
            //form 内部组件离 form 的距离: 上/右/下/左
            // margin: '-10 5 10 5'
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
            title: '分类信息',
            layout: 'anchor',
            defaults: {
                anchor: '100%'
            },
            items: [{
                xtype: 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'uxtreepicker',
                    reference: 'uxtreepicker',
                    fieldLabel: '上级分类',
                    displayField: 'name',
                    valueField: 'id',
                    scrollable: true,
                    rootVisible: false,
                    maxPickerHeight: 200,
                    triggers : {
                        clear : {
                            type : 'clear',
                            weight : -1
                        }
                    },
                    bind: {
                        readOnly: '{windowOptions.readOnly}',
                        value: '{current.record.parentId}'
                    }
                }, {
                    xtype: 'combo',
                    fieldLabel: '存款类型',
                    displayField: 'text',
                    valueField: 'value',
                    editable: false,
                    triggers : {
                        clear : {
                            type : 'clear',
                            weight : -1
                        }
                    },
                    bind: {
                        store: '{depositTypeStore}',
                        readOnly: '{windowOptions.readOnly}',
                        value: '{current.record.depositType}'
                    }
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'textfield',
                    fieldLabel: '名称',
                    bind: {
                        readOnly: '{windowOptions.readOnly}',
                        value: '{current.record.name}'
                    }
                }, {
                    xtype: 'textfield',
                    fieldLabel: '编码',
                    bind: {
                        readOnly: '{windowOptions.readOnly}',
                        value: '{current.record.no}'
                    }
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'combo',
                    fieldLabel: '客户类型',
                    displayField: 'text',
                    valueField: 'value',
                    editable: false,
                    triggers : {
                        clear : {
                            type : 'clear',
                            weight : -1
                        }
                    },
                    bind: {
                        store: '{customerTypeStore}',
                        readOnly: '{windowOptions.readOnly}',
                        value: '{current.record.customerType}'
                    },
                    listeners: {
                        change: 'onCustomerTypeChange'
                    }
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'numberfield',
                    fieldLabel: '排序',
                    bind: {
                        readOnly: '{windowOptions.readOnly}',
                        value: '{current.record.sort}'
                    }
                }, {
                    xtype: 'combo',
                    fieldLabel: '归属',
                    displayField: 'text',
                    valueField: 'value',
                    editable: false,
                    triggers : {
                        clear : {
                            type : 'clear',
                            weight : -1
                        }
                    },
                    bind: {
                        store: '{belongToStore}',
                        readOnly: '{windowOptions.readOnly}',
                        value: '{current.record.belongTo}'
                    }
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'checkboxfield',
                    fieldLabel: '有效',
                    inputValue: true,
                    uncheckedValue: false,
                    bind: {
                        readOnly: '{windowOptions.readOnly}',
                        value: '{current.record.validFlag}'
                    }
                },{
                    xtype: 'checkboxfield',
                    fieldLabel: '表格列分组',
                    inputValue: true,
                    uncheckedValue: false,
                    bind: {
                        readOnly: '{windowOptions.readOnly}',
                        value: '{current.record.columnGroupFlag}'
                    }
                }, {
                    xtype: 'checkboxfield',
                    fieldLabel: '计入总存款',
                    inputValue: true,
                    uncheckedValue: false,
                    bind: {
                        readOnly: '{windowOptions.readOnly}',
                        value: '{current.record.intoTotalFlag}'
                    }
                },{
                    xtype: 'checkboxfield',
                    fieldLabel: '生成小计',
                    inputValue: true,
                    uncheckedValue: false,
                    bind: {
                        readOnly: '{windowOptions.readOnly}',
                        value: '{current.record.subtotalFlag}'
                    }
                },{
                    xtype: 'checkboxfield',
                    fieldLabel: '有计提利息',
                    inputValue: true,
                    uncheckedValue: false,
                    bind: {
                        readOnly: '{windowOptions.readOnly}',
                        value: '{current.record.prvisnIntFlag}'
                    }
                }, {
                    xtype: 'checkboxfield',
                    fieldLabel: '有兑付利息',
                    inputValue: true,
                    uncheckedValue: false,
                    bind: {
                        readOnly: '{windowOptions.readOnly}',
                        value: '{current.record.payIntFlag}'
                    }
                }]
            }]
        }]
    }, {
        xtype: 'container',
        region: 'south',
        style: {
            backgroundColor: 'white'
        },
        height: 280,
        layout: 'anchor',
        defaults: {
            anchor: '100%'
        },
        items: [{
            xtype: 'container',
            margin: '0 10 0 10',
            border: 1,
            style: {
                borderColor: 'silver',
                borderStyle: 'solid'
            },
            items: [{
                xtype: 'treepanel',
                reference: 'subjectDictGrid',
                height: 270,
                title: '科目列表',
                bind: {
                    store: '{subjectDictStore}'
                },

                selModel: {
                    mode: 'SIMPLE',
                    ignoreRightMouseSelection:true
                },

                rootVisible: false,
                columnLines: true,
                columns: {
                    defaults: {
                        align: 'left'
                    },
                    items: [{
                        xtype: 'treecolumn',
                        text: '科目号',
                        dataIndex: 'no',
                        flex: 1
                    }, {
                        text: '名称',
                        dataIndex: 'name',
                        flex: 1
                    }]
                },

                listeners: {
                    select: 'onSubjectDictGridSelect',
                    deselect: 'onSubjectDictGridDeselect',
                    selectionchange: 'onSubjectDictGridSelectionChange',
                }
            }]
        }]
    }],


    buttons: [{
        text: '上一条',
        itemId: 'prevMenuBtn',
        bind: {
            hidden: '{windowOptions.prevAndNextButtonHidden}'
        },
        handler: 'prevBtnClick'
    }, {
        text: '下一条',
        itemId: 'nextMenuBtn',
        bind: {
            hidden: '{windowOptions.prevAndNextButtonHidden}'
        },
        handler: 'nextBtnClick'
    }, '->', {
        text: '保存',
        itemId: 'saveBtn',
        iconCls : 'x-fa fa-floppy-o',
        bind: {
            disabled: '{!depositcategoryStatus.validAndDirty}',
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

        beforeshow : {
            fn : 'onWindowBeforeShow',
            single : true       //只执行一次
        },

        show: 'onWindowShow'
    }

});