Ext.define('MyApp.view.dktj.LoanModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.dktjloan',

    requires: [
        'Ext.data.Store',
        'Ext.data.TreeStore'
    ],

    data: {
        dpCurrDate: null
    },

    formulas: {
        selectionText: {
            bind: {
                bindTo: '{loangrid.selection}',
                deep: true
            },
            get: function(records) {
                var title = '';
                if (records) {
                    if (records.length == 1) {
                        title = '　〖<em> ' + records[0].get('xdCustomerNo') + ' ' + records[0].get('customerName') + ' </em>〗';
                    } else if (records.length > 1) {
                        title = '　已选择〖<em> ' + records.length + ' </em>〗个客户';
                    }
                }
                return title;
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

        empLoanTypeStore: {
            fields: ['id', 'text', 'tips'],
            data:[
                [0, '核心系统贷款', '本机构员工在本机构贷款 + 其他机构员工从本机构调离贷款'],
                [1, '本机构员工汇总贷款', '本机构员工在本机构贷款 + 本机构员工从其他机构调入贷款'],
                [2, '本机构员工在本机构贷款', '本机构员工在本机构的贷款'],
                [3, '调入贷款','本机构员工从其他机构调入贷款'],
                [4, '调离贷款', '其他机构员工从本机构调离贷款']
            ]
        },

        orgLoanTypeStore: {
            fields: ['id', 'text', 'tips'],
            data:[
                [0, '核心系统贷款', '本机构员工在本机构贷款 + 其他机构员工从本机构调离贷款'],
                [1, '本机构汇总贷款', '本机构员工在本机构贷款 + 本机构员工从其他机构调入贷款'],
                [2, '调入贷款','本机构员工从其他机构调入贷款'],
                [3, '调离贷款', '其他机构员工从本机构调离贷款']
            ]
        },

        organizationLoanStore: {
            storeId: 'organizationLoanStore',
            type: 'store',
            model: 'MyApp.model.dktj.Loan',
            proxy: {
                type: 'format',
                url: CFG.getGlobalPath() + '/dktj/loan/organization'
            },
            autoLoad: false,
            listeners: {
                beforeload: 'onLoanStoreBeforeLoad'
            }
        },

        organizationAvgLoanStore: {
            storeId: 'organizationAvgLoanStore',
            type: 'store',
            model: 'MyApp.model.dktj.Loan',
            proxy: {
                type: 'format',
                url: CFG.getGlobalPath() + '/dktj/loan/orgAverage'
            },
            autoLoad: false,
            listeners: {
                beforeload: 'onLoanStoreBeforeLoad'
            }
        },

        employeeLoanStore: {
            storeId: 'employeeLoanStore',
            type: 'store',
            model: 'MyApp.model.dktj.Loan',
            proxy: {
                type: 'format',
                url: CFG.getGlobalPath() + '/dktj/loan/employee'
            },
            autoLoad: false,
            listeners: {
                beforeload: 'onLoanStoreBeforeLoad'
            }
        },

        employeeAvgLoanStore: {
            storeId: 'employeeAvgLoanStore',
            type: 'store',
            model: 'MyApp.model.dktj.Loan',
            proxy: {
                type: 'format',
                url: CFG.getGlobalPath() + '/dktj/loan/empAverage'
            },
            autoLoad: false,
            listeners: {
                beforeload: 'onLoanStoreBeforeLoad'
            }
        }

    },

    constructor: function() {
        var me = this;

        Ext.Ajax.request({
            url: CFG.getGlobalPath() + '/dktj/employeecustomer/getLoanCurrentDate',
            method: 'POST',
            defaultPostHeader: 'application/json;charset=UTF-8',
            params: Ext.JSON.encode({}),
            scope: this,
            success: function(response, opts) {
                var result = Ext.decode(response.responseText, true);
                if (result && result.success) {
                    var dpCurrDate = result.data && result.data.currentDate ? result.data.currentDate : Ext.Date.add(new Date(), Ext.Date.DAY, -1);
                    me.set('dpCurrDate', dpCurrDate);
                } else {
                    Ext.alertError('获取贷款日期', result.msg);
                }
            },
            failure: MyApp.ux.data.FailureProcess.Ajax
        });
        me.callParent();
    }
});
