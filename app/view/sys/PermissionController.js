Ext.define('MyApp.view.sys.PermissionController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.syspermission',

    requires: [
        'MyApp.model.sys.Permission'
    ],

    onPermissionStoreBeforeLoad: function (store, operation, eOpts) {
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

    /**
     * 用户 store load 完成后,选中第一条记录
     */
    onPermissionStoreLoad: function (store, records, successful, operation, eOpts) {
        var me = this,
            permissiongrid = me.lookupReference('permissiongrid'),
            selModel = permissiongrid.getSelectionModel();

        //先中表格中的第一条记录
        if (!selModel.hasSelection()) {
            selModel.select(0);
        }

        store.getProxy().extraParams = {};

        me.autoColumnWidthButtonClick();
    },

    autoColumnWidthButtonClick: function () {
        var me = this,
            permissiongrid = me.lookupReference('permissiongrid');

        Ext.suspendLayouts();
        Ext.Array.forEach(permissiongrid.columnManager.getColumns(),
            function (column) {
                if (permissiongrid.isVisible() && column.resizable) {
                    column.autoSize();
                }
            });
        Ext.resumeLayouts(true);
    },

    refreshBtnClick: function () {
        this.lookupReference('permissiongrid').getStore('permissionStore').reload();
    },

    getGridSelected: function () {
        var me = this,
            permissiongrid = me.lookupReference('permissiongrid'),
            sModel = permissiongrid.getSelectionModel(),
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
    addPermission: function () {
        var me = this,
            view = me.getView(),
            viewModel = me.getViewModel(),
            permissiongrid = me.lookupReference('permissiongrid'),
            store = permissiongrid.getStore(),
            record = Ext.create('MyApp.model.sys.Permission');
        var currentRole = viewModel.get('currentRole');
        
        if(currentRole === undefined || currentRole === null){
            Ext.Msg.alert(I18N.Warning,'请先选中角色');
        }
        else{
            record.set('roleId',currentRole.id);
            store.add(record);

            viewModel.set('current.record', record);
            viewModel.set('current.operation', 'add');
            Ext.getBody().mask(); //遮罩
            var window = view.floatingItems.get('permissionwindow');
            // window.center();
            window.show();
        }
    },

    editPermission: function () {
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
        var window = view.floatingItems.get('permissionwindow');
        // window.center();
        window.show();
    },

    deletePermission: function () {
        var me = this,
            viewModel = me.getViewModel(),
            permissiongrid = me.lookupReference('permissiongrid'),
            store = permissiongrid.getStore(),
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

                    Ext.Ajax.request({
                        url: CFG.getGlobalPath() + '/sys/permission/delete',
                        method: 'POST',
                        params: {
                            id: record.getId()
                        },
                        scope: this,
                        success: function (response, opts) {
                            var result = Ext.decode(response.responseText, true);
                            if (result.success) {
                                store.reload();
                                Ext.toast(result.msg);
                                Ext.Msg.hide();;
                            } else {
                                Ext.Msg.alert('出错', result.msg);
                            }
                        },
                        failure: MyApp.ux.data.FailureProcess.Ajax
                    });
                } else if (btn === 'no') {}
            }
        });
    },

    onSaveBtnClick: function (button) {
        var me = this,
            viewModel = me.getViewModel(),
            permissiongrid = me.lookupReference('permissiongrid'),
            permissionGridStore = permissiongrid.getStore('permissionStore'),
            record = viewModel.get('current.record'),
            operation = viewModel.get('current.operation');

        Ext.Msg.wait('数据保存中', '正在保存中，请稍候...');
        permissionGridStore.sync({
            success: function (batch, options) {
                var msg = batch.getOperations()[0].getResultSet().getMessage();
                Ext.toast(msg);
                permissionGridStore.reload();
                if (operation === 'add') {
                    button.up('permissionwindow').close();
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
        button.up('permissionwindow').close();
    },

    onWindowBeforeShow: function (window, eOpts) {
        var me = this;
        if (window.itemId === 'permissionwindow') { 

            var dataScopeOrganizationStore = me.getViewModel().getStore('dataScopeOrganizationStore');
            var datascopetreepicker = me.lookupReference('permissiondatascopetreepicker');
            datascopetreepicker.setStore(dataScopeOrganizationStore);
        }
    },

    onWindowClose: function () {
        var me = this,
            permissiongrid = me.lookupReference('permissiongrid'),
            permissionGridStore = permissiongrid.getStore('permissionStore'),
            viewModel = me.getViewModel(),
            current = viewModel.get('current');

        if (current.operation) {
            if (current.operation === 'add') {
                var currentPermission = viewModel.get('currentPermission');
                viewModel.set('current.record', currentPermission);
            }
            viewModel.set('current.operation', null);
            permissionGridStore.rejectChanges();
        }

        Ext.getBody().unmask();
    }

});
