/**
 * Created by syb on 2021/05/12.
 */
Ext.define('MyApp.model.dktj.EmployeeInterest', {
    extend: 'Ext.data.Model',

    requires: [
        // 'Ext.data.validator.Length',
        // 'Ext.data.validator.Presence'
    ],

    identifier: 'negative',

    idProperty: 'id',

    fields: [
        {name: 'id', type: 'int', allowNull: true},
        {name: 'accountNo', type: 'string'},
        {name: 'xdCustomerNo', type: 'string'},
        {name: 'tellerCode', type: 'string'},
        {name: 'date', type: 'string'},
        {name: 'balance', type: 'float'},
        {name: 'lnOrgCode', type: 'string'},
        {name: 'belongOrgCode', type: 'string'},
        {name: 'accountTemplateId', type: 'int'},
        {name: 'templateId', type: 'int'},
        {name: 'positionId', type: 'int'},
        {name: 'percentage', type: 'float'},
        {name: 'organizationId', type: 'int'},
        {name: 'lnOrgName', type: 'string'},
        {name: 'belongOrgName', type: 'string'},
        {name: 'loanType', type: 'string'},
        {name: 'startDate', type: 'string'},
        {name: 'endDate', type: 'string'},
        {name: 'orgOrEmpType', type: 'string'},
        {name: 'singleDayOrAvgType', type: 'string'},
        {
            name: 'teller',
            convert: function(v, record) {
                return record.get('tellerName') + ' (' + record.get('tellerCode') + ') [' + record.get('belongOrgName') + ' (' + record.get('belongOrgCode') + ')]';
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
                var loanType = record.get('queryType');
                switch (loanType) {
                    case "0":
                        return record.get('lnOrgName') + ' (' + record.get('lnOrgCode') + ')';
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
            }
        }

    ]
});