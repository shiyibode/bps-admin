/**
 * 标准化数据传输,实现前/后台数据传输的统一
 */
Ext.define('MyApp.ux.data.proxy.Format', {
    extend: 'Ext.data.proxy.Ajax',

    alias: 'proxy.format',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json',
        'Ext.data.writer.Json',
        'MyApp.ux.data.FailureProcess'
    ],

    paramsAsJson: true,
    actionMethods: {
        read: 'POST',
        create: 'POST',
        update: 'POST',
        destroy: 'POST'
    },

    reader: {
        type: 'json',
        rootProperty: function (data) {  //服务器端返回的数据中,可获取返回的记录的属性
            return data.data || data.children;
        },
        successProperty: 'success',
        messageProperty: 'msg', //服务器端返回的数据中,可获取到响应信息的属性
        totalProperty: 'total'  //服务器端返回的数据中,可获取到记录总数的属性
    },

    writer: {
        type: 'json',
        encode: false,
        rootProperty: 'data',   //设置encode为true时,服务器端使用哪个变量名来获取数据
        allowSingle: false     //不允许提交单个记录,统一以数组的形式提交到服务器,
    },


    //写入到服务器的json
    // writer:{
    //     type: 'json',
    //     allowSingle: false,
    //     //转换
    //     transform: {
    //         fn: function(data, request) {
    //             if (!Array.isArray(data)) {
    //                 var arrayData = new Array();
    //                 arrayData.push(data);
    //                 return arrayData;
    //             }
    //             return data;
    //         },
    //         scope: this
    //     }
    // },

    listeners: {
        exception: function (proxy, response, operation, eOpts ) {
            MyApp.FailureProcess.Proxy.apply(this, arguments);
        }
    }
});