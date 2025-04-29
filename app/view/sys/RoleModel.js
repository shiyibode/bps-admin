Ext.define('MyApp.view.sys.RoleModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.sysrole',

    requires: [
        'Ext.data.Store'
    ],

    data: {
        current: {
            record: null,
            operation: null
        }
    },

    formulas: {
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
        }
    },

    stores: {

        roleStore: {
            type: 'store',
            model: 'MyApp.model.sys.Role',
            pageSize: CFG.getDefaultPageSize(),
            autoLoad: true,
            remoteFilter: true,
            remoteSort: true,
            listeners: {
                beforeload: 'onRoleStoreBeforeLoad',
                load: 'onRoleStoreLoad'
            }
        }

    }

});
