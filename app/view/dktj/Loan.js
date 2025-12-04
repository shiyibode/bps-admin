
Ext.define('MyApp.view.dktj.Loan',{
    extend: 'Ext.panel.Panel',
    xtype: 'dktjloan',

    requires: [
        'Ext.layout.container.Border',
        'MyApp.view.dktj.LoanController',
        'MyApp.view.dktj.LoanModel',
        'MyApp.view.dktj.widget.LoanGrid'
    ],

    controller: 'dktjloan',
    viewModel: {
        type: 'dktjloan'
    },
    width: 500,
    height: 700,
    layout : 'border',

    initComponent: function() {
        var me = this,
            viewModel = me.getViewModel();

        //表格的数据存储器
        var dataStore = null;
        var myMatrix = null;
        switch (me.moduleId) {
            //员工时点
            case 516:
                dataStore = viewModel.getStore('employeeLoanStore');
                myMatrix =  Ext.create('Ext.pivot.matrix.Local', {
                    textRowLabels: '日期/营销人员/机构',
                    compactViewColumnWidth: 210,
                    viewLayoutType: 'compact',
                    type: 'local',
                    store: dataStore,
                    textTotalTpl: '小计 ({name})',
                    textGrandTotalTpl: '合计',
                    colGrandTotalsPosition: 'first',
                    rowGrandTotalsPosition: 'none',
                    showZeroAsBlank: true,
                    aggregate: [{
                        dataIndex: 'balance',
                        header: '金额',
                        aggregator: 'sum',
                        width: 150
                    },{
                        dataIndex: 'ttlReceivedInt',
                        aggregator: 'sum',
                        header: '累计收息'
                    },{
                        dataIndex: 'dayReceivedInt',
                        aggregator: 'sum',
                        header: '当日收息'
                    }],

                    topAxis: [{
                        dataIndex: 'fiveClassFlagName',
                        sortable: false,
                        header: '小计'
                    }, {
                        dataIndex: 'fourClassFlagName',
                        header: '小计',
                        sortable: false
                    }],

                    leftAxis: [{
                        dataIndex: 'date',
                        header: '日期',
                        sortable: false
                    }, {
                        dataIndex: 'teller',
                        header: '营销人员信息',
                        sortable: false
                    }, {
                        dataIndex: 'lnOrg',
                        header: '贷款所在机构',
                        sortable: false
                    }]
                });
                break;
            //员工日均
            case 518:
                dataStore = viewModel.getStore('employeeAvgLoanStore');
                myMatrix =  Ext.create('Ext.pivot.matrix.Local', {
                    textRowLabels: '日均日期/存款人信息/存款机构',
                    compactViewColumnWidth: 210,
                    viewLayoutType: 'compact',
                    type: 'local',
                    store: dataStore,
                    textTotalTpl: '小计 ({name})',
                    textGrandTotalTpl: '合计',
                    colGrandTotalsPosition: 'first',
                    rowGrandTotalsPosition: 'none',
                    showZeroAsBlank: true,
                    aggregate: [{
                        dataIndex: 'balance',
                        header: '金额',
                        aggregator: 'sum',
                        width: 150
                    }],

                    topAxis: [{
                        dataIndex: 'fiveClassFlagName',
                        sortable: false,
                        header: '小计'
                    }, {
                        dataIndex: 'fourClassFlagName',
                        header: '小计',
                        sortable: false
                    }],

                    leftAxis: [{
                        dataIndex: 'date',
                        header: '日期',
                        sortable: false
                    }, {
                        dataIndex: 'teller',
                        header: '营销人员信息',
                        sortable: false
                    }, {
                        dataIndex: 'lnOrg',
                        header: '贷款所在机构',
                        sortable: false
                    }]
                });
                break;
            //机构时点
            case 520:
                dataStore = viewModel.getStore('organizationLoanStore');
                myMatrix =  Ext.create('Ext.pivot.matrix.Local', {
                    textRowLabels: '日期/所属机构/所在机构',
                    compactViewColumnWidth: 210,
                    viewLayoutType: 'compact',
                    type: 'local',
                    store: dataStore,
                    textTotalTpl: '小计 ({name})',
                    textGrandTotalTpl: '合计',
                    colGrandTotalsPosition: 'first',
                    rowGrandTotalsPosition: 'none',
                    showZeroAsBlank: true,
                    aggregate: [{
                        dataIndex: 'balance',
                        header: '金额',
                        aggregator: 'sum',
                        width: 150
                    },{
                        dataIndex: 'ttlReceivedInt',
                        aggregator: 'sum',
                        header: '累计收息'
                    },{
                        dataIndex: 'dayReceivedInt',
                        aggregator: 'sum',
                        header: '当日收息'
                    }],

                    topAxis: [
                        {
                            dataIndex: 'fiveClassFlagName',
                            sortable: false,
                            header: '小计'
                        }, {
                            dataIndex: 'fourClassFlagName',
                            header: '小计',
                            sortable: false
                        }
                    ],

                    leftAxis: [{
                        dataIndex: 'date',
                        header: '日期',
                        sortable: false
                    }, {
                        dataIndex: 'lnOrg',
                        header: '贷款机构',
                        sortable: false
                    },
                        {
                        dataIndex: 'lnOrg2',
                        header: '贷款机构',
                        sortable: false
                    }]
                });
                break;
            //机构日均
            case 522:
                dataStore = viewModel.getStore('organizationAvgLoanStore');
                myMatrix =  Ext.create('Ext.pivot.matrix.Local', {
                    textRowLabels: '日期/所属机构/所在机构',
                    compactViewColumnWidth: 210,
                    viewLayoutType: 'compact',
                    type: 'local',
                    store: dataStore,
                    textTotalTpl: '小计 ({name})',
                    textGrandTotalTpl: '合计',
                    colGrandTotalsPosition: 'first',
                    rowGrandTotalsPosition: 'none',
                    showZeroAsBlank: true,
                    aggregate: [{
                        dataIndex: 'balance',
                        header: '金额',
                        aggregator: 'sum',
                        width: 150
                    }],

                    topAxis: [{
                        dataIndex: 'fiveClassFlagName',
                        sortable: false,
                        header: '小计'
                    }, {
                        dataIndex: 'fourClassFlagName',
                        header: '小计',
                        sortable: false
                    }],

                    leftAxis: [{
                        dataIndex: 'date',
                        header: '日期',
                        sortable: false
                    }, {
                        dataIndex: 'lnOrg',
                        header: '贷款机构',
                        sortable: false
                    }, {
                        dataIndex: 'lnOrg2',
                        header: '贷款机构',
                        sortable: false
                    }]
                });
                break;
        };

        // dataStore.load();

        me.items = [];
        me.items.push({
            region : 'west',
            xtype : 'navigationtree',
            title: '机构信息',
            bind: {
                store: '{organizationStore}'
            },
            width: 220
        }, {
            region : 'center',
            xtype : 'loangrid',
            bind: {
                title: me.title + '{selectionText}'
            },
            permissiveOpts: me.permissiveOpts,
            moduleId: me.moduleId,
            matrix: myMatrix
        });

        this.callParent(arguments);
    }
});
