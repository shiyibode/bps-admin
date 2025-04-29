Ext.define('MyApp.view.sys.OrganizationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sysorganization',

    requires: [
        'MyApp.view.sys.widget.OrganizationWindow',
        'MyApp.model.sys.Organization'
    ],

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
            viewModel = me.getViewModel();
        

        var currentOrganization = viewModel.get('currentOrganization');
        if (!currentOrganization) {
            Ext.Msg.alert('提示', '请先选中上级机构！');
            return;
        }

        if (currentOrganization) {
            viewModel.set('parentId', currentOrganization.getId());
        }

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
        var window = view.floatingItems.get('organizationEditWindow');
        window.center();
        window.show();
    },

    onEditSaveBtnClick: function(button){
        var me = this,
            viewModel = me.getViewModel(),
            organizationgrid = me.lookupReference('organizationgrid'),
            organizationStore = organizationgrid.getStore();

        var currentOrganization = viewModel.get('currentOrganization');
        var changes = currentOrganization.getChanges();
        
        if (!Ext.Object.isEmpty(changes)) {
            changes.id = currentOrganization.getId();
            Ext.Ajax.request({
                url: CFG.getGlobalPath() + '/sys/organization/update',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'  // 必须设置 Content-Type
                },
                jsonData: JSON.stringify(changes),
                scope: this,
                success: function (response, opts) {
                    var result = Ext.decode(response.responseText, true);
                    if (result.success) {
                        organizationStore.reload();
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
            message: '删除该机构将同时删除该机构的下级机构,您确定要删除吗?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function (btn) {
                if (btn === 'yes') {
                    Ext.Msg.wait('数据删除中', '正在删除中，请稍候...');

                    Ext.Ajax.request({
                        url: CFG.getGlobalPath() + '/sys/organization/delete',
                        method: 'POST',
                        params: {
                            organizationId: record.get('id')
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
            organizationgrid = me.lookupReference('organizationgrid'),
            organizationGridStore = organizationgrid.getStore(),
            organizationForm = me.lookupReference('organizationForm'),
            form = organizationForm.getForm(),
            parentId = viewModel.get('parentId');

        if (form.isValid() && parentId) {
            var values = form.getValues();

            var data = {
                parentId: parentId, 
                name: values.name,
                code: values.code,
                sort: values.sort,
                type: values.type,
                grade: values.grade,
                remarks: values.remarks
            };

            Ext.Msg.wait('数据保存中', '正在保存中，请稍候...');
            Ext.Ajax.request({
                url: CFG.getGlobalPath() + '/sys/organization/create',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'  // 必须设置 Content-Type
                },
                jsonData: data,
                scope: this,
                success: function (response, opts) {
                    var result = Ext.decode(response.responseText, true);
                    if (result.success) {
                        organizationGridStore.reload();
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
        Ext.getBody().unmask();
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
