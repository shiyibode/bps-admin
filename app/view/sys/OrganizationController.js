Ext.define('MyApp.view.sys.OrganizationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sysorganization',

    requires: [
        'MyApp.view.sys.widget.OrganizationWindow',
        'MyApp.model.sys.Organization'
    ],

    // expandBtnClick: function () {
    //     this.lookupReference('organizationgrid').expandAll();
    // },

    // collapseBtnClick: function () {
    //     this.lookupReference('organizationgrid').collapseAll();
    // },

    autoColumnWidthButtonClick: function () {
        var me = this,
            organizationgrid = me.lookupReference('organizationgrid');

        Ext.suspendLayouts();
        Ext.Array.forEach(organizationgrid.columnManager.getColumns(),
            function (column) {
                if (organizationgrid.isVisible() && column.resizable) {
                    column.autoSize();
                }
            });
        Ext.resumeLayouts(true);
    },

    refreshBtnClick: function () {
        this.lookupReference('organizationgrid').getStore('organizationStore').reload();
    },

    getGridSelected: function () {
        var me = this,
            organizationGrid = me.lookupReference('organizationgrid'),
            sModel = organizationGrid.getSelectionModel(),
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
    addOrganization: function () {
        var me = this,
            view = me.getView(),
            viewModel = me.getViewModel(),
            organizationgrid = me.lookupReference('organizationgrid'),
            store = organizationgrid.getStore(),
            record = Ext.create('MyApp.model.sys.Organization');

        var root = store.getRoot();
        root.appendChild(record);

        var currentOrganization = viewModel.get('currentOrganization');
        if (currentOrganization) {
            var pid = currentOrganization.get('id');
            var areaId = currentOrganization.get('areaId');
            record.set('parentId', pid);
            record.set('areaId', areaId);
        }

        viewModel.set('current.record', record);
        viewModel.set('current.operation', 'add');
        Ext.getBody().mask(); //遮罩
        var window = view.floatingItems.get('organizationWindow');
        window.center();
        window.show();
    },

    editOrganization: function () {
        var me = this,
            view = me.getView(),
            viewModel = me.getViewModel();

        if (!viewModel.get('current.record')) {
            Ext.Msg.alert('提示', '请选中要编辑的记录！');
            return;
        }
        if (viewModel.get('current.record').get('editable') === false) {
            Ext.Msg.alert('提示', '您无权限修改此节点!');
            return;
        }
        viewModel.set('current.operation', 'edit');
        Ext.getBody().mask(); //遮罩
        var window = view.floatingItems.get('organizationWindow');
        window.center();
        window.show();
    },

    deleteOrganization: function () {
        var me = this,
            view = me.getView(),
            viewModel = me.getViewModel(),
            organizationgrid = me.lookupReference('organizationgrid'),
            store = organizationgrid.getStore(),
            record = viewModel.get('current.record');

        if (!record) {
            Ext.Msg.alert('提示', '请选中要删除的记录！');
            return;
        }
        if (record.get('editable') === false) {
            Ext.Msg.alert('提示', '您无权限删除此节点!');
            return;
        }

        viewModel.set('current.operation', 'delete');

        Ext.Msg.show({
            title: '删除确认',
            message: '删除该菜单将同时删除该菜单下的所有子菜单,您确定要删除吗?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function (btn) {
                if (btn === 'yes') {
                    Ext.Msg.wait('数据删除中', '正在删除中，请稍候...');
                    record.drop();
                    // var root = store.getRoot();
                    // root.removeChild(record);
                    store.sync({
                        success: function (batch, options) {
                            var msg = batch.getOperations()[0].getResultSet().getMessage();
                            Ext.toast(msg);
                            Ext.Msg.hide(); //隐藏等待对话框
                        },
                        callback: function () {
                            Ext.Msg.hide(); //隐藏等待对话框
                        }
                    });
                } else if (btn === 'no') {
                }
            }
        });
    },

    viewOrganization: function () {
        var me = this,
            view = me.getView(),
            viewModel = me.getViewModel();

        if (!viewModel.get('current.record')) {
            Ext.Msg.alert('提示', '请选中要查看的记录！');
            return;
        }
        viewModel.set('current.operation', 'view');
        Ext.getBody().mask(); //遮罩
        var window = view.floatingItems.get('organizationWindow');
        window.center();
        window.show();
    },


    onSaveBtnClick: function (button) {
        var me = this,
            viewModel = me.getViewModel(),
            organizationgrid = me.lookupReference('organizationgrid'),
            organizationGridStore = organizationgrid.getStore('organizationStore'),
            record = viewModel.get('current.record'),
            operation = viewModel.get('current.operation');

        var needReloadStore = (operation === 'add') || record.isModified('parentId') || record.isModified('text') || record.isModified('sort');

        Ext.Msg.wait('数据保存中', '正在保存中，请稍候...');
        organizationGridStore.sync({
            success: function (batch, options) {
                var msg = batch.getOperations()[0].getResultSet().getMessage();
                Ext.toast(msg);
                if (needReloadStore) {
                    organizationGridStore.reload();
                }
                if (operation === 'add') {
                    viewModel.set('current',null);
                    button.up('window').close();
                }
                Ext.Msg.hide(); //隐藏等待对话框
            },
            failure: function () {
                Ext.Msg.hide(); //隐藏等待对话框
            },
            callback: function () {
            }
        });
    },

    onCancelBtnClick: function (button) {
        button.up('window').close();
    },

    onWindowBeforeShow: function () {
        var me = this;

        var uxTreePickerStore = me.getViewModel().getStore('organizationStore');
        var uxtreepicker = me.lookupReference('uxtreepicker');
        uxtreepicker.setStore(uxTreePickerStore);
    },


    onWindowClose: function () {
        var me = this,
            organizationgrid = me.lookupReference('organizationgrid'),
            organizationGridStore = organizationgrid.getStore('organizationStore'),
            viewModel = me.getViewModel(),
            current = viewModel.get('current');

        if (current && current.operation === 'add') {
            var root = organizationGridStore.getRoot();
            root.removeChild(current.record);
            var currentOrganization = viewModel.get('currentOrganization');
            viewModel.set('current.record', currentOrganization);
        }
        viewModel.set('current.operation', null);

        organizationGridStore.rejectChanges();

        Ext.getBody().unmask();
    },

    onUxTreePickerChange: function (treepicker, newValue, oldValue, eOpts) {
        var me = this;

        if (newValue != oldValue) {

            // // var organizationTypeCombo = me.lookupReference('organizationTypeCombo');
            // var organizationTypeStore = Ext.StoreManager.get('organizationTypeStore');
            //
            // // organizationTypeCombo.clearValue();
            // organizationTypeStore.clearFilter();
            // if (newValue == 0) {
            //     organizationTypeStore.filterBy(function(item) {
            //         return item.get('id') == 0;
            //     });
            // } else {
            //     organizationTypeStore.filterBy(function(item) {
            //         return item.get('id') != 0;
            //     });
            // }
        }
    },

    onOrganizationStoreBeforeLoad: function (store, operation, eOpts) {
        var me = this,
            searchForm = me.lookupReference('searchForm');

        var filter = null;

        if (searchForm) {
            filter = searchForm.getForm().getValues();
        }

        if (filter) {
            store.getProxy().extraParams = filter
        }
    },

    onOrganizationStoreLoad: function (store, records, successful, operation, eOpts) {
        // var me = this,
        //     organizationgrid = me.lookupReference('organizationgrid');

        // var root = store.getRoot();
        // if (root && root.hasChildNodes()) {
        //     var node = root.firstChild;
        //     if (node) {
        //         organizationgrid.getSelectionModel().select(node);
        //     }
        // }

        var me = this,
        organizationgrid = me.lookupReference('organizationgrid'),
            selModel = organizationgrid.getSelectionModel();

        //先中表格中的第一条记录
        if (!selModel.hasSelection()) {
            selModel.select(0);
        }

        store.getProxy().extraParams = {};

        me.autoColumnWidthButtonClick();


    }

});
