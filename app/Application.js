/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('MyApp.Application', {
    extend: 'Ext.app.Application',

    name: 'MyApp',

    quickTips: false,
    platformConfig: {
        desktop: {
            quickTips: true
        }
    },
    userInfo:{},
    loggedIn: false,

    views: [
        'MyApp.locale.Locale',
        'MyApp.view.main.Main'
    ],
    launch: function () {

    //     // It's important to note that this type of application could use
    //     // any type of storage, i.e., Cookies, LocalStorage, etc.
    //     var loggedIn;

    //     // Check to see the current value of the localStorage key
    //     loggedIn = localStorage.getItem("TutorialLoggedIn");

    // //     // This ternary operator determines the value of the TutorialLoggedIn key.
    // //     // If TutorialLoggedIn isn't true, we display the login window,
    // //     // otherwise, we display the main view
        var loadingEl = Ext.get('loading');
        if(loadingEl) loadingEl.remove();

    },

    mainView: 'MyApp.view.main.Main',

    onAppUpdate: function () {
        Ext.Msg.show({
            title: I18N.ApplicationUpdate,
            message: I18N.ApplicationUpdateMsg,
            icon: Ext.Msg.WARNING,
            buttons: Ext.Msg.OKCANCEL,
            buttonText: {ok: I18N.Ok, cancel: I18N.Cancel},
            modal: true,
            fn: function (btn) {
                if (btn === 'ok') {
                   window.location.reload();
                } 
            }
        });
    }
});
