Ext.define('MyApp.view.dktj.EmployeeCustomerController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dktjemployeecustomer',

    requires: [
        'MyApp.model.dktj.EmployeeCustomer',
        'MyApp.model.dktj.Template',
        'MyApp.model.dktj.TemplateDetail',
        'MyApp.model.dktj.SpecialAccountType'
    ],

    expandBtnClick : function() {
        this.lookupReference('employeecustomergrid').expandAll();
    },

    collapseBtnClick : function() {
        this.lookupReference('employeecustomergrid').collapseAll();
    },

    autoColumnWidthButtonClick : function() {
        var me = this,
            EmployeeCustomergrid = me.lookupReference('employeecustomergrid');
        
        Ext.suspendLayouts();
        Ext.Array.forEach(EmployeeCustomergrid.columnManager.getColumns(),
            function(column) {
                if (EmployeeCustomergrid.isVisible() && column.resizable) {
                    column.autoSize();
                }
            });
        Ext.resumeLayouts(true);
    },

    navigationTreeRefreshBtnClick : function() {
        this.lookupReference('navigationtree').getStore().reload();
    },

    refreshBtnClick : function() {
        this.lookupReference('employeecustomergrid').getStore().reload();
    },

    showDetailBtnClick: function() {
        this.getView().down('EmployeeCustomerdetail').expand();
    },

    hideDetailBtnClick: function() {
        this.getView().down('EmployeeCustomerdetail').collapse();
    },

    onDetailExpand: function(p, eOpts) {
        this.getView().down('EmployeeCustomergrid tool[type=maximize]').setHidden(false);
        this.getView().down('EmployeeCustomergrid tool[type=restore]').setHidden(true);
    },

    onDetailCollapse: function(p, eOpts) {
        this.getView().down('EmployeeCustomergrid tool[type=maximize]').setHidden(true);
        this.getView().down('EmployeeCustomergrid tool[type=restore]').setHidden(false);
    },

    prevBtnClick: function() {
        var me = this;
        // var EmployeeCustomerTreeGrid = me.getView().down('EmployeeCustomertreegrid');
        var EmployeeCustomerGrid = me.lookupReference('employeecustomergrid');
        var selectionModel = EmployeeCustomerGrid.getSelectionModel();
        var store = EmployeeCustomerGrid.getStore();

        if (selectionModel.getCount() == 0) {
            if (store.getCount() > 0) {
                selectionModel.select(store.getAt(0));
            } else {
                Ext.toastWarn('当前列表中没有可显示的记录!');
            }
        } else {
            var index = store.indexOf(selectionModel.getSelection()[0]);
            if (index + ((store.currentPage - 1) * store.pageSize) == 0) {
                Ext.toastWarn('已经是当前列表的第一条记录!');
                return false;
            }else {
                if (store.buffered) {
                    selectionModel.select(store.getAt(index - 1));
                } else {
                    // 如果是第二页以后的第一条记录，那么就往上翻一页
                    if (index == 0) {
                        store.previousPage({
                            scope : this,
                            callback : function(records, operation, success) {
                                if (records.length > 0) {
                                    // 翻页过后，选中最后一条
                                    selectionModel.select(records[records.length - 1]);
                                }
                            }
                        });
                    } else {
                        selectionModel.select(store.getAt(index - 1));
                    }
                }
            }
        }

    },

    nextBtnClick: function() {
        var me = this;
        // var EmployeeCustomerTreeGrid = me.getView().down('EmployeeCustomertreegrid');
        var EmployeeCustomerGrid = me.lookupReference('employeecustomergrid');
        var selectionModel = EmployeeCustomerGrid.getSelectionModel();
        var store = EmployeeCustomerGrid.getStore();

        if (selectionModel.getCount() == 0) {
            if (store.getCount() > 0) {
                selectionModel.select(store.getAt(0));
            } else {
                Ext.toastWarn('当前列表中没有可显示的记录!');
            }
        } else {
            var index = store.indexOf(selectionModel.getSelection()[0]);
            if (index + ((store.currentPage - 1) * store.pageSize) == store.getTotalCount() - 1) {
                Ext.toastWarn('已经是当前列表的最后一条记录!');
            }else {
                if (store.buffered) {
                    selectionModel.select(store.getAt(index + 1));
                } else {
                    // 如果是最后一页以前的最后一条记录，那么就往下翻一页
                    if (index + ((store.currentPage - 1) * store.pageSize) == store.currentPage * store.pageSize - 1) {
                        store.nextPage({
                            scope : this,
                            callback : function(records, operation, success) {
                                if (records.length > 0) {
                                    // 翻页过后，选中第一条
                                    selectionModel.select(records[0]);
                                }
                            }
                        });
                    } else {
                        selectionModel.select(store.getAt(index + 1));
                    }
                }
            }
        }
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

    onUserStoreBeforeLoad: function(store, operation, eOpts) {
        var me = this,
            regEmployeeUserCombobox = me.lookupReference('regEmployeeUserCombobox'),
            modifyEmployeeUserCombobox = me.lookupReference('modifyEmployeeUserCombobox');

        var userCode = regEmployeeUserCombobox.getValue() ? regEmployeeUserCombobox.getValue() : modifyEmployeeUserCombobox.getValue();
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

    onEmployeeCustomerStoreBeforeLoad: function(store , operation , eOpts) {
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
            // filter = store.getProxy().getExtraParams().filter;
            // if (filter) {
            //
            // } else {
            //     filter = { organizationId: selectionOrganization.getId() };
            // }
            // store.getProxy().getExtraParams().filter = filter;
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
    onEmployeeCustomerStoreLoad: function(store, records, successful, operation, eOpts) {
        var me = this,
            EmployeeCustomergrid = me.lookupReference('employeecustomergrid'),
            selModel = EmployeeCustomergrid.getSelectionModel();

        //选中中表格中的第一条记录
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
            statusStr: record.get('statusStr')
        };
        this.getViewModel().set('accountEmployee', obj);
    },

    onTemplateComboboxChange: function(combobox, newValue, oldValue, eOpts) {
        let me = this,
            viewModel = me.getViewModel(),
            gridSelectionRecords = viewModel.get('gridSelectionRecords'),
            grid = me.lookupReference('templateDetailGrid'),
            store = grid.getStore();

        if (newValue !== undefined && newValue !== '' && newValue !== null){
            let record = gridSelectionRecords[0];
            store.getProxy().extraParams = {
                filter:{
                    templateId: newValue,
                    accountNo: record.get('accountNo')
                }
            };
            store.reload();
        }
    },

    // getGridSelected: function() {
    //     var me = this,
    //         EmployeeCustomerGrid = me.lookupReference('EmployeeCustomergrid'),
    //         sModel = EmployeeCustomerGrid.getSelectionModel(),
    //         hasSelection = sModel.hasSelection();
    //     if (!hasSelection) {
    //         Ext.Msg.alert('提示', '请选中要操作的数据！');
    //         return null;
    //     }
    //     var selectedRecords = sModel.getSelection();
    //     if (selectedRecords.length <= 0 || selectedRecords.length > 1) {
    //         Ext.Msg.alert('提示', '该操作只能选择一条数据!');
    //         return null;
    //     }
    //     return selectedRecords;
    // },

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
            EmployeeCustomergrid = me.lookupReference('employeecustomergrid'),
            store = EmployeeCustomergrid.getStore();

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
            var customerStatusCombo = me.lookupReference('customerStatusCombo'),
                templateDetailContainer = me.lookupReference('templateDetailContainer'),
                regEmployeeUserCombobox = me.lookupReference('regEmployeeUserCombobox'),
                templateCombo = me.lookupReference('templateCombo'),
                specialAccountTypeCombo = me.lookupReference('specialAccountTypeCombo');

            var record = gridSelectionRecords[0];
            regEmployeeUserCombobox.setValue(record.get('tellerCode'));

            //新客户
            if (record.get('flag') === '1') {
                customerStatusCombo.setReadOnly(false);
                templateDetailContainer.setHidden(false);
                templateCombo.allowBlank = false;
                templateCombo.setHidden(false);
                specialAccountTypeCombo.setHidden(false);
            }
            else if (record.get('flag') === '2') {
                //柜员调动释放的客户： 1-不允许修改客户状态
                customerStatusCombo.setReadOnly(true);
                //2-隐藏分成比例列表
                templateDetailContainer.setHidden(true);
                //3-隐藏模板选项
                templateCombo.allowBlank = true;
                templateCombo.setHidden(true);
                specialAccountTypeCombo.setHidden(true);
            }
            else if (record.get('flag') === '3') {
                //流动转固定释放的客户： 1-不允许修改客户状态
                customerStatusCombo.setReadOnly(true);
                //2-隐藏分成比例列表
                templateDetailContainer.setHidden(true);
                //3-隐藏模板选项
                templateCombo.allowBlank = true;
                templateCombo.setHidden(true);
                specialAccountTypeCombo.setHidden(true);
            }
            else {
                console.error('前端未识别的客户状态：'); console.error(record.get('flag'));
            }

        } else if (itemId === 'modifyEmployeeWindow') {
            var modifyEmployeeWindowCustomerStore = Ext.StoreManager.get('modifyEmployeeWindowCustomerStore');

            if (modifyEmployeeWindowCustomerStore) {
                modifyEmployeeWindowCustomerStore.removeAll()
                modifyEmployeeWindowCustomerStore.insert(0, gridSelectionRecords);
            }
        }
    },
    
    onWindowShow: function(window, eOpts) {
        var itemId = window.getItemId();

        if (itemId === 'modifyEmployeeWindow') {
            var modifyEmployeeWindowCustomerGrid = this.lookupReference('modifyEmployeeWindowCustomerGrid');
            Ext.suspendLayouts();
            Ext.Array.forEach(modifyEmployeeWindowCustomerGrid.columnManager.getColumns(),
                function(column) {
                    if (modifyEmployeeWindowCustomerGrid.isVisible() && column.resizable) {
                        column.autoSize();
                    }
                });
            Ext.resumeLayouts(true);
        }
    },

    onWindowClose: function(window, eOpts) {
        let me = this,
            itemId = window.getItemId();

        if (itemId === 'regEmployeeWindow') {
            let viewModel = me.getViewModel(),
                unregisterCustomerStore = viewModel.getStore('unregisterCustomerStore'),
                regEmployeeUserCombobox = me.lookupReference('regEmployeeUserCombobox'),
                templateDetailStore = viewModel.getStore('templateDetailStore'),
                templateCombo = me.lookupReference('templateCombo');

            regEmployeeUserCombobox.clearValue();
            unregisterCustomerStore.rejectChanges();
            templateCombo.clearValue();
            templateDetailStore.removeAll();
        } else if (itemId === 'modifyEmployeeWindow') {
            let modifyEmployeeUserCombobox = me.lookupReference('modifyEmployeeUserCombobox');
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
    onCustomerGridSelectionChange: function(selectable, records, eOpts) {
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
            Ext.Msg.alert('提示', '请选择要登记营销人员的贷款客户！');
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
        var me = this,
            viewModel = me.getViewModel(),
            unregisterCustomerStore = viewModel.getStore('unregisterCustomerStore'),
            gridSelectionRecords = viewModel.get('gridSelectionRecords');

        let templateDetailStore = viewModel.getStore('templateDetailStore'),
            records = templateDetailStore.getData();
        let record = gridSelectionRecords[0];
        let form = me.lookupReference('regEmployeeForm').getForm();

        let accountShareInfo = [];
        for (let i=0;i<records.length;i++){
            let recordData = records.getAt(i).getData();
            accountShareInfo.push({
                accountNo: record.get('accountNo'),
                templateDetailId: recordData.id,
                tellerCode: recordData.tellerCode
            });
        }

        if (form.isValid()) {
            var values = form.getValues();
            // var data = new Array();
            var data ={
                // xdCustomerNo: record.get('xdCustomerNo'),
                accountNo: record.get('accountNo'),
                status: record.get('status'),
                orgCode: record.get('orgCode'),
                tellerCode: values.userCode,
                remarks: values.remarks,
                accountShareInfoList: accountShareInfo,
                templateId: values.templateId,
                specialAccountTypeId: values.specialAccountTypeId
            };
            // var dataJson = {
            //     data: data
            // };

            console.log(dataJson);

            Ext.Ajax.request({
                url: CFG.getGlobalPath() + '/dktj/employeecustomer/registerEmployee',
                method: 'POST',
                defaultPostHeader: 'application/json;charset=UTF-8',
                // params: Ext.JSON.encode(dataJson),
                jsonData: data,
                scope: this,
                success: function(response, opts) {
                    let result = Ext.decode(response.responseText, true);
                    if (result.success) {
                        Ext.toastInfo(result.msg);
                        unregisterCustomerStore.reload();
                        button.up('window').close();
                    } else {
                        Ext.alertError('贷款客户登记营销人员出错', result.msg);
                    }
                },
                failure: MyApp.ux.data.FailureProcess.Ajax
            });
        }
    },

    /**
     * 复核登记维护人申请
     */
    checkRegisterEmployee: function() {
        var me = this,
            viewModel = me.getViewModel(),
            registerUncheckedCustomerStore = viewModel.getStore('registerUncheckedCustomerStore'),
            gridSelectionRecords = viewModel.get('gridSelectionRecords');

        if (!gridSelectionRecords || gridSelectionRecords.length <= 0) {
            Ext.Msg.alert('提示', '请选择要提交的正确的登记营销人员申请记录！');
            return;
        }

        Ext.Msg.show({
            title: '复核登记营销人员申请确认',
            message: '您确定所选择的 ' + gridSelectionRecords.length + ' 条登记营销人员申请信息全部正确吗？',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function(btn) {
                if (btn === 'yes') {
                    var data = new Array();
                    Ext.Array.each(gridSelectionRecords, function(record) {
                        data.push({orgCode: record.get('orgCode'), accountNo: record.get('accountNo'), id: record.get('id')});
                    });

                    var dataJson = {
                        data: data
                    };

                    Ext.Ajax.request({
                        url:CFG.getGlobalPath() + '/dktj/employeecustomer/checkRegisterEmployee',
                        method: 'POST',
                        defaultPostHeader: 'application/json;charset=UTF-8',
                        params: Ext.JSON.encode(dataJson),
                        scope: this,
                        success: function(response, opts) {
                            var result = Ext.decode(response.responseText, true);
                            if (result.success) {
                                Ext.toastInfo(result.msg);
                                registerUncheckedCustomerStore.reload();
                            } else {
                                Ext.alertError('复核登记揽储人申请出错', result.msg);
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
            registerUncheckedCustomerStore = viewModel.getStore('registerUncheckedCustomerStore'),
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
                        data.push({orgCode: record.get('orgCode'), accountNo: record.get('accountNo'), id: record.get('id')});
                    });

                    // var dataJson = {
                    //     data: data
                    // };

                    Ext.Ajax.request({
                        url: CFG.getGlobalPath() + '/dktj/employeecustomer/undoRegisterEmployee',
                        method: 'POST',
                        defaultPostHeader: 'application/json;charset=UTF-8',
                        // params: Ext.JSON.encode(dataJson),
                        jsonData: data,
                        scope: this,
                        success: function(response, opts) {
                            var result = Ext.decode(response.responseText, true);
                            if (result.success) {
                                Ext.toastInfo(result.msg);
                                registerUncheckedCustomerStore.reload();
                            } else {
                                Ext.alertError('撤销登记揽储人申请出错', result.msg);
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
            modifiableCustomerStore = viewModel.getStore('modifiableCustomerStore');
            gridSelectionRecords = viewModel.get('gridSelectionRecords'),
            accountEmployee = viewModel.get('accountEmployee');

        var form = me.lookupReference('modifyEmployeeForm').getForm();

        if (form.isValid()) {
            var values = form.getValues();
            var data = new Array();
            Ext.Array.each(gridSelectionRecords, function(record) {
                data.push({
                    id: record.get('id'),                   //原揽储人存款账户信息ID
                    xdCustomerNo: record.get('xdCustomerNo'),
                    accountNo: record.get('accountNo'),
                    orgCode: record.get('orgCode'),
                    tellerCode: accountEmployee.userCode,   //新揽储人柜员号
                    remarks: values.remarks
                });
            });
            var dataJson = {
                data: data
            };

            Ext.Ajax.request({
                url: CFG.getGlobalPath() + '/dktj/employeecustomer/modifyEmployee',
                method: 'POST',
                defaultPostHeader: 'application/json;charset=UTF-8',
                // params: Ext.JSON.encode(dataJson),
                jsonData: data,
                scope: this,
                success: function(response, opts) {
                    var result = Ext.decode(response.responseText, true);
                    if (result.success) {
                        Ext.toastInfo(result.msg);
                        modifiableCustomerStore.reload();
                        button.up('window').close();
                    } else {
                        Ext.alertError('贷款客户变更营销人员出错', result.msg);
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
            modifiedUncheckedCustomerStore = viewModel.getStore('modifiedUncheckedCustomerStore'),
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
                        data.push({
                            id: record.get('id'),
                            xdCustomerNo: record.get('xdCustomerNo'),
                            orgCode: record.get('orgCode'),
                            tellerCode: record.get('tellerCode'),
                            accountNo: record.get('accountNo')
                        });
                    });

                    // var dataJson = {
                    //     data: data
                    // };

                    Ext.Ajax.request({
                        url: CFG.getGlobalPath() + '/dktj/employeecustomer/checkModifyEmployee',
                        method: 'POST',
                        defaultPostHeader: 'application/json;charset=UTF-8',
                        // params: Ext.JSON.encode(dataJson),
                        dataJson: data,
                        scope: this,
                        success: function(response, opts) {
                            var result = Ext.decode(response.responseText, true);
                            if (result.success) {
                                Ext.toastInfo(result.msg);
                                modifiedUncheckedCustomerStore.reload();
                            } else {
                                Ext.alertError('复核变更揽储人申请出错', result.msg);
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
            modifiedUncheckedCustomerStore = viewModel.getStore('modifiedUncheckedCustomerStore'),
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
                        data.push({
                            id: record.get('id'),
                            xdCustomerNo: record.get('xdCustomerNo'),
                            accountNo: record.get('accountNo')
                        });
                    });

                    // var dataJson = {
                    //     data: data
                    // };

                    Ext.Ajax.request({
                        url: CFG.getGlobalPath() + '/dktj/employeecustomer/undoModifyEmployee',
                        method: 'POST',
                        defaultPostHeader: 'application/json;charset=UTF-8',
                        // params: Ext.JSON.encode(dataJson),
                        jsonData: data,
                        scope: this,
                        success: function(response, opts) {
                            var result = Ext.decode(response.responseText, true);
                            if (result.success) {
                                Ext.toastInfo(result.msg);
                                modifiedUncheckedCustomerStore.reload();
                            } else {
                                Ext.alertError('撤销变更揽储人申请出错', result.msg);
                            }
                        },
                        failure: MyApp.ux.data.FailureProcess.Ajax
                    });
                }
            }
        });
    },

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
            },100);
    },
    /**
     * 修改客户的固定/流动状态
     */
    changeStatus: function () {
        var me = this,
            viewModel = me.getViewModel(),
            employeeCustomerStore = viewModel.getStore('employeeCustomerStore'),
            gridSelectionRecords = viewModel.get('gridSelectionRecords');

        var customerName,
            oldStatus,
            newStatus,
            oldStatusStr,
            newStatusStr;
            
        Ext.Array.each(gridSelectionRecords, function(record) {
            oldStatus = record.get('status');
            customerName = record.get('customerName');

            if (oldStatus === '1') {
                newStatus = '2';
                oldStatusStr = '固定';
                newStatusStr = '流动';
            }
            if (oldStatus === '2') {
                newStatus = '1';
                oldStatusStr = '流动';
                newStatusStr = '固定';
            }
            var data= {
                id: record.get('id'),
                xdCustomerNo: record.get('xdCustomerNo'),
                orgCode: record.get('orgCode'),
                status: newStatus
            };
        });

        Ext.Msg.show({
            title: '客户固定/流动状态变更',
            message: '确定将客户 '+customerName+' 由 '+'<font color="red">'+oldStatusStr+'</font>'+' 状态转变为 '+'<font color="red">' + newStatusStr +'</font>'+' 吗?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function(btn) {
                if (btn === 'yes') {
                    // var dataJson = {
                    //     data: data
                    // };

                    Ext.Ajax.request({
                        url: CFG.getGlobalPath() + '/dktj/employeecustomer/changeStatus',
                        method: 'POST',
                        defaultPostHeader: 'application/json;charset=UTF-8',
                        // params: Ext.JSON.encode(dataJson),
                        dataJson: data,
                        scope: this,
                        success: function(response, opts) {
                            var result = Ext.decode(response.responseText, true);
                            if (result.success) {
                                employeeCustomerStore.reload();
                                Ext.toastInfo(result.msg);
                            } else {
                                Ext.alertError('客户固定/流动状态变更出错', result.msg);
                            }
                        },
                        failure: MyApp.ux.data.FailureProcess.Ajax
                    });
                }
            }
        });
    }






});

























