
Ext.define('MyApp.view.authentication.Login', {
    extend: 'MyApp.view.authentication.LockingWindow',
    xtype: 'login',

    id: 'LoginWindow',

    requires: [
        'MyApp.view.authentication.Dialog',
        'Ext.container.Container',
        'Ext.form.field.Text',
        'Ext.form.field.Checkbox',
        'Ext.button.Button'
    ],

    title: I18N.Login,
    defaultFocus: 'authdialog', // Focus the Auth Form to force field focus as well

    items: [
        {
            xtype: 'authdialog',
            id: 'loginForm',
            defaultButton : 'loginButton',
            autoComplete: true,
            bodyPadding: '20 20',
            cls: 'auth-dialog-login',
            header: false,
            width: 415,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },

            defaults : {
                margin : '5 0'
            },

            items: [
                {
                    xtype: 'label',
                    text: I18N.SignIntoYourAccount
                },
                {
                    xtype: 'textfield',
                    cls: 'auth-textbox',
                    name: 'username',
                    bind: '{username}',
                    height: 55,
                    hideLabel: true,
                    allowBlank : false,
                    emptyText: I18N.UserId,
                    triggers: {
                        glyphed: {
                            cls: 'trigger-glyph-noop auth-email-trigger'
                        }
                    }
                },
                {
                    xtype: 'textfield',
                    cls: 'auth-textbox',
                    height: 55,
                    hideLabel: true,
                    emptyText: I18N.Password,
                    inputType: 'password',
                    name: 'password',
                    bind: '{password}',
                    allowBlank : false,
                    triggers: {
                        glyphed: {
                            cls: 'trigger-glyph-noop auth-password-trigger'
                        }
                    }
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'checkboxfield',
                            flex : 1,
                            cls: 'form-panel-font-color rememberMeCheckbox',
                            height: 30,
                            bind: '{persist}',
                            boxLabel: I18N.RememberMe
                        },
                        {
                            xtype: 'box',
                            html: '<a href="#passwordreset" class="link-forgot-password"> Forgot Password ?</a>'
                        }
                    ]
                },
                {
                    xtype: 'button',
                    reference: 'loginButton',
                    scale: 'large',
                    ui: 'soft-green',
                    iconAlign: 'right',
                    iconCls: 'x-fa fa-angle-right',
                    text: I18N.Login,
                    formBind: true,
                    listeners: {
                        click: 'onLoginButton'
                    }
                },{
                    xtype: 'box',
                    bind:{
                        hidden: '{loginErrorMessage ? false:true}',
                        html: '<p style="color:red">{loginErrorMessage}</p>'
                    }
                }
                // ,{
                //     xtype: 'box',
                //     html: '<div class="outer-div"><div class="seperator">OR</div></div>',
                //     margin: '10 0'
                // },
                // {
                //     xtype: 'button',
                //     scale: 'large',
                //     ui: 'facebook',
                //     iconAlign: 'right',
                //     iconCls: 'x-fab fa-facebook',
                //     text: 'Login with Facebook',
                //     listeners: {
                //         click: 'onFaceBookLogin'
                //     }
                // },
                // {
                //     xtype: 'box',
                //     html: '<div class="outer-div"><div class="seperator">OR</div></div>',
                //     margin: '10 0'
                // },
                // {
                //     xtype: 'button',
                //     scale: 'large',
                //     ui: 'gray',
                //     iconAlign: 'right',
                //     iconCls: 'x-fa fa-user-plus',
                //     text: 'Create Account',
                //     listeners: {
                //         click: 'onNewAccount'
                //     }
                // }
            ]
        }
    ],

    initComponent: function() {
        this.addCls('user-login-register-container');
        this.callParent(arguments);
    }
});
