Ext.define('MyApp.view.sys.OrganizationModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.sysorganization',

    requires: [
        // 'Ext.data.TreeStore',
        'Ext.data.Store',
        'MyApp.model.sys.Organization'
    ],

    data: {
        current: {
            record: null,
            operation: null
        }
    },

    formulas: {
        organizationStatus: {
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
                bindTo: '{currentOrganization}',
                deep: true
            },
            get: function (record) {
                var title = '';
                if (record) {
                    var path = record.data.name;
                    var parent = record.parentNode;
                    while (parent && parent.parentNode) {
                        path = parent.data.name + " / " + path;
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
                    title: operation == 'add' ? '添加机构' : (operation == 'edit' ? '修改机构' : (operation == 'view' ? '查看机构' : '')),
                    readOnly: operation == 'view' ? true : false,
                    saveButtonHidden: operation == 'view' ? true : false,
                    prevAndNextButtonHidden: operation == 'add' ? true : false
                };
                return options;
            }
        },

        currentOrganization: {
            bind: '{organizationgrid.selection}',
            get: function (organization) {
                this.set('current.record', organization);
                return organization;
            }
        },

        detailSource: {
            bind: {
                bindTo: '{currentOrganization}',
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
        organizationStore: {
            type: 'store',
            storeId: 'organizationStore',
            pageSize: CFG.getDefaultPageSize(),
            autoLoad: true,
            // type: 'tree',
            model: 'MyApp.model.sys.Organization',
            autoLoad: true,
            remoteFilter: true,
            remoteSort: true,
            // rootVisible: false,
            // root: {
            //     id: 0,
            //     name: '最高机构',
            //     expanded: true
            // },
            listeners: {
                load: {
                    fn: 'onOrganizationStoreLoad',
                    single: true       //只执行一次
                },
                beforeload: 'onOrganizationStoreBeforeLoad'
            }
        },

        // areaTreePickerStore: {
        //     storeId: 'areaTreePickerStore',
        //     type: 'tree',
        //     model: 'MyApp.model.sys.Area',
        //     autoLoad: false,
        //     remoteFilter: true,
        //     remoteSort: true,
        //     root: {
        //         id: 0,
        //         name: '区域管理',
        //         expanded: true
        //     }
        // },

        organizationTypeStore: {
            storeId: 'organizationTypeStore',
            fields: ['text', 'value'],
            data: [
                ['公司/企业', '000'],
                ['网点分组', '100'],
                ['部门分组', '200'],
                ['其它机构分组', '300'],
                ['本部', '101'],
                ['汇总', '102'],
                ['营业部', '103'],
                ['支行', '104'],
                ['分理处', '105'],
                ['信用卡中心', '106'],
                ['管理部门', '201'],
                ['下设中心', '202'],
                ['理财代销机构', '301']
            ]
        }

    }

});
