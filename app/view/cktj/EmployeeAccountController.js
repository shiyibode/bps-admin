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
            store.getProxy().extraParams = filter
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

    onEmployeeComboboxChange1: function(combobox, newValue, oldValue, eOpts) {
        if (newValue != oldValue) {
            this.getViewModel().set('accountEmployee1', null);
        }
    },
    
    onEmployeeComboboxSelect1: function(combobox, record, eOpts) {
        var obj = {
            id: record.id,
            userId: record.get('id'),
            userCode: record.get('code'),
            userName: record.get('name'),
            organizationCode: record.get('organizationCode'),
            organizationName: record.get('organizationName')
        };
        this.getViewModel().set('accountEmployee1', obj);
    },

    onEmployeeComboboxChange2: function(combobox, newValue, oldValue, eOpts) {
        if (newValue != oldValue) {
            this.getViewModel().set('accountEmployee2', null);
        }
    },
    
    onEmployeeComboboxSelect2: function(combobox, record, eOpts) {
        var obj = {
            id: record.id,
            userId: record.get('id'),
            userCode: record.get('code'),
            userName: record.get('name'),
            organizationCode: record.get('organizationCode'),
            organizationName: record.get('organizationName')
        };
        this.getViewModel().set('accountEmployee2', obj);
    },

    onEmployeeComboboxChange3: function(combobox, newValue, oldValue, eOpts) {
        if (newValue != oldValue) {
            this.getViewModel().set('accountEmployee3', null);
        }
    },
    
    onEmployeeComboboxSelect3: function(combobox, record, eOpts) {
        var obj = {
            id: record.id,
            userId: record.get('id'),
            userCode: record.get('code'),
            userName: record.get('name'),
            organizationCode: record.get('organizationCode'),
            organizationName: record.get('organizationName')
        };
        this.getViewModel().set('accountEmployee3', obj);
    },

    onEmployeeComboboxChange4: function(combobox, newValue, oldValue, eOpts) {
        if (newValue != oldValue) {
            this.getViewModel().set('accountEmployee4', null);
        }
    },
    
    onEmployeeComboboxSelect4: function(combobox, record, eOpts) {
        var obj = {
            id: record.id,
            userId: record.get('id'),
            userCode: record.get('code'),
            userName: record.get('name'),
            organizationCode: record.get('organizationCode'),
            organizationName: record.get('organizationName')
        };
        this.getViewModel().set('accountEmployee4', obj);
    },

    onEmployeeComboboxChange5: function(combobox, newValue, oldValue, eOpts) {
        if (newValue != oldValue) {
            this.getViewModel().set('accountEmployee5', null);
        }
    },
    
    onEmployeeComboboxSelect5: function(combobox, record, eOpts) {
        var obj = {
            id: record.id,
            userId: record.get('id'),
            userCode: record.get('code'),
            userName: record.get('name'),
            organizationCode: record.get('organizationCode'),
            organizationName: record.get('organizationName')
        };
        this.getViewModel().set('accountEmployee5', obj);
    },

    onEmployeeComboboxChange6: function(combobox, newValue, oldValue, eOpts) {
        if (newValue != oldValue) {
            this.getViewModel().set('accountEmployee6', null);
        }
    },
    
    onEmployeeComboboxSelect6: function(combobox, record, eOpts) {
        var obj = {
            id: record.id,
            userId: record.get('id'),
            userCode: record.get('code'),
            userName: record.get('name'),
            organizationCode: record.get('organizationCode'),
            organizationName: record.get('organizationName')
        };
        this.getViewModel().set('accountEmployee6', obj);
    },

    onAddPercentageBtnClick: function(button){

        var itemId = button.getItemId();

        var me = this;
        var totalCount = 6;
        var viewModel = me.getViewModel();
        if(itemId === 'regEmployeeAddPercentageBtn'){
            var currentCount = viewModel.get('currentAccountEmployeeNumber');
            if(currentCount < totalCount){
                currentCount = currentCount + 1;
                viewModel.set('currentAccountEmployeeNumber', currentCount);
                var nextContainer = me.lookupReference('regEmployeeContainer-'+currentCount);
                nextContainer.setHidden(false);
            }
            else{
                Ext.Msg.alert('提示','最多只能有6位揽储人');
            }
        }

        if(itemId == 'modEmployeeTaskAddPercentageBtn'){
            var currentCount = viewModel.get('currentModAccountEmployeeNumber');
            if(currentCount < totalCount){
                currentCount = currentCount + 1;
                viewModel.set('currentModAccountEmployeeNumber', currentCount);
                var nextContainer = me.lookupReference('modEmployeeTaskContainer-'+currentCount);
                nextContainer.setHidden(false);
            }
            else{
                Ext.Msg.alert('提示','最多只能有6位揽储人');
            }
        }

        if(itemId == 'modEmployeePaymentAddPercentageBtn'){
            var currentCount = viewModel.get('currentModAccountEmployeePaymentNumber');
            if(currentCount < totalCount){
                currentCount = currentCount + 1;
                viewModel.set('currentModAccountEmployeePaymentNumber', currentCount);
                var nextContainer = me.lookupReference('modEmployeePaymentContainer-'+currentCount);
                nextContainer.setHidden(false);
            }
            else{
                Ext.Msg.alert('提示','最多只能有6位揽储人');
            }
        }
    },

    onAddPaymentPercentageBtnClick: function(button){
        var me = this;
        var totalCount = 6;
        var viewModel = me.getViewModel();
        var currentCount = viewModel.get('currentAccountEmployeePaymentNumber');
        if(currentCount < totalCount){
            currentCount = currentCount + 1;
            viewModel.set('currentAccountEmployeePaymentNumber', currentCount);
            var nextContainer = me.lookupReference('regEmployeePaymentContainer-'+currentCount);
            nextContainer.setHidden(false);
        }
        else{
            Ext.Msg.alert('提示','最多只能有6位揽储人');
        }


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
        } else if (itemId === 'modifyEmployeeTaskWindow') {
            var modifyEmployeeWindowAccountStore = Ext.StoreManager.get('modifyEmployeeTaskWindowAccountStore');

            if (modifyEmployeeWindowAccountStore) {
                modifyEmployeeWindowAccountStore.removeAll()
                modifyEmployeeWindowAccountStore.insert(0, gridSelectionRecords);
            }
        }else if (itemId === 'modifyEmployeePaymentWindow') {
            var modifyEmployeeWindowAccountStore = Ext.StoreManager.get('modifyEmployeePaymentWindowAccountStore');

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
                regEmployeeUserCombobox1 = me.lookupReference('regEmployeeUserCombobox-1'),
                regEmployeeUserCombobox2 = me.lookupReference('regEmployeeUserCombobox-2'),
                regEmployeeUserCombobox3 = me.lookupReference('regEmployeeUserCombobox-3'),
                regEmployeeUserCombobox4 = me.lookupReference('regEmployeeUserCombobox-4'),
                regEmployeeUserCombobox5 = me.lookupReference('regEmployeeUserCombobox-5'),
                regEmployeeUserCombobox6 = me.lookupReference('regEmployeeUserCombobox-6');

            regEmployeeUserCombobox1.clearValue();
            if(regEmployeeUserCombobox2 != null) {regEmployeeUserCombobox2.clearValue(); }
            if(regEmployeeUserCombobox3 != null) {regEmployeeUserCombobox3.clearValue(); }
            if(regEmployeeUserCombobox4 != null) {regEmployeeUserCombobox4.clearValue(); }
            if(regEmployeeUserCombobox5 != null) {regEmployeeUserCombobox5.clearValue(); }
            if(regEmployeeUserCombobox6 != null) {regEmployeeUserCombobox6.clearValue(); }

            var regEmployeeContainer2 = me.lookupReference('regEmployeeContainer-2'),
                regEmployeeContainer3 = me.lookupReference('regEmployeeContainer-3'),
                regEmployeeContainer4 = me.lookupReference('regEmployeeContainer-4'),
                regEmployeeContainer5 = me.lookupReference('regEmployeeContainer-5'),
                regEmployeeContainer6 = me.lookupReference('regEmployeeContainer-6');
            
            regEmployeeContainer2.setHidden(true);
            regEmployeeContainer3.setHidden(true);
            regEmployeeContainer4.setHidden(true);
            regEmployeeContainer5.setHidden(true);
            regEmployeeContainer6.setHidden(true);

            var regEmployeePaymentUserCombobox1 = me.lookupReference('regEmployeePaymentUserCombobox-1'),
                regEmployeePaymentUserCombobox2 = me.lookupReference('regEmployeePaymentUserCombobox-2'),
                regEmployeePaymentUserCombobox3 = me.lookupReference('regEmployeePaymentUserCombobox-3'),
                regEmployeePaymentUserCombobox4 = me.lookupReference('regEmployeePaymentUserCombobox-4'),
                regEmployeePaymentUserCombobox5 = me.lookupReference('regEmployeePaymentUserCombobox-5'),
                regEmployeePaymentUserCombobox6 = me.lookupReference('regEmployeePaymentUserCombobox-6');

            regEmployeeUserCombobox1.clearValue();
            if(regEmployeePaymentUserCombobox1 != null) {regEmployeePaymentUserCombobox1.clearValue(); }
            if(regEmployeePaymentUserCombobox2 != null) {regEmployeePaymentUserCombobox2.clearValue(); }
            if(regEmployeePaymentUserCombobox3 != null) {regEmployeePaymentUserCombobox3.clearValue(); }
            if(regEmployeePaymentUserCombobox4 != null) {regEmployeePaymentUserCombobox4.clearValue(); }
            if(regEmployeePaymentUserCombobox5 != null) {regEmployeePaymentUserCombobox5.clearValue(); }
            if(regEmployeePaymentUserCombobox6 != null) {regEmployeePaymentUserCombobox6.clearValue(); }

            var regEmployeePaymentContainer1 = me.lookupReference('regEmployeePaymentContainer-1'),
                regEmployeePaymentContainer2 = me.lookupReference('regEmployeePaymentContainer-2'),
                regEmployeePaymentContainer3 = me.lookupReference('regEmployeePaymentContainer-3'),
                regEmployeePaymentContainer4 = me.lookupReference('regEmployeePaymentContainer-4'),
                regEmployeePaymentContainer5 = me.lookupReference('regEmployeePaymentContainer-5'),
                regEmployeePaymentContainer6 = me.lookupReference('regEmployeePaymentContainer-6');
            
            regEmployeePaymentContainer1.setHidden(true);
            regEmployeePaymentContainer2.setHidden(true);
            regEmployeePaymentContainer3.setHidden(true);
            regEmployeePaymentContainer4.setHidden(true);
            regEmployeePaymentContainer5.setHidden(true);
            regEmployeePaymentContainer6.setHidden(true);

            viewModel.set('currentAccountEmployeeNumber', 1);
            viewModel.set('currentAccountEmployeePaymentNumber', 1);

            var regEmployeePaymentCheckBox = me.lookupReference('regEmployeePaymentCheckBox');
            regEmployeePaymentCheckBox.setValue(true);

        } else if (itemId === 'modifyEmployeeWindow') {
            var modifyEmployeeUserCombobox = me.lookupReference('modifyEmployeeUserCombobox');
            modifyEmployeeUserCombobox.clearValue();
        }

        Ext.getBody().unmask();
    },

    onPaymentCheckBoxChange: function(checkbox, newValue){
        var me = this,
            viewModel = me.getViewModel;
        if(newValue === true){
            var regEmployeePaymentContainer1 = me.lookupReference('regEmployeePaymentContainer-1');
            regEmployeePaymentContainer1.setHidden(true);
            var regEmployeePaymentContainer2 = me.lookupReference('regEmployeePaymentContainer-2');
            regEmployeePaymentContainer2.setHidden(true);
            var regEmployeePaymentContainer3 = me.lookupReference('regEmployeePaymentContainer-3');
            regEmployeePaymentContainer3.setHidden(true);
            var regEmployeePaymentContainer4 = me.lookupReference('regEmployeePaymentContainer-4');
            regEmployeePaymentContainer4.setHidden(true);
            var regEmployeePaymentContainer5 = me.lookupReference('regEmployeePaymentContainer-5');
            regEmployeePaymentContainer5.setHidden(true);
            var regEmployeePaymentContainer6 = me.lookupReference('regEmployeePaymentContainer-6');
            regEmployeePaymentContainer6.setHidden(true);

            var regEmployeePaymentAddPercentageBtn = me.lookupReference('regEmployeePaymentAddPercentageBtn');
            regEmployeePaymentAddPercentageBtn.setHidden(true);
        }
        if(newValue === false){
            var regEmployeePaymentContainer1 = me.lookupReference('regEmployeePaymentContainer-1');
            regEmployeePaymentContainer1.setHidden(false);

            var regEmployeePaymentAddPercentageBtn = me.lookupReference('regEmployeePaymentAddPercentageBtn');
            regEmployeePaymentAddPercentageBtn.setHidden(false);
        }
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
        
        var me = this,
            viewModel = me.getViewModel(),
            unregisterAccountStore = viewModel.getStore('unregisterAccountStore');
            gridSelectionRecords = viewModel.get('gridSelectionRecords'),
            accountEmployee = viewModel.get('accountEmployee');

        var record = gridSelectionRecords[0];
        var form = me.lookupReference('regEmployeeForm').getForm();
        var regEmployeePaymentCheckBox = me.lookupReference('regEmployeePaymentCheckBox');
        console.log(regEmployeePaymentCheckBox.getValue());


        if (form.isValid()) {
            var values = form.getValues();
            var mainTellerRadio = values.mainTeller;
            var tellerTaskPercentageList = new Array();
            if(values.rwcode1 && values.rwpercentage1){
                 var ttp = {
                    tellerCode:values.rwcode1,
                    percentage:values.rwpercentage1
                } 
                 if(mainTellerRadio == 'radio1') ttp.mainTeller = true;
                 else ttp.mainTeller = false;
                 tellerTaskPercentageList.push(ttp) 
            };
            if(values.rwcode2 && values.rwpercentage2){
                var ttp = {
                   tellerCode:values.rwcode2,
                   percentage:values.rwpercentage2
               } 
                if(mainTellerRadio == 'radio2') ttp.mainTeller = true;
                else ttp.mainTeller = false;
                tellerTaskPercentageList.push(ttp) 
           };
           if(values.rwcode3 && values.rwpercentage3){
                var ttp = {
                    tellerCode:values.rwcode3,
                    percentage:values.rwpercentage3
                } 
                if(mainTellerRadio == 'radio3') ttp.mainTeller = true;
                else ttp.mainTeller = false;
                tellerTaskPercentageList.push(ttp) 
            };
            if(values.rwcode4 && values.rwpercentage4){
                var ttp = {
                    tellerCode:values.rwcode4,
                    percentage:values.rwpercentage4
                } 
                if(mainTellerRadio == 'radio4') ttp.mainTeller = true;
                else ttp.mainTeller = false;
                tellerTaskPercentageList.push(ttp) 
            };
            if(values.rwcode5 && values.rwpercentage5){
                var ttp = {
                    tellerCode:values.rwcode5,
                    percentage:values.rwpercentage5
                } 
                if(mainTellerRadio == 'radio5') ttp.mainTeller = true;
                else ttp.mainTeller = false;
                tellerTaskPercentageList.push(ttp) 
            };
            if(values.rwcode6 && values.rwpercentage6){
                var ttp = {
                    tellerCode:values.rwcode6,
                    percentage:values.rwpercentage6
                } 
                if(mainTellerRadio == 'radio6') ttp.mainTeller = true;
                else ttp.mainTeller = false;
                tellerTaskPercentageList.push(ttp) 
            };

            var tellerPaymentPercentageList = new Array();
            if(values.jccode1 && values.jcpercentage1) tellerPaymentPercentageList.push({tellerCode:values.jccode1,percentage:values.jcpercentage1});
            if(values.jccode2 && values.jcpercentage2) tellerPaymentPercentageList.push({tellerCode:values.jccode2,percentage:values.jcpercentage2});
            if(values.jccode3 && values.jcpercentage3) tellerPaymentPercentageList.push({tellerCode:values.jccode3,percentage:values.jcpercentage3});
            if(values.jccode4 && values.jcpercentage4) tellerPaymentPercentageList.push({tellerCode:values.jccode4,percentage:values.jcpercentage4});
            if(values.jccode5 && values.jcpercentage5) tellerPaymentPercentageList.push({tellerCode:values.jccode5,percentage:values.jcpercentage5});
            if(values.jccode6 && values.jcpercentage6) tellerPaymentPercentageList.push({tellerCode:values.jccode6,percentage:values.jcpercentage6});

            var data = {
                unboundAccountId: record.get('unboundAccountId'),
                accountNo: values.accountNo,
                childAccountNo: values.childAccountNo,
                tellerTaskPercentageList: tellerTaskPercentageList,
                tellerPaymentPercentageList: tellerPaymentPercentageList,
                taskPaymentSameFlag: regEmployeePaymentCheckBox.getValue(),
                remarks: values.remarks,
                autoBindRule: values.autoBindRule
            }

            button.setDisabled(true);
            Ext.Ajax.request({
                url: CFG.getGlobalPath() + '/cktj/employeeaccount/registeremployee',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'  // 必须设置 Content-Type
                },
                jsonData: data,
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
            gridSelectionRecords = viewModel.get('gridSelectionRecords'),
            selectionRecord = viewModel.get('selectionRecord');

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
                    // var data = new Array();
                    // Ext.Array.each(gridSelectionRecords, function(record) {
                    //     data.push({id: record.get('id'), accountNo: record.get('accountNo')});
                    // });
                    var data = {
                        accountNo: selectionRecord.get('accountNo'),
                        childAccountNo: selectionRecord.get('childAccountNo')
                    }

                    Ext.Ajax.request({
                        url: CFG.getGlobalPath() + '/cktj/employeeaccount/checkregisteremployee',
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'  // 必须设置 Content-Type
                        },
                        jsonData: data,
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
            gridSelectionRecords = viewModel.get('gridSelectionRecords'),
            selectionRecord = viewModel.get('selectionRecord');

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
                    // var data = new Array();
                    // Ext.Array.each(gridSelectionRecords, function(record) {
                    //     data.push({id: record.get('id'), accountNo: record.get('accountNo')});
                    // });

                    var data = {
                        accountNo: selectionRecord.get('accountNo'),
                        childAccountNo: selectionRecord.get('childAccountNo')
                    }

                    Ext.Ajax.request({
                        url: CFG.getGlobalPath() + '/cktj/employeeaccount/undoregisteremployee',
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'  // 必须设置 Content-Type
                        },
                        jsonData: data,
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
    modifyEmployeeTask: function() {
        var me = this,
            view = me.getView(),
            viewModel = me.getViewModel(),
            gridSelectionRecords = viewModel.get('gridSelectionRecords');

        if (!gridSelectionRecords || gridSelectionRecords.length <= 0) {
            Ext.Msg.alert('提示', '请选择要变更揽储人的账户！');
            return;
        }

        var window = view.floatingItems.get('modifyEmployeeTaskWindow');

        Ext.getBody().mask(); //遮罩
        window.center();
        window.show();
    },

    /**
     * 显示变更揽储人窗口
     */
    modifyEmployeePayment: function() {
        var me = this,
            view = me.getView(),
            viewModel = me.getViewModel(),
            gridSelectionRecords = viewModel.get('gridSelectionRecords');

        if (!gridSelectionRecords || gridSelectionRecords.length <= 0) {
            Ext.Msg.alert('提示', '请选择要变更揽储人的账户！');
            return;
        }

        var window = view.floatingItems.get('modifyEmployeePaymentWindow');

        Ext.getBody().mask(); //遮罩
        window.center();
        window.show();
    },

    /**
     * 提交变更揽储人申请--任务
     * @param button
     */
    onModifyEmployeeTaskSaveBtnClick: function(button) {
        var me = this,
            viewModel = me.getViewModel(),
            taskModifiableAccountStore = viewModel.getStore('taskModifiableAccountStore');
            gridSelectionRecords = viewModel.get('gridSelectionRecords');

        var record = viewModel.get('selectionRecord');
        var form = me.lookupReference('modifyEmployeeTaskForm').getForm();

        if (form.isValid()) {
            var values = form.getValues();
            var mainTellerRadio = values.mainTeller;
            var tellerTaskPercentageList = new Array();
            if(values.rwcode1 && values.rwpercentage1){
                 var ttp = {
                    tellerCode:values.rwcode1,
                    percentage:values.rwpercentage1
                } 
                 if(mainTellerRadio == 'radio1') ttp.mainTeller = true;
                 else ttp.mainTeller = false;
                 tellerTaskPercentageList.push(ttp) 
            };
            if(values.rwcode2 && values.rwpercentage2){
                var ttp = {
                   tellerCode:values.rwcode2,
                   percentage:values.rwpercentage2
               } 
                if(mainTellerRadio == 'radio2') ttp.mainTeller = true;
                else ttp.mainTeller = false;
                tellerTaskPercentageList.push(ttp) 
           };
           if(values.rwcode3 && values.rwpercentage3){
                var ttp = {
                    tellerCode:values.rwcode3,
                    percentage:values.rwpercentage3
                } 
                if(mainTellerRadio == 'radio3') ttp.mainTeller = true;
                else ttp.mainTeller = false;
                tellerTaskPercentageList.push(ttp) 
            };
            if(values.rwcode4 && values.rwpercentage4){
                var ttp = {
                    tellerCode:values.rwcode4,
                    percentage:values.rwpercentage4
                } 
                if(mainTellerRadio == 'radio4') ttp.mainTeller = true;
                else ttp.mainTeller = false;
                tellerTaskPercentageList.push(ttp) 
            };
            if(values.rwcode5 && values.rwpercentage5){
                var ttp = {
                    tellerCode:values.rwcode5,
                    percentage:values.rwpercentage5
                } 
                if(mainTellerRadio == 'radio5') ttp.mainTeller = true;
                else ttp.mainTeller = false;
                tellerTaskPercentageList.push(ttp) 
            };
            if(values.rwcode6 && values.rwpercentage6){
                var ttp = {
                    tellerCode:values.rwcode6,
                    percentage:values.rwpercentage6
                } 
                if(mainTellerRadio == 'radio6') ttp.mainTeller = true;
                else ttp.mainTeller = false;
                tellerTaskPercentageList.push(ttp) 
            };

            var data = {
                accountNo: record.get('accountNo'),
                childAccountNo: record.get('childAccountNo'),
                tellerTaskPercentageList: tellerTaskPercentageList,
                remarks: values.remarks
            }

            button.setDisabled(true);
            Ext.Ajax.request({
                url: CFG.getGlobalPath() + '/cktj/employeeaccount/modifyemployeetask',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'  // 必须设置 Content-Type
                },
                jsonData: data,
                scope: this,
                success: function(response, opts) {
                    var result = Ext.decode(response.responseText, true);
                    if (result.success) {
                        Ext.toast(result.msg);
                        taskModifiableAccountStore.reload();
                        button.up('window').close();
                    } else {
                        Ext.Msg.alert('存款账户变更揽储人出错', result.msg);
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
     * 提交变更揽储人申请--计酬
     * @param button
     */
    onModifyEmployeePaymentSaveBtnClick: function(button) {
        var me = this,
            viewModel = me.getViewModel(),
            paymentModifiableAccountStore = viewModel.getStore('paymentModifiableAccountStore');
            gridSelectionRecords = viewModel.get('gridSelectionRecords');

        var record = viewModel.get('selectionRecord');
        var form = me.lookupReference('modifyEmployeePaymentForm').getForm();

        if (form.isValid()) {
            var values = form.getValues();
            var tellerPaymentPercentageList = new Array();
            if(values.jccode1 && values.jcpercentage1){
                 var ttp = {
                    tellerCode:values.jccode1,
                    percentage:values.jcpercentage1
                } 
                 tellerPaymentPercentageList.push(ttp) 
            };
            if(values.jccode2 && values.jcpercentage2){
                 var ttp = {
                    tellerCode:values.jccode2,
                    percentage:values.jcpercentage2
                } 
                 tellerPaymentPercentageList.push(ttp) 
            };
           if(values.jccode3 && values.jcpercentage3){
                 var ttp = {
                    tellerCode:values.jccode3,
                    percentage:values.jcpercentage3
                } 
                 tellerPaymentPercentageList.push(ttp) 
            };
            if(values.jccode4 && values.jcpercentage4){
                 var ttp = {
                    tellerCode:values.jccode4,
                    percentage:values.jcpercentage4
                } 
                 tellerPaymentPercentageList.push(ttp) 
            };
            if(values.jccode5 && values.jcpercentage5){
                 var ttp = {
                    tellerCode:values.jccode5,
                    percentage:values.jcpercentage5
                } 
                 tellerPaymentPercentageList.push(ttp) 
            };
            if(values.jccode6 && values.jcpercentage6){
                 var ttp = {
                    tellerCode:values.jccode6,
                    percentage:values.jcpercentage6
                } 
                 tellerPaymentPercentageList.push(ttp) 
            };

            var data = {
                accountNo: record.get('accountNo'),
                childAccountNo: record.get('childAccountNo'),
                tellerPaymentPercentageList: tellerPaymentPercentageList,
                remarks: values.remarks
            }

            button.setDisabled(true)
            Ext.Ajax.request({
                url: CFG.getGlobalPath() + '/cktj/employeeaccount/modifyemployeepayment',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'  // 必须设置 Content-Type
                },
                jsonData: data,
                scope: this,
                success: function(response, opts) {
                    var result = Ext.decode(response.responseText, true);
                    if (result.success) {
                        Ext.toast(result.msg);
                        paymentModifiableAccountStore.reload();
                        button.up('window').close();
                    } else {
                        Ext.Msg.alert('存款账户变更揽储人出错', result.msg);
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
