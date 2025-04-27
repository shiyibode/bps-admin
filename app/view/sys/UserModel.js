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

        detailSource: {
            bind: {
                bindTo: '{currentUser}',
                deep: true
            },
            get: function (record) {
                var source = {};
                if (record) {
                    source = {
                        '名称': record.get('text'),
                        '图标': record.get('iconCls'),
                        '顺序': record.get('sort'),
                        '创建时间': record.get('createTime')
                    };
                }
                return source
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

        userTypeStore: {
            fields: ['text', 'value'],
            data: [
                ['支行操作员', 1],
                ['总行管理员', 2],
                ['普通用户', 3],
                ['超级用戶', 0]
            ]
        },

        userPostStore: {
            fields: ['text'],
            data: [
                ['无职务'],
                ['柜员'],
                ['科员'],
                ['支行会计'],
                ['支行业务主管'],
                ['支行副行长'],
                ['支行行长'],
                ['董事长'],
                ['监事长'],
                ['行长'],
                ['副行长'],
                ['行长助理'],
                ['总经理'],
                ['副总经理'],
                ['主任'],
                ['总经理助理'],
                ['出纳'],
                ['保安'],
                ['协存岗']
            ]
        },

        userStatusStore:{
            fields: ['text', 'value'],
            data: [
                ['在职', '1'],
                ['停职', '2'],
                ['辞职', '3'],
                ['辞退', '4'],
                ['退休', '5'],
                ['内部协存', '6'],
                ['休假', '7'],
                ['内退', '8']
            ]
        },

        //机构调动-调入方式
        intoOrganizationTypeStore: {
            fields: ['id', 'text'],
            data: [
                [1, '调离当前机构调入其他机构']
            ],
            listeners: {
                prefetch: 'onIntoOrganizationTypeStoreLoad'
            }
        },

        //机构调动-调离方式
        // leaveOrganizationTypeStore: {
        //     fields: ['id', 'text'],
        //     data: [
        //         [3, '辞职调离'],
        //         [4, '辞退调离'],
        //         [5, '退休调离']
        //     ]
        // },

        //角色store
        roleStore: {
            type: 'store',
            model: 'MyApp.model.sys.Role',
            pageSize: 0,
            autoLoad: false,
            remoteFilter: true,
            remoteSort: true
        }
    }

});
