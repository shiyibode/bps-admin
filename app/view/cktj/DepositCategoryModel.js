Ext.define('MyApp.view.cktj.DepositCategoryModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.cktjdepositcategory',

    requires: [
        'Ext.data.TreeStore',
        'MyApp.model.cktj.DepositCategory'
    ],

    data: {
        current: {
            record: null,
            operation: null
        }
    },

    formulas: {
        depositcategoryStatus: {
            bind: {
                bindTo: '{current.record}',
                deep: true
            },
            get: function(record) {
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
                bindTo: '{currentDepositCategory}',
                deep: true
            },
            get: function(record) {
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
            get: function(operation) {
                var options = {
                    title: operation == 'add' ? '添加存款分类' : (operation == 'edit' ? '修改存款分类' : (operation == 'view' ? '查看存款分类' : '')),
                    readOnly: operation == 'view' ? true : false,
                    saveButtonHidden: operation == 'view' ? true : false,
                    prevAndNextButtonHidden: operation == 'add' ? true : false
                };
                return options;
            }
        },

        currentDepositCategory: {
            bind: '{depositcategorygrid.selection}',
            get: function(record) {
                this.set('current.record', record);
                return record;
            }
        }
    },

    stores: {
        depositcategoryStore: {
            storeId: 'depositcategoryStore',
            type: 'tree',
            model: 'MyApp.model.cktj.DepositCategory',
            autoLoad: true,
            remoteFilter: true,
            remoteSort: true,
            rootVisible: false,
            root: {
                id: 0,
                name: '系统存款分类',
                expanded: true
            },
            listeners: {
                load: {
                    fn: 'onDepositCategoryStoreLoad',
                    single: true       //只执行一次
                }
            }
        },

        depositTypeStore: {
            fields: ['text', 'value'],
            data:[
                ['无类型', '0'],
                ['活期存款', '1'],
                ['定期存款', '2'],
                ['通知存款', '3'],
                ['定活两便', '4'],
                ['保证金', '5'],
                ['财政款项', '6'],
                ['财政库款', '7'],
                ['应解汇款', '8'],
                ['电子现金', '9']
            ]
        },

        customerTypeStore: {
            fields: ['text', 'value'],
            data:[
                ['个人', '1'],
                ['对公', '2']
            ]
        },

        customerSubTypeStore: {
            fields: ['text', 'value'],
            data:[
                ['个人', '1'],
                ['对公', '2']
            ]
        },

        belongToStore: {
            fields: ['text', 'value'],
            data:[
                ['揽储人与机构', '0'],
                ['仅揽储人', '1'],
                ['仅机构', '2']
            ]
        },

        // subjectDictStore: {
        //     storeId: 'subjectDictStore',
        //     type: 'tree',
        //     autoLoad: false,
        //     pageSize: 0,
        //     remoteFilter: false,
        //     remoteSort: true,
        //     rootVisible: false,
        //     root: {
        //         id: 0,
        //         name: '科目字典',
        //         expanded: true
        //     },
        //     proxy: {
        //         type: 'format',
        //         url: '/cktj/subjectdict/getDepositSubject'
        //     },
        //     listeners: {
        //         load: 'onSubjectDictStoreLoad'
        //     }
        // }
    }

});
