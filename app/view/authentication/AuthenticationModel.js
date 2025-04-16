Ext.define('MyApp.view.authentication.AuthenticationModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.authentication',

    data: {
        // username : '',
        fullName : '',
        password : '',
        email    : '',
        persist: false,
        agrees : false,
        userInfo: {},
        loginErrorMessage: null,
        userName: '',
        userCode: ''
    }
});