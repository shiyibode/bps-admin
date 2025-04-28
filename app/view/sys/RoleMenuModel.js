Ext.define('MyApp.view.sys.RoleMenuModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.sysrolemenu',

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
                bindTo: '{currentRoleMenu}',
                deep: true
            },
            get: function (record) {
                var title = '';
                if (record) {
                    title = '　〖<em> ' + record.get('roleName') + ' </em>〗';
                }
                return title;
            }
        },

        currentRoleMenu: {
            bind: '{rolemenugrid.selection}',
            get: function (user) {
                this.set('current.record', user);
                return user;
            }
        }
    },

    stores: {
        //角色菜单store
        roleMenuStore: {
            type: 'store',
            model: 'MyApp.model.sys.RoleMenu',
            pageSize: CFG.getDefaultPageSize(),
            autoLoad: true,
            proxy: {
                type: 'format',
                url: CFG.getGlobalPath() + '/sys/role/getRoleMenu'
            },
            remoteFilter: true,
            remoteSort: true,
            listeners: {
                beforeload: 'onRoleMenuStoreBeforeLoad',
                load: 'onRoleMenuStoreLoad'
            }
        }

    }

});
