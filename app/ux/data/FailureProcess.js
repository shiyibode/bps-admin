Ext.define('MyApp.ux.data.FailureProcess', {
    singleton: true,

    alternateClassName: 'MyApp.FailureProcess',

    Ajax: function (response, options) {
        var mainView = Ext.getCmp("mainView"),
                    mainViewController = mainView.getController();

        if(response.status == 403){
            // Ext.Msg.alert('错误','您无权限访问此资源');
            Ext.Msg.show({
                title: '错误提示',
                message: '您无权访问此资源',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR,
                fn: function (btn) {
                    if (btn === 'ok') {
                        // mainViewController.redirectTo('blankPage')
                        console.log('修改路由了');
                        window.location.hash = '#login';
                    }
                }
            });
        }
        else if (response.status == 404) {
            Ext.Msg.alert('错误信息', '错误的请求地址.');
        } else if (response.status == 500) {
            // Ext.Msg.alert('错误信息', '服务器内部错误.');
            mainViewController.redirectTo('page500');
        } else {
            if (response.status || !response.responseText) {
                Ext.Msg.alert('错误信息', '访问服务器时出现错误, 服务器可能已关闭!');
            } else {
                Ext.Msg.alert('错误信息', Ext.String.format('错误代码: {0}<br/> 响应: {1}', response.status, response.responseText));
            }
        }
    },

    Proxy: function (proxy, response, options, epots) {
        var status = response.status;
        
        if ((status >= 200 && status < 300) || status == 304) {
            var result = response.responseJson;
            Ext.Msg.show({
                title: '错误提示',
                message: options.error,
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR,
                fn: function (btn) {
                    if (btn === 'ok') {
                        if (result && result.data && result.data.loggedIn === false) {
                            var mainView = Ext.getCmp("mainView");
                            var mainViewController = mainView.getController();
                            mainViewController.setCurrentView('login')
                            // var userInfo = mainView?mainView.getViewModel().get('userInfo'):undefined;
                            // if (userInfo) {
                            //     Ext.create({
                            //         xtype: 'login',
                            //         modal: true,
                            //         userInfo: userInfo
                            //     });
                            // } else {
                            //     mainView.destroy();
                            //     Ext.create({
                            //         xtype: 'login'
                            //     });
                            // }
                        }
                    }
                }
            });
        } 
        else {
                MyApp.FailureProcess.Ajax(response, options);
            }

        
    }
});