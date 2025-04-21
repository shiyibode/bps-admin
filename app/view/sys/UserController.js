Ext.define('MyApp.view.sys.UserController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sysuser',

    requires: [
        'MyApp.model.sys.User'
    ],

    /**
     * 机构树的 store load 完成后, 选中第一个节点
     */
    onOrganizationStoreLoad: function (store, records, successful, operation, eOpts) {
        var me = this,
            navigationtree = me.lookupReference('navigationtree');

        if (records && records[0]) {
            navigationtree.getSelectionModel().select(records[0]);
        }

        // 展开菜单
        Ext.defer(
            function(){
                navigationtree.expandAll();
            },100)
    },

    onUserStoreBeforeLoad: function (store, operation, eOpts) {
        var me = this,
            selectionOrganization = me.getNavigationTreeSelection(),
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

        if (selectionOrganization) {
            filter = store.getProxy().getExtraParams().filter;
            if (filter) {
                filter.organizationId = selectionOrganization.getId();
            } else {
                filter = {organizationId: selectionOrganization.getId()};
            }
            store.getProxy().getExtraParams().filter = filter;
        }
    },

    /**
     * 用户 store load 完成后,选中第一条记录
     */
    onUserStoreLoad: function (store, records, successful, operation, eOpts) {
        var me = this,
            usergrid = me.lookupReference('usergrid'),
            selModel = usergrid.getSelectionModel();

        //先中表格中的第一条记录
        if (!selModel.hasSelection()) {
            selModel.select(0);
        }

        store.getProxy().extraParams = {};

        me.autoColumnWidthButtonClick();
    },

    expandBtnClick: function () {
        this.lookupReference('usergrid').expandAll();
    },

    collapseBtnClick: function () {
        this.lookupReference('usergrid').collapseAll();
    },

    autoColumnWidthButtonClick: function () {
        var me = this,
            usergrid = me.lookupReference('usergrid');

        Ext.suspendLayouts();
        Ext.Array.forEach(usergrid.columnManager.getColumns(),
            function (column) {
                if (usergrid.isVisible() && column.resizable) {
                    column.autoSize();
                }
            });
        Ext.resumeLayouts(true);
    },

    navigationTreeRefreshBtnClick: function () {
        this.lookupReference('navigationtree').getStore().reload();
    },

    refreshBtnClick: function () {
        this.lookupReference('usergrid').getStore('userStore').reload();
    },

    getGridSelected: function () {
        var me = this,
            userGrid = me.lookupReference('usergrid'),
            sModel = userGrid.getSelectionModel(),
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

    //OrganizationTree 相关函数
    getNavigationTreeSelection: function () {
        var me = this,
            navigationTree = me.lookupReference('navigationtree');

        var sModelArray = navigationTree.getSelection();
        if (sModelArray && sModelArray.length > 0) {
            return sModelArray[0];
        }
        return null;
    },

    /**
     * 当机构树中选中的节点发生改变时,加载 userStore
     * @param treepanel
     * @param selected
     * @param eOpts
     */
    onNavigationTreeSelectionChange: function (treepanel, selected, eOpts) {
        var me = this,
            userStore = me.getViewModel().getStore('userStore');

        userStore.load();
    },


    //增删改查等功能实现
    addUser: function () {
        var me = this,
            view = me.getView(),
            viewModel = me.getViewModel(),
            usergrid = me.lookupReference('usergrid'),
            store = usergrid.getStore(),
            record = Ext.create('MyApp.model.sys.User');

        var selectionOrganization = me.getNavigationTreeSelection();
        if (selectionOrganization) {
            record.set('uoOrganizationId', selectionOrganization.getId())
        }

        store.add(record);

        viewModel.set('current.record', record);
        viewModel.set('current.operation', 'add');
        Ext.getBody().mask(); //遮罩
        var window = view.floatingItems.get('userWindow');
        // window.center();
        window.show();
    },

    editUser: function () {
        var me = this,
            view = me.getView(),
            viewModel = me.getViewModel(),
            record = viewModel.get('current.record');

        if (!record) {
            Ext.Msg.alert('提示', '请选中要编辑的记录！');
            return;
        }

        var validFlag = record.get('validFlag');
        if (validFlag == false) {
            Ext.Msg.alert('错误提示', '[ ' + record.get('userCode') + ' ' + record.get('userName') + '] 只允许在其 在职 机构进行修改！');
            return;
        }

        viewModel.set('current.operation', 'edit');
        Ext.getBody().mask(); //遮罩
        var window = view.floatingItems.get('userWindow');
        // window.center();
        window.show();
    },

    deleteUser: function () {
        var me = this,
            view = me.getView(),
            viewModel = me.getViewModel(),
            usergrid = me.lookupReference('usergrid'),
            store = usergrid.getStore(),
            record = viewModel.get('current.record');

        if (!record) {
            Ext.Msg.alert('提示', '请选中要删除的记录！');
            return;
        }

        var validFlag = record.get('validFlag');
        if (validFlag == false) {
            Ext.Msg.alert('错误提示', '[ ' + record.get('userCode') + ' ' + record.get('userName') + ' ] 只允许在其 在职 机构进行删除！');
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

    viewUser: function () {
        var me = this,
            view = me.getView(),
            viewModel = me.getViewModel();

        if (!viewModel.get('current.record')) {
            Ext.Msg.alert('提示', '请选中要查看的记录！');
            return;
        }
        viewModel.set('current.operation', 'view');
        Ext.getBody().mask(); //遮罩
        var window = view.floatingItems.get('userWindow');
        // window.center();
        window.show();
    },

    onSaveBtnClick: function (button) {
        var me = this,
            viewModel = me.getViewModel(),
            usergrid = me.lookupReference('usergrid'),
            userGridStore = usergrid.getStore('userStore'),
            record = viewModel.get('current.record'),
            operation = viewModel.get('current.operation');

        Ext.Msg.wait('数据保存中', '正在保存中，请稍候...');
        userGridStore.sync({
            success: function (batch, options) {
                var msg = batch.getOperations()[0].getResultSet().getMessage();
                Ext.toast(msg);
                userGridStore.reload();
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
        if (window.itemId === 'userWindow') { //用户信息窗口
            var organizationStore = me.getViewModel().getStore('organizationStore');
            var organizationtreepicker = me.lookupReference('organizationtreepicker');
            organizationtreepicker.setStore(organizationStore);
        }

        if (window.itemId === 'userOrganizationWindow') { //用户机构调动窗口
            var organizationStore = me.getViewModel().getStore('organizationStore');
            var intoorganizationtreepicker = me.lookupReference('intoorganizationtreepicker');
            intoorganizationtreepicker.setStore(organizationStore);
        }
    },

    onWindowClose: function () {
        var me = this,
            usergrid = me.lookupReference('usergrid'),
            userGridStore = usergrid.getStore('userStore'),
            viewModel = me.getViewModel(),
            current = viewModel.get('current');

        if (current.operation) {
            if (current.operation === 'add') {
                var currentUser = viewModel.get('currentUser');
                viewModel.set('current.record', currentUser);
            }
            viewModel.set('current.operation', null);
            userGridStore.rejectChanges();
        }

        Ext.getBody().unmask();
    },

    //重置密码
    resetUserPassword: function () {
        var me = this,
            view = me.getView(),
            viewModel = me.getViewModel(),
            record = me.getViewModel().get('current.record');;

        if (!viewModel.get('current.record')) {
            Ext.Msg.alert('提示', '请选中要重置密码的用户！');
            return;
        }

        Ext.Msg.show({
            title: '重置密码',
            message: '您确定要重置该用户密码吗?',
            buttons: Ext.Msg.OKCANCEL,
            buttonText: {ok:I18N.Ok, cancel:I18N.Cancel},
            icon: Ext.Msg.QUESTION,
            fn: function (btn) {
                if (btn === 'ok') {
                    Ext.Msg.wait('密码重置中', '正在重置密码中，请稍候...');
                    
                    var data = new Array();

                    data.push({userId: record.get('userId')});
                    var dataJson = {
                        data: data
                    };

                    Ext.Ajax.request({
                        url: '/sys/user/resetPassword',
                        method: 'POST',
                        defaultPostHeader: 'application/json;charset=UTF-8',
                        params: Ext.JSON.encode(dataJson),
                        scope: this,
                        success: function (response, opts) {
                            var result = Ext.decode(response.responseText, true);
                            Ext.Msg.hide();
                            if (result.success) {
                                Ext.toast(result.msg);
                            } else {
                                Ext.Msg.alert('重置用户密码出错', result.msg);
                            }
                        },
                        failure: MyApp.ux.data.FailureProcess.Ajax
                    });
                } else if (btn === 'no') {}
            }
        });
    },

    //修改机构
    alterUserOrganization: function () {
        var me = this,
            view = me.getView(),
            viewModel = me.getViewModel(),
            record = viewModel.get('current.record');

        if (!record) {
            Ext.Msg.alert('提示', '请选中要修改机构的用户！');
            return;
        }

        var validFlag = record.get('validFlag'),
            userStatus = record.get('userStatus');
        if (validFlag === false) {
            Ext.Msg.alert("机构调动错误", '无法执行机构调动操作, [ ' + record.get('userCode') + ' ' + record.get('userName') + ' ] 已被调离该机构!');
            return;
        }
        if(userStatus != '1'){
            Ext.Msg.alert("机构调动错误", '无法执行机构调动操作, [ ' + record.get('userCode') + ' ' + record.get('userName') + ' ] 履职状态不正常!');
            return;
        }

        //清空 调入机构 各输入框
        var intoOrganizationFieldset = me.lookupReference('intoOrganizationFieldset');
        Ext.each(intoOrganizationFieldset.query('field'), function (field) {
            field.reset();
        });

        var window = view.floatingItems.get('userOrganizationWindow');
        Ext.getBody().mask(); //遮罩
        window.show();
    },

    onUserOrganizationSaveBtnClick: function (button) {
        var me = this,
            record = me.getViewModel().get('current.record'),
            userStore = me.getViewModel().getStore('userStore'),
            userOrganizationForm = me.lookupReference('userOrganizationForm'),
            form = userOrganizationForm.getForm();

        if (form.isValid()) {
            var values = form.getValues();

            if (record.get('organizationId') === values.organizationId) {
                //调入机构与当前所在机构相同
                Ext.Msg.alert('调入机构错误', '调入机能与当前所在机构为同一机构, 请重新选择调入机构!');
                return;
            }

            var picker = me.lookupReference('intoorganizationtreepicker');
            var promptTitle = '用户调入机构确认';
            var promptMessage = '您确定要将 [ ' + record.get('userCode') + ' ' + record.get('userName') + ' ] ';
            promptMessage = promptMessage + '从 [ ' + record.get('organizationName') + ' ] 调入 [ ' + picker.getRawValue() + ' ] 吗?';

            Ext.Msg.show({
                title: promptTitle,
                message: promptMessage,
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                fn: function (btn) {
                    if (btn === 'yes') {
                        var data = new Array();
                        data.push({
                            oldId: record.get('id'), //原用户机构信息id t_sys_user_organizaion
                            userId: record.get('userId'),   //用户id
                            organizationId: values.organizationId, //新调入机构id
                            remarks: values.remarks,        //备注
                        });
                        var dataJson = {
                            data: data
                        };

                        Ext.Ajax.request({
                            url: '/sys/user/updateOrganization',
                            method: 'POST',
                            defaultPostHeader: 'application/json;charset=UTF-8',
                            params: Ext.JSON.encode(dataJson),
                            scope: this,
                            success: function (response, opts) {
                                var result = Ext.decode(response.responseText, true);
                                if (result.success) {
                                    userStore.reload();
                                    Ext.toast(result.msg);
                                    button.up('window').close();
                                } else {
                                    Ext.Msg.alert('机构调动出错', result.msg);
                                }
                            },
                            failure: MyApp.ux.data.FailureProcess.Ajax
                        });
                    }
                }
            });
        }
    },


    //修改用户角色
    alterUserRole: function () {
        var me = this,
            view = me.getView(),
            viewModel = me.getViewModel(),
            record = viewModel.get('current.record');

        if (!record) {
            Ext.Msg.alert('提示', '请选中要修改机构的用户！');
            return;
        }

        var window = view.floatingItems.get('userRoleWindow');

        Ext.getBody().mask(); //遮罩
        // window.center()
        window.show();
    },

    /**
     * 当在角色表格中选择的角色发生变化执行该函数
     * 主要实现功能: 将选择的角色ID数组保存在 UserModel 中的 newRoleIdList 里
     */
    onUserRoleGridSelectionChange: function (selectable, records, eOpts) {
        var me = this,
            viewModel = me.getViewModel(),
            selectRoleIds = [];

        Ext.Array.each(records, function (item) {
            selectRoleIds.push(item.getId());
        })
        viewModel.set('newRoleIdList', selectRoleIds);

        viewModel.get('userRoleGridSelection');
    },

    /**
     * 当修改用户角色窗口显示之前调用, 用于选中当前用户已拥有的角色
     */
    onUserRoleWindowBeforeShow: function (window, eOpts) {
        var me = this,
            viewModel = me.getViewModel(),
            record = viewModel.get('current.record'),
            userRoleGrid = me.lookupReference('userRoleGrid'),
            selModel = userRoleGrid.getSelectionModel();

        //取消前一次操作选择的角色
        var selection = userRoleGrid.getSelection();
        selModel.deselect(selection);

        if (record) {
            var roleIdList = record.get('userRoleIdList');
            var store = viewModel.getStore('roleStore');
            var records = [];
            Ext.each(roleIdList, function (roleId) {
                var rec = store.getById(roleId);
                if (rec) {
                    records.push(rec);
                }
            })
            if (records.length > 0) {
                selModel.select(records);
            }
        }
    },

    /**
     * 以Ajax的方式提交修改用户角色的请求给后端
     */
    onUserRoleSaveBtnClick: function (button) {
        var me = this,
            viewModel = me.getViewModel(),
            userStore = viewModel.getStore('userStore'),
            record = viewModel.get('current.record'),
            newRoleIdList = viewModel.get('newRoleIdList');

        var promptMessage = '您确定要修改 [ ' + record.get('userCode') + ' ' + record.get('userName') + ' ] 的角色吗?';
        Ext.Msg.show({
            title: '修改用户角色确认',
            message: promptMessage,
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function (btn) {
                if (btn === 'yes') {
                    var data = new Array();
                    data.push({
                        userId: record.get('userId'), //原用户机构信息id t_sys_user_organizaion
                        userRoleIdList: newRoleIdList   //角色列表
                    });
                    var dataJson = {
                        data: data
                    };
                    Ext.Ajax.request({
                        url: '/sys/user/updateRole',
                        method: 'POST',
                        defaultPostHeader: 'application/json;charset=UTF-8',
                        params: Ext.JSON.encode(dataJson),
                        scope: this,
                        success: function (response, opts) {
                            var result = Ext.decode(response.responseText, true);
                            if (result.success) {
                                userStore.reload();
                                Ext.toast(result.msg);
                                button.up('window').close();
                            } else {
                                Ext.alertError('修改角色出错', result.msg);
                            }
                        },
                        failure: MyApp.ux.data.FailureProcess.Ajax
                    });
                }
            }
        });
    },


    onIntoOrganizationTypeStoreLoad: function(store){
        var intoOrganizationTypeCombo = Ext.getCmp('intoOrganizationTypeCombo');
        if(intoOrganizationTypeCombo) intoOrganizationTypeCombo.setValue(store.getAt(0));
    },

    onIntoOrganizationTypeRender: function(combo){
        // var intoOrganizationTypeCombo = Ext.getCmp('intoOrganizationTypeCombo');
        // var viewModel = intoOrganizationTypeCombo.getViewModel();
        // var store = viewModel.getStore('intoOrganizationTypeStore');
        // console.log(intoOrganizationTypeCombo);
        // console.log(viewModel);
        // console.log(store);
    }



});
