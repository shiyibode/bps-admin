Ext.define('MyApp.view.dktj.PositionTellerController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dktjpositionteller',

    requires: [
        'MyApp.model.dktj.EmployeeInterest',
        'MyApp.model.dktj.Position'
    ],

    autoColumnWidthButtonClick : function() {
        var me = this,
            positionTellerGrid = me.lookupReference('positiontellergrid');
        
        Ext.suspendLayouts();
        Ext.Array.forEach(positionTellerGrid.columnManager.getColumns(),
            function(column) {
                if (positionTellerGrid.isVisible() && column.resizable) {
                    column.autoSize();
                }
            });
        Ext.resumeLayouts(true);
    },

    navigationTreeRefreshBtnClick : function() {
        this.lookupReference('navigationtree').getStore().reload();
    },

    refreshBtnClick : function() {
        this.lookupReference('positiontellergrid').getStore().reload();
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
    },

    onPositionTellerAlterStoreBeforeLoad: function(store , operation , eOpts) {
        var me = this,
            selectionOrganization = me.getSelectionOrganization(),
            // accountTypeRG = me.lookupReference('accountTypeRG'),
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
        }

        if (filter) {
            store.getProxy().extraParams = {
                filter: filter
            }
        }
    },

    /**
     * store load 完成后,选中第一条记录
     * @param store
     * @param records
     * @param successful
     * @param operation
     * @param eOpts
     */
    onPositionTellerAlterStoreLoad: function(store, records, successful, operation, eOpts) {
        var me = this,
            positionTellerGrid = me.lookupReference('positiontellergrid'),
            selModel = positionTellerGrid.getSelectionModel();

        //选中中表格中的第一条记录
        if (!selModel.hasSelection()) {
            selModel.select(0);
        }
        if (selModel.hasSelection()) {
            me.autoColumnWidthButtonClick();
        }

        store.getProxy().extraParams = {};
    },

    onPositionTellerUncheckStoreBeforeLoad: function(store , operation , eOpts) {
        var me = this,
            selectionOrganization = me.getSelectionOrganization(),
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
        }

        if (filter) {
            store.getProxy().extraParams = {
                filter: filter
            }
        }
    },

    /**
     * store load 完成后,选中第一条记录
     * @param store
     * @param records
     * @param successful
     * @param operation
     * @param eOpts
     */
    onPositionTellerUncheckStoreLoad: function(store, records, successful, operation, eOpts) {
        var me = this,
            positionTellerGrid = me.lookupReference('positiontellergrid'),
            selModel = positionTellerGrid.getSelectionModel();

        //选中中表格中的第一条记录
        if (!selModel.hasSelection()) {
            selModel.select(0);
        }
        if (selModel.hasSelection()) {
            me.autoColumnWidthButtonClick();
        }

        store.getProxy().extraParams = {};
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
            positionTellerGrid = me.lookupReference('positiontellergrid'),
            store = positionTellerGrid.getStore();

        store.load();
    },

    onUserStoreBeforeLoad: function(store, operation, eOpts) {
        var me = this,
            modifyPositionTellerUserCombobox = me.lookupReference('modifyPositionTellerUserCombobox');

        var userCode = modifyPositionTellerUserCombobox.getValue() ;
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

    onEmployeeComboboxChange: function(combobox, newValue, oldValue, eOpts) {
        if (newValue != oldValue) {
            this.getViewModel().set('currentUser', null);
        }
    },

    onEmployeeComboboxSelect: function(combobox, record, eOpts) {
        var obj = {
            id: record.id,
            userId: record.get('userId'),
            userCode: record.get('userCode'),
            userName: record.get('userName')
        };
        this.getViewModel().set('currentUser', obj);
    },


    onCancelBtnClick: function(button) {
        button.up('window').close();
    },

    onWindowClose: function(window, eOpts) {
        let me = this,
            itemId = window.getItemId();

        if (itemId === 'modifyPositionTellerWindow') {
            let modifyEmployeeUserCombobox = me.lookupReference('modifyPositionTellerUserCombobox');
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
    onPositionTellerGridSelectionChange: function(selectable, records, eOpts) {
        var me = this,
            viewModel = me.getViewModel();

        viewModel.set('gridSelectionRecords', records);
    },


    /**
     * 显示变更责任人窗口
     */
    alter: function() {
        var me = this,
            view = me.getView(),
            viewModel = me.getViewModel(),
            gridSelectionRecords = viewModel.get('gridSelectionRecords');

        if (!gridSelectionRecords || gridSelectionRecords.length <= 0) {
            Ext.Msg.alert('提示', '请选择要责任人的贷款账户！');
            return;
        }

        var window = view.floatingItems.get('modifyPositionTellerWindow');

        Ext.getBody().mask(); //遮罩
        window.center();
        window.show();
    },

    /**
     * 提交变更岗位责任人申请
     * @param button
     */
    onModifyPositionTellerSaveBtnClick: function(button) {
        var me = this,
            viewModel = me.getViewModel(),
            positionTellerAlterStore = viewModel.getStore('positionTellerAlterStore'),
            gridSelectionRecords = viewModel.get('gridSelectionRecords'),
            currentUser = viewModel.get('currentUser');

        var form = me.lookupReference('modifyPositionTellerForm').getForm();

        if (form.isValid()) {
            var values = form.getValues();
            var data = new Array();
            Ext.Array.each(gridSelectionRecords, function(record) {
                data.push({
                    id: record.get('id'),                   //原揽储人存款账户信息ID
                    xdCustomerNo: record.get('xdCustomerNo'),
                    accountNo: record.get('accountNo'),
                    lnOrgCode: record.get('lnOrgCode'),
                    tellerCode: currentUser.userCode,   //新揽储人柜员号
                    remarks: values.remarks
                });
            });
            // var dataJson = {
            //     data: data
            // };

            Ext.Ajax.request({
                url: CFG.getGlobalPath() + '/dktj/employeeinterest/positiontelleralter',
                method: 'POST',
                defaultPostHeader: 'application/json;charset=UTF-8',
                // params: Ext.JSON.encode(dataJson),
                jsonData: data,
                scope: this,
                success: function(response, opts) {
                    var result = Ext.decode(response.responseText, true);
                    if (result.success) {
                        Ext.toastInfo(result.msg);
                        positionTellerAlterStore.reload();
                        button.up('window').close();
                    } else {
                        Ext.alertError('变更贷款岗位责任人出错', result.msg);
                    }
                },
                failure: MyApp.ux.data.FailureProcess.Ajax
            });
        }
    },


    /**
     * 复核变更岗位责任人申请
     */
    check: function() {
        var me = this,
            viewModel = me.getViewModel(),
            positionTellerUncheckStore = viewModel.getStore('positionTellerUncheckStore'),
            gridSelectionRecords = viewModel.get('gridSelectionRecords');

        if (!gridSelectionRecords || gridSelectionRecords.length <= 0) {
            Ext.Msg.alert('提示', '请选择要提交的正确的登记营销人员申请记录！');
            return;
        }

        Ext.Msg.show({
            title: '复核变更确认',
            message: '您确定所选择的 ' + gridSelectionRecords.length + ' 条变更申请信息全部正确吗？',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function(btn) {
                if (btn === 'yes') {
                    var data = new Array();
                    Ext.Array.each(gridSelectionRecords, function(record) {
                        data.push({lnOrgCode: record.get('lnOrgCode'), accountNo: record.get('accountNo'), id: record.get('id')});
                    });

                    // var dataJson = {
                    //     data: data
                    // };

                    Ext.Ajax.request({
                        url: CFG.getGlobalPath() + '/dktj/employeeinterest/positiontellercheck',
                        method: 'POST',
                        defaultPostHeader: 'application/json;charset=UTF-8',
                        jsonData: data,
                        scope: this,
                        success: function(response, opts) {
                            var result = Ext.decode(response.responseText, true);
                            if (result.success) {
                                Ext.toastInfo(result.msg);
                                positionTellerUncheckStore.reload();
                            } else {
                                Ext.alertError('复核变更申请出错', result.msg);
                            }
                        },
                        failure: MyApp.ux.data.FailureProcess.Ajax
                    });
                }
            }
        });
    },

    /**
     * 撤销变更岗位责任人申请
     */
    uncheck: function() {
        var me = this,
            viewModel = me.getViewModel(),
            positionTellerUncheckStore = viewModel.getStore('positionTellerUncheckStore'),
            gridSelectionRecords = viewModel.get('gridSelectionRecords');

        if (!gridSelectionRecords || gridSelectionRecords.length <= 0) {
            Ext.Msg.alert('提示', '请选择要撤销的登记揽储人申请记录！');
            return;
        }

        Ext.Msg.show({
            title: '撤销变更申请确认',
            message: '您确定要撤销所选择的 ' + gridSelectionRecords.length + ' 条变更申请信息吗？',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function(btn) {
                if (btn === 'yes') {
                    var data = new Array();
                    Ext.Array.each(gridSelectionRecords, function(record) {
                        data.push({lnOrgCode: record.get('lnOrgCode'), accountNo: record.get('accountNo'), id: record.get('id')});
                    });

                    // var dataJson = {
                    //     data: data
                    // };

                    Ext.Ajax.request({
                        url: CFG.getGlobalPath() + '/dktj/employeeinterest/positiontelleruncheck',
                        method: 'POST',
                        defaultPostHeader: 'application/json;charset=UTF-8',
                        // params: Ext.JSON.encode(dataJson),
                        jsonData: data,
                        scope: this,
                        success: function(response, opts) {
                            var result = Ext.decode(response.responseText, true);
                            if (result.success) {
                                Ext.toastInfo(result.msg);
                                positionTellerUncheckStore.reload();
                            } else {
                                Ext.alertError('撤销变更申请出错', result.msg);
                            }
                        },
                        failure: MyApp.ux.data.FailureProcess.Ajax
                    });
                }
            }
        });
    }






});

























