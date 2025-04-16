Ext.define('MyApp.view.sys.RoleController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sysrole',

    requires: [
        'MyApp.model.sys.Role'
    ],

    // NavigationTree 相关函数
    /**
     * 导航树的 store load 完成后, 选中第一个节点
     * @param store
     * @param records
     * @param successful
     * @param operation
     * @param eOpts
     */
    // onNavigationStoreLoad: function (store, records, successful, operation, eOpts) {
    //     var me = this,
    //         navigationtree = me.lookupReference('navigationtree');

    //     if (records && records[0]) {
    //         navigationtree.getSelectionModel().select(records[0]);
    //     }
    // },

    // getNavigationTreeSelection: function () {
    //     var me = this,
    //         navigationTree = me.lookupReference('navigationtree');

    //     var sModelArray = navigationTree.getSelection();
    //     if (sModelArray && sModelArray.length > 0) {
    //         return sModelArray[0];
    //     }
    //     return null;
    // },

    // /**
    //  * 当导航树中选中的节点发生改变时,加载 roleStore
    //  * @param treepanel
    //  * @param selected
    //  * @param eOpts
    //  */
    // onNavigationTreeSelectionChange: function (treepanel, selected, eOpts) {
    //     var me = this,
    //         roleStore = me.getViewModel().getStore('roleStore');

    //     roleStore.load();
    // },

    onRoleStoreBeforeLoad: function (store, operation, eOpts) {
        // var me = this,
        //     navigationTreeSelection = me.getNavigationTreeSelection();

        // if (navigationTreeSelection) {
            // store.getProxy().extraParams = {
            //     filter: {
            //         moduleId: navigationTreeSelection.getId()
            //     }
            // }
        // }
    },

    /**
     * 用户 store load 完成后,选中第一条记录
     * @param store
     * @param records
     * @param successful
     * @param operation
     * @param eOpts
     */
    onRoleStoreLoad: function (store, records, successful, operation, eOpts) {
        var me = this,
            rolegrid = me.lookupReference('rolegrid'),
            selModel = rolegrid.getSelectionModel();

        //先中表格中的第一条记录
        if (!selModel.hasSelection()) {
            selModel.select(0);
        }

        store.getProxy().extraParams = {};

        me.autoColumnWidthButtonClick();
    },

    expandBtnClick: function () {
        this.lookupReference('rolegrid').expandAll();
    },

    collapseBtnClick: function () {
        this.lookupReference('rolegrid').collapseAll();
    },

    autoColumnWidthButtonClick: function () {
        var me = this,
            rolegrid = me.lookupReference('rolegrid');

        Ext.suspendLayouts();
        Ext.Array.forEach(rolegrid.columnManager.getColumns(),
            function (column) {
                if (rolegrid.isVisible() && column.resizable) {
                    column.autoSize();
                }
            });
        Ext.resumeLayouts(true);
    },

    // navigationTreeRefreshBtnClick: function () {
    //     this.lookupReference('navigationtree').getStore('navigationStore').reload();
    // },

    refreshBtnClick: function () {
        this.lookupReference('rolegrid').getStore('roleStore').reload();
    },

    getGridSelected: function () {
        var me = this,
            roleGrid = me.lookupReference('rolegrid'),
            sModel = roleGrid.getSelectionModel(),
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
    addRole: function () {
        var me = this,
            view = me.getView(),
            viewModel = me.getViewModel(),
            rolegrid = me.lookupReference('rolegrid'),
            store = rolegrid.getStore(),
            record = Ext.create('MyApp.model.sys.Role');

        // var navigationTreeSelection = me.getNavigationTreeSelection();
        // if (navigationTreeSelection) {
        //     record.set('moduleId', navigationTreeSelection.getId())
        // }

        store.add(record);

        viewModel.set('current.record', record);
        viewModel.set('current.operation', 'add');
        Ext.getBody().mask(); //遮罩
        var window = view.floatingItems.get('roleWindow')
        window.center();
        window.show();
    },

    editRole: function () {
        var me = this,
            view = me.getView(),
            viewModel = me.getViewModel();

        if (!viewModel.get('current.record')) {
            Ext.Msg.alert('提示', '请选中要编辑的记录！');
            return;
        }

        var record = viewModel.get('current.record');

        viewModel.set('current.operation', 'edit');
        Ext.getBody().mask(); //遮罩
        var window = view.floatingItems.get('roleWindow')
        window.center();
        window.show();
    },

    deleteRole: function () {
        var me = this,
            view = me.getView(),
            viewModel = me.getViewModel(),
            rolegrid = me.lookupReference('rolegrid'),
            store = rolegrid.getStore(),
            record = viewModel.get('current.record');

        if (!record) {
            Ext.Msg.alert('提示', '请选中要删除的记录！');
            return;
        }
        viewModel.set('current.operation', 'delete');

        Ext.Msg.show({
            title: '删除确认',
            message: '您确定要删除吗?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function (btn) {
                if (btn === 'yes') {
                    Ext.Msg.wait('数据删除中', '正在删除中，请稍候...');
                    // record.drop();
                    store.remove(record);
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

    // roleApi: function(){
    //     var me = this,
    //         view = me.getView(),
    //         viewModel = me.getViewModel();

    //     if (!viewModel.get('current.record')) {
    //         Ext.Msg.alert('提示', '请选中要编辑的角色！');
    //         return;
    //     }

    //     Ext.getBody().mask(); //遮罩
    //     var window = view.floatingItems.get('roleApiWindow')
    //     window.center();
    //     window.show();
    // },

    viewRole: function () {
        var me = this,
            view = me.getView(),
            viewModel = me.getViewModel();

        if (!viewModel.get('current.record')) {
            Ext.Msg.alert('提示', '请选中要查看的记录！');
            return;
        }
        viewModel.set('current.operation', 'view');
        Ext.getBody().mask(); //遮罩
        var window = view.floatingItems.get('roleWindow')
        window.center();
        window.show();
    },

    onSaveBtnClick: function (button) {
        var me = this,
            viewModel = me.getViewModel(),
            rolegrid = me.lookupReference('rolegrid'),
            roleGridStore = rolegrid.getStore('roleStore'),
            record = viewModel.get('current.record'),
            operation = viewModel.get('current.operation');

        Ext.Msg.wait('数据保存中', '正在保存中，请稍候...');
        roleGridStore.sync({
            success: function (batch, options) {
                var msg = batch.getOperations()[0].getResultSet().getMessage();
                Ext.toast(msg);
                roleGridStore.reload();
                if (operation === 'add') {
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

    onWindowBeforeShow: function (window, eOpts) {
        var me = this;
        if (window.itemId === 'roleWindow') { //用户信息窗口
            // var navigationStore = me.getViewModel().getStore('navigationStore');
            // var moduletreepicker = me.lookupReference('moduletreepicker');
            // moduletreepicker.setStore(navigationStore);

            // var dataScopeOrganizationStore = me.getViewModel().getStore('dataScopeOrganizationStore');
            // var datascopetreepicker = me.lookupReference('datascopetreepicker');
            // datascopetreepicker.setStore(dataScopeOrganizationStore);

            var menuStore = me.getViewModel().getStore('menuStore');
            var menutreepicker = me.lookupReference('menutreepicker');
            menutreepicker.setStore(menuStore);
        }
    },

    onWindowClose: function () {
        var me = this,
            rolegrid = me.lookupReference('rolegrid'),
            roleGridStore = rolegrid.getStore('roleStore'),
            viewModel = me.getViewModel(),
            current = viewModel.get('current');

        if (current.operation) {
            if (current.operation === 'add') {
                var currentRole = viewModel.get('currentRole');
                viewModel.set('current.record', currentRole);
            }
            viewModel.set('current.operation', null);
            roleGridStore.rejectChanges();
        }

        Ext.getBody().unmask();
    },

    // onRoleApiWindowClose: function(){
    //     console.log('role api window close');
    //     Ext.getBody().unmask();
    // }
});
