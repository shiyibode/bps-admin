Ext.define('MyApp.model.sys.User', {
    extend: 'MyApp.model.BaseDataModel',

    alias: 'model.sysuser',

    entityName: 'sys/user',

    fields: [
        {name: 'userId', type: 'int', critical: true},
        {name: 'userCode', type: 'string'},
        {name: 'userName', type: 'string'},
        {name: 'userEmail', type: 'string'},
        {name: 'userPhone', type: 'string'},
        {name: 'userMobile', type: 'string'},
        {name: 'userType', type: 'string'},
        {name: 'userIdentityNo', type: 'string'},
        {name: 'userBirthday', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'userSex', type: 'string'},
        {name: 'userAddress', type: 'string'},
        {name: 'userEntryDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'userPost', type: 'string'},
        {name: 'userLoginUseable', type: 'boolean', defaultValue: true},
        {name: 'userRemarks', type: 'string'},
        {name: 'userLoginIp', type: 'string'},
        {name: 'userLoginTime', type: 'string'},
        {name: 'userNewLoginPassword', type: 'string'},
        {name: 'userRoleIdList', type: 'auto', defaultValue: []},
        {name: 'organizationId', type: 'int'},
        {name: 'organizationCode', type: 'string'},
        {name: 'organizationName', type: 'string'},
        {name: 'startDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'endDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'userStatus', type: 'string'},
        {name: 'userStatusStr', type: 'string'},
        {name: 'remarks', type: 'string'},
        {name: 'userOrganizationCreateTime', type:'string'},
        {name: 'userOrganizationUpdateTime', type:'string'},
        {name: 'isNewRecord', type: 'boolean', defaultValue: true},
        {name: 'validFlag', type: 'boolean'}
    ],

    validators: {
        organizationId: [{
            type: 'presence', message: '必须选择入职机构'
        }],

        userEntryDate: [{
            type: 'presence', message: '必须选择入职日期'
        }],

        userCode: [{
            type: 'presence', message: '必须填写员工编号或柜员号'
        }, {
            type: 'length', min: 5, max: 18, bothMessage: '编号/柜员号的长度介于6至18之间'
        }],

        userName: [{
            type: 'presence', message: '必须填写姓名'
        }, {
            type: 'length', min: 2, max: 20, bothMessage: '姓名的长度介于4至20之间'
        }],

        userType: [{
            type: 'presence', message: '必须选择类别'
        }],

        userPost: [{
            type: 'presence', message: '必须选择职务/岗位'
        }],

        userStatus: [
            {type:'presence', message: '必须选择履职状态'}
        ]
    }
});