Ext.define('MyApp.view.dktj.EmployeeCustomerModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.dktjemployeecustomer',

    requires: [
        'Ext.data.Store',
        'Ext.data.TreeStore'
    ],

    data: {
        gridSelectionRecords: [],

        accountEmployee: null
    },

    formulas: {
        selectionRecord: {
            bind: {
                bindTo: '{gridSelectionRecords}',
                deep: true
            },
            get: function(records) {
                if (records && records.length > 0) {
                    return records[0];
                }
                return null;
            }
        },

        selectionText: {
            bind: {
                bindTo: '{gridSelectionRecords}',
                deep: true
            },
            get: function(records) {
                var title = '';
                if (records) {
                    if (records.length == 1) {
                        title = '　〖<em> ' + records[0].get('identityNo') + ' ' + records[0].get('customerName') + ' </em>〗';
                    } else if (records.length > 1) {
                        title = '　已选择〖<em> ' + records.length + ' </em>〗个账户';
                    }
                }
                return title;
            }
        },

        detailSource: {
            bind: {
                bindTo: '{gridSelectionRecords}',
                deep: true
            },
            get: function(records) {
                var source = {};
                if (records && records.length >= 1) {
                    source = {
                        '名称' : records[0].get('text'),
                        '图标' : records[0].get('iconCls'),
                        '顺序' : records[0].get('sort'),
                        '创建时间' : records[0].get('createTime')
                    };
                }
                return source
            }
        },

        regEmployeeUserComboboxSelection: {
            bind: '{regEmployeeUserCombobox.data}',
            get: function(data) {
                this.set('accountEmployee', data);
            }
        }
    },

    stores: {
        organizationStore: {
            type: 'tree',
            model: 'MyApp.model.sys.Organization',
            pageSize: 0,
            autoLoad: false,
            proxy: {
                type: 'format',
                url: CFG.getGlobalPath() + '/sys/organization/getOrganizationTree'
            },
            remoteFilter: true,
            remoteSort: true,
            root: {
                id: 0,
                text: '最高机构',
                expanded: true
            },
            listeners: {
                load: {
                    fn: 'onOrganizationStoreLoad',
                    single: true,       //只执行一次
                    delay:1
                }
            }
        },

        userStore: {
            type: 'store',
            model: 'MyApp.model.sys.User',
            pageSize: 30,
            autoLoad: false,
            remoteFilter: true,
            remoteSort: true,
            proxy: {
                type: 'format',
                url: CFG.getGlobalPath() + '/dktj/employeecustomer/userList'
            },
            listeners: {
                beforeload: 'onUserStoreBeforeLoad',
                load: 'onUserStoreLoad'
            }
        },

        availableUserStore: {
            type: 'store',
            model: 'MyApp.model.sys.User',
            pageSize: 30,
            autoLoad: false,
            remoteFilter: true,
            remoteSort: true,
            proxy: {
                type: 'format',
                url: CFG.getGlobalPath() + '/dktj/employeecustomer/tableUserList'
            }
        },

        templateStore: {
            type: 'store',
            model: 'MyApp.model.dktj.Template',
            pageSize: 30,
            autoLoad: false,
            remoteFilter: true,
            remoteSort: true,
            proxy: {
                type: 'format',
                url: CFG.getGlobalPath() + '/dktj/template/getTemplateList'
            }
        },

        templateDetailStore: {
            type: 'store',
            model: 'MyApp.model.dktj.TemplateDetail',
            pageSize: 30,
            autoLoad: false,
            remoteFilter: true,
            remoteSort: true,
            proxy: {
                type: 'format',
                url: CFG.getGlobalPath() + '/dktj/template/getTemplateDetailList'
            }
        },

        //可登记揽储人账户Store
        unregisterCustomerStore: {
            type: 'store',
            model: 'MyApp.model.dktj.EmployeeCustomer',
            pageSize: 30,
            autoLoad: false,
            remoteFilter: true,
            remoteSort: true,
            proxy: {
                type: 'format',
                url: CFG.getGlobalPath() + '/dktj/employeecustomer/getUnregisterCustomer'
            },
            listeners: {
                beforeload: 'onEmployeeCustomerStoreBeforeLoad',
                load: 'onEmployeeCustomerStoreLoad'
            }
        },

        customerTypeStore: {
            fields: ['text', 'value'],
            data:[
                ['个人', '1'],
                ['对公', '2']
            ]
        },

        customerStatusStore: {
            fields: ['text', 'value'],
            data:[
                ['固定客户', '1'],
                ['流动客户', '2']
            ]
        },

        //已登记揽储人但未复核的账户Store
        registerUncheckedCustomerStore: {
            type: 'store',
            model: 'MyApp.model.dktj.EmployeeCustomer',
            pageSize: 30,
            autoLoad: false,
            remoteFilter: true,
            remoteSort: true,
            proxy: {
                type: 'format',
                url: CFG.getGlobalPath() + '/dktj/employeecustomer/getUncheckedCustomer'
            },
            listeners: {
                beforeload: 'onEmployeeCustomerStoreBeforeLoad',
                load: 'onEmployeeCustomerStoreLoad'
            }
        },

        //可变更揽储人账户Store
        modifiableCustomerStore: {
            type: 'store',
            model: 'MyApp.model.dktj.EmployeeCustomer',
            pageSize: 30,
            autoLoad: false,
            remoteFilter: true,
            remoteSort: true,
            proxy: {
                type: 'format',
                url: CFG.getGlobalPath() + '/dktj/employeecustomer/getModifiableCustomer'
            },
            listeners: {
                beforeload: 'onEmployeeCustomerStoreBeforeLoad',
                load: 'onEmployeeCustomerStoreLoad'
            }
        },

        //已变更揽储人但未复核的账户Store
        modifiedUncheckedCustomerStore: {
            type: 'store',
            model: 'MyApp.model.dktj.EmployeeCustomer',
            pageSize: 30,
            autoLoad: false,
            remoteFilter: true,
            remoteSort: true,
            proxy: {
                type: 'format',
                url: CFG.getGlobalPath() + '/dktj/employeecustomer/getModifiedUncheckedCustomer'
            },
            listeners: {
                beforeload: 'onEmployeeCustomerStoreBeforeLoad',
                load: 'onEmployeeCustomerStoreLoad'
            }
        },

        //揽储人存款账户Store
        employeeCustomerStore: {
            type: 'store',
            model: 'MyApp.model.dktj.EmployeeCustomer',
            pageSize: 30,
            autoLoad: false,
            remoteFilter: true,
            remoteSort: true,
            proxy: {
                type: 'format',
                url: CFG.getGlobalPath() + '/dktj/employeecustomer/get'
            },
            listeners: {
                beforeload: 'onEmployeeCustomerStoreBeforeLoad',
                load: 'onEmployeeCustomerStoreLoad'
            }
        },

        allEmployeeCustomerStore: {
            type: 'store',
            model: 'MyApp.model.dktj.EmployeeCustomer',
            autoLoad: false,
            remoteFilter: true,
            remoteSort: true,
            proxy: {
                type: 'format',
                url: CFG.getGlobalPath() + '/dktj/employeecustomer/getAllEmployeeCustomer'
            }
        },

        specialAccountTypeStore: {
            type: 'store',
            model: 'MyApp.model.dktj.SpecialAccountType',
            autoLoad: true,
            proxy: {
                type: 'format',
                url: CFG.getGlobalPath() + '/dktj/employeecustomer/getSpecialAccountTypeList'
            }
        }


    }
});
