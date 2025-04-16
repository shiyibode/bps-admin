Ext.define('MyApp.view.sys.MenuController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sysmenu',

    requires: [
        'MyApp.view.sys.widget.MenuWindow',
        'MyApp.model.sys.Menu'
    ],

    autoColumnWidthButtonClick: function () {
        var me = this,
            menugrid = me.lookupReference('menugrid');

        Ext.suspendLayouts();
        Ext.Array.forEach(menugrid.columnManager.getColumns(),
            function (column) {
                if (menugrid.isVisible() && column.resizable) {
                    column.autoSize();
                }
            });
        Ext.resumeLayouts(true);
    },

    refreshBtnClick: function () {
        this.lookupReference('menugrid').getStore('menuStore').reload();
    },

    prevMenuBtnClick: function () {
        var me = this;
        // var menuTreeGrid = me.getView().down('menutreegrid');
        var menuGrid = me.lookupReference('menugrid');
        var selectionModel = menuGrid.getSelectionModel();
        var store = menuGrid.getStore('menuStore');

        if (selectionModel.getCount() == 0) {
            if (store.getCount() > 0) {
                selectionModel.select(store.getAt(0));
            } else {
                Ext.toastWarn('当前列表中没有可显示的记录!');
            }
        } else {
            var index = store.indexOf(selectionModel.getSelection()[0]);
            if (index == 0) {
                Ext.toastWarn('已经是当前列表的第一条记录!');
            } else {
                selectionModel.select(store.getAt(index - 1));
            }
        }

    },

    nextMenuBtnClick: function () {
        var me = this;
        var menuGrid = me.lookupReference('menugrid');
        var selectionModel = menuGrid.getSelectionModel();
        var store = menuGrid.getStore('menuStore');

        if (selectionModel.getCount() == 0) {
            if (store.getCount() > 0) {
                selectionModel.select(store.getAt(0));
            } else {
                Ext.toastWarn('当前列表中没有可显示的记录!');
            }
        } else {
            var index = store.indexOf(selectionModel.getSelection()[0]);
            if (index == store.getTotalCount() - 1) {
                Ext.toastWarn('已经是当前列表的最后一条记录!');
            } else {
                selectionModel.select(store.getAt(index + 1));
            }
        }
    },

    getGridSelected: function () {
        var me = this,
            menuGrid = me.lookupReference('menugrid'),
            sModel = menuGrid.getSelectionModel(),
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
    addMenu: function () {
        var me = this,
            view = me.getView(),
            viewModel = me.getViewModel(),
            // menugrid = me.lookupReference('menugrid'),
            menugrid = Ext.getCmp('menugrid'),
            store = menugrid.getStore(),
            record = Ext.create('MyApp.model.sys.Menu');

        var root = store.getRoot();
        root.appendChild(record);

        var currentMenu = viewModel.get('currentMenu');
        if (currentMenu) {
            record.set('parentId', currentMenu.getId());
        }

        viewModel.set('current.record', record);
        viewModel.set('current.operation', 'add');
        Ext.getBody().mask(); //遮罩
        var window = view.floatingItems.get('menuWindow');
        window.center();
        window.show();
    },

    editMenu: function () {
        var me = this,
            view = me.getView(),
            viewModel = me.getViewModel();

        if (!viewModel.get('current.record')) {
            Ext.Msg.alert(I18N.Tips, '请选中要编辑的记录！');
            return;
        }
        if (viewModel.get('current.record').get('editable') === false) {
            Ext.Msg.alert(I18N.Tips, '您无权限修改此节点!');
            return;
        }
        viewModel.set('current.operation', 'edit');
        Ext.getBody().mask(); //遮罩
        var window = view.floatingItems.get('menuWindow');
        window.center();
        window.show();
    },

    deleteMenu: function () {
        var me = this,
            viewModel = me.getViewModel(),
            menugrid = me.lookupReference('menugrid'),
            store = menugrid.getStore(),
            record = viewModel.get('current.record');

        if (!record) {
            var al = Ext.Msg.alert(I18N.Tips, '请选中要删除的记录！');
            return;
        }
        if (record.get('editable') === false) {
            Ext.Msg.alert(I18N.Warning, '您无权限删除此节点!');
            return;
        }
        viewModel.set('current.operation', 'delete');

        Ext.Msg.show({
            title: '删除确认',
            message: '删除该菜单将同时删除该菜单下的所有子菜单,您确定要删除吗?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText:{yes: I18N.Yes, no: I18N.Cancel},
            fn: function (btn) {
                if (btn === 'yes') {
                    Ext.Msg.wait('数据删除中', '正在删除中，请稍候...');
                    record.drop();
                    store.sync({
                        success: function (batch, options) {
                            var msg = batch.getOperations()[0].getResultSet().getMessage();
                            Ext.toast(msg);
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

    viewMenu: function () {
        var me = this,
            view = me.getView(),
            viewModel = me.getViewModel();

        if (!viewModel.get('current.record')) {
            Ext.Msg.alert(I18N.Tips, '请选中要查看的记录！');
            return;
        }
        viewModel.set('current.operation', 'view');
        Ext.getBody().mask(); //遮罩
        var window = view.floatingItems.get('menuWindow');
        window.center();
        window.show();
    },


    onSaveBtnClick: function (button) {
        var me = this,
            viewModel = me.getViewModel(),
            menugrid = me.lookupReference('menugrid'),
            menuGridStore = menugrid.getStore('menuStore'),
            record = viewModel.get('current.record'),
            operation = viewModel.get('current.operation');

        var needReloadStore = (operation === 'add') || record.isModified('parentId') || record.isModified('text') || record.isModified('sort');

        Ext.Msg.wait('数据保存中', '正在保存中，请稍候...');
        menuGridStore.sync({
            success: function (batch, options) {
                var msg = batch.getOperations()[0].getResultSet().getMessage();
                // Ext.toastInfo(msg);
                Ext.toast(msg);
                if (needReloadStore) {
                    menuGridStore.reload();
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


    onMenuWindowBeforeShow: function () {
        var me = this;

        // var store = me.getViewModel().getStore('uxTreePickerStore');
        var store = me.getViewModel().getStore('menuStore');
        var uxtreepicker = me.lookupReference('uxtreepicker');
        uxtreepicker.setStore(store);
    },

    onMenuWindowClose: function () {
        var me = this,
            menugrid = Ext.getCmp('menugrid'),
            menuGridStore = menugrid.getStore('menuStore'),
            viewModel = me.getViewModel(),
            current = viewModel.get('current');

        if (current && current.operation === 'add') {
            var root = menuGridStore.getRoot();
            root.removeChild(current.record);
            
            var currentMenu = viewModel.get('currentMenu');
            viewModel.set('current.record', currentMenu);
        }
        viewModel.set('current.operation', null);

        menuGridStore.rejectChanges();

        Ext.getBody().unmask();
    },

    onUxTreePickerChange: function (treepicker, newValue, oldValue, eOpts) {
        var me = this,
            viewModel = me.getViewModel(),
            current = viewModel.get('current'),
            menuTypeStore = viewModel.getStore('menuTypeStore');

        if (current.operation && newValue != oldValue) {
            // menuTypeCombo.clearValue();
            menuTypeStore.clearFilter();
            if (newValue == 1) {
                menuTypeStore.filterBy(function (item) {
                    return item.get('id') == 0;
                });
            } else {
                menuTypeStore.filterBy(function (item) {
                    return item.get('id') != 0;
                });
            }
        }
    },

    onMenuStoreLoad: function (store, records, successful, operation, eOpts) {
        var me = this,
            menugrid = me.lookupReference('menugrid'),
            selModel = menugrid.getSelectionModel();

        //先中表格中的第一条记录
        if (!selModel.hasSelection()) {
            selModel.select(0);
        }
        store.getProxy().extraParams = {};

        me.autoColumnWidthButtonClick();
    }

});
