Ext.define('MyApp.view.dktj.AccountTemplateModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.dktjaccounttemplate',

    requires: [
        'Ext.data.Store',
        'Ext.data.TreeStore'
    ],

    data: {
        gridSelectionRecords: [],
        currentUser: null,
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


        //可登记揽储人账户Store
        accountTemplateStore: {
            type: 'store',
            model: 'MyApp.model.dktj.AccountTemplate',
            pageSize: 30,
            autoLoad: false,
            remoteFilter: true,
            remoteSort: true,
            proxy: {
                type: 'format',
                url: CFG.getGlobalPath() + '/dktj/template/getaccounttemplatelist'
            },
            listeners: {
                beforeload: 'onAccountTemplateStoreBeforeLoad',
                load: 'onAccountTemplateStoreLoad'
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

        positionStore: {
            type: 'store',
            model: 'MyApp.model.dktj.Position',
            autoLoad: true,
            remoteFilter: true,
            remoteSort: true,
            proxy: {
                type: 'format',
                url: CFG.getGlobalPath() + '/dktj/employeeinterest/positionlist'
            }
        }


    }
});
