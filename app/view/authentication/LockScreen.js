Ext.define('MyApp.view.authentication.LockScreen', {
    extend: 'MyApp.view.authentication.LockingWindow',
    xtype: 'lockscreen',

    requires: [
        'MyApp.view.authentication.Dialog',
        'Ext.button.Button',
        'Ext.container.Container',
        'Ext.form.field.Text',
        'Ext.layout.container.HBox',
        'Ext.layout.container.VBox'
    ],

    title: I18N.SessionExpired,

    defaultFocus : 'authdialog',  // Focus the Auth Form to force field focus as well

    listeners:{
        show: {
            fn: function(){
                var viewModel = this.getViewModel();
                var mainView = Ext.getCmp('mainView'),
                    mainViewModel = mainView.getViewModel();
                viewModel.set('userCode', mainViewModel.get('currentUserCode'));
                viewModel.set('userName', mainViewModel.get('currentUserName'));    
                var lockScreenUsername = Ext.getCmp('lock-screen-username');
                var html = '<div class=\'user-name-text\'> '+ mainViewModel.get('currentUserName') + '</div><div class=\'user-post-text\'>' + I18N.UserId + ':'  + mainViewModel.get('currentUserCode') +'</div>'
                lockScreenUsername.update(html);
            }
        }
    },

    items: [
        {
            xtype: 'authdialog',
            reference: 'authDialog',
            defaultButton : 'loginButton',
            autoComplete: false,
            width: 455,
            cls: 'auth-dialog-login',
            defaultFocus : 'textfield[inputType=password]',
            layout: {
                type  : 'vbox',
                align : 'stretch'
            },

            items: [
                {
                    xtype: 'container',
                    cls: 'auth-profile-wrap',
                    height : 120,
                    layout: {
                        type: 'hbox',
                        align: 'center'
                    },
                    items: [
                        {
                            xtype: 'image',
                            height: 80,
                            margin: 20,
                            width: 80,
                            alt: 'lockscreen-image',
                            cls: 'lockscreen-profile-img auth-profile-img',
                            src: 'resources/images/user-profile/2.png'
                        },
                        {
                            xtype: 'box',
                            id: 'lock-screen-username',
                            // bind:{
                            // html: '<div class=\'user-name-text\'> {userName} </div><div class=\'user-post-text\'> 工号: {userCode} </div>'
                            html: ''
                            // }
                        }
                    ]
                },

                {
                    xtype: 'container',
                    padding: '0 20',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },

                    defaults: {
                        margin: '10 0'
                    },

                    items: [
                        {
                            xtype: 'textfield',
                            reference: 'lock-screen-password',
                            labelAlign: 'top',
                            cls: 'lock-screen-password-textbox',
                            labelSeparator: '',
                            fieldLabel: I18N.ResumeWarning,
                            emptyText: I18N.Password,
                            inputType: 'password',
                            allowBlank: false,
                            triggers: {
                                glyphed: {
                                    cls: 'trigger-glyph-noop password-trigger'
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            reference: 'loginButton',
                            scale: 'large',
                            ui: 'soft-blue',
                            iconAlign: 'right',
                            iconCls: 'x-fa fa-angle-right',
                            text: I18N.Login,
                            formBind: true,
                            listeners: {
                                click: 'onLockScreenLoginButton'
                            }
                        },
                        {
                            xtype: 'component',
                            html: '<div style="text-align:right">' +
                                '<a href="/" class="link-forgot-password">'+
                                    I18N.UserAnotherAccountToLogin +
                                '</div>'    
                        }
                    ]
                }
            ]
        }
    ]
});
