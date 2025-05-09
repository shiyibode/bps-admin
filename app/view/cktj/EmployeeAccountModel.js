Ext.define('MyApp.view.cktj.EmployeeAccountModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.cktjemployeeaccount',

    requires: [
        'Ext.data.Store',
        'Ext.data.TreeStore'
    ],

    data: {
        gridSelectionRecords: [],

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
        accountEmployeePayment6: null
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
                console.log(data.get('organizationName'));
                console.log(data.get('userStatusStr'));
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
            // type: 'store',
            // model: 'MyApp.model.sys.User',
            // autoLoad: false,
            // remoteFilter: true,
            // remoteSort: true,
            // listeners: {
            //     beforeload: 'onRegisterUserStoreBeforeLoad',
            //     load: 'onUserStoreLoad'
            // }
        },

        userStoreMod: {
            type: 'store',
            model: 'MyApp.model.sys.User',
            autoLoad: false,
            remoteFilter: true,
            remoteSort: true,
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

        // customerSubTypeStore: {
        //     fields: ['text', 'value'],
        //     data:[
        //         ['个人', '1'],
        //         ['行政单位', '2'],
        //         ['事业单位', '3'],
        //         ['企业单位', '4']
        //     ]
        // },

        //已登记揽储人但未复核的账户Store
        registerUncheckedAccountStore: {
            type: 'store',
            model: 'MyApp.model.cktj.EmployeeAccount',
            pageSize: 30,
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
        modifiableAccountStore: {
            type: 'store',
            model: 'MyApp.model.cktj.EmployeeAccount',
            pageSize: 30,
            autoLoad: false,
            remoteFilter: true,
            remoteSort: true,
            proxy: {
                type: 'format',
                url: CFG.getGlobalPath() + '/cktj/employeeaccount/getmodifiableaccount'
            },
            listeners: {
                beforeload: 'onEmployeeAccountStoreBeforeLoad',
                load: 'onEmployeeAccountStoreLoad'
            }
        },

        //已变更揽储人但未复核的账户Store
        modifiedUncheckedAccountStore: {
            type: 'store',
            model: 'MyApp.model.cktj.EmployeeAccount',
            pageSize: 30,
            autoLoad: false,
            remoteFilter: true,
            remoteSort: true,
            proxy: {
                type: 'format',
                url: CFG.getGlobalPath() + '/cktj/employeeaccount/getmodifieduncheckedaccount'
            },
            listeners: {
                beforeload: 'onEmployeeAccountStoreBeforeLoad',
                load: 'onEmployeeAccountStoreLoad'
            }
        },

        //揽储人存款账户Store
        employeeAccountStore: {
            type: 'store',
            model: 'MyApp.model.cktj.EmployeeAccount',
            pageSize: 30,
            autoLoad: false,
            remoteFilter: true,
            remoteSort: true,
            proxy: {
                type: 'format',
                url: CFG.getGlobalPath() + '/cktj/employeeaccount/get'
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
        // ,

        // //存款种类Store(如普通存款、爱行存款)
        // depositSortStore: {
        //     type: 'store',
        //     model: 'MyApp.model.cktj.DepositSort',
        //     autoLoad: true,
        //     remoteFilter: true,
        //     remoteSort: true,
        //     proxy: {
        //         type: 'format',
        //         url: CFG.getGlobalPath() + '/cktj/employeeaccount/depositsort'
        //     }
        // }
    }
});
