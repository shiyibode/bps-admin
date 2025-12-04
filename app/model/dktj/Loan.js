/**
 * Created by syb on 2019/11/07.
 */
Ext.define('MyApp.model.dktj.Loan', {
    extend: 'Ext.data.Model',

    requires: [
        // 'Ext.data.validator.Length',
        // 'Ext.data.validator.Presence'
    ],

    identifier: 'negative',

    idProperty: 'id',

    fields: [
        {name: 'id', type: 'int', allowNull: true},
        {name: 'tellerCode', type: 'string'},
        {name: 'tellerName', type: 'string'},
        {name: 'tellerOrgCode', type: 'string'},
        {name: 'tellerOrgName', type: 'string'},
        {name: 'lnOrgCode', type: 'string'},
        {name: 'lnOrgName', type: 'string'},
        {name: 'belongOrgCode', type: 'string'},
        {name: 'belongOrgName', type: 'string'},
        {name: 'fourClassFlag', type: 'string'},
        {name: 'fiveClassFlag', type: 'string'},
        {name: 'balance', type: 'float'},
        {name: 'prvisnInt', type: 'float', defaultValue: null},
        {name: 'ttlReceivedInt', type: 'float', defaultValue: null},
        {name: 'dayReceivedInt', type: 'float', defaultValue: null},
        {name: 'loanType', type: 'string', defaultValue: "0"},
        {
            name: 'fourClassFlagName',
            convert: function (v, record) {
                switch (record.get('fourClassFlag')) {
                    case '01': return '正常';
                    case '02': return '逾期';
                    case '03': return '呆滞';
                    case '04': return '呆账';
                }
            }
        },
        {
            name: 'fiveClassFlagName',
            convert: function (v, record) {
                switch (record.get('fiveClassFlag')) {
                    case '0000': return '未分类';
                    case '0001': return '正常';
                    case '0002': return '关注';
                    case '0003': return '次级';
                    case '0004': return '可疑';
                    case '0005': return '损失';
                }
            }
        },
        {
            name: 'teller',
            convert: function(v, record) {
                return record.get('tellerName') + ' (' + record.get('tellerCode') + ') [' + record.get('tellerOrgName') + ' (' + record.get('tellerOrgCode') + ')]';
            }
        }, {
            name: 'date',
            convert: function(v, record) {
                var date = record.get('date');
                if (date && date != '') {
                    return date;
                }

                return record.get('startDate') + ' 至 ' + record.get('endDate') + ' (' + record.get('avgDays') + '天)';
            }
        }
        , {
            name: 'lnOrg',
            convert: function(v, record) {
                var loanType = record.get('loanType');
                switch (loanType) {
                    case "0":
                        return record.get('lnOrgName') + ' (' + record.get('lnOrgCode') + ')';
                    // case "1":
                    //     return record.get('belongOrgName') + ' (' + record.get('belongOrgCode') + ')';
                    case "1":
                        return record.get('lnOrgName') + ' (' + record.get('lnOrgCode') + ')';
                    case "2":
                        return record.get('belongOrgName') + ' (' + record.get('belongOrgCode') + ')';
                    case "3":
                        return record.get('lnOrgName') + ' (' + record.get('lnOrgCode') + ')';
                }
            }
        }, {
            name: 'lnOrg2',
            convert: function(v, record) {
                return record.get('lnOrgName') + ' (' + record.get('lnOrgCode') + ')';
                // var loanType = record.get('loanType');
                // switch (loanType) {
                //     case 0:
                //         return record.get('dpOrgName') + ' (' + record.get('dpOrgCode') + ')';
                //     case 1:
                //         return record.get('belongOrgName') + ' (' + record.get('belongOrgCode') + ')';
                //     case 2:
                //         return record.get('dpOrgName') + ' (' + record.get('dpOrgCode') + ')';
                // }
            }
        }
        // , {
        //     name: 'loanTypeName',
        //     convert: function(v, record) {
        //         var value = record.get('loanType');
        //         switch (value) {
        //             case 0:
        //                 return '核心存款';
        //             case 1:
        //                 return '调离存款';
        //             case 2:
        //                 return '调入存款';
        //         }
        //         return '未定义';
        //     }
        // }
    ]
});