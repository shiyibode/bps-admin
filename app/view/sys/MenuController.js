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

    onMenuStoreBeforeLoad: function(){
        var me = this,
            menugrid = me.lookupReference('menugrid'),
            store = menugrid.getStore(),
            searchForm = me.lookupReference('searchForm');

        var filter = null;

        if (searchForm) {
            filter = searchForm.getForm().getValues();
        }

        if (filter) {
            store.getProxy().extraParams = filter
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
            viewModel = me.getViewModel();

        var currentMenu = viewModel.get('currentMenu');
        if (currentMenu) {
            viewModel.set('parentId', currentMenu.getId());
        }

        if (!currentMenu) {
            Ext.Msg.alert('提示', '请先选中上级菜单！');
            return;
        }

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
        var window = view.floatingItems.get('menuEditWindow');
        window.center();
        window.show();
    },

    deleteMenu: function () {
        var me = this,
            viewModel = me.getViewModel(),
            menugrid = me.lookupReference('menugrid'),
            menuStore = menugrid.getStore(),
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
                    Ext.Ajax.request({
                        url: CFG.getGlobalPath() + '/sys/menu/delete',
                        method: 'POST',
                        params: {
                            menuId: record.get('id')
                        },
                        scope: this,
                        success: function (response, opts) {
                            var result = Ext.decode(response.responseText, true);
                            if (result.success) {
                                menuStore.reload();
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
            menugrid = me.lookupReference('menugrid'),
            menuStore = menugrid.getStore(),
            menuForm = me.lookupReference('menuForm'),
            form = menuForm.getForm(),
            parentId = viewModel.get('parentId');

        if (form.isValid() && parentId) {
            var values = form.getValues();

            var data = {
                parentId: parentId, 
                name: values.name,
                enName: values.enName,
                sort: values.sort,
                type: values.type,
                uri: values.uri,
                locale: values.locale,
                target: values.target,
                icon: values.icon,
                isShow: values.isShow,
                description: values.description, 
                remarks: values.remarks
            };

            Ext.Ajax.request({
                url: CFG.getGlobalPath() + '/sys/menu/create',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'  // 必须设置 Content-Type
                },
                jsonData: data,
                scope: this,
                success: function (response, opts) {
                    var result = Ext.decode(response.responseText, true);
                    if (result.success) {
                        menuStore.reload();
                        Ext.toast(result.msg);
                        button.up('window').close();
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
            menugrid = me.lookupReference('menugrid'),
            menuStore = menugrid.getStore();

        var currentMenu = viewModel.get('currentMenu');
        var changes = currentMenu.getChanges();

        if (!Ext.Object.isEmpty(changes)) {
            changes.id = currentMenu.getId();
            Ext.Ajax.request({
                url: CFG.getGlobalPath() + '/sys/menu/update',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'  // 必须设置 Content-Type
                },
                jsonData: JSON.stringify(changes),
                scope: this,
                success: function (response, opts) {
                    var result = Ext.decode(response.responseText, true);
                    if (result.success) {
                        menuStore.reload();
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
    },

    onMenuWindowClose: function () {
        Ext.getBody().unmask();
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
    },

    // 将菜单绑定至角色
    bindToRole: function(){
        var me = this,
            view = me.getView(),
            viewModel = me.getViewModel();

        var currentMenu = viewModel.get('currentMenu');

        if (!currentMenu) {
            Ext.Msg.alert('提示', '请先选中要绑定的菜单！');
            return;
        }

        Ext.getBody().mask(); //遮罩
        var window = view.floatingItems.get('menuBindToRoleWindow');
        window.center();
        window.show();
    },


    onBindToRoleSaveBtnClick: function (button) {
        var me = this,
            viewModel = me.getViewModel(),
            menuBindToRoleForm = me.lookupReference('menuBindToRoleForm'),
            form = menuBindToRoleForm.getForm(),
            currentMenu = viewModel.get('currentMenu');

        if (form.isValid() ) {
            var values = form.getValues();

            var data = {
                menuId: currentMenu.getId(), 
                roleId: values.roleId
            };

            Ext.Ajax.request({
                url: CFG.getGlobalPath() + '/sys/role/bindMenuToRole',
                method: 'POST',
                params: data,
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
    },

});
