Ext.define('MyApp.view.sys.UserModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.sysuser',

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
        newRoleIdList: []
    },

    formulas: {
        userSaveOrUpdateStatus: {
            bind: {
                bindTo: '{current.record}',
                deep: true
            },
            get: function (record) {
                var userSaveOrUpdateStatus = {
                    dirty: record ? record.dirty : true,
                    valid: record ? record.isValid() : false
                };
                userSaveOrUpdateStatus.validAndDirty = userSaveOrUpdateStatus.dirty && userSaveOrUpdateStatus.valid;
                return userSaveOrUpdateStatus;
            }
        },

        selectionText: {
            bind: {
                bindTo: '{currentUser}',
                deep: true
            },
            get: function (record) {
                var title = '';
                if (record) {
                    title = '　〖<em> ' + record.get('code') + ' ' + record.get('name') + ' </em>〗';
                }
                return title;
            }
        },


        windowOptions: {
            bind: {
                bindTo: '{current.operation:lowercase}',
                deep: true
            },
            get: function (operation) {
                var options = {
                    title: operation == 'add' ? '添加用户' : (operation == 'edit' ? '修改用户' : (operation == 'view' ? '查看用户' : '')),
                    readOnly: operation == 'view' ? true : false,
                    saveButtonHidden: operation == 'view' ? true : false,
                    prevAndNextButtonHidden: operation == 'add' ? true : false
                };
                return options;
            }
        },

        currentUser: {
            bind: '{usergrid.selection}',
            get: function (user) {
                this.set('current.record', user);
                return user;
            }
        },

        userRoleWindowSaveBtnDisabled: {
            bind: {
                bindTo: '{newRoleIdList}',
                deep: true
            },
            get: function (newRoleIdList) {
                var record = this.get('current.record');
                if (record) {
                    return Ext.Array.equals(newRoleIdList, record.get('userRoleIdList'));
                }
                return true;
            }
        }
    },

    stores: {
        organizationStore: {
            type: 'tree',
            autoLoad: true,
            root: {
                id: 'root',
                text: '最高机构'
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

        userStore: {
            type: 'store',
            model: 'MyApp.model.sys.User',
            pageSize: CFG.getDefaultPageSize(),
            autoLoad: true,
            remoteFilter: true,
            remoteSort: true,
            listeners: {
                beforeload: 'onUserStoreBeforeLoad',
                load: 'onUserStoreLoad'
            }
        },

        userGenderStore: {
            fields: ['text', 'value'],
            data: [
                ['男', '1'],
                ['女', '2']
            ]
        },
        
        userLoginUsableStore: {
            fields: ['text', 'value'],
            data: [
                ['是', true],
                ['否', false]
            ]
        },

        userPostStore: {
            fields: ['name', 'code'],
            type: 'store',
            autoLoad: true,
            proxy: {
                type: 'ajax',
                url: CFG.getGlobalPath() + '/sys/user/getUserPostList',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        },

        userStatusStore:{
            fields: ['name', 'code'],
            type: 'store',
            autoLoad: true,
            proxy: {
                type: 'ajax',
                url: CFG.getGlobalPath() + '/sys/user/getUserStatusList',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        },

        //角色store
        roleStore: {
            type: 'store',
            model: 'MyApp.model.sys.Role',
            autoLoad: true,
            remoteFilter: true,
            remoteSort: true
        }
    }

});
