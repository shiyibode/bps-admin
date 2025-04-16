Ext.define('MyApp.view.cktj.DepositCategoryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.cktjdepositcategory',

    requires: [
        'MyApp.view.cktj.widget.DepositCategoryWindow',
        'MyApp.model.cktj.DepositCategory'
    ],

    expandBtnClick : function() {
        this.lookupReference('depositcategorygrid').expandAll();
    },

    collapseBtnClick : function() {
        this.lookupReference('depositcategorygrid').collapseAll();
    },

    autoColumnWidthButtonClick : function() {
        var me = this,
            depositcategorygrid = me.lookupReference('depositcategorygrid');
        
        Ext.suspendLayouts();
        Ext.Array.forEach(depositcategorygrid.columnManager.getColumns(),
            function(column) {
                if (depositcategorygrid.isVisible() && column.resizable) {
                    column.autoSize();
                }
            });
        Ext.resumeLayouts(true);
    },

    refreshBtnClick : function() {
        this.lookupReference('depositcategorygrid').getStore('depositcategoryStore').reload();
    },

    showDetailBtnClick: function() {
        this.getView().down('depositcategorydetail').expand();
    },

    hideDetailBtnClick: function() {
        this.getView().down('depositcategorydetail').collapse();
    },

    onDepositCategoryDetailExpand: function(p, eOpts) {
        this.getView().down('depositcategorygrid tool[type=maximize]').setHidden(false);
        this.getView().down('depositcategorygrid tool[type=restore]').setHidden(true);
    },

    onDepositCategoryDetailCollapse: function(p, eOpts) {
        this.getView().down('depositcategorygrid tool[type=maximize]').setHidden(true);
        this.getView().down('depositcategorygrid tool[type=restore]').setHidden(false);
    },

    prevBtnClick: function() {
        var me = this;
        // var depositcategoryTreeGrid = me.getView().down('depositcategorytreegrid');
        var depositcategoryGrid = me.lookupReference('depositcategorygrid');
        var selectionModel = depositcategoryGrid.getSelectionModel();
        var store = depositcategoryGrid.getStore('depositcategoryStore');

        if (selectionModel.getCount() == 0) {
            if (store.getCount() > 0) {
                selectionModel.select(store.getAt(0));
                this.checkedAndSelectSubjectDictGridRecords();
            } else {
                Ext.toastWarn('当前列表中没有可显示的记录!');
            }
        } else {
            var index = store.indexOf(selectionModel.getSelection()[0]);
            if (index == 0) {
                Ext.toastWarn('已经是当前列表的第一条记录!');
            }else {
                selectionModel.select(store.getAt(index - 1));
                this.checkedAndSelectSubjectDictGridRecords();
            }
        }

    },

    nextBtnClick: function() {
        var me = this;
        var depositcategoryGrid = me.lookupReference('depositcategorygrid');
        var selectionModel = depositcategoryGrid.getSelectionModel();
        var store = depositcategoryGrid.getStore('depositcategoryStore');

        if (selectionModel.getCount() == 0) {
            if (store.getCount() > 0) {
                selectionModel.select(store.getAt(0));
                this.checkedAndSelectSubjectDictGridRecords();
            } else {
                Ext.toastWarn('当前列表中没有可显示的记录!');
            }
        } else {
            var index = store.indexOf(selectionModel.getSelection()[0]);
            if (index == store.getTotalCount() - 1) {
                Ext.toastWarn('已经是当前列表的最后一条记录!');
            }else {
                selectionModel.select(store.getAt(index + 1));
                this.checkedAndSelectSubjectDictGridRecords();
            }
        }
    },

    getGridSelected: function() {
        var me = this,
            depositcategoryGrid = me.lookupReference('depositcategorygrid'),
            sModel = depositcategoryGrid.getSelectionModel(),
            hasSelection = sModel.hasSelection();
        if (!hasSelection) {
            Ext.Msg.alert('提示', '请选中要操作的数据！');
            return null;
        }
        var selectedRecords = sModel.getSelection();
        if (selectedRecords.length <= 0 || selectedRecords.length > 1) {
            Ext.Msg.alert('提示', '该操作只能选择一条数据!');
            return null;
        }
        return selectedRecords;
    },

    //增删改查等功能实现
    addDepositCategory: function() {
        var me = this,
            view = me.getView(),
            viewModel = me.getViewModel(),
            depositcategorygrid = me.lookupReference('depositcategorygrid'),
            store = depositcategorygrid.getStore(),
            record = Ext.create('MyApp.model.cktj.DepositCategory');

        var root = store.getRoot();
        root.appendChild(record);

        var currentDepositCategory = viewModel.get('currentDepositCategory');
        if (currentDepositCategory) {
            record.set('parentId', currentDepositCategory.getId());
        }

        viewModel.set('current.record', record);
        viewModel.set('current.operation', 'add');
        Ext.getBody().mask(); //遮罩
        var window = view.floatingItems.get('depositcategoryWindow');
        window.center();
        window.show();
    },

    editDepositCategory: function() {
        var me = this,
            view = me.getView(),
            viewModel = me.getViewModel();

        if (!viewModel.get('current.record')) {
            Ext.alertInfo('提示', '请选中要编辑的记录！');
            return;
        }
        if (viewModel.get('current.record').get('editable') === false) {
            Ext.alertInfo('提示', '您无权限修改此节点!');
            return;
        }
        viewModel.set('current.operation', 'edit');
        Ext.getBody().mask(); //遮罩
        var window = view.floatingItems.get('depositcategoryWindow');
        window.center();
        window.show();
    },

    deleteDepositCategory: function() {
        var me = this,
            viewModel = me.getViewModel(),
            depositcategorygrid = me.lookupReference('depositcategorygrid'),
            store = depositcategorygrid.getStore(),
            record = viewModel.get('current.record');

        if (!record) {
            Ext.alertInfo('提示', '请选中要删除的记录！');
            return;
        }
        if (record.get('editable') === false) {
            Ext.alertInfo('提示', '您无权限删除此节点!');
            return;
        }
        viewModel.set('current.operation', 'delete');

        Ext.Msg.show({
            title:'删除确认',
            message: '删除该分类将同时删除该分类下的所有子分类,您确定要删除吗?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function(btn) {
                if (btn === 'yes') {
                    Ext.Msg.wait('数据删除中','正在删除中，请稍候...');
                    record.drop();
                    store.sync({
                        success: function(batch, options) {
                            var msg = batch.getOperations()[0].getResultSet().getMessage();
                            Ext.toastInfo(msg);
                        },
                        callback: function() {
                            Ext.Msg.hide(); //隐藏等待对话框
                        }
                    });
                } else if (btn === 'no') {
                }
            }
        });
    },

    viewDepositCategory: function () {
        var me = this,
            view = me.getView(),
            viewModel = me.getViewModel();

        if (!viewModel.get('current.record')) {
            Ext.Msg.alert('提示', '请选中要查看的记录！');
            return;
        }
        viewModel.set('current.operation', 'view');
        Ext.getBody().mask(); //遮罩
        var window = view.floatingItems.get('depositcategoryWindow');
        window.center();
        window.show();
    },


    onSaveBtnClick: function(button) {
        var me = this,
            viewModel = me.getViewModel(),
            depositcategorygrid = me.lookupReference('depositcategorygrid'),
            depositcategoryGridStore = depositcategorygrid.getStore('depositcategoryStore'),
            record = viewModel.get('current.record'),
            operation = viewModel.get('current.operation');

        Ext.Msg.wait('数据保存中','正在保存中，请稍候...');
        depositcategoryGridStore.sync({
            success: function(batch, options) {
                var msg = batch.getOperations()[0].getResultSet().getMessage();
                Ext.toastInfo(msg);
                depositcategoryGridStore.reload();
                if (operation === 'add') {
                    button.up('window').close();
                }
                Ext.Msg.hide(); //隐藏等待对话框
            },
            failure: function() {
                Ext.Msg.hide(); //隐藏等待对话框
            },
            callback: function() {
            }
        });
    },

    onCancelBtnClick: function(button) {
        button.up('window').close();
    },


    onWindowBeforeShow : function() {
        var me = this,
            viewModel = me.getViewModel();

        var store = viewModel.getStore('depositcategoryStore');
        var uxtreepicker = me.lookupReference('uxtreepicker');
        uxtreepicker.setStore(store);
    },

    onWindowShow : function() {
        this.checkedAndSelectSubjectDictGridRecords();
    },

    onWindowClose: function() {
        var me = this,
            depositcategorygrid = me.lookupReference('depositcategorygrid'),
            depositcategoryGridStore = depositcategorygrid.getStore(),
            viewModel = me.getViewModel(),
            current = viewModel.get('current');

        if (current.operation === 'add') {
            var root = depositcategoryGridStore.getRoot();
            root.removeChild(current.record);
            // Ext.destroy(current.record);
            var currentDepositCategory = viewModel.get('currentDepositCategory');
            viewModel.set('current.record', currentDepositCategory);
        }
        viewModel.set('current.operation', null);
        depositcategoryGridStore.rejectChanges();

        Ext.getBody().unmask();
    },

    onCustomerTypeChange: function(combobox, newValue, oldValue, eOpts) {
        var me = this,
            viewModel = me.getViewModel(),
            current = viewModel.get('current'),
            customerSubTypeStore = viewModel.getStore('customerSubTypeStore'),
            customerSubType = me.lookupReference('customerSubType');

        if (current.operation && newValue != oldValue) {
            customerSubTypeStore.clearFilter();
            customerSubType.clearValue();
            if (newValue == 1) {
                customerSubTypeStore.filterBy(function(item) {
                    return item.get('value') == 1;
                });
                customerSubType.setValue("1");
            } else {
                customerSubTypeStore.filterBy(function(item) {
                    return item.get('value') >= 2;
                });
            }
        }
    },

    onDepositCategoryStoreLoad: function(store, records, successful, operation, eOpts) {
        var me = this,
            depositcategorygrid = me.lookupReference('depositcategorygrid');

        if (records && records[0]) {
            depositcategorygrid.getSelectionModel().select(records[0]);
        }
    },


    /**
     * 设置分类对话框中的 科目字典 树中哪些记录应该被选择
     */
    checkedAndSelectSubjectDictGridRecords: function() {
        var me = this,
            viewModel = me.getViewModel(),
            subjectDictGrid = me.lookupReference('subjectDictGrid');

        if (subjectDictGrid.isVisible()) {
            var subjectNo = null;
            var operation = viewModel.get('current.operation');
            if (operation && operation === 'add') {
                subjectNo = viewModel.get('current.record.subjectNo');
            } else {
                var record = this.getGridSelected()[0];
                if (record) {
                    subjectNo = record.get('subjectNo');
                }
            }

            selModel = subjectDictGrid.getSelectionModel();

            subjectDictGrid.suspendEvent('selectionchange');
            selModel.deselectAll();
            if (subjectNo) {
                if (subjectNo && subjectNo.length > 0) {
                    var subjectDictStore = viewModel.getStore('subjectDictStore');
                    var records = [];
                    Ext.Array.each(subjectNo, function(no) {
                        var rec = subjectDictStore.findRecord('no', no);
                        if (rec) {
                            records.push(rec);
                        }
                    });
                    if (records.length > 0) {
                        selModel.select(records);
                    }
                }
            }
            subjectDictGrid.resumeEvent('selectionchange');
        }
    },

    onSubjectDictGridSelectionChange: function(selectable, records, eOpts) {
        var me = this,
            viewModel = me.getViewModel(),
            subjectDictGrid = me.lookupReference('subjectDictGrid'),
            checkedSubjectNos = [];

        var checkedRecords = subjectDictGrid.getChecked();
        Ext.Array.each(checkedRecords, function(record) {
            checkedSubjectNos.push(record.get('no'));
        });
        viewModel.set('current.record.subjectNo', checkedSubjectNos);
    },

    onSubjectDictGridSelect: function(treeview, record, index, eOpts) {
        if (record.get('checked') !== null && record.get('checked') !== undefined) {
            record.set('checked', true);
        }
    },

    onSubjectDictGridDeselect: function(treeview, record, index, eOpts) {
        if (record.get('checked') !== null && record.get('checked') !== undefined) {
            record.set('checked', false);
        }
    },


    /**
     * 科目字典在加载完数据后，设置哪些节点应该有复选框
     * @param store
     * @param records
     * @param successful
     * @param operation
     * @param eOpts
     */
    onSubjectDictStoreLoad: function(store, records, successful, operation, eOpts) {
        var root = store.getRoot();
        if (root) {
            this.depathNode(root);
        }
    },

    /**
     * 递归设置节点的 checked 属性
     * @param node
     */
    depathNode: function(node) {
        if (!node) {
            return;
        }
        if (node.get('leaf')) {
            node.set('checked', false);
        }
        node.eachChild(function(node) {
            if (node.get('leaf')) {
                node.set('checked', false);
            }
            this.depathNode(node);
        }, this);
    }

});
