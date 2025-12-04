Ext.define('MyApp.view.dktj.AccountTemplateController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dktjaccounttemplate',

    requires: [
        'MyApp.model.dktj.Position',
        'MyApp.model.dktj.AccountTemplate'
    ],

    autoColumnWidthButtonClick : function() {
        var me = this,
            accountTemplateGrid = me.lookupReference('accounttemplategrid');
        
        Ext.suspendLayouts();
        Ext.Array.forEach(accountTemplateGrid.columnManager.getColumns(),
            function(column) {
                if (accountTemplateGrid.isVisible() && column.resizable) {
                    column.autoSize();
                }
            });
        Ext.resumeLayouts(true);
    },

    navigationTreeRefreshBtnClick : function() {
        this.lookupReference('navigationtree').getStore().reload();
    },

    refreshBtnClick : function() {
        this.lookupReference('accounttemplategrid').getStore().reload();
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

    onAccountTemplateStoreBeforeLoad: function(store , operation , eOpts) {
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
    onAccountTemplateStoreLoad: function(store, records, successful, operation, eOpts) {
        var me = this,
            accountTemplateGrid = me.lookupReference('accounttemplategrid'),
            selModel = accountTemplateGrid.getSelectionModel();

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
            accountTemplateGrid = me.lookupReference('accounttemplategrid'),
            store = accountTemplateGrid.getStore();

        store.load();
    },

    onUserStoreBeforeLoad: function(store, operation, eOpts) {
        var me = this,
            modifyAccountTemplateUserCombobox = me.lookupReference('modifyAccountTemplateUserCombobox');

        var userCode = modifyAccountTemplateUserCombobox.getValue() ;
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

        if (itemId === 'modifyAccountTemplateWindow') {
            let modifyEmployeeUserCombobox = me.lookupReference('modifyAccountTemplateUserCombobox');
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
    onAccountTemplateGridSelectionChange: function(selectable, records, eOpts) {
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
            Ext.Msg.alert('提示', '请选择要变更模板的贷款账户！');
            return;
        }

        var window = view.floatingItems.get('modifyAccountTemplateWindow');

        Ext.getBody().mask(); //遮罩
        window.center();
        window.show();
    },

    /**
     * 提交变更模板申请
     * @param button
     */
    onModifyAccountTemplateSaveBtnClick: function(button) {
        var me = this,
            viewModel = me.getViewModel(),
            accountTemplateStore = viewModel.getStore('accountTemplateStore'),
            gridSelectionRecords = viewModel.get('gridSelectionRecords');
        var accountEmployee = viewModel.get('accountEmployee');

        var form = me.lookupReference('modifyAccountTemplateForm').getForm();
        let templateDetailStore = viewModel.getStore('templateDetailStore'),
            records = templateDetailStore.getData();
        let record = gridSelectionRecords[0];

        let accountShareInfo = [];
        for (let i=0;i<records.length;i++){
            let recordData = records.getAt(i).getData();
            accountShareInfo.push({
                accountNo: record.get('accountNo'),
                orgCode: record.get('orgCode'),
                templateDetailId: recordData.id,
                tellerCode: recordData.tellerCode
            });
        }

        if (form.isValid()) {
            var values = form.getValues();
            var data = {
                    id: record.get('id'),                   //原揽储人存款账户信息ID
                    xdCustomerNo: record.get('xdCustomerNo'),
                    accountNo: record.get('accountNo'),
                    orgCode: record.get('orgCode'),
                    tellerCode: accountEmployee.userCode,
                    remarks: values.remarks,
                    accountShareInfoList: accountShareInfo,
                    templateId: values.templateId
                };

            Ext.Ajax.request({
                url: CFG.getGlobalPath() + '/dktj/template/alteraccounttemplate',
                method: 'POST',
                defaultPostHeader: 'application/json;charset=UTF-8',
                // params: Ext.JSON.encode(dataJson),
                jsonData: data,
                scope: this,
                success: function(response, opts) {
                    var result = Ext.decode(response.responseText, true);
                    if (result.success) {
                        Ext.toastInfo(result.msg);
                        accountTemplateStore.reload();
                        button.up('window').close();
                    } else {
                        Ext.alertError('变更贷款岗位责任人出错', result.msg);
                    }
                },
                failure: MyApp.ux.data.FailureProcess.Ajax
            });
        }
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
            startDate: record.get('startDate')
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

    onWindowBeforeShow : function(window, eOpts) {

    },

    onWindowShow: function(window, eOpts) {

    },

    onWindowClose: function(window, eOpts) {
        let me = this,
            itemId = window.getItemId();

        let viewModel = me.getViewModel(),
            accountTemplateStore = viewModel.getStore('accountTemplateStore'),
            templateDetailStore = viewModel.getStore('templateDetailStore'),
            templateCombo = me.lookupReference('templateCombo');

        accountTemplateStore.rejectChanges();
        templateCombo.clearValue();
        templateDetailStore.removeAll();

        Ext.getBody().unmask();
    },











});

























