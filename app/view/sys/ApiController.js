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
            store.getProxy().extraParams = filter
        }

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
            viewModel = me.getViewModel();

        viewModel.set('current.operation', 'add');
        Ext.getBody().mask(); //遮罩
        var window = view.floatingItems.get('apiWindow');
        window.center();
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
        var window = view.floatingItems.get('apiEditWindow');
        window.center();
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
                    Ext.Ajax.request({
                        url: CFG.getGlobalPath() + '/sys/api/delete',
                        method: 'POST',
                        params: {
                            apiId: record.get('id')
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
            apigrid = me.lookupReference('apigrid'),
            apiGridStore = apigrid.getStore('apiStore'),
            apiForm = me.lookupReference('apiForm'),
            form = apiForm.getForm();

            if (form.isValid()) {
                var values = form.getValues();
    
                var data = {
                    name: values.name, 
                    uri: values.uri,
                    permission: values.permission,
                    remarks: values.remarks
                };
    
                Ext.Msg.wait('数据保存中', '正在保存中，请稍候...');
                Ext.Ajax.request({
                    url: CFG.getGlobalPath() + '/sys/api/create',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'  // 必须设置 Content-Type
                    },
                    jsonData: data,
                    scope: this,
                    success: function (response, opts) {
                        var result = Ext.decode(response.responseText, true);
                        if (result.success) {
                            apiGridStore.reload();
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

    onEditSaveBtnClick: function(button){
        var me = this,
            viewModel = me.getViewModel(),
            apigrid = me.lookupReference('apigrid'),
            apiStore = apigrid.getStore();

        var currentApi = viewModel.get('currentApi');
        var changes = currentApi.getChanges();
        
        if (!Ext.Object.isEmpty(changes)) {
            changes.id = currentApi.getId();
            Ext.Ajax.request({
                url: CFG.getGlobalPath() + '/sys/api/update',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'  // 必须设置 Content-Type
                },
                jsonData: JSON.stringify(changes),
                scope: this,
                success: function (response, opts) {
                    var result = Ext.decode(response.responseText, true);
                    if (result.success) {
                        apiStore.reload();
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


    onCancelBtnClick: function (button) {
        button.up('window').close();
        Ext.getBody().unmask();
    },

    onWindowClose: function () {
        Ext.getBody().unmask();
    },

    // 将菜单绑定至角色
    addPermission: function(){
        var me = this,
            view = me.getView(),
            viewModel = me.getViewModel();

        var currentMenu = viewModel.get('currentApi');

        if (!currentMenu) {
            Ext.Msg.alert('提示', '请先选中要绑定的接口！');
            return;
        }

        Ext.getBody().mask(); //遮罩
        var window = view.floatingItems.get('apiBindToRoleWindow');
        window.center();
        window.show();
    },


    onBindToRoleSaveBtnClick: function (button) {
        var me = this,
            viewModel = me.getViewModel(),
            apiBindToRoleForm = me.lookupReference('apiBindToRoleForm'),
            form = apiBindToRoleForm.getForm(),
            currentApi = viewModel.get('currentApi');

        if (form.isValid() ) {
            var values = form.getValues();

            var data = {
                apiId: currentApi.getId(), 
                roleId: values.roleId,
                dataScope: values.dataScope
            };

            Ext.Ajax.request({
                url: CFG.getGlobalPath() + '/sys/permission/create',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'  // 必须设置 Content-Type
                },
                jsonData: data,
                scope: this,
                success: function (response, opts) {
                    var result = Ext.decode(response.responseText, true);
                    if (result.success) {
                        Ext.toast(result.msg);
                        button.up('window').close();
                        Ext.getBody().unmask();
                    } else {
                        Ext.Msg.alert('出错', result.msg);
                    }
                },
                failure: MyApp.ux.data.FailureProcess.Ajax
            });
            

        }
    },

    onBindToRoleCancelBtnClick: function (button) {
        button.up('window').close();
        Ext.getBody().unmask();
    }



});
