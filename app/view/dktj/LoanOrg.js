
Ext.define('MyApp.view.dktj.LoanOrg',{
    extend: 'Ext.panel.Panel',
    xtype: 'dktjloanorg',

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
        var titleText;
        switch(moduleId){
            case '520': 
                titleText = '机构时点';
                break;
            case '522':
                titleText = '机构日均';
                break;
        }

        //表格的数据存储器
        dataStore = viewModel.getStore('organizationLoanStore');


        myMatrix =  Ext.create('Ext.pivot.matrix.Local', {
            textRowLabels: '日期/所属机构/所在机构',
            compactViewColumnWidth: 210,
            viewLayoutType: 'compact',
            type: 'local',
            // store: dataStore,
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
            xtype : 'loangridorg',
            bind: {
                store: '{organizationLoanStore}',
                title: titleText
                // title: '员工时点' + '{selectionText}'
            },
            permissiveOpts: me.permissiveOpts,
            moduleId: 'loanorg',
            matrix: myMatrix
        });

        this.callParent(arguments);
    }
});
