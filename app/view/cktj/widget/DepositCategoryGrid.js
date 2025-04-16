
Ext.define('MyApp.view.cktj.widget.DepositCategoryGrid', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.depositcategorygrid',

    requires: [
        'MyApp.ux.GridToolBar'
    ],

    reference: 'depositcategorygrid',

    bind: {
        store: '{depositcategoryStore}'
    },

    columnLines: true,

    tools: [
        {
            type: 'refresh',
            tooltip: '刷新数据',
            handler: 'refreshBtnClick'
            // }, {
            //     type: 'gear'
        }
        // , {
        //     type: 'maximize',
        //     hidden: true,
        //     tooltip: '隐藏记录明细',
        //     handler: 'hideDetailBtnClick'
        // }
        // , {
        //     type: 'restore',
        //     tooltip: '显示记录明细',
        //     handler: 'showDetailBtnClick'
            // }, {
            //     type: 'expand',
            //     tooltip: '展开全部数据',
            //     handler : 'expandBtnClick'
            //
            // }, {
            //     type: 'collapse',
            //     tooltip: '折叠全部数据',
            //     handler : 'collapseBtnClick'
        // }
    ],


    rootVisible: false,

    columns: {
        defaults: {
            flex: 1,
            align: 'left'
        },
        items: [
            {
                xtype: 'treecolumn',
                text: '名称',
                dataIndex: 'name'
            }, {
                text: '存款类型',
                dataIndex: 'depositTypeStr'
            }, {
                text: '客户类型',
                dataIndex: 'customerTypeStr'
            }, {
                text: '归属',
                dataIndex: 'belongToStr'
            }, {
                text: '科目号',
                dataIndex: 'subjectNoStr'
            }, {
                text: '存款编码',
                dataIndex: 'no'
            }, {
                xtype: 'booleancolumn',
                text: '表格分组字段',
                trueText: '是',
                falseText: '否',
                dataIndex: 'columnGroupFlag'
            }, {
                xtype: 'booleancolumn',
                text: '是否计入总存款',
                trueText: '是',
                falseText: '否',
                dataIndex: 'intoTotalFlag'
            }, {
                xtype: 'booleancolumn',
                text: '是否生成小计存款',
                trueText: '是',
                falseText: '否',
                dataIndex: 'subtotalFlag'
            }, {
                xtype: 'booleancolumn',
                text: '是否有计提利息',
                trueText: '是',
                falseText: '否',
                dataIndex: 'prvisnIntFlag'
            }, {
                xtype: 'booleancolumn',
                text: '是否有实付利息',
                trueText: '是',
                falseText: '否',
                dataIndex: 'payIntFlag'
            }, {
                xtype: 'booleancolumn',
                text: '有效性标志',
                trueText: '有效',
                falseText: '无效',
                dataIndex: 'validFlag'
            }, {
                text: '排序',
                dataIndex: 'sort'
            }, {
                text: '创建时间',
                dataIndex: 'createTime'
            }, {
                text: '更新时间',
                dataIndex: 'updateTime'
            }
        ]
    },

    initComponent: function () {
        var me = this;

        //表格顶部工具栏
        me.dockedItems = [];
        me.dockedItems.push({
            xtype: 'gridtoolbar',
            dock: 'top',
            permissiveOpts: []
        });

        me.callParent(arguments);
    }
});