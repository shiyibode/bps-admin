Ext.define('MyApp.view.sys.ApiController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sysapi',

    requires: [
        'MyApp.model.sys.Api'
    ],

    onApiStoreBeforeLoad: function (store, operation, eOpts) {
        var me = this,
            searchForm = me.lookupReference('searchForm');

        var filter = null;

        if (searchForm) {
            filter = searchForm.getForm().getValues();
        }

        if (filter) {
            store.getProxy().extraParams = {
                filter: filter
            }
        }

        // if (selectionOrganization) {
        //     filter = store.getProxy().getExtraParams().filter;
        //     if (filter) {
        //         filter.organizationId = selectionOrganization.getId();
        //     } else {
        //         filter = {organizationId: selectionOrganization.getId()};
        //     }
            store.getProxy().getExtraParams().filter = filter;
        // }
    },

    /**
     * 用户 store load 完成后,选中第一条记录
     */
    onApiStoreLoad: function (store, records, successful, operation, eOpts) {
        var me = this,
            apigrid = me.lookupReference('apigrid'),
            selModel = apigrid.getSelectionModel();

        //先中表格中的第一条记录
        if (!selModel.hasSelection()) {
            selModel.select(0);
        }

        store.getProxy().extraParams = {};

        me.autoColumnWidthButtonClick();
    },

    autoColumnWidthButtonClick: function () {
        var me = this,
            apigrid = me.lookupReference('apigrid');

        Ext.suspendLayouts();
        Ext.Array.forEach(apigrid.columnManager.getColumns(),
            function (column) {
                if (apigrid.isVisible() && column.resizable) {
                    column.autoSize();
                }
            });
        Ext.resumeLayouts(true);
    },

    refreshBtnClick: function () {
        this.lookupReference('apigrid').getStore('apiStore').reload();
    },

    getGridSelected: function () {
        var me = this,
            apigrid = me.lookupReference('apigrid'),
            sModel = apigrid.getSelectionModel(),
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
    addApi: function () {
        var me = this,
            view = me.getView(),
            viewModel = me.getViewModel(),
            apigrid = me.lookupReference('apigrid'),
            store = apigrid.getStore(),
            record = Ext.create('MyApp.model.sys.Api');

        store.add(record);

        viewModel.set('current.record', record);
        viewModel.set('current.operation', 'add');
        Ext.getBody().mask(); //遮罩
        var window = view.floatingItems.get('apiwindow');
        // window.center();
        window.show();
    },

    editApi: function () {
        var me = this,
            view = me.getView(),
            viewModel = me.getViewModel(),
            record = viewModel.get('current.record');

        if (!record) {
            Ext.Msg.alert('提示', '请选中要编辑的记录！');
            return;
        }

        viewModel.set('current.operation', 'edit');
        Ext.getBody().mask(); //遮罩
        var window = view.floatingItems.get('apiwindow');
        // window.center();
        window.show();
    },

    deleteApi: function () {
        var me = this,
            view = me.getView(),
            viewModel = me.getViewModel(),
            apigrid = me.lookupReference('apigrid'),
            store = apigrid.getStore(),
            record = viewModel.get('current.record');

        if (!record) {
            Ext.Msg.alert('提示', '请选中要删除的记录！');
            return;
        }

        viewModel.set('current.operation', 'delete');

        Ext.Msg.show({
            title: '删除确认',
            message: '您确定要删除吗?',
            buttons: Ext.Msg.OKCANCEL,
            buttonText: {ok:I18N.Ok, cancel:I18N.Cancel},
            icon: Ext.Msg.QUESTION,
            fn: function (btn) {
                if (btn === 'ok') {
                    Ext.Msg.wait('数据删除中', '正在删除中，请稍候...');
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

    onSaveBtnClick: function (button) {
        var me = this,
            viewModel = me.getViewModel(),
            apigrid = me.lookupReference('apigrid'),
            apiGridStore = apigrid.getStore('apiStore'),
            record = viewModel.get('current.record'),
            operation = viewModel.get('current.operation');

        Ext.Msg.wait('数据保存中', '正在保存中，请稍候...');
        apiGridStore.sync({
            success: function (batch, options) {
                var msg = batch.getOperations()[0].getResultSet().getMessage();
                Ext.toast(msg);
                apiGridStore.reload();
                if (operation === 'add') {
                    button.up('apiwindow').close();
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
        button.up('apiwindow').close();
    },

    onWindowBeforeShow: function (window, eOpts) {
    
    },

    onWindowClose: function () {
        var me = this,
            apigrid = me.lookupReference('apigrid'),
            apiGridStore = apigrid.getStore('apiStore'),
            viewModel = me.getViewModel(),
            current = viewModel.get('current');

        if (current.operation) {
            if (current.operation === 'add') {
                var currentApi = viewModel.get('currentApi');
                viewModel.set('current.record', currentApi);
            }
            viewModel.set('current.operation', null);
            apiGridStore.rejectChanges();
        }

        Ext.getBody().unmask();
    }



});
