Ext.define('MyApp.view.sys.RoleModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.sysrole',

    requires: [
        'Ext.data.Store',
        'Ext.data.TreeStore'
    ],

    data: {
        current: {
            record: null,
            operation: null
        }
    },

    formulas: {
        roleStatus: {
            bind: {
                bindTo: '{current.record}',
                deep: true
            },
            get: function (record) {
                var status = {
                    dirty: record ? record.dirty : true,
                    valid: record ? record.isValid() : false
                };
                status.validAndDirty = status.dirty && status.valid;
                return status;
            }
        },

        selectionText: {
            bind: {
                bindTo: '{currentRole}',
                deep: true
            },
            get: function (record) {
                var title = '';
                if (record) {
                    title = '　〖<em> ' + record.data.name + ' </em>〗';
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
                    title: operation == 'add' ? '添加角色' : (operation == 'edit' ? '修改角色' : (operation == 'view' ? '查看角色' : '')),
                    readOnly: operation == 'view' ? true : false,
                    saveButtonHidden: operation == 'view' ? true : false,
                    prevAndNextButtonHidden: operation == 'add' ? true : false
                };
                return options;
            }
        },

        currentRole: {
            bind: '{rolegrid.selection}',
            get: function (role) {
                this.set('current.record', role);
                return role;
            }
        },

        currentRecordData: {//用于radiogroup绑定
            bind: {
                bindTo: '{current.record}',
                deep: true
            },
            get: function (record) {
                if (record) {
                    return record.data;
                }
            },
            set: function (recData) {
                for (el in recData) {
                    this.get('current.record').set(el, recData[el]);
                }
            }
        }
    },

    stores: {
        // navigationStore: {
        //     type: 'tree',
        //     // model: 'MyApp.model.sys.Menu',
        //     model: 'MyApp.model.sys.Module',
        //     autoLoad: false,
        //     remoteFilter: false,
        //     remoteSort: true,
        //     // filters: [
        //     //     function (item) {
        //     //         return item.get('type') === 'menu_root' || item.get('type') === 'menu_group';
        //     //     }
        //     // ],
        //     root: {
        //         id: 0,
        //         text: '系统模块',
        //         expanded: true
        //     },
        //     proxy: {
        //         type: 'ajax',
        //         url: '/sys/menu/menugroups',
        //         reader: {
        //             type: 'json',
        //             rootProperty: function (data) {  //服务器端返回的数据中,可获取返回的记录的属性
        //                 return data.data || data.children;
                        
        //             },
        //             successProperty: 'success',
        //             messageProperty: 'msg', //服务器端返回的数据中,可获取到响应信息的属性
        //             totalProperty: 'total'  //服务器端返回的数据中,可获取到记录总数的属性
        //         },
        //     },
        //     listeners: {
        //         load: {
        //             fn: 'onNavigationStoreLoad'
        //             // single: true       //只执行一次
        //         }
        //     }
        // },

        // dataScopeOrganizationStore: {
        //     type: 'tree',
        //     model: 'MyApp.model.sys.Organization',
        //     autoLoad: false,
        //     remoteFilter: true,
        //     remoteSort: true,
        //     rootVisible: false,
        //     root: {
        //         id: 0,
        //         text: '最高机构',
        //         expanded: true
        //     }
        // },

        menuStore: {
            storeId: 'menuStore',
            type: 'tree',
            model: 'MyApp.model.sys.Menu',
            autoLoad: false,
            remoteFilter: true,
            remoteSort: true,
            rootVisible: false,
            root: {
                id: 0,
                name: '系统菜单根节点',
                expanded: true
            }
        },

        roleStore: {
            type: 'store',
            model: 'MyApp.model.sys.Role',
            autoLoad: true,
            remoteFilter: true,
            remoteSort: true,
            listeners: {
                beforeload: 'onRoleStoreBeforeLoad',
                load: 'onRoleStoreLoad'
            }
        },

        // roleTypeStore: {
        //     fields: ['text', 'value'],
        //     data: [
        //         ['管理角色', 'management'],
        //         ['普通角色', 'user']
        //     ]
        // },

        // dataScopeStore: {
        //     fields: ['id', 'text'],
        //     data: [
        //         [1, '所有数据'],
        //         [2, '按明细设置'],
        //         [3, '所在机构及以下数据'],
        //         [4, '所在机构数据'],
        //         [5, '仅本人数据']
        //     ]
        // }
    }

});
