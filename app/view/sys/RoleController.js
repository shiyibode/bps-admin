Ext.define('MyApp.view.sys.RoleController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sysrole',

    requires: [
        'MyApp.model.sys.Role'
    ],

    onRoleStoreBeforeLoad: function (store, operation, eOpts) {
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
            viewModel = me.getViewModel();

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
        var window = view.floatingItems.get('roleEditWindow')
        window.center();
        window.show();
    },

    onEditSaveBtnClick: function(button){
        var me = this,
            viewModel = me.getViewModel(),
            rolegrid = me.lookupReference('rolegrid'),
            roleStore = rolegrid.getStore();

        var currentRole = viewModel.get('current.record');
        var changes = currentRole.getChanges();
        
        if (!Ext.Object.isEmpty(changes)) {
            changes.id = currentRole.getId();
            Ext.Ajax.request({
                url: CFG.getGlobalPath() + '/sys/role/update',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'  // 必须设置 Content-Type
                },
                jsonData: JSON.stringify(changes),
                scope: this,
                success: function (response, opts) {
                    var result = Ext.decode(response.responseText, true);
                    if (result.success) {
                        roleStore.reload();
                        Ext.toast(result.msg);
                        button.up('window').close();
                    } else {
                        Ext.Msg.alert('出错', result.msg);
                    }
                },
                failure: MyApp.ux.data.FailureProcess.Ajax
            });
        } else {
            console.log('记录未被修改');
        }

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
                    Ext.Ajax.request({
                        url: CFG.getGlobalPath() + '/sys/role/delete',
                        method: 'POST',
                        params: {
                            roleId: record.get('id')
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

                } else if (btn === 'no') {
                }
            }
        });
    },

    onSaveBtnClick: function (button) {
        var me = this,
            viewModel = me.getViewModel(),
            rolegrid = me.lookupReference('rolegrid'),
            roleStore = rolegrid.getStore(),
            roleForm = me.lookupReference('roleForm'),
            form = roleForm.getForm();

        if (form.isValid()) {
            Ext.Msg.wait('数据保存中', '正在保存中，请稍候...');
            var values = form.getValues();
            var data = {
                name: values.name,
                enName: values.enName,
                remarks: values.remarks
            };

            Ext.Ajax.request({
                url: CFG.getGlobalPath() + '/sys/role/create',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'  // 必须设置 Content-Type
                },
                jsonData: data,
                scope: this,
                success: function (response, opts) {
                    var result = Ext.decode(response.responseText, true);
                    if (result.success) {
                        roleStore.reload();
                        Ext.toast(result.msg);
                        button.up('window').close();
                        Ext.Msg.hide(); //隐藏等待对话框
                    } else {
                        Ext.Msg.alert('出错', result.msg);
                    }
                },
                failure: MyApp.ux.data.FailureProcess.Ajax
            });
            

        }
    },


    onCancelBtnClick: function (button) {
        button.up('window').close();
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
    }



});
