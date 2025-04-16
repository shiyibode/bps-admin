
Ext.define('MyApp.view.cktj.DepositEmployee',{
    extend: 'Ext.panel.Panel',
    xtype: 'cktjdepositemployee',

    requires: [
        'Ext.layout.container.Border',
        'MyApp.view.cktj.DepositController',
        'MyApp.view.cktj.DepositModel',
        'MyApp.view.cktj.widget.DepositGrid'
    ],

    controller: 'cktjdeposit',
    viewModel: {
        type: 'cktjdeposit'
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
        dataStore = viewModel.getStore('employeeDepositStore');
        myMatrix =  Ext.create('Ext.pivot.matrix.Local', {
            textRowLabels: '存款日期/存款人信息/存款机构',
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
                dataIndex: 'ttlPayInt',
                aggregator: 'sum',
                header: '累计付息'
            },{
                dataIndex: 'dayPayInt',
                aggregator: 'sum',
                header: '当日付息'
            }],

            topAxis: [{
                dataIndex: 'parentCategoryName',
                sortable: false,
                header: '小计'
            }, {
                dataIndex: 'dpCategoryName',
                header: '小计',
                sortable: false
            }],

            leftAxis: [{
                dataIndex: 'date',
                header: '日期',
                sortable: false
            }, {
                dataIndex: 'teller',
                header: '揽储人信息',
                sortable: false,
            }, {
                dataIndex: 'dpOrg',
                header: '存款机构',
                sortable: false
            }]
        });

        dataStore.load();

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
            xtype : 'depositgrid',
            bind: {
                title: '员工时点' + '{selectionText}'
            },
            moduleId: 'employee',
            matrix: myMatrix
        });

        this.callParent(arguments);
    }
});
