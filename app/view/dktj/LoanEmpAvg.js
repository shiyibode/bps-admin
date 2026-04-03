
Ext.define('MyApp.view.dktj.LoanEmpAvg',{
    extend: 'Ext.panel.Panel',
    xtype: 'dktjloanempavg',

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
        var moduleId = Ext.util.Cookies.get('currentMenuId');

        //表格的数据存储器
        var dataStore = viewModel.getStore('employeeLoanStore');
        var myMatrix =  Ext.create('Ext.pivot.matrix.Local', {
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
            xtype : 'loangridemp',
            bind: {
                store: '{employeeAvgLoanStore}'
            },
            title: '员工日均',
            permissiveOpts: me.permissiveOpts,
            moduleId: 'loanempavg',
            matrix: myMatrix
        });

        this.callParent(arguments);
    }
});
