Ext.define('MyApp.view.cktj.DepositModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.cktjdeposit',

    requires: [
        'Ext.data.Store',
        'Ext.data.TreeStore',
        // 'MyApp.store.cktj.OrganizationDeposit'
    ],

    data: {
        dpCurrDate: Ext.Date.add(new Date(), Ext.Date.DAY, -1)
    },

    formulas: {
        selectionText: {
            bind: {
                bindTo: '{depositemployeegrid.selection}',
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
        }

    },

    stores: {
        organizationStore: {
            type: 'tree',
            autoLoad: true,
            root: {
                id: 'root',
                text: '最高机构',
                // expanded: true
            },
            proxy: {
                type: 'ajax',
                url: CFG.getGlobalPath() + '/sys/organization/getOrganizationTree',
                reader: {
                    type: 'json',
                    rootProperty: 'children'
                }
            },
            listeners: {
                load: {
                    fn: 'onOrganizationStoreLoad'
                }
            }
        },

        empDepositTypeStore: {
            fields: ['id', 'text', 'tips'],
            data:[
                ['DEPOSIT_TYPE_ACCOUNTING_WAY', '核心系统存款', '本机构员工在本机构存款 + 其他机构员工从本机构调离存款'],
                ['DEPOSIT_TYPE_MANAGE_WAY', '本机构员工汇总存款', '本机构员工在本机构存款 + 本机构员工从其他机构调入存款'],
                ['DEPOSIT_TYPE_ACCOUNTING_OWN_TERMINAL', '本机构员工在本机构存款', '本机构员工在本机构的存款'],
                ['DEPOSIT_TYPE_TRANSFER_IN', '调入存款','本机构员工从其他机构调入存款'],
                ['DEPOSIT_TYPE_TRANSFER_OUT', '调离存款', '其他机构员工从本机构调离存款']
            ]
        },

        orgDepositTypeStore: {
            fields: ['id', 'text', 'tips'],
            data:[
                ['DEPOSIT_TYPE_ACCOUNTING_WAY', '核心系统存款', '本机构员工在本机构存款 + 其他机构员工从本机构调离存款'],
                ['DEPOSIT_TYPE_MANAGE_WAY', '本机构汇总存款', '本机构员工在本机构存款 + 本机构员工从其他机构调入存款'],
                ['DEPOSIT_TYPE_TRANSFER_IN', '调入存款','本机构员工从其他机构调入存款'],
                ['DEPOSIT_TYPE_TRANSFER_OUT', '调离存款', '其他机构员工从本机构调离存款']
            ]
        },

        // organizationDepositStore: {
        //     storeId: 'organizationDepositStore',
        //     type: 'store',
        //     model: 'MyApp.model.cktj.Deposit',
        //     proxy: {
        //         type: 'format',
        //         url: '/cktj/deposit/organization'
        //     },
        //     autoLoad: false,
        //     listeners: {
        //         beforeload: 'onDepositStoreBeforeLoad'
        //     }
        // },

        // organizationAvgDepositStore: {
        //     storeId: 'organizationDepositStore',
        //     type: 'store',
        //     model: 'MyApp.model.cktj.Deposit',
        //     proxy: {
        //         type: 'format',
        //         url: '/cktj/deposit/orgaverage'
        //     },
        //     autoLoad: false,
        //     listeners: {
        //         beforeload: 'onDepositStoreBeforeLoad'
        //     }
        // },

        employeeDepositTaskStore: {
            storeId: 'employeeDepositTaskStore',
            type: 'store',
            model: 'MyApp.model.cktj.Deposit',
            pageSize: CFG.getDefaultPageSize(),
            proxy: {
                type: 'format',
                url: CFG.getGlobalPath() + '/cktj/deposit/employeetask'
            },
            autoLoad: false,
            listeners: {
                beforeload: 'onDepositStoreBeforeLoad'
            }
        },

        employeeAvgDepositTaskStore: {
            storeId: 'employeeAvgDepositTaskStore',
            type: 'store',
            model: 'MyApp.model.cktj.Deposit',
            proxy: {
                type: 'format',
                url: CFG.getGlobalPath() + '/cktj/deposit/empaveragetask'
            },
            autoLoad: false,
            listeners: {
                beforeload: 'onDepositStoreBeforeLoad'
            }
        },

        employeeDepositPaymentStore: {
            storeId: 'employeeDepositPaymentStore',
            type: 'store',
            model: 'MyApp.model.cktj.Deposit',
            pageSize: CFG.getDefaultPageSize(),
            proxy: {
                type: 'format',
                url: CFG.getGlobalPath() + '/cktj/deposit/employeepayment'
            },
            autoLoad: false,
            listeners: {
                beforeload: 'onDepositStoreBeforeLoad'
            }
        },

        employeeAvgDepositPaymentStore: {
            storeId: 'employeeAvgDepositPaymentStore',
            type: 'store',
            model: 'MyApp.model.cktj.Deposit',
            proxy: {
                type: 'format',
                url: CFG.getGlobalPath() + '/cktj/deposit/empaveragepayment'
            },
            autoLoad: false,
            listeners: {
                beforeload: 'onDepositStoreBeforeLoad'
            }
        }


    }

});
