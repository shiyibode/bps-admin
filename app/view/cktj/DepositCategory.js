
Ext.define('MyApp.view.cktj.DepositCategory',{
    extend: 'Ext.panel.Panel',
    xtype: 'cktjdepositcategory',

    requires: [
        // 'MyApp.view.cktj.widget.DepositCategoryWindow',
        'MyApp.view.cktj.widget.DepositCategoryGrid'
    ],

    controller: 'cktjdepositcategory',
    viewModel: {
        type: 'cktjdepositcategory'
    },

    width: 500,
    height: 700,
    layout : 'border',

    initComponent: function() {
        var me = this;

        me.items = [];
        me.items.push({
            region : 'center',
            xtype : 'depositcategorygrid',
            bind: {
                title: '存款分类' + '{selectionText}'
            },
            permissiveOpts: me.permissiveOpts
        }
        // ,{
        //     //DepositCategory 添加、修改、查看对话框
        //     xtype: 'depositcategorywindow'
        // }
        );

        this.callParent(arguments);
    }
});
