Ext.define('MyApp.view.authentication.AuthenticationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.authentication',

    //TODO: implement central Facebook OATH handling here

    onFaceBookLogin : function() {
        this.redirectTo('dashboard', true);
    },

    onLoginButton: function() {
        
        var me = this,
            navigationTree = Ext.ComponentQuery.query('#navigationTreeList');
        if(navigationTree.length != 1) return; //未查找到唯一组件

        Ext.Ajax.request({
            url: CFG.getGlobalPath()+'/login',
            method: 'POST',
            form: 'loginForm',
            success: function(response, opts) {
                var refs = me.getReferences(),
                    store = navigationTree[0].getStore(),
                    root = store.getRoot(),
                    viewModel = me.getViewModel(),
                    obj = Ext.decode(response.responseText, true),
                    hash, node, parentNode, roles;

                if(obj.success){
                    var mainView = Ext.getCmp("mainView"),
                    mainViewModel = mainView.getViewModel();
                    mainViewController = mainView.getController();
                    mainViewController.isLogin = true;    

                    if(obj.data){
                        viewModel.set('userInfo',obj.data.userInfo);
                        viewModel.set('loginErrorMessage',null);
                        viewModel.set('userName',obj.data.userInfo.name); 
                        viewModel.set('userCode',obj.data.userInfo.code); 
                        mainViewModel.set('currentUserCode', obj.data.userInfo.code);
                        mainViewModel.set('currentUserName', obj.data.userInfo.name);
                        if(obj.data.userInfo && obj.data.userInfo.userMenuList && obj.data.userInfo.userMenuList[0].children){
                            root.appendChild(obj.data.userInfo.userMenuList[0].children)
                        }
                    }

                    me.redirectTo('blankpage', true);
                }
                else{
                    viewModel.set('loginErrorMessage',obj.msg);
                }
            },
            failure: FAILED.ajax,
            scope: me
        });

    },


    onLockScreenLoginButton: function(){
        var ref = this.lookupReference('lock-screen-password'),
            passwd = ref.getValue(),
            viewModel = ref.up('lockscreen').getViewModel(),
            userCode = viewModel.get('userCode'),
            me = this;
        
        if(passwd === undefined || passwd === '' || userCode === undefined || userCode === ''){
            Ext.Msg.alert('警告','用户名或密码为空');
        }
        else{
            Ext.Ajax.request({
                url: CFG.getGlobalPath()+'/sys/login',
                params: {
                    username: userCode,
                    password: passwd
                },
                success: function(response){
                    var text = response.responseText;
                    var obj = Ext.decode(text, true);

                    if(obj.success === true && obj.data && obj.data.loggedIn === true){
                        Ext.util.History.back();
                    }
                }
            });
        }    
    },



    onLoginAsButton: function() {
        this.redirectTo('login', true);
    },

    onNewAccount:  function() {
        this.redirectTo('register', true);
    },

    onSignupClick:  function() {
        this.redirectTo('dashboard', true);
    },

    onResetClick:  function() {
        this.redirectTo('dashboard', true);
    }
});