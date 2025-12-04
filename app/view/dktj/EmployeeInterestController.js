Ext.define('MyApp.view.dktj.EmployeeInterestController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dktjemployeeinterest',

    requires: [
        'MyApp.model.dktj.EmployeeInterest'
    ],

    autoColumnWidthButtonClick : function() {
        var me = this,
            employeeInterestReaddGrid = me.lookupReference('employeeinterestgrid');
        
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
        this.lookupReference('employeeinterestgrid').getStore().reload();
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
            employeeInterestGrid = me.lookupReference('employeeinterestgrid'),
            store = employeeInterestGrid.getStore(),
            empLoanTypeStore = me.getViewModel().getStore('empLoanTypeStore'),
            orgLoanTypeStore = me.getViewModel().getStore('orgLoanTypeStore'),
            loanTypeCombo = me.lookupReference('interestLoanTypeCombo');

        var selectionModel = selected[0];
        if (selectionModel) {
            var type = selectionModel.get('type');
            empLoanTypeStore.clearFilter();
            orgLoanTypeStore.clearFilter();
            if (loanTypeCombo) {
                loanTypeCombo.setValue(1);
            }
            if (type === '000' || type === '100') {//对于“伊金霍洛农商行”、“营业网点”只显示核心贷款
                empLoanTypeStore.filterBy(function(item) {
                    return item.get('id') === 1;
                });
                orgLoanTypeStore.filterBy(function(item) {
                    return item.get('id') === 1;
                });
            } else if (type === '200' || type === '201') { //对于“管理部门”和总行的部门，只显示汇总贷款
                empLoanTypeStore.filterBy(function(item) {
                    return item.get('id') === 2;
                });
                orgLoanTypeStore.filterBy(function(item) {
                    return item.get('id') === 2 ;
                });
                if (loanTypeCombo) {
                    loanTypeCombo.setValue(2);
                }
            }
        }

        store.load();
    },


    onInterestStoreBeforeLoad: function(store , operation , eOpts) {
        var me = this,
            searchForm = me.lookupReference('searchForm'),
            selectionOrganization = me.getSelectionOrganization();

        var filter = null;

        if (searchForm) {
            filter = searchForm.getForm().getValues();
        }

        if (selectionOrganization) {
            if (filter) {
                filter.organizationId = selectionOrganization.getId();
            } else {
                filter= {
                    organizationId: selectionOrganization.getId()
                }
            }
        }

        if (filter) {
            var f1 = filter.startDate == null || filter.startDate == undefined || filter.startDate == '';
            var f2 = filter.endDate == null || filter.endDate == undefined || filter.endDate == '';
            if (f1 && f2) { //startDate, endDate 都没有输入
                var lnCurrDate = me.getViewModel().get('lnCurrDate');
                filter.startDate = lnCurrDate;
                filter.endDate = lnCurrDate;
            } else if (!f1 && f2) { //startDate已输入, endDate没有输入
                filter.endDate = filter.startDate;
            } else if (f1 && !f2) { //startDate没有输入, endDate已输入
                filter.startDate = filter.endDate;
            }

            store.getProxy().extraParams = {
                filter: filter
            }
        }
    }



});

























