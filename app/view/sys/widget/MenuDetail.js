Ext.define('MyApp.view.sys.widget.MenuDetail', {
    extend: 'Ext.grid.property.Grid',

    alias: 'widget.menudetail',


    /*
     Uncomment to give this component an xtype
     xtype: 'menudetail',
     */

    emptyText: '没有选中的记录',
    nameColumnWidth: 150,

    tools: [
        {
            type: 'prev',
            tooltip: '上一条记录',
            handler: 'prevMenuBtnClick'
        }, {
            type: 'next',
            tooltip: '下一条记录',
            handler: 'nextMenuBtnClick'
        }, {
            type: 'print',
            tooltip: '打印当前明细记录'
            //handler : function(event, toolEl, panelHeader) {
            //    panelHeader.ownerCt.printDetail();
            //}
        } // , { type : 'gear'}
    ],

    bind: {
        source: '{detailSource}'
    },

    items: [
        /* include child components here */
    ],

    listeners: {
        expand: 'onMenuDetailExpand',
        collapse: 'onMenuDetailCollapse'
    }
});