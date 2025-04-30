Ext.define('MyApp.view.sys.PermissionModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.syspermission',

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
        },

        currentRole: null,
        currentApi: null
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
                bindTo: '{currentPermission}',
                deep: true
            },
            get: function (record) {
                var title = '';
                if (record) {
                    title = '　〖<em> ' + record.get('apiName') + ' </em>〗';
                }
                return title;
            }
        },

        currentPermission: {
            bind: '{permissiongrid.selection}',
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
                    title: operation == 'add' ? '添加接口' : (operation == 'edit' ? '修改数据范围' : (operation == 'view' ? '查看接口' : '')),
                    readOnly: operation == 'view' ? true : false,
                    saveButtonHidden: operation == 'view' ? true : false,
                    prevAndNextButtonHidden: operation == 'add' ? true : false
                };
                return options;
            }
        }
    },

    stores: {
        //角色权限store
        permissionStore: {
            type: 'store',
            model: 'MyApp.model.sys.Permission',
            pageSize: CFG.getDefaultPageSize(),
            autoLoad: true,
            remoteFilter: true,
            remoteSort: true,
            listeners: {
                beforeload: 'onPermissionStoreBeforeLoad',
                load: 'onPermissionStoreLoad'
            }
        },



        permissionRoleStore:{
            storeId: 'permissionRoleStore',
            type: 'store',
            model: 'MyApp.model.sys.Role',
            pageSize: 0,
            autoLoad: true
        },

        permissionApiStore:{
            storeId: 'permissionApiStore',
            type: 'store',
            model: 'MyApp.model.sys.Api',
            pageSize: 0,
            autoLoad: true
        },


        dataScopeOrganizationStore: {
            type: 'tree',
            model: 'MyApp.model.sys.Organization',
            autoLoad: false,
            remoteFilter: true,
            remoteSort: true,
            rootVisible: false,
            root: {
                id: 0,
                text: '最高机构',
                expanded: true
            }
        }


    }

});
