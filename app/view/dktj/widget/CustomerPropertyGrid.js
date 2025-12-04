/**
 * Created by syb on 2016/10/19.
 */
Ext.define('MyApp.view.dktj.widget.CustomerPropertyGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.customerpropertygrid',

    requires: [
        'MyApp.ux.GridToolBar',
        // 'Ext.ux.form.SearchField',
        'MyApp.ux.form.field.UxTreePicker',
        'MyApp.ux.form.trigger.TriggerClear',
        'MyApp.ux.iconcls.Field'
    ],

    reference: 'customerpropertygrid',

    bind: {
        store: '{customerPropertyStore}'
    },

    listeners: {
        selectionchange: 'onCustomerStatusGridSelectionChange'
    },

    columnLines: true,
    multiSelect: false,

    tools: [
        {
            type: 'refresh',
            tooltip: '刷新数据',
            handler: 'refreshBtnClick'
        }
    ],

    bbar:{
        xtype:'pagingtoolbar',
        reference:'gridpagingtoolbar',
        bind :{
            store : '{customerPropertyStore}'
        },
        displayInfo: true,
        emptyMsg: "没有需要显示的数据",
        plugins: [ 'progressbarpager' ]
    },

    columns: {
        items: [
            {
                text:'网点号',
                searchable: true,
                dataIndex:'orgCode'
            },{
                text: '客户名称',
                searchable: true,
                dataIndex: 'customerName'
            },
            {
                text:'客户号',
                searchable: true,
                dataIndex: 'xdCustomerNo'
            },{
                text: '证件号',
                searchable: true,
                dataIndex: 'identityNo'
            },{
                text: '类型',
                dataIndex: 'customerType',
                renderer:function (val) {
                    if (val === '1') return '个人';
                    else if (val === '2') return '对公';
                    else return '前端无法识别的客户类型';
                }
            },{
                text: '客户状态',
                dataIndex: 'statusFlag'
            },{
                text: '开始日期',
                dataIndex: 'startDate',
                renderer: Ext.util.Format.dateRenderer('Y-m-d')
            },{
                text: '终止日期',
                dataIndex: 'endDate',
                renderer: Ext.util.Format.dateRenderer('Y-m-d')
            },{
                text: '有效标志',
                dataIndex: 'validFlag',
                renderer:function (val) {
                    if (val === true) return '生效';
                    else if (val === false) return '过期';
                    else return '前端无法识别的客户类型';
                }
            },{
                text: '创建时间',
                dataIndex: 'createTime'
            }
        ],
        defaults: {
            flex: 1
        }
    },

    initComponent: function () {
        var me = this,
            searchItems=[];
        var viewModel = me.up('dktjcustomerproperty').getViewModel();
        var customerPropertyStoreForCombo = viewModel.getStore('customerPropertyStoreForCombo');
        searchItems.push({
            xtype: 'combo',
            name: 'property',
            fieldLabel: '客户状态',
            reference: 'customerStatusCombo',
            displayField: 'text',
            valueField: 'value',
            scrollable: true,
            autoScroll: true,
            store: customerPropertyStoreForCombo
        });

        //表格顶部工具栏
        me.dockedItems = [];
        me.dockedItems.push({
            xtype: 'gridtoolbar',
            dock: 'top',
            searchBox: true,
            searchItems:searchItems,
            grid: this,
            permissiveOpts: me.permissiveOpts
        });

        me.callParent(arguments);
    }
});