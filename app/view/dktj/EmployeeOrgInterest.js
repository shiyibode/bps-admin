/**
 * create by syb on 2021-05-12
 */
Ext.define('MyApp.view.dktj.EmployeeOrgInterest',{
    extend: 'Ext.panel.Panel',
    xtype: 'dktjorginterest',

    requires: [
        'Ext.layout.container.Border',
        'MyApp.view.dktj.EmployeeInterestController',
        'MyApp.view.dktj.EmployeeInterestModel',
        'MyApp.view.dktj.widget.EmployeeInterestGrid'
    ],

    controller: 'dktjemployeeinterest',
    viewModel: {
        type: 'dktjemployeeinterest'
    },

    width: 500,
    height: 700,
    layout : 'border',

    initComponent: function() {
        var me = this,
            viewModel = me.getViewModel();
        var moduleId = Ext.util.Cookies.get('currentMenuId');

        //表格的数据存储器
        var dataStore = null;
        var myMatrix = null;
        switch (moduleId) {
            //机构时点
            case '530':
                dataStore = viewModel.getStore('organizationInterestStore');
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
                    }],

                    topAxis: [{
                        dataIndex: 'templateName',
                        sortable: false,
                        header: '小计'
                    },{
                        dataIndex: 'positionName',
                        sortable: false,
                        header: '小计'
                    }],

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
        }

        me.items = [];
        me.items.push({
            region : 'west',
            xtype : 'navigationtree',
            title: '机构信息',
            bind: {
                store: '{organizationStore}'
            },
            width: 220
        }
        , {
            region : 'center',
            xtype : 'employeeinterestgrid',
            moduleId: moduleId,
            bind: {
                store: '{organizationInterestStore}',
                title: '机构利息时点' + '{selectionText}'
            },
            matrix: myMatrix
        });

        this.callParent(arguments);
    }
});
