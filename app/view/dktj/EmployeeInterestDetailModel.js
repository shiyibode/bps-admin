Ext.define('MyApp.view.dktj.EmployeeInterestDetailModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.dktjemployeeinterestdetail',

    requires: [
        'Ext.data.Store',
        'Ext.data.TreeStore'
    ],

    data: {
        lnCurrDate: null,
        gridSelectionRecords: []
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
                        title = '　〖<em> ' + ' ' + records[0].get('customerName') + ' ' + records[0].get('balance') + ' </em>〗';
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


        //获取贷款账户利息列表信息
        employeeInterestDetailStore: {
            type: 'store',
            model: 'MyApp.model.dktj.EmployeeInterest',
            pageSize: 30,
            autoLoad: false,
            remoteFilter: true,
            remoteSort: true,
            proxy: {
                type: 'format',
                url: CFG.getGlobalPath() + '/dktj/employeeinterest/get'
            },
            listeners: {
                beforeload: 'onEmployeeInterestDetailStoreBeforeLoad',
                load: 'onEmployeeInterestDetailStoreLoad'
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
                    var lnCurrDate = result.data && result.data.currentDate ? result.data.currentDate : Ext.Date.add(new Date(), Ext.Date.DAY, -1);
                    me.set('lnCurrDate', lnCurrDate);
                } else {
                    Ext.alertError('获取贷款日期', result.msg);
                }
            },
            failure: MyApp.ux.data.FailureProcess.Ajax
        });
        me.callParent();
    }
});
