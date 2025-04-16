/**
 * 系统启动时预先加载的一些定义都放在此处
 */
Ext.onReady(function () {
    // console.log('Ext onReady 加载完成......');

    // panel中的这二个字符串，没有汉化
    Ext.define("Ext.locale.zh_CN.panel.Panel", {
        override: "Ext.panel.Panel",
        closeToolText: '关闭面板',
        collapseToolText: '折叠面板',
        expandToolText: '展开面板'
    });

    Ext.toastInfo = function (text, config) {
        var param = {
            title: '提示信息',
            html: text,

            border: true,
            // style : {
            // borderColor : '#9b95c9'
            // },
            saveDelay: 10,
            align: 'tr', // "br"/"bl"/"tr"/"tl"/"t"/"l"/"b"/"r"
            closable: true,
            width: 200,
            useXAxis: false,

            slideInDuration: 800,
            slideBackDuration: 1500,
            iconCls: 'ux-notification-icon-smile',
            autoCloseDelay: 4000,
            slideInAnimation: 'elasticIn',
            slideBackAnimation: 'elasticIn'
        };
        Ext.apply(param, config);
        Ext.toast(param);
    };

    Ext.toastWarn = function (text, config) {
        var param = {
            title: '警告信息',
            html: text,
            border: true,
            // style : {
            // borderColor : '#9b95c9'
            // },
            // header : {
            // style : 'background-color : yellow;'
            // },
            saveDelay: 10,
            align: 'tr', // "br"/"bl"/"tr"/"tl"/"t"/"l"/"b"/"r"
            closable: true,
            width: 200,
            useXAxis: false,

            slideInDuration: 800,
            slideBackDuration: 1500,
            iconCls: 'ux-notification-icon-warn',
            autoCloseDelay: 4000,
            slideInAnimation: 'elasticIn',
            slideBackAnimation: 'elasticIn'

        };
        Ext.apply(param, config);
        Ext.toast(param);
    };

    Ext.toastErrorInfo = function (text, config) {
        var param = {
            title: '错误信息',
            html: text,
            header: {
                border: 1,
                style: {
                    borderColor: 'red'
                }
            },
            border: true,
            style: {
                borderColor: 'red'
            },
            saveDelay: 10,
            align: 'tr', // "br"/"bl"/"tr"/"tl"/"t"/"l"/"b"/"r"
            closable: true,
            width: 200,
            useXAxis: false,

            slideInDuration: 800,
            slideBackDuration: 1500,
            iconCls: 'ux-notification-icon-error',
            autoCloseDelay: 5000,
            slideInAnimation: 'elasticIn',
            slideBackAnimation: 'elasticIn'

        };
        Ext.apply(param, config);
        Ext.toast(param);
    };

    Ext.alertError = function (title, msg) {
        Ext.Msg.show({
            title: title,
            message: msg,
            buttons: Ext.Msg.OK,
            icon: Ext.Msg.ERROR
        });
    };

    Ext.alertInfo = function (title, msg) {
        Ext.Msg.show({
            title: title,
            message: msg,
            buttons: Ext.Msg.OK,
            icon: Ext.Msg.INFO
        });
    };
});