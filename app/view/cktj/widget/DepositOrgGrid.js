Ext.define('MyApp.view.cktj.widget.DepositOrgGrid', {
    extend: 'Ext.pivot.Grid',
    alias: 'widget.depositorggrid',

    requires: [
        'MyApp.ux.GridToolBar'
    ],

    reference: 'depositorganizationgrid',

    tools: [{
        type: 'refresh',
        tooltip: '刷新数据',
        handler: 'refreshBtnClick'
    }],

    collapsible: false,

    initComponent: function () {
        var me = this;
        var searchItems = [{
            xtype: 'datefield',
            fieldLabel: '起始日期',
            name: 'startDate',
            // value: Ext.Date.add(new Date(), Ext.Date.MONTH, -1),
            maxValue: Ext.Date.add(new Date(), Ext.Date.DAY, -1),
            format: 'Y-m-d',
            formatText: '年-月-日',
            listeners: {
                change: function(datefield, newValue, oldValue, eOpts) {
                    if (datefield.isValid() && newValue && newValue != oldValue) {
                        var endDate = this.up('form').down('datefield[name=endDate]');

                        var endDateMaxValue = Ext.Date.add(Ext.Date.add(newValue, Ext.Date.MONTH, 12), Ext.Date.DAY, -1);

                        var currDate = Ext.Date.add(new Date, Ext.Date.DAY, -1);

                        if (endDateMaxValue > currDate) {
                            endDateMaxValue = currDate;
                        }
                        endDate.setMaxValue(endDateMaxValue);

                        if (endDate.getValue() && !Ext.Date.between(endDate.getValue(), newValue, endDateMaxValue)) {
                            endDate.setValue(endDateMaxValue);
                        }
                    }
                }
            }
        },{
            xtype: 'datefield',
            fieldLabel: '终止日期',
            name: 'endDate',
            maxValue: Ext.Date.add(new Date(), Ext.Date.DAY, -1),
            format: 'Y-m-d',
            formatText: '年-月-日'
        }, {
            fieldLabel: '存款机构',
            name: 'dpOrgCode'
        }];

        switch (me.moduleId) {
            //机构时点
            case 'orgtask':
                searchItems.push({
                    xtype: 'combo',
                    reference: 'depositTypeCombo',
                    fieldLabel: '存款类型',
                    displayField: 'text',
                    valueField: 'id',
                    editable: false,
                    name: 'depositType',
                    queryMode: 'local',
                    bind: {
                        store: '{orgDepositTypeStore}',
                    },
                    listConfig: {
                        itemTpl: [
                            '<div data-qtip="{text}: {tips}">{text}</div>'
                        ]
                    }
                });
                break;
            //机构时点
            case 'orgavgtask':
                searchItems.push({
                    xtype: 'combo',
                    reference: 'depositTypeCombo',
                    fieldLabel: '存款类型',
                    displayField: 'text',
                    valueField: 'id',
                    editable: false,
                    name: 'depositType',
                    queryMode: 'local',
                    bind: {
                        store: '{orgDepositTypeStore}',
                    },
                    listConfig: {
                        itemTpl: [
                            '<div data-qtip="{text}: {tips}">{text}</div>'
                        ]
                    }
                });
                break;
        }

        //表格顶部工具栏
        me.dockedItems = [];
        me.dockedItems.push({
            xtype: 'gridtoolbar',
            dock: 'top',
            collapseExpandButton: true,
            searchBox: true,
            grid: this,
            searchItems: searchItems,
            searchAllBtnHidden: true
        });

        me.callParent(arguments);
    },


afterRender: function(){
        var me = this;
        var uri;
        switch (me.moduleId) {
            //机构时点
            case 'orgtask':
                uri = 'orgDepositTask'
                break;
            case 'orgavgtask':
                uri = 'orgDepositAvgTask'
                break;
        }
        Ext.Msg.wait(I18N.GetRoleInfo);
        Ext.Ajax.request({
            url: CFG.getGlobalPath() + '/sys/menu/currentUser/currentMenuPermission',
            method: 'POST',
            params: {
                uri: '/cktj/deposit/' + uri
            },
            success: function(response, opts) {
                Ext.Msg.hide();
                var obj = Ext.decode(response.responseText, true);
                
                if(obj.success == false && obj.code ==='401'){
                    window.location.href='/#lockscreen';
                    return;
                }
                
                if(obj.data){
                    permissiveOpts = obj.data;
                    
                    for(var i=0;i<permissiveOpts.length;i++){
                        var button = permissiveOpts[i];
                        var btn = Ext.widget('buttontransparent',{
                            text: button.text,
                            iconCls: button.iconCls,
                            handler: button.viewType,
                            tooltip: button.description
                        });
                        me.down('gridtoolbar').add(btn);
                    }
                }
                Ext.Msg.hide();
            },
            failure: FAILED.ajax,
            scope: me
        });

        me.callParent(arguments);
    }

});