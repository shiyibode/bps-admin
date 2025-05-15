Ext.define('MyApp.view.cktj.EmployeeAccountModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.cktjemployeeaccount',

    requires: [
        'Ext.data.Store',
        'Ext.data.TreeStore'
    ],

    data: {
        gridSelectionRecords: null,

        currentAccountEmployeeNumber: 1,
        currentAccountEmployeePaymentNumber: 1,
        accountEmployee1: null,
        accountEmployee2: null,
        accountEmployee3: null,
        accountEmployee4: null,
        accountEmployee5: null,
        accountEmployee6: null,
        accountEmployeePayment1: null,
        accountEmployeePayment2: null,
        accountEmployeePayment3: null,
        accountEmployeePayment4: null,
        accountEmployeePayment5: null,
        accountEmployeePayment6: null,

        currentModAccountEmployeeNumber: 1,
        currentModAccountEmployeePaymentNumber: 1
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
                        title = '　〖<em> ' + records[0].get('accountNo') + ' ' + records[0].get('customerName') + ' </em>〗';
                    } else if (records.length > 1) {
                        title = '　已选择〖<em> ' + records.length + ' </em>〗个账户';
                    }
                }
                return title;
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

        userStoreReg: {
            type: 'store',
            autoLoad: false,
            fields: ['code', 'name'],
            pageSize: 0,
            proxy: {
                type: 'ajax',
                url: CFG.getGlobalPath() + '/sys/user/getTenUsers', // 后端接口地址
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        },

        userStoreMod: {
            type: 'store',
            autoLoad: false,
            fields: ['code', 'name'],
            pageSize: 0,
            proxy: {
                type: 'format',
                url: CFG.getGlobalPath() + '/sys/user/getTenUsers'
            },
            listeners: {
                beforeload: 'onModifyUserStoreBeforeLoad',
                load: 'onUserStoreLoad'
            }
        },

        //可登记揽储人账户Store
        unregisterAccountStore: {
            type: 'store',
            model: 'MyApp.model.cktj.EmployeeAccount',
            pageSize: 30,
            autoLoad: false,
            remoteFilter: true,
            remoteSort: true,
            proxy: {
                type: 'format',
                url: CFG.getGlobalPath() + '/cktj/employeeaccount/getunregisteraccount'
            },
            listeners: {
                beforeload: 'onEmployeeAccountStoreBeforeLoad',
                load: 'onEmployeeAccountStoreLoad'
            }
        },

        customerTypeStore: {
            fields: ['text', 'value'],
            data:[
                ['个人', '1'],
                ['对公', '2']
            ]
        },

        //已登记揽储人但未复核的账户Store
        registerUncheckedAccountStore: {
            type: 'store',
            model: 'MyApp.model.cktj.EmployeeAccount',
            pageSize: CFG.getDefaultPageSize(),
            autoLoad: false,
            remoteFilter: true,
            remoteSort: true,
            proxy: {
                type: 'format',
                url: CFG.getGlobalPath() + '/cktj/employeeaccount/getregisteruncheckedaccount'
            },
            listeners: {
                beforeload: 'onEmployeeAccountStoreBeforeLoad',
                load: 'onEmployeeAccountStoreLoad'
            }
        },

        //可变更揽储人账户Store
        taskModifiableAccountStore: {
            type: 'store',
            model: 'MyApp.model.cktj.EmployeeAccount',
            pageSize: CFG.getDefaultPageSize(),
            autoLoad: false,
            remoteFilter: true,
            remoteSort: true,
            proxy: {
                type: 'format',
                url: CFG.getGlobalPath() + '/cktj/employeeaccount/gettaskmodifiableaccount'
            },
            listeners: {
                beforeload: 'onEmployeeAccountStoreBeforeLoad',
                load: 'onEmployeeAccountStoreLoad'
            }
        },

        //可变更揽储人账户Store
        paymentModifiableAccountStore: {
            type: 'store',
            model: 'MyApp.model.cktj.EmployeeAccount',
            pageSize: CFG.getDefaultPageSize(),
            autoLoad: false,
            remoteFilter: true,
            remoteSort: true,
            proxy: {
                type: 'format',
                url: CFG.getGlobalPath() + '/cktj/employeeaccount/getpaymentmodifiableaccount'
            },
            listeners: {
                beforeload: 'onEmployeeAccountStoreBeforeLoad',
                load: 'onEmployeeAccountStoreLoad'
            }
        },

        //已变更揽储人但未复核的账户Store
        taskModifiedUncheckedAccountStore: {
            type: 'store',
            model: 'MyApp.model.cktj.EmployeeAccount',
            pageSize: CFG.getDefaultPageSize(),
            autoLoad: false,
            remoteFilter: true,
            remoteSort: true,
            proxy: {
                type: 'format',
                url: CFG.getGlobalPath() + '/cktj/employeeaccount/getmodifieduncheckedaccounttask'
            },
            listeners: {
                beforeload: 'onEmployeeAccountStoreBeforeLoad',
                load: 'onEmployeeAccountStoreLoad'
            }
        },

        //已变更揽储人但未复核的账户Store
        paymentModifiedUncheckedAccountStore: {
            type: 'store',
            model: 'MyApp.model.cktj.EmployeeAccount',
            pageSize: CFG.getDefaultPageSize(),
            autoLoad: false,
            remoteFilter: true,
            remoteSort: true,
            proxy: {
                type: 'format',
                url: CFG.getGlobalPath() + '/cktj/employeeaccount/getmodifieduncheckedaccountpayment'
            },
            listeners: {
                beforeload: 'onEmployeeAccountStoreBeforeLoad',
                load: 'onEmployeeAccountStoreLoad'
            }
        },

        //揽储人存款账户Store-任务
        taskEmployeeAccountStore: {
            type: 'store',
            model: 'MyApp.model.cktj.EmployeeAccount',
            pageSize: CFG.getDefaultPageSize(),
            autoLoad: false,
            remoteFilter: true,
            remoteSort: true,
            proxy: {
                type: 'format',
                url: CFG.getGlobalPath() + '/cktj/employeeaccount/gettask'
            },
            listeners: {
                beforeload: 'onEmployeeAccountStoreBeforeLoad',
                load: 'onEmployeeAccountStoreLoad'
            }
        },

        //揽储人存款账户Store-计酬
        paymentEmployeeAccountStore: {
            type: 'store',
            model: 'MyApp.model.cktj.EmployeeAccount',
            pageSize: CFG.getDefaultPageSize(),
            autoLoad: false,
            remoteFilter: true,
            remoteSort: true,
            proxy: {
                type: 'format',
                url: CFG.getGlobalPath() + '/cktj/employeeaccount/getpayment'
            },
            listeners: {
                beforeload: 'onEmployeeAccountStoreBeforeLoad',
                load: 'onEmployeeAccountStoreLoad'
            }
        },

        depositAccountAutoBindRuleStore:{
            fields: ['name', 'code'],
            type: 'store',
            autoLoad: true,
            pageSize: 0,
            proxy: {
                type: 'ajax',
                url: CFG.getGlobalPath() + '/cktj/employeeaccount/getAutoBindRule',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        }





    }
});
