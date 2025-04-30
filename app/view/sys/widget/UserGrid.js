Ext.define('MyApp.view.sys.widget.UserGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.usergrid',

    requires: [
        'Ext.toolbar.Paging',
        'MyApp.ux.GridToolBar',
        'Ext.toolbar.Paging'
    ],

    reference: 'usergrid',

    bind: {
        store: '{userStore}'
    },

    columnLines: true,

    bbar: {
        xtype: 'pagingtoolbar',
        reference: 'usergridpagingtoolbar',
        bind: {
            store: '{userStore}'
        },
        displayInfo: true,
        emptyMsg: "没有需要显示的数据",
        plugins: [ 'progressbarpager' ]
    },

    columns: {
        defaults: {
            flex: 1,
            align: 'left'
        },
        items: [{
            xtype: 'rownumberer',
            flex: 0,
            align: 'center'
        }, {
            text: '用户信息',
            flex: 2,
            columns: [{
                text: '编号/柜员号',
                dataIndex: 'code',
                searchable: true,
                flex: 1
            }, {
                text: '姓名',
                dataIndex: 'name',
                searchable: true,
                flex: 1
            }, {
                text: '性别',
                dataIndex: 'sex',
                flex: 1
            }, {
                text: '入职日期',
                dataIndex: 'entryDate',
                formatter: 'date("Y-m-d")',
                flex: 1
            }, {
                text: '职务',
                dataIndex: 'postStr',
                flex: 1
            }, {
                text: '状态',
                dataIndex: 'statusStr',
                flex: 1
            }, {
                text: '身份证号',
                dataIndex: 'identityNo',
                flex: 1
            }, {
                text: '出生日期',
                dataIndex: 'birthday',
                formatter: 'date("Y-m-d")',
                flex: 1
            }, {
                text: '手机号码',
                dataIndex: 'mobile',
                flex: 1
            }, {
                text: '家庭住址',
                dataIndex: 'address',
                flex: 1
            }, {
                text: '创建时间',
                dataIndex: 'createTime',
                flex: 1
            }, {
                text: '更新时间',
                dataIndex: 'updateTime',
                flex: 1
            }]
        }, {
            text: '机构信息',
            flex: 2,
            columns: [{
                text: '机构编号',
                dataIndex: 'organizationCode',
                flex: 1
            }, {
                text: '机构名称',
                dataIndex: 'organizationName',
                flex: 1
            },{
                text: '所在机构状态',
                dataIndex: 'validFlag',
                flex: 1,
                renderer: function(value){
                    if(value == false) return '调离';
                    else return '在职';
                }
            }, {
                text: '调入日期',
                dataIndex: 'organizationStartDate',
                formatter: 'date("Y-m-d")',
                flex: 1
            }, {
                text: '调离日期',
                dataIndex: 'organizationEndDate',
                formatter: 'date("Y-m-d")',
                flex: 1
            }, {
                text: '创建时间',
                dataIndex: 'userOrganizationCreateTime',
                flex: 1
            }, {
                text: '更新时间',
                dataIndex: 'userOrganizationUpdateTime',
                flex: 1
            }]
        }, {
            text: '登录信息',
            columns: [{
                xtype: 'booleancolumn',
                text: '允许登录',
                trueText: '是',
                falseText: '否',
                dataIndex: 'userLoginUseable',
                flex: 1
            }, {
                text: '登录IP',
                dataIndex: 'userLoginIP',
                flex: 1
            }, {
                text: '登录时间',
                dataIndex: 'userLoginTime',
                flex: 1
            }]
        }]
    },

    initComponent: function () {
        var me = this;

        //表格顶部工具栏
        me.dockedItems = [];
        me.dockedItems.push({
            xtype: 'gridtoolbar',
            dock: 'top',
            searchBox: true,
            grid: this,
            collapseExpandButton: false,
            permissiveOpts: []
        });

        me.callParent(arguments);
    },

    afterRender: function(){
        var me = this;
        Ext.Msg.wait(I18N.GetRoleInfo);
        Ext.Ajax.request({
            url: CFG.getGlobalPath() + '/sys/menu/currentUser/currentMenuPermission',
            method: 'POST',
            params: {
                uri: '/sys/user'
            },
            success: function(response, opts) {
                Ext.Msg.hide();
                var obj = Ext.decode(response.responseText, true);
                
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