Ext.define('MyApp.view.dktj.EmployeeInterestReaddController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dktjemployeeinterestreadd',

    requires: [
        'MyApp.model.dktj.EmployeeInterestReadd'
    ],

    autoColumnWidthButtonClick : function() {
        var me = this,
            employeeInterestReaddGrid = me.lookupReference('employeeinterestreaddgrid');
        
        Ext.suspendLayouts();
        Ext.Array.forEach(employeeInterestReaddGrid.columnManager.getColumns(),
            function(column) {
                if (employeeInterestReaddGrid.isVisible() && column.resizable) {
                    column.autoSize();
                }
            });
        Ext.resumeLayouts(true);
    },

    navigationTreeRefreshBtnClick : function() {
        this.lookupReference('navigationtree').getStore().reload();
    },

    refreshBtnClick : function() {
        this.lookupReference('employeeinterestreaddgrid').getStore().reload();
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

    onEmployeeInterestReaddStoreBeforeLoad: function(store , operation , eOpts) {
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
    onEmployeeInterestReaddStoreLoad: function(store, records, successful, operation, eOpts) {
        var me = this,
            employeeInterestReaddGrid = me.lookupReference('employeeinterestreaddgrid'),
            selModel = employeeInterestReaddGrid.getSelectionModel();

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
            employeeInterestReaddgrid = me.lookupReference('employeeinterestreaddgrid'),
            store = employeeInterestReaddgrid.getStore();

        store.load();
    },

    /**
     * 当表格选择发生改变时，将选择中的记录设置在ViewModel中
     * @param selectable
     * @param records
     * @param eOpts
     */
    onEmployeeInterestReaddGridSelectionChange: function(selectable, records, eOpts) {
        var me = this,
            viewModel = me.getViewModel();

        viewModel.set('gridSelectionRecords', records);
    },

    readdAccount: function () {
        var me = this,
            view = me.getView(),
            viewModel = me.getViewModel(),
            gridSelectionRecords = viewModel.get('gridSelectionRecords');

        if (!gridSelectionRecords || gridSelectionRecords.length <= 0) {
            Ext.Msg.alert('提示', '请选择要补登记营销人员的贷款账户！');
            return;
        }

        var window = view.floatingItems.get('readdEmployeeInterestWindow');

        Ext.getBody().mask(); //遮罩
        window.center();
        window.show();
    },

    onUserStoreBeforeLoad: function(store, operation, eOpts) {
        let me = this,
            readdEmployeeUserCombobox = me.lookupReference('readdEmployeeUserCombobox');

        let userCode = readdEmployeeUserCombobox.getValue() ;
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

    onReaddEmployeeInterestSaveBtnClick: function(button) {
        var me = this,
            viewModel = me.getViewModel(),
            employeeInterestReaddStore = viewModel.getStore('employeeInterestReaddStore'),
            gridSelectionRecords = viewModel.get('gridSelectionRecords');

        let templateDetailStore = viewModel.getStore('templateDetailStore'),
            records = templateDetailStore.getData();
        let record = gridSelectionRecords[0];
        let form = me.lookupReference('readdEmployeeInterestForm').getForm();

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
            var data = {
                accountNo: record.get('accountNo'),
                orgCode: record.get('orgCode'),
                tellerCode: values.userCode,
                remarks: values.remarks,
                accountShareInfoList: accountShareInfo,
                templateId: values.templateId
            };
            var dataJson = {
                data: data
            };

            Ext.Ajax.request({
                url: CFG.getGlobalPath() +'/dktj/employeeinterest/readdaccount',
                method: 'POST',
                defaultPostHeader: 'application/json;charset=UTF-8',
                // params: Ext.JSON.encode(dataJson),
                jsonData: data,
                scope: this,
                success: function(response, opts) {
                    let result = Ext.decode(response.responseText, true);
                    if (result.success) {
                        Ext.toastInfo(result.msg);
                        employeeInterestReaddStore.reload();
                        button.up('window').close();
                    } else {
                        Ext.alertError('补登记营销人员出错', result.msg);
                    }
                },
                failure: MyApp.ux.data.FailureProcess.Ajax
            });
        }
    },

    onCancelBtnClick: function(button) {
        button.up('window').close();
    },

    onWindowClose: function(window, eOpts) {
        let me = this,
            itemId = window.getItemId();

        if (itemId === 'readdEmployeeInterestWindow') {
            let viewModel = me.getViewModel(),
                employeeInterestReaddStore = viewModel.getStore('employeeInterestReaddStore'),
                regEmployeeUserCombobox = me.lookupReference('readdEmployeeUserCombobox'),
                templateDetailStore = viewModel.getStore('templateDetailStore'),
                templateCombo = me.lookupReference('templateCombo');

            regEmployeeUserCombobox.clearValue();
            employeeInterestReaddStore.rejectChanges();
            templateCombo.clearValue();
            templateDetailStore.removeAll();
        }

        Ext.getBody().unmask();
    },

    onWindowBeforeShow : function(window, eOpts) {
        var me = this,
            viewModel = me.getViewModel(),
            gridSelectionRecords = viewModel.get('gridSelectionRecords');

        var itemId = window.getItemId();
        if (itemId === 'readdEmployeeInterestWindow') {
            var readdEmployeeUserCombobox = me.lookupReference('readdEmployeeUserCombobox');

            var record = gridSelectionRecords[0];
            readdEmployeeUserCombobox.setValue(record.get('tellerCode'));
        }
    }



});

























