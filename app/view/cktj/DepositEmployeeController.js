Ext.define('MyApp.view.cktj.DepositController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.cktjdepositemployee',

    expandBtnClick : function() {
        this.lookupReference('depositemployeegrid').expandAll();
    },

    collapseBtnClick : function() {
        this.lookupReference('depositemployeegrid').collapseAll();
    },

    autoColumnWidthButtonClick : function() {
        var me = this,
            depositgrid = me.lookupReference('depositemployeegrid');
        
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
        this.lookupReference('depositemployeegrid').getStore().reload();
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
            depositemployeegrid = me.lookupReference('depositemployeegrid'),
            store = depositemployeegrid.getStore(),
            empDepositTypeStore = me.getViewModel().getStore('empDepositTypeStore'),
            orgDepositTypeStore = me.getViewModel().getStore('orgDepositTypeStore'),
            depositTypeCombo = me.lookupReference('depositTypeCombo');

        var selectionModel = selected[0];
        if (selectionModel) {
            var type = selectionModel.get('type');
            empDepositTypeStore.clearFilter();
            orgDepositTypeStore.clearFilter();
            if (depositTypeCombo) {
                depositTypeCombo.setValue(0);
            }
            if (type === '000' || type === '100') {
                empDepositTypeStore.filterBy(function(item) {
                    return item.get('id') === 0;
                });
                orgDepositTypeStore.filterBy(function(item) {
                    return item.get('id') === 0;
                });
            } else if (type === '200' || type === '201') {
                empDepositTypeStore.filterBy(function(item) {
                    return item.get('id') === 1;
                });
                if (depositTypeCombo) {
                    depositTypeCombo.setValue(1);
                }
            }
        }
        store.load();
    },
    

    exportEmpDepositTask: function(){
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
                filter: {
                    organizationId: selectionOrganization.getId()
                }
            }
        }

        var form = Ext.create('Ext.form.Panel', {
            standardSubmit: true,
            url: CFG.getGlobalPath() + '/cktj/deposit/exportempdeposittask'
        });

        var params = {};
        if(filter && filter.startDate) params.date = filter.startDate;
        if(filter && filter.organizationId) params.organizationId = filter.organizationId;
        if(filter && filter.depositType) params.depositType = filter.depositType;
        
        form.submit({
            params: params
        });
    },



    onDepositCategoryStoreLoad: function(store) {
        var rootNode = store.getNodeById(1);

        var depositgrid = this.lookupReference('depositemployeegrid');
        // var gridColumns = depositgrid.getColumns();

        var columns = [];

        this.depathNode(rootNode, columns);

        depositgrid.reconfigure(columns);
        // depositgrid.render();
    },

    depathNode: function(node, columns) {
        if (!node) {
            return;
        }

        var validFlag = node.get('validFlag');

        if (node.hasChildNodes()) {
            if (validFlag && validFlag === true) {
                var subColumn = {
                    text: node.get('name'),
                    dpCategoryId: node.get(id),
                    columns: []
                };
                node.eachChild(function(child) {
                    this.depathNode(child, subColumn.columns);
                }, this);
                columns.push(subColumn);
            } else {
                node.eachChild(function(child) {
                    this.depathNode(child, columns);
                }, this);
            }
        } else {
            if (validFlag && validFlag === true) {
                columns.push({
                    text: node.get('name'),
                    dpCategoryId: node.get(id)
                });
            }
        }
    }



});
