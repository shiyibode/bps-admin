Ext.define('MyApp.view.sys.OrganizationModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.sysorganization',

    requires: [
        'Ext.data.Store',
        'MyApp.model.sys.Organization'
    ],

    data: {
        current: {
            record: null,
            operation: null
        },
        parentId: null
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
        }
    },

    stores: {
        organizationStore: {
            type: 'store',
            storeId: 'organizationStore',
            pageSize: CFG.getDefaultPageSize(),
            autoLoad: true,
            model: 'MyApp.model.sys.Organization',
            autoLoad: true,
            remoteFilter: true,
            remoteSort: true,
            listeners: {
                load: {
                    fn: 'onOrganizationStoreLoad',
                    single: true       //只执行一次
                },
                beforeload: 'onOrganizationStoreBeforeLoad'
            }
        },

        organizationTypeStore: {
            type: 'store',
            storeId: 'organizationTypeStore',
            fields: ['name', 'code'],
            autoLoad: true,
            proxy: {
                type: 'ajax',
                url: CFG.getGlobalPath() + '/sys/organization/getOrganizationTypeList',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        }

    }

});
