Ext.define('MyApp.view.sys.MenuModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.sysmenu',

    requires: [
        // 'Ext.data.TreeStore',
        'Ext.data.Store',
        'MyApp.model.sys.Menu'
    ],

    data: {
        current: {
            record: null,
            operation: null
        }
    },

    formulas: {
        menuStatus: {
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
                bindTo: '{currentMenu}',
                deep: true
            },
            get: function (record) {
                var title = '';
                if (record) {
                    var path = record.data.text;
                    var parent = record.parentNode;
                    while (parent && parent.parentNode) {
                        path = parent.data.text + " / " + path;
                        parent = parent.parentNode;
                    }
                    title = '　〖<em> ' + path + ' </em>〗';
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
                    title: operation == 'add' ? '添加菜单' : (operation == 'edit' ? '修改菜单' : (operation == 'view' ? '查看菜单' : '')),
                    readOnly: operation == 'view' ? true : false,
                    saveButtonHidden: operation == 'view' ? true : false,
                    prevAndNextButtonHidden: operation == 'add' ? true : false
                };
                return options;
            }
        },

        currentMenu: {
            bind: '{menugrid.selection}',
            get: function (menu) {
                this.set('current.record', menu);
                return menu;
            }
        },
        //这里特别说明为什么可以在这里使用menugrid。根据官方文档：When a component is assigned a reference to identify it, that component will publish some of its key properties in the ViewModel。
        //就是说，如果menugrid组件中定义了reference:'menugrid'，那么就可以在ViewModel中自动绑定了menugrid的一些重要属性。

        detailSource: {
            bind: {
                bindTo: '{currentMenu}',
                deep: true
            },
            get: function (record) {
                var source = {};
                if (record) {
                    source = {
                        '名称': record.get('name'),
                        '图标': record.get('iconCls'),
                        '顺序': record.get('sort'),
                        '创建时间': record.get('createTime')
                    };
                }
                return source
            }
        }
    },

    stores: {
        menuStore: {
            storeId: 'menuStore',
            type: 'store',
            model: 'MyApp.model.sys.Menu',
            pageSize: 20,
            autoLoad: true,
            listeners: {
                load: {
                    fn: 'onMenuStoreLoad'
                }
            }
        },

        menuTypeStore: {
            storeId: 'menuTypeStore',
            fields: ['id', 'text', 'value'],
            data: [
                [0, '分组菜单', 'menu_group'],
                [1, '模块菜单', 'menu'],
                [2, '功能按钮', 'permission']
            ]
        }
    }

});
