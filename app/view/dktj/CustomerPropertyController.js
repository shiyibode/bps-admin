Ext.define('MyApp.view.dktj.CustomerPropertyController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dktjcustomerproperty',

    requires: [
        'MyApp.model.dktj.CustomerProperty'
    ],

    autoColumnWidthButtonClick : function() {
        var me = this,
            EmployeeCustomergrid = me.lookupReference('customerpropertygrid');
        
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
        this.lookupReference('customerpropertygrid').getStore().reload();
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

    onCustomerPropertyStoreBeforeLoad: function(store , operation , eOpts) {
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
            // filter = store.getProxy().getExtraParams().filter;
            // if (filter) {
            //
            // } else {
            //     filter = { organizationId: selectionOrganization.getId() };
            // }
            // store.getProxy().getExtraParams().filter = filter;
        }

        var customerStatusCombo = me.lookupReference('customerStatusCombo');
        if (customerStatusCombo != null && customerStatusCombo != undefined){
            filter.status = customerStatusCombo.getValue();
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
    onCustomerPropertyStoreLoad: function(store, records, successful, operation, eOpts) {
        var me = this,
            CustomerPropertyGrid = me.lookupReference('customerpropertygrid'),
            selModel = CustomerPropertyGrid.getSelectionModel();

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
            CustomerPropertyGrid = me.lookupReference('customerpropertygrid'),
            store = CustomerPropertyGrid.getStore();

        store.load();
    },

    /**
     * 当表格选择发生改变时，将选择中的记录设置在ViewModel中
     * @param selectable
     * @param records
     * @param eOpts
     */
    onCustomerStatusGridSelectionChange: function(selectable, records, eOpts) {
        var me = this,
            viewModel = me.getViewModel();

        viewModel.set('gridSelectionRecords', records);
    },


    /**
     * 固定客户转流动客户
     */
    changeStatusToFluid: function (button) {

        var me = this,
            viewModel = me.getViewModel(),
            employeeCustomerStore = viewModel.getStore('customerPropertyStore'),
            gridSelectionRecords = viewModel.get('gridSelectionRecords');

        var customerName,
            oldStatus,
            newStatus,
            oldStatusStr,
            newStatusStr;
        var record = gridSelectionRecords[0];
            oldStatus = record.get('status');
            customerName = record.get('customerName');

            if (oldStatus === '2') {
                Ext.Msg.show({
                    title: '提示',
                    message: '当前客户已为流动状态，无需改变',
                    buttons: Ext.Msg.CANCEL,
                    icon: Ext.Msg.WARNING
                });
                return;
            }

            if (oldStatus === '1') {
                newStatus = '2';
                oldStatusStr = '固定';
                newStatusStr = '流动';
            }
            var data = {
                id: record.get('id'),
                xdCustomerNo: record.get('xdCustomerNo'),
                orgCode: record.get('orgCode'),
                status: newStatus
            };

        Ext.Msg.show({
            title: '固定客户转流动状态',
            message: '确定将客户 '+customerName+' 由 '+'<font color="red">'+oldStatusStr+'</font>'+' 状态转变为 '+'<font color="red">' + newStatusStr +'</font>'+' 吗?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function(btn) {
                if (btn === 'yes') {

                    Ext.Ajax.request({
                        url: CFG.getGlobalPath() + '/dktj/employeecustomer/changeStatusToFluid',
                        method: 'POST',
                        defaultPostHeader: 'application/json;charset=UTF-8',
                        // params: Ext.JSON.encode(dataJson),
                        jsonData: data,
                        scope: this,
                        success: function(response, opts) {
                            var result = Ext.decode(response.responseText, true);
                            if (result.success) {
                                employeeCustomerStore.reload();
                                Ext.toastInfo(result.msg);
                            } else {
                                Ext.alertError('固定客户转流动状态出错', result.msg);
                            }
                        },
                        failure: MyApp.ux.data.FailureProcess.Ajax
                    });
                }
            }
        });
    },

    /**
     * 流动客户转固定客户
     */
    changeStatusToFix: function (button) {
        var me = this,
            viewModel = me.getViewModel(),
            customerPropertyStore = viewModel.getStore('customerPropertyStore'),
            gridSelectionRecords = viewModel.get('gridSelectionRecords');

        var customerName,
            oldStatus,
            newStatus,
            oldStatusStr,
            newStatusStr;

        var record = gridSelectionRecords[0];
            oldStatus = record.get('status');
            customerName = record.get('customerName');

            if (oldStatus === '1') {

                Ext.Msg.show({
                    title: '提示',
                    message: '当前客户已为固定状态，无需改变',
                    buttons: Ext.Msg.CANCEL,
                    icon: Ext.Msg.WARNING
                });
                return;
            }
            if (oldStatus === '2') {
                newStatus = '1';
                oldStatusStr = '流动';
                newStatusStr = '固定';
            }


           var data = {
                id: record.get('id'),
                xdCustomerNo: record.get('xdCustomerNo'),
                orgCode: record.get('orgCode'),
                status: newStatus
            };

        Ext.Msg.show({
            title: '流动客户转固定状态',
            message: '确定将客户 '+customerName+' 由 '+'<font color="red">'+oldStatusStr+'</font>'+' 状态转变为 '+'<font color="red">' + newStatusStr +'</font>'+' 吗?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function(btn) {
                if (btn === 'yes') {
                    var dataJson = {
                        data: data
                    };

                    Ext.Ajax.request({
                        url: CFG.getGlobalPath() + '/dktj/employeecustomer/changeStatusToFix',
                        method: 'POST',
                        defaultPostHeader: 'application/json;charset=UTF-8',
                        params: Ext.JSON.encode(dataJson),
                        scope: this,
                        success: function(response, opts) {
                            var result = Ext.decode(response.responseText, true);
                            if (result.success) {
                                customerPropertyStore.reload();
                                Ext.toastInfo(result.msg);
                            } else {
                                Ext.alertError('流动客户转固定状态出错', result.msg);
                            }
                        },
                        failure: MyApp.ux.data.FailureProcess.Ajax
                    });
                }
            }
        });
    }





});

























