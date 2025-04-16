
Ext.define('MyApp.model.cktj.Deposit', {
    extend: 'Ext.data.Model',

    identifier: 'negative',

    idProperty: 'id',

    fields: [
        {name: 'id', type: 'int'},
        {name: 'tellerCode', type: 'string'},
        {name: 'tellerName', type: 'string'},
        {name: 'tellerOrgCode', type: 'string'},
        {name: 'tellerOrgName', type: 'string'},
        {name: 'dpOrgCode', type: 'string'},
        {name: 'dpOrgName', type: 'string'},
        {name: 'belongOrgCode', type: 'string'},
        {name: 'dpCategoryId', type: 'int'},
        {name: 'parentCategoryNname', type: 'string'},
        {name: 'dpCategoryNo', type: 'string'},
        {name: 'dpCategoryName', type: 'string'},
        {name: 'balance', type: 'float'},
        {name: 'prvisnInt', type: 'float', defaultValue: null},
        {name: 'ttlPayInt', type: 'float', defaultValue: null},
        {name: 'dayPayInt', type: 'float', defaultValue: null},
        {name: 'dpType', type: 'int', defaultValue: 0},
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
        }, {
            name: 'dpOrg',
            convert: function(v, record) {
                var dptype = record.get('dpType');
                switch (dptype) {
                    case 0:
                        return record.get('dpOrgName') + ' (' + record.get('dpOrgCode') + ')';
                    case 1:
                        return record.get('dpOrgName') + ' (' + record.get('dpOrgCode') + ')';
                    case 2:
                        return record.get('belongOrgName') + ' (' + record.get('belongOrgCode') + ')';
                }
            }
        }, {
            name: 'dpOrg2',
            convert: function(v, record) {
                var dptype = record.get('dpType');
                switch (dptype) {
                    case 0:
                        return record.get('dpOrgName') + ' (' + record.get('dpOrgCode') + ')';
                    case 1:
                        return record.get('belongOrgName') + ' (' + record.get('belongOrgCode') + ')';
                    case 2:
                        return record.get('dpOrgName') + ' (' + record.get('dpOrgCode') + ')';
                }
            }
        }, {
            name: 'dpTypeName',
            convert: function(v, record) {
                var value = record.get('dpType');
                switch (value) {
                    case 0:
                        return '核心存款';
                    case 1:
                        return '调离存款';
                    case 2:
                        return '调入存款';
                }
                return '未定义';
            }
        }
    ]
});