Ext.define('MyApp.store.NavigationTree', {
    extend: 'Ext.data.TreeStore',

    alias: 'store.navigationtree',

    storeId: 'NavigationTree',

    fields: [{
        name: 'text'
    }],

    root: {
        expanded: true,
        children: [
            {
                text: 'BlankPage',
                iconCls: 'x-fa fa-desktop',
                viewType: 'blankpage',
                routeId: 'blankpage',
                leaf: true,
                visible: false
            },
            {
                text: 'Page404',
                iconCls: 'x-fa fa-desktop',
                viewType: 'page404',
                routeId: 'page404',
                leaf: true,
                visible: false
            },
            {
                text: 'Page500',
                iconCls: 'x-fa fa-desktop',
                viewType: 'page500',
                routeId: 'page500',
                leaf: true,
                visible: false
            },
            {
                text: 'Login',
                iconCls: 'x-fa fa-check',
                viewType: 'login',
                leaf: true,
                visible: false
            }
        //     {
        //         text: 'Dashboard',
        //         iconCls: 'x-fa fa-desktop',
        //         rowCls: 'nav-tree-badge nav-tree-badge-new',
        //         viewType: 'admindashboard',
        //         routeId: 'dashboard', // routeId defaults to viewType
        //         leaf: true
        //     },
        //     {
        //         text: 'Email',
        //         iconCls: 'x-fa fa-paper-plane',
        //         rowCls: 'nav-tree-badge nav-tree-badge-hot',
        //         viewType: 'email',
        //         leaf: true
        //     },
        //     {
        //         text: 'Profile',
        //         iconCls: 'x-fa fa-user',
        //         viewType: 'profile',
        //         leaf: true
        //     },
        //     {
        //         text: 'Search results',
        //         iconCls: 'x-fa fa-search',
        //         viewType: 'searchresults',
        //         leaf: true
        //     },
        //     {
        //         text: 'FAQ',
        //         iconCls: 'x-fa fa-question',
        //         viewType: 'faq',
        //         leaf: true
        //     },
        //     {
        //         text: 'Pages',
        //         iconCls: 'x-fab fa-leanpub',
        //         expanded: false,
        //         selectable: false,
        //         //routeId: 'pages-parent',
        //         //id: 'pages-parent',

        //         children: [
        //             {
        //                 text: 'Blank Page',
        //                 iconCls: 'x-fa fa-file',
        //                 viewType: 'pageblank',
        //                 leaf: true
        //             },

        //             {
        //                 text: '404 Error',
        //                 iconCls: 'x-fa fa-exclamation-triangle',
        //                 viewType: 'page404',
        //                 leaf: true
        //             },
        //             {
        //                 text: '500 Error',
        //                 iconCls: 'x-fa fa-times-circle',
        //                 viewType: 'page500',
        //                 leaf: true
        //             },
                    ,{
                        text: 'Lock Screen',
                        iconCls: 'x-fa fa-lock',
                        viewType: 'lockscreen',
                        leaf: true,
                        visible: false
                    }

        //             {
        //                 text: 'Login',
        //                 iconCls: 'x-fa fa-check',
        //                 viewType: 'login',
        //                 leaf: true
        //             },
        //             {
        //                 text: 'Register',
        //                 iconCls: 'x-fa fa-edit',
        //                 viewType: 'register',
        //                 leaf: true
        //             },
        //             {
        //                 text: 'Password Reset',
        //                 iconCls: 'x-fa fa-lightbulb',
        //                 viewType: 'passwordreset',
        //                 leaf: true
        //             }
        //         ]
        //     },
        //     {
        //         text: 'Widgets',
        //         iconCls: 'x-fa fa-flask',
        //         viewType: 'widgets',
        //         leaf: true
        //     },
        //     {
        //         text: 'Forms',
        //         iconCls: 'x-fa fa-edit',
        //         viewType: 'forms',
        //         leaf: true
        //     },
        //     {
        //         text: 'Charts',
        //         iconCls: 'x-fa fa-chart-pie',
        //         viewType: 'charts',
        //         leaf: true
        //     }
        ]
    }
});
