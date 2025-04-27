Ext.define('MyApp.view.sys.ApiModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.sysapi',

    requires: [
        'Ext.data.Store',
        'Ext.data.TreeStore'
    ],

    data: {
        current: {
            record: null,
            operation: null
        },
        userOrganization: {
            operationType: null
        }
    },

    formulas: {
        saveOrUpdateStatus: {
            bind: {
                bindTo: '{current.record}',
                deep: true
            },
            get: function (record) {
                var saveOrUpdateStatus = {
                    dirty: record ? record.dirty : true,
                    valid: record ? record.isValid() : false
                };
                saveOrUpdateStatus.validAndDirty = saveOrUpdateStatus.dirty && saveOrUpdateStatus.valid;
                return saveOrUpdateStatus;
            }
        },

        selectionText: {
            bind: {
                bindTo: '{currentApi}',
                deep: true
            },
            get: function (record) {
                var title = '';
                if (record) {
                    title = '　〖<em> ' + record.get('roleName') + '-' + record.get('apiName') + ' </em>〗';
                }
                return title;
            }
        },

        currentApi: {
            bind: '{apigrid.selection}',
            get: function (user) {
                this.set('current.record', user);
                return user;
            }
        },


        windowOptions: {
            bind: {
                bindTo: '{current.operation:lowercase}',
                deep: true
            },
            get: function (operation) {
                var options = {
                    title: operation == 'add' ? '添加接口' : (operation == 'edit' ? '修改接口' : (operation == 'view' ? '查看接口' : '')),
                    readOnly: operation == 'view' ? true : false,
                    saveButtonHidden: operation == 'view' ? true : false,
                    prevAndNextButtonHidden: operation == 'add' ? true : false
                };
                return options;
            }
        }
    },

    stores: {
        //角色store
        apiStore: {
            type: 'store',
            model: 'MyApp.model.sys.Api',
            pageSize: CFG.getDefaultPageSize(),
            autoLoad: true,
            remoteFilter: true,
            remoteSort: true,
            listeners: {
                beforeload: 'onApiStoreBeforeLoad',
                load: 'onApiStoreLoad'
            }
        }
    }

});
