Ext.define('MyApp.view.dktj.EmployeeInterestDetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dktjemployeeinterestdetail',

    requires: [
        'MyApp.model.dktj.EmployeeInterest'
    ],

    autoColumnWidthButtonClick : function() {
        var me = this,
            employeeInterestDetailGrid = me.lookupReference('employeeinterestdetailgrid');
        
        Ext.suspendLayouts();
        Ext.Array.forEach(employeeInterestDetailGrid.columnManager.getColumns(),
            function(column) {
                if (employeeInterestDetailGrid.isVisible() && column.resizable) {
                    column.autoSize();
                }
            });
        Ext.resumeLayouts(true);
    },

    navigationTreeRefreshBtnClick : function() {
        this.lookupReference('navigationtree').getStore().reload();
    },

    refreshBtnClick : function() {
        this.lookupReference('employeeinterestdetailgrid').getStore().reload();
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

    onEmployeeInterestDetailStoreBeforeLoad: function(store , operation , eOpts) {
        var me = this,
            selectionOrganization = me.getSelectionOrganization(),
            searchForm = me.lookupReference('searchForm');

        var filter = null;

        if (searchForm) {
            filter = searchForm.getForm().getValues();
        }

        if (filter == null) {
            filter = {};
        }

        if (selectionOrganization) {
            filter.organizationId = selectionOrganization.getId();
        }

        if (filter) {
            var f1 = filter.startDate == null || false || filter.startDate === '',
                f2 = filter.endDate == null || false || filter.endDate === '';
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
    },

    /**
     * store load 完成后,选中第一条记录
     * @param store
     * @param records
     * @param successful
     * @param operation
     * @param eOpts
     */
    onEmployeeInterestDetailStoreLoad: function(store, records, successful, operation, eOpts) {
        var me = this,
            employeeInterestDetailGrid = me.lookupReference('employeeinterestdetailgrid'),
            selModel = employeeInterestDetailGrid.getSelectionModel();

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
            employeeInterestDetailGrid = me.lookupReference('employeeinterestdetailgrid'),
            store = employeeInterestDetailGrid.getStore();

        store.load();
    },

    /**
     * 当表格选择发生改变时，将选择中的记录设置在ViewModel中
     * @param selectable
     * @param records
     * @param eOpts
     */
    onEmployeeInterestDetailGridSelectionChange: function(selectable, records, eOpts) {
        var me = this,
            viewModel = me.getViewModel();

        viewModel.set('gridSelectionRecords', records);
    }





});

























