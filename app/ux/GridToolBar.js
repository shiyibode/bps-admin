/**
 * 表格的功能操作工具栏
 */
Ext.define('MyApp.ux.GridToolBar', {
    extend: 'Ext.toolbar.Toolbar',

    alias: 'widget.gridtoolbar',

    requires: [
        'MyApp.ux.ButtonTransparent'
    ],

    defaults: {
        xtype: 'buttontransparent'
    },

    collapseExpandButton: true,

    searchBox: false,
    searchStore: null,
    grid: null,
    searchItems: null,
    otherItems: null,

    initComponent: function () {
        var me = this;

        me.items = [];
        Ext.each(me.permissiveOpts, function (button) {
            me.items.push({
                text: button.name,
                iconCls: button.iconCls,
                tooltip: button.description,
                handler: button.target
            });
        });

        if (me.searchBox && me.searchBox == true) {
            if (me.items.length > 0) {
                me.items.push('-');
            }
            me.items.push(
                {
                    xtype: 'buttontransparent',
                    text: '查询',
                    iconCls: 'x-fa fa-search',
                    menu: [{
                        xtype: 'form',
                        // id: 'queryform',
                        buttonAlign: 'center',
                        margin: '15 0 0 -5',
                        reference: 'searchForm',
                        layout: 'anchor',
                        defaults: {
                            anchor: '100%',
                            labelAlign: 'right',
                            margin: '5 15 5 0',
                            allowBlank: true
                        },
                        defaultType: 'textfield',
                        items: [],
                        buttons: [{
                            text: '清除',
                            margin: '5 0 0 5',
                            handler: function () {
                                this.up('form').getForm().reset();
                            }
                        }, {
                            text: '查询',
                            margin: '5 0 0 5',
                            formBind: true, //only enabled once the form is valid
                            disabled: true,
                            handler: function () {
                                var searchStore = me.grid.getStore();
                                if (searchStore) {
                                    searchStore.load();
                                }
                            }
                        }]
                    }]//menu
                }, {
                    xtype: 'buttontransparent',
                    text: '查询全部',
                    iconCls: 'x-fa fa-search',
                    hidden: me.searchAllBtnHidden,
                    handler: function () {
                        var grid = me.grid,
                            searchStore = grid.getStore();
                        me.down('form').getForm().reset();
                        searchStore.load();
                    }
                }
            );
        }

        if (me.otherItems) {
            if (me.items.length > 0) {
                me.items.push('-');
            }
            me.items.push(me.otherItems);
        }

        if (me.items.length > 0) {
            me.items.push('-');
        }
        me.items.push(
            // {
            //     tooltip: '自动调整列宽',
            //     itemId: 'autocolumnwidth',
            //     iconCls: 'x-fa fa-magic',
            //     handler: 'autoColumnWidthButtonClick'
            // }, 
            {
                tooltip: '刷新数据',
                itemId: 'refresh',
                iconCls: 'x-fa fa-sync-alt',
                handler: 'refreshBtnClick'
            }
        );
        if (me.collapseExpandButton) {
            if (me.items.length > 0) {
                me.items.push('-');
            }
            me.items.push(
                {
                    tooltip: '折叠全部',
                    itemId: 'collapse',
                    iconCls: 'x-tool-img x-tool-collapse',
                    handler: 'collapseBtnClick'
                }, {
                    tooltip: '展开全部',
                    itemId: 'expand',
                    iconCls: 'x-tool-img x-tool-expand',
                    handler: 'expandBtnClick'
                }
            );
        }

        var grid = this.grid;
        if (grid == null) {
            this.callParent(arguments);
            return;
        }
        //动态添加搜索框中的搜索项
        var gridStore = grid.getStore();
        grid.on({
            afterrender: {
                fn: function () {
                    var columns = grid.getColumns(),
                        form = grid.down('form');

                    Ext.Array.forEach(columns,
                        function (column) {
                            if (column.searchable && column.searchable === true) {
                                var item;
                                if (column.xtype == 'datecolumn')
                                    item = Ext.create('Ext.form.field.Date', {
                                        format: 'Y-m-d',
                                        fieldLabel: column.text,
                                        name: column.dataIndex
                                    });
                                else
                                    item = Ext.create('Ext.form.field.Text', {
                                        fieldLabel: column.text,
                                        name: column.dataIndex
                                    });
                                form.add(item);
                            }
                        });
                    if (me.searchItems) {
                        Ext.Array.forEach(me.searchItems, function (searchItem) {
                            form.add(searchItem);
                        });
                    }
                }
            }
        });

        this.callParent(arguments);
    }
});