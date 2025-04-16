
/**
 * create by syb on 2020-06-08
 * 修改用户密码窗口
 */
Ext.define('MyApp.view.sys.widget.UserPasswordUpdateWindow', {
    extend: 'Ext.window.Window',
    xtype: 'update-user-password-window',

    title: I18N.UpdateUserPassword,
    width: 320,
    closable: false,
    items: {
        xtype: 'form',
        bodyPadding: 10,

        defaultType: 'textfield',

        items: [{
            allowBlank: false,
            fieldLabel: I18N.OriginalPassword,
            labelWidth: 80,
            name: 'originalPassword',
            emptyText: I18N.OriginalPassword,
            inputType: 'password',
            msgTarget: 'under'
        }, {
            allowBlank: false,
            fieldLabel: I18N.NewPassword,
            labelWidth: 80,
            name: 'newPassword',
            emptyText: I18N.NewPassword,
            inputType: 'password',
            validator: function(val){
                return (val.length >= 6) ? true: I18N.MinLengthRequirement
            }
        }, {
            allowBlank: false,
            fieldLabel: I18N.ConfirmPassword,
            labelWidth: 80,
            name: 'confirmPassword',
            emptyText: I18N.ConfirmPassword,
            inputType: 'password'
        }],

        buttons: [
            { 
                text: I18N.Cancel,
                handler: function(){
                    var window = this.up('update-user-password-window');
                    window.close();
                }
            },
            { 
                text: I18N.Ok,
                formBind: true,
                handler: function(){
                    
                    var form = this.up('form').getForm(),
                        me = this,
                        originalPassword = form.findField('originalPassword').getValue(),
                        newPassword = form.findField('newPassword').getValue(),
                        confirmPassword = form.findField('confirmPassword').getValue();
                     
                    
                    var data = new Array();
                    data.push({
                        userLoginPassword: originalPassword,
                        userNewLoginPassword: newPassword
                    });  
                    var dataJson = {
                        data: data
                    }  
                    if(newPassword !== confirmPassword){
                        Ext.Msg.alert(I18N.Warning,I18N.NewPasswordNotSame);
                    }   
                    else if(originalPassword === newPassword){
                        Ext.Msg.alert(I18N.Warning, I18N.OriginalPasswordSameAsNewPassword);
                    } 
                    else{
                        if(form.isValid()){
                            Ext.Ajax.request({
                                url: CFG.getGlobalPath()+'/sys/user/updatePassword',
                                method: 'POST',
                                defaultPostHeader: 'application/json;charset=UTF-8',
                                params: Ext.JSON.encode(dataJson),
                                success: function(response){
                                    var text = response.responseText;
                                    var obj = Ext.decode(text, true);
    
                                    if(obj.success === true){
                                        Ext.toast(obj.msg);
                                        var window = me.up('update-user-password-window'); console.log('window'); console.log(window);
                                        window.close();
                                    }
                                    else{
                                        Ext.Msg.alert(I18N.Warning, obj.msg);
                                    }
                                }
                            });
                        }
                        
                    }
                }
            }
        ],

        defaults: {
            anchor: '100%',
            labelWidth: 120
        }
    }
 
});