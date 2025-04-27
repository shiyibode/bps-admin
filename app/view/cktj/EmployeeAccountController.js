Ext.define('MyApp.view.cktj.EmployeeAccountController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.cktjemployeeaccount',

    requires: [
        'MyApp.model.cktj.EmployeeAccount',
        'MyApp.model.cktj.DepositSort'
    ],

    expandBtnClick : function() {
        this.lookupReference('employeeaccountgrid').expandAll();
    },

    collapseBtnClick : function() {
        this.lookupReference('employeeaccountgrid').collapseAll();
    },

    autoColumnWidthButtonClick : function() {
        var me = this,
            employeeaccountgrid = me.lookupReference('employeeaccountgrid');
        
        Ext.suspendLayouts();
        Ext.Array.forEach(employeeaccountgrid.columnManager.getColumns(),
            function(column) {
                if (employeeaccountgrid.isVisible() && column.resizable) {
                    column.autoSize();
                }
            });
        Ext.resumeLayouts(true);
    },

    navigationTreeRefreshBtnClick : function() {
        this.lookupReference('navigationtree').getStore().reload();
    },

    refreshBtnClick : function() {
        this.lookupReference('employeeaccountgrid').getStore().reload();
    },

    // store 相关函数
    /**
     * 机构树的 store load 完成后, 选中第一个节点
     * @param store
     * @param records
     * @param successful
     * @param operation
     * @param eOpts
     */
    onOrganizationStoreLoad: function(store, records, successful, operation, eOpts) {
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

    onRegisterUserStoreBeforeLoad: function(store, operation, eOpts) {
        var me = this,
            regEmployeeUserCombobox = me.lookupReference('regEmployeeUserCombobox');

        var userCode;
        if(regEmployeeUserCombobox && regEmployeeUserCombobox.getValue()) userCode = regEmployeeUserCombobox.getValue();
        else userCode = '';
        store.getProxy().extraParams = {
            filter: {
                userCodeOrName: userCode,
                notUserType: 0
            }
        }
    },

    onModifyUserStoreBeforeLoad: function(store, operation, eOpts) {
        var me = this,
            modifyEmployeeUserCombobox = me.lookupReference('modifyEmployeeUserCombobox');

        var userCode;
        if(modifyEmployeeUserCombobox && modifyEmployeeUserCombobox.getValue()) userCode = modifyEmployeeUserCombobox.getValue();
        else userCode = '';
        store.getProxy().extraParams = {
            filter: {
                userCodeOrName: userCode,
                notUserType: 0
            }
        }
    },

    onUserStoreLoad: function(store, records, successful, operation, eOpts) {
        store.getProxy().extraParams = {}
    },

    onEmployeeAccountStoreBeforeLoad: function(store , operation , eOpts) {
        var me = this,
            selectionOrganization = me.getSelectionOrganization(),
            accountTypeRG = me.lookupReference('accountTypeRG'),
            searchForm = me.lookupReference('searchForm');

        var filter = null;

        if (searchForm) {
            filter = searchForm.getForm().getValues();
        }

        if (filter == null || filter == undefined) {
            filter = {};
        }

        if (selectionOrganization) {
            filter.organizationId = selectionOrganization.getId();
            // filter = store.getProxy().getExtraParams().filter;
            // if (filter) {
            //
            // } else {
            //     filter = { organizationId: selectionOrganization.getId() };
            // }
            // store.getProxy().getExtraParams().filter = filter;
        }

        if (accountTypeRG && accountTypeRG.getValue() && accountTypeRG.getValue().accountType) {
            filter.accountType = accountTypeRG.getValue().accountType;
        } else {
            filter.accountType = '1';
        }

        if (filter) {
            store.getProxy().extraParams = {
                filter: filter
            }
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
    onEmployeeAccountStoreLoad: function(store, records, successful, operation, eOpts) {
        var me = this,
            employeeaccountgrid = me.lookupReference('employeeaccountgrid'),
            selModel = employeeaccountgrid.getSelectionModel();

        //先中表格中的第一条记录
        if (!selModel.hasSelection()) {
            selModel.select(0);
        }
        if (selModel.hasSelection()) {
            me.autoColumnWidthButtonClick();
        }

        store.getProxy().extraParams = {};
    },

    onEmployeeComboboxChange: function(combobox, newValue, oldValue, eOpts) {
        if (newValue != oldValue) {
            this.getViewModel().set('accountEmployee', null);
        }
    },
    
    onEmployeeComboboxSelect: function(combobox, record, eOpts) {
        var obj = {
            id: record.id,
            userId: record.get('userId'),
            userCode: record.get('userCode'),
            userName: record.get('userName'),
            organizationCode: record.get('organizationCode'),
            organizationName: record.get('organizationName'),
            startDate: record.get('startDate'),
            userStatusStr: record.get('userStatusStr')
        };
        this.getViewModel().set('accountEmployee', obj);
    },

    //OrganizationTree 相关函数
    getSelectionOrganization: function() {
        var me = this,
            navigationTree = me.lookupReference('navigationtree');

        var sModelArray = navigationTree.getSelection();
        if (sModelArray && sModelArray.length > 0) {
            return sModelArray[0];
        }
        return null;
    },

    /**
     * 当机构树中选中的节点发生改变时,加载 unregisterAccountStore
     * @param treepanel
     * @param selected
     * @param eOpts
     */
    onNavigationTreeSelectionChange: function(treepanel, selected, eOpts) {
        var me = this,
            employeeaccountgrid = me.lookupReference('employeeaccountgrid'),
            store = employeeaccountgrid.getStore();

        store.load();
    },


    onCancelBtnClick: function(button) {
        button.up('window').close();
    },

    onWindowBeforeShow : function(window, eOpts) {
        var me = this,
            viewModel = me.getViewModel(),
            gridSelectionRecords = viewModel.get('gridSelectionRecords');

        var itemId = window.getItemId();
        if (itemId === 'regEmployeeWindow') {
        } else if (itemId === 'modifyEmployeeWindow') {
            var modifyEmployeeWindowAccountStore = Ext.StoreManager.get('modifyEmployeeWindowAccountStore');

            if (modifyEmployeeWindowAccountStore) {
                modifyEmployeeWindowAccountStore.removeAll()
                modifyEmployeeWindowAccountStore.insert(0, gridSelectionRecords);
            }
        }
    },
    
    onWindowShow: function(window, eOpts) {
        var itemId = window.getItemId();

        if (itemId === 'modifyEmployeeWindow') {
            var modifyEmployeeWindowAccountGrid = this.lookupReference('modifyEmployeeWindowAccountGrid');
            Ext.suspendLayouts();
            Ext.Array.forEach(modifyEmployeeWindowAccountGrid.columnManager.getColumns(),
                function(column) {
                    if (modifyEmployeeWindowAccountGrid.isVisible() && column.resizable) {
                        column.autoSize();
                    }
                });
            Ext.resumeLayouts(true);
        }
    },

    onWindowClose: function(window, eOpts) {
        var me = this,
            itemId = window.getItemId();

        if (itemId === 'regEmployeeWindow') {
            var viewModel = me.getViewModel(),
                unregisterAccountStore = viewModel.getStore('unregisterAccountStore'),
                regEmployeeUserCombobox = me.lookupReference('regEmployeeUserCombobox');

            regEmployeeUserCombobox.clearValue();
            unregisterAccountStore.rejectChanges();
        } else if (itemId === 'modifyEmployeeWindow') {
            var modifyEmployeeUserCombobox = me.lookupReference('modifyEmployeeUserCombobox');
            modifyEmployeeUserCombobox.clearValue();
        }

        Ext.getBody().unmask();
    },

    /**
     * 当表格选择发生改变时，将选择中的记录设置在ViewModel中
     * @param selectable
     * @param records
     * @param eOpts
     */
    onAccountGridSelectionChange: function(selectable, records, eOpts) {
        var me = this,
            viewModel = me.getViewModel();

        viewModel.set('gridSelectionRecords', records);
    },


    /**
     * 显示登记揽储人窗口
     */
    registerEmployee: function() {
        var me = this,
            view = me.getView(),
            viewModel = me.getViewModel(),
            gridSelectionRecords = viewModel.get('gridSelectionRecords');

        if (!gridSelectionRecords || gridSelectionRecords.length <= 0) {
            Ext.Msg.alert('提示', '请选择要登记揽储人的账户！');
            return;
        }

        var window = view.floatingItems.get('regEmployeeWindow');

        Ext.getBody().mask(); //遮罩
        window.center();
        window.show();
    },

    /**
     * 提交登记揽储人申请
     * @param button
     */
    onRegisterEmployeeSaveBtnClick: function(button) {
        button.setDisabled(true);
        var me = this,
            viewModel = me.getViewModel(),
            unregisterAccountStore = viewModel.getStore('unregisterAccountStore');
            gridSelectionRecords = viewModel.get('gridSelectionRecords'),
            accountEmployee = viewModel.get('accountEmployee');

        var record = gridSelectionRecords[0];
        var form = me.lookupReference('regEmployeeForm').getForm();

        if (form.isValid()) {
            var values = form.getValues();
            var data = new Array();
            data.push({
                unboundAccountId: record.get('unboundAccountId'),
                accountNo: record.get('accountNo'),
                accountType: record.get('accountType'),
                tellerCode: accountEmployee.userCode,
                depositSortId: values.depositSortId,
                remarks: values.remarks
            });
            var dataJson = {
                data: data
            };

            Ext.Ajax.request({
                url: '/cktj/employeeaccount/registeremployee',
                method: 'POST',
                defaultPostHeader: 'application/json;charset=UTF-8',
                params: Ext.JSON.encode(dataJson),
                scope: this,
                success: function(response, opts) {
                    var result = Ext.decode(response.responseText, true);
                    if (result.success) {
                        Ext.toast(result.msg);
                        unregisterAccountStore.reload();
                        button.up('window').close();
                    } else {
                        Ext.Msg.alert('存款账户登记揽储人出错', result.msg);
                    }
                },
                failure: MyApp.ux.data.FailureProcess.Ajax,
                callback: function(){
                    button.setDisabled(false);
                }
            });
        }
    },

    /**
     * 复核登记揽储人申请
     */
    checkRegisterEmployee: function() {
        var me = this,
            viewModel = me.getViewModel(),
            registerUncheckedAccountStore = viewModel.getStore('registerUncheckedAccountStore'),
            gridSelectionRecords = viewModel.get('gridSelectionRecords');

        if (!gridSelectionRecords || gridSelectionRecords.length <= 0) {
            Ext.Msg.alert('提示', '请选择要提交的正确的登记揽储人申请记录！');
            return;
        }

        Ext.Msg.show({
            title: '复核登记揽储人申请确认',
            message: '您确定所选择的 ' + gridSelectionRecords.length + ' 条登记揽储人申请信息全部正确吗？',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function(btn) {
                if (btn === 'yes') {
                    var data = new Array();
                    Ext.Array.each(gridSelectionRecords, function(record) {
                        data.push({id: record.get('id'), accountNo: record.get('accountNo')});
                    });

                    var dataJson = {
                        data: data
                    };

                    Ext.Ajax.request({
                        url: '/cktj/employeeaccount/checkregisteremployee',
                        method: 'POST',
                        defaultPostHeader: 'application/json;charset=UTF-8',
                        params: Ext.JSON.encode(dataJson),
                        scope: this,
                        success: function(response, opts) {
                            var result = Ext.decode(response.responseText, true);
                            if (result.success) {
                                Ext.toast(result.msg);
                                registerUncheckedAccountStore.reload();
                            } else {
                                Ext.Msg.alert('复核登记揽储人申请出错', result.msg);
                            }
                        },
                        failure: MyApp.ux.data.FailureProcess.Ajax
                    });
                }
            }
        });
    },

    /**
     * 撤销登记揽储人申请
     */
    undoRegisterEmployee: function() {
        var me = this,
            viewModel = me.getViewModel(),
            registerUncheckedAccountStore = viewModel.getStore('registerUncheckedAccountStore'),
            gridSelectionRecords = viewModel.get('gridSelectionRecords');

        if (!gridSelectionRecords || gridSelectionRecords.length <= 0) {
            Ext.Msg.alert('提示', '请选择要撤销的登记揽储人申请记录！');
            return;
        }

        Ext.Msg.show({
            title: '撤销登记揽储人申请确认',
            message: '您确定要撤销所选择的 ' + gridSelectionRecords.length + ' 条登记揽储人申请信息吗？',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function(btn) {
                if (btn === 'yes') {
                    var data = new Array();
                    Ext.Array.each(gridSelectionRecords, function(record) {
                        data.push({id: record.get('id'), accountNo: record.get('accountNo')});
                    });

                    var dataJson = {
                        data: data
                    };

                    Ext.Ajax.request({
                        url: '/cktj/employeeaccount/undoregisteremployee',
                        method: 'POST',
                        defaultPostHeader: 'application/json;charset=UTF-8',
                        params: Ext.JSON.encode(dataJson),
                        scope: this,
                        success: function(response, opts) {
                            var result = Ext.decode(response.responseText, true);
                            if (result.success) {
                                Ext.toast(result.msg);
                                registerUncheckedAccountStore.reload();
                            } else {
                                Ext.Msg.alert('撤销登记揽储人申请出错', result.msg);
                            }
                        },
                        failure: MyApp.ux.data.FailureProcess.Ajax
                    });
                }
            }
        });
    },

    /**
     * 显示变更揽储人窗口
     */
    modifyEmployee: function() {
        var me = this,
            view = me.getView(),
            viewModel = me.getViewModel(),
            gridSelectionRecords = viewModel.get('gridSelectionRecords');

        if (!gridSelectionRecords || gridSelectionRecords.length <= 0) {
            Ext.Msg.alert('提示', '请选择要变更揽储人的账户！');
            return;
        }

        var window = view.floatingItems.get('modifyEmployeeWindow');

        Ext.getBody().mask(); //遮罩
        window.center();
        window.show();
    },

    /**
     * 提交变更揽储人申请
     * @param button
     */
    onModifyEmployeeSaveBtnClick: function(button) {
        var me = this,
            viewModel = me.getViewModel(),
            modifiableAccountStore = viewModel.getStore('modifiableAccountStore');
            gridSelectionRecords = viewModel.get('gridSelectionRecords'),
            accountEmployee = viewModel.get('accountEmployee');

        var form = me.lookupReference('modifyEmployeeForm').getForm();

        if (form.isValid()) {
            var values = form.getValues();
            var data = new Array();
            Ext.Array.each(gridSelectionRecords, function(record) {
                data.push({
                    id: record.get('id'),                   //原揽储人存款账户信息ID
                    tellerCode: accountEmployee.userCode,   //新揽储人柜员号
                    remarks: values.remarks
                });
            });
            var dataJson = {
                data: data
            };

            Ext.Ajax.request({
                url: '/cktj/employeeaccount/modifyemployee',
                method: 'POST',
                defaultPostHeader: 'application/json;charset=UTF-8',
                params: Ext.JSON.encode(dataJson),
                scope: this,
                success: function(response, opts) {
                    var result = Ext.decode(response.responseText, true);
                    if (result.success) {
                        Ext.toast(result.msg);
                        modifiableAccountStore.reload();
                        button.up('window').close();
                    } else {
                        Ext.Msg.alert('存款账户变更揽储人出错', result.msg);
                    }
                },
                failure: MyApp.ux.data.FailureProcess.Ajax
            });
        }
    },


    /**
     * 复核变更揽储人申请
     */
    checkModifyEmployee: function() {
        var me = this,
            viewModel = me.getViewModel(),
            modifiedUncheckedAccountStore = viewModel.getStore('modifiedUncheckedAccountStore'),
            gridSelectionRecords = viewModel.get('gridSelectionRecords');

        if (!gridSelectionRecords || gridSelectionRecords.length <= 0) {
            Ext.Msg.alert('提示', '请选择要提交的正确的变更揽储人申请记录！');
            return;
        }

        Ext.Msg.show({
            title: '复核变更揽储人申请确认',
            message: '您确定所选择的 ' + gridSelectionRecords.length + ' 条变更揽储人申请信息正确并同意变更吗？',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function(btn) {
                if (btn === 'yes') {
                    var data = new Array();
                    Ext.Array.each(gridSelectionRecords, function(record) {
                        data.push({id: record.get('id'), accountNo: record.get('accountNo')});
                    });

                    var dataJson = {
                        data: data
                    };

                    Ext.Ajax.request({
                        url: '/cktj/employeeaccount/checkmodifyemployee',
                        method: 'POST',
                        defaultPostHeader: 'application/json;charset=UTF-8',
                        params: Ext.JSON.encode(dataJson),
                        scope: this,
                        success: function(response, opts) {
                            var result = Ext.decode(response.responseText, true);
                            if (result.success) {
                                Ext.toast(result.msg);
                                modifiedUncheckedAccountStore.reload();
                            } else {
                                Ext.Msg.alert('复核变更揽储人申请出错', result.msg);
                            }
                        },
                        failure: MyApp.ux.data.FailureProcess.Ajax
                    });
                }
            }
        });
    },

    /**
     * 撤销变更揽储人申请
     */
    undoModifyEmployee: function() {
        var me = this,
            viewModel = me.getViewModel(),
            modifiedUncheckedAccountStore = viewModel.getStore('modifiedUncheckedAccountStore'),
            gridSelectionRecords = viewModel.get('gridSelectionRecords');

        if (!gridSelectionRecords || gridSelectionRecords.length <= 0) {
            Ext.Msg.alert('提示', '请选择要撤销的变更揽储人申请记录！');
            return;
        }

        Ext.Msg.show({
            title: '撤销变更揽储人申请确认',
            message: '您确定要撤销所选择的 ' + gridSelectionRecords.length + ' 条变更揽储人申请信息吗？',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function(btn) {
                if (btn === 'yes') {
                    var data = new Array();
                    Ext.Array.each(gridSelectionRecords, function(record) {
                        data.push({id: record.get('id'), accountNo: record.get('accountNo')});
                    });

                    var dataJson = {
                        data: data
                    };

                    Ext.Ajax.request({
                        url: '/cktj/employeeaccount/undomodifyemployee',
                        method: 'POST',
                        defaultPostHeader: 'application/json;charset=UTF-8',
                        params: Ext.JSON.encode(dataJson),
                        scope: this,
                        success: function(response, opts) {
                            var result = Ext.decode(response.responseText, true);
                            if (result.success) {
                                Ext.toast(result.msg);
                                modifiedUncheckedAccountStore.reload();
                            } else {
                                Ext.Msg.alert('撤销变更揽储人申请出错', result.msg);
                            }
                        },
                        failure: MyApp.ux.data.FailureProcess.Ajax
                    });
                }
            }
        });
    }
});
