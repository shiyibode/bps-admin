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
                bindTo: '{depositgrid.selection}',
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
                bindTo: '{depositgrid.selection}',
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

    },

    stores: {
        organizationStore: {
            type: 'tree',
            model: 'MyApp.model.sys.Organization',
            pageSize: 0,
            autoLoad: false,
            proxy: {
                type: 'format',
                url: '/sys/organization/get'
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

        empDepositTypeStore: {
            fields: ['id', 'text', 'tips'],
            data:[
                [0, '核心系统存款', '本机构员工在本机构存款 + 其他机构员工从本机构调离存款'],
                [1, '本机构员工汇总存款', '本机构员工在本机构存款 + 本机构员工从其他机构调入存款'],
                [2, '本机构员工在本机构存款', '本机构员工在本机构的存款'],
                [3, '调入存款','本机构员工从其他机构调入存款'],
                [4, '调离存款', '其他机构员工从本机构调离存款']
            ]
        },

        orgDepositTypeStore: {
            fields: ['id', 'text', 'tips'],
            data:[
                [0, '核心系统存款', '本机构员工在本机构存款 + 其他机构员工从本机构调离存款'],
                [1, '本机构汇总存款', '本机构员工在本机构存款 + 本机构员工从其他机构调入存款'],
                [2, '调入存款','本机构员工从其他机构调入存款'],
                [3, '调离存款', '其他机构员工从本机构调离存款']
            ]
        },

        organizationDepositStore: {
            storeId: 'organizationDepositStore',
            type: 'store',
            model: 'MyApp.model.cktj.Deposit',
            proxy: {
                type: 'format',
                url: '/cktj/deposit/organization'
            },
            autoLoad: false,
            listeners: {
                beforeload: 'onDepositStoreBeforeLoad'
            }
        },

        organizationAvgDepositStore: {
            storeId: 'organizationDepositStore',
            type: 'store',
            model: 'MyApp.model.cktj.Deposit',
            proxy: {
                type: 'format',
                url: '/cktj/deposit/orgaverage'
            },
            autoLoad: false,
            listeners: {
                beforeload: 'onDepositStoreBeforeLoad'
            }
        },

        employeeDepositStore: {
            storeId: 'employeeDepositStore',
            type: 'store',
            model: 'MyApp.model.cktj.Deposit',
            proxy: {
                type: 'format',
                url: '/cktj/deposit/employee'
            },
            autoLoad: false,
            listeners: {
                beforeload: 'onDepositStoreBeforeLoad'
            }
        },

        employeeAvgDepositStore: {
            storeId: 'employeeDepositStore',
            type: 'store',
            model: 'MyApp.model.cktj.Deposit',
            proxy: {
                type: 'format',
                url: '/cktj/deposit/empaverage'
            },
            autoLoad: false,
            listeners: {
                beforeload: 'onDepositStoreBeforeLoad'
            }
        },

        //存款种类Store(如普通存款、爱行存款)
        depositSortStore: {
            type: 'store',
            model: 'MyApp.model.cktj.DepositSort',
            autoLoad: false,
            remoteFilter: true,
            remoteSort: true,
            proxy: {
                type: 'format',
                url: '/cktj/deposit/depositsort'
            }
        }
    }

});
