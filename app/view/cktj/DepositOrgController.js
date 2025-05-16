Ext.define('MyApp.view.cktj.DepositOrgController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.cktjdepositorg',

    expandBtnClick : function() {
        this.lookupReference('depositorganizationgrid').expandAll();
    },

    collapseBtnClick : function() {
        this.lookupReference('depositorganizationgrid').collapseAll();
    },

    autoColumnWidthButtonClick : function() {
        var me = this,
            depositgrid = me.lookupReference('depositorganizationgrid');
        
        Ext.suspendLayouts();
        Ext.Array.forEach(depositgrid.columnManager.getColumns(),
            function(column) {
                if (depositgrid.isVisible() && column.resizable) {
                    column.autoSize();
                }
            });
        Ext.resumeLayouts(true);
    },

    navigationTreeRefreshBtnClick : function() {
        this.lookupReference('navigationtree').getStore().reload();
    },

    refreshBtnClick : function() {
        this.lookupReference('depositorganizationgrid').getStore().reload();
    },

    // store 相关函数
    /**
     * 机构树的 store load 完成后, 选中第一个节点
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
            },100);
    },

    onDepositStoreBeforeLoad: function(store , operation , eOpts) {
        var me = this,
            searchForm = me.lookupReference('searchForm'),
            selectionOrganization = me.getSelectionOrganization();

        var filter = null;

        if (searchForm) {
            filter = searchForm.getForm().getValues();
        }

        if (selectionOrganization) {
            filter.organizationId = selectionOrganization.getId();
        }

        if (filter) {
            var f1 = filter.startDate == null || filter.startDate == undefined || filter.startDate == '';
            var f2 = filter.endDate == null || filter.endDate == undefined || filter.endDate == '';
            if (!f1 && f2) { //startDate已输入, endDate没有输入
                filter.endDate = filter.startDate;
            } else if (f1 && !f2) { //startDate没有输入, endDate已输入
                filter.startDate = filter.endDate;
            }

            store.getProxy().extraParams = filter;
        }
    },

    /**
     * 用户 store load 完成后,选中第一条记录
     */
    onDepositStoreLoad: function(store, records, successful, operation, eOpts) {
        var me = this,
            depositgrid = me.lookupReference('depositorganizationgrid'),
            selModel = depositgrid.getSelectionModel();

        //先中表格中的第一条记录
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
     * 当机构树中选中的节点发生改变时,加载 depositStore
     * @param treepanel
     * @param selected
     * @param eOpts
     */
    onNavigationTreeSelectionChange: function(treepanel, selected, eOpts) {
        var me = this,
            depositorganizationgrid = me.lookupReference('depositorganizationgrid'),
            store = depositorganizationgrid.getStore();

        store.load();
    },
    

    exportOrgDepositTask: function(){
        var me = this,
        searchForm = me.lookupReference('searchForm'),
        selectionOrganization = me.getSelectionOrganization();

        var filter = null;

        if (searchForm) {
            filter = searchForm.getForm().getValues();
        }

        if (selectionOrganization) {
            filter.organizationId = selectionOrganization.getId();
        }

        var form = Ext.create('Ext.form.Panel', {
            standardSubmit: true,
            url: CFG.getGlobalPath() + '/cktj/deposit/exportorgdeposittask'
        });

        var params = {};
        if(filter && filter.startDate) params.date = filter.startDate;
        if(filter && filter.organizationId) params.organizationId = filter.organizationId;
        if(filter && filter.depositType) params.depositType = filter.depositType;
        
        form.submit({
            params: params
        });
    }



});
