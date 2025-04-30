Ext.define('MyApp.view.sys.ApiModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.sysapi',

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
                bindTo: '{currentApi}',
                deep: true
            },
            get: function (record) {
                var title = '';
                if (record) {
                    title = '　〖<em> ' + record.get('name') + ' </em>〗';
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
                    readOnly: operation == 'view' ? true : false
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
        },

        dataScopeStore:{
            fields: ['name', 'code'],
            type: 'store',
            autoLoad: true,
            proxy: {
                type: 'ajax',
                url: CFG.getGlobalPath() + '/sys/role/getDataScopeList',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        },

        roleStore: {
            type: 'store',
            autoLoad: false,
            fields: ['id', 'name'],
            proxy: {
                type: 'ajax',
                url: CFG.getGlobalPath() + '/sys/role/getTenRoles', // 后端接口地址
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        }
    }

});
