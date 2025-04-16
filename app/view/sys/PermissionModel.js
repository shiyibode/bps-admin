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
            pageSize: 30,
            autoLoad: true,
            remoteFilter: true,
            remoteSort: true,
            listeners: {
                beforeload: 'onPermissionStoreBeforeLoad',
                load: 'onPermissionStoreLoad'
            }
        },


        // roleTreeStore:{
        //     storeId: 'roleTreeStore',
        //     type: 'tree',
            
        //     proxy: {
        //         type: 'ajax',
        //         url: '/sys/permission/rolelist/get',
        //         reader: {
        //             type: 'json',
        //             rootProperty: 'children'
        //         }
        //     },
        
        //     autoLoad: true,

        //     rootVisible: false,
        //     root: {
        //         id: 0,
        //         text: '根角色',
        //         expanded: true
        //     },
        //     listeners: {
        //         load: {
        //             fn: 'onRoleTreeStoreLoad',
        //             single: true       //只执行一次
        //         }
        //     }
        // },


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

        dataScopeStore: {
            storeId: 'dataScopeStore',
            fields: ['id', 'text'],
            data: [
                ['1', '所有数据'],
                ['2', '所在机构及以下数据'],
                ['3', '所在机构数据'],
                ['4', '仅本人数据'],
                ['5', '按明细设置']
            ]
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
