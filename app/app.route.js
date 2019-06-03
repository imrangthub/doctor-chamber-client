app.config(function ($stateProvider, $urlRouterProvider,  $ocLazyLoadProvider, $compileProvider) {

    $ocLazyLoadProvider.config({
        debug: false,
        serie: true,
        modules: [
            {
                name: 'ui.select',
                files: [
                    'admin-assets/css/select.min.css', 
                    'admin-assets/js/select.min.js'
                ]
            }, 
            {
                name: 'ngSanitize',
                files: [
                    'admin-assets/js/vendor/angular-sanitize.js'
                ]
            }, 
            {
                name: 'angular-sortable-view',
                files: [
                    'admin-assets/js/angular-sortable-view.js'
                ]
            }, 
            {
                name: 'ui.grid',
                files: [
                    'admin-assets/js/vendor/ui-grid.min.css?v=1.1',
                    'admin-assets/js/vendor/ui-grid.min.js?v=1.1'
                ]
            }, 
            {
                name: 'gantt',
                files: [
                    'admin-assets/css/gantt.css?v=1.2',
                    'admin-assets/js/vendor/angular-gantt.js?v=1.2'
                ]
            }, 
            {
                name: 'tinymce',
                files: [
                    'admin-assets/plugins/tinymce/tinymce.min.js'
                ]
            }
        ]
    });

    $urlRouterProvider.otherwise('/error/notfound');

    $stateProvider

            .state('home', {
                url: '/home',
                template: '<doctorchamber-controller></doctorchamber-controller>'
            })

            .state('serviceSection', {
                url: '/serviceSection',
                template: '<servicesection-controller></servicesection-controller>'
            })
            .state('contactSection', {
                url: '/contactSection',
                template: '<contactsection-controller></contactsection-controller>'
            })
            .state('aboutUsSection', {
                url: '/aboutUsSection',
                template: '<aboutsection-controller></aboutsection-controller>'
            })

    
        // .state('home', {
        //     url: '/home',
        //     template: '<home-controller></home-controller>'
        // })
        
        .state('hometwo', {
            url: '/hometwo',
            template: '<hometwo-controller test="$resolve.test"></hometwo-controller>'
        })
        
        .state('homethree', {
            url: '/homethree',
            template: '<homethree-controller></homethree-controller>'
        })
        
         .state('homefour', {
            url: '/homefour',
            template: '<homefour-controller></homefour-controller>'
        })

        .state('homenurse', {
            url: '/homenurse',
            template: '<home-nurse-controller></home-nurse-controller>'
        })

        .state('homenew', {
            url: '/home/:hospitalId/:doctorId/:consultantionId',
            template: '<home-controller></home-controller>'
        })

       .state('homenewtwo', {
            url: '/hometwo/:hospitalId/:doctorId/:consultantionId',
            template: '<hometwo-controller></hometwo-controller>'
        })

        .state('homenewthree', {
            url: '/homethree/:hospitalId/:doctorId/:consultantionId',
            template: '<home3-controller></home3-controller>'
        })
        
        .state('homenewfour', {
            url: '/homefour/:hospitalId/:doctorId/:consultantionId',
            template: '<homeFour-controller></homeFour-controller>'
        })

        .state('homenewnurse', {
            url: '/homenurse/:hospitalId/:doctorId/:consultantionId',
            template: '<home-nurse-controller></home-nurse-controller>'
        })
            
        .state('worklist', {
            url: '/worklist',
            template: '<worklist-controller></worklist-controller>'
        })

        .state('worklistnurse', {
            url: '/worklistnurse',
            template: '<worklist-nurse-controller></worklist-nurse-controller>'
        })

        .state('setup', {
            url: '/setup',
            template: '<setup-controller></setup-controller>'
        })

        .state('setup2', {
            url: '/setup2',
            template: '<setup2-controller></setup2-controller>'
        })

        .state('clinical-history', {
            url: '/setup2/clinical-history',
            template: '<clinical-history-controller></clinical-history-controller>'
        })
        .state('chief-complain', {
            url: '/setup2/chief-complain',
            template: '<chief-complain-controller></chief-complain-controller>'
        })
        .state('diagnosis', {
            url: '/setup2/diagnosis',
            template: '<diagnosis-controller></diagnosis-controller>'
        })    
        .state('drug', {
            url: '/drug',
            template: '<drug-controller></drug-controller>'
        })

        .state('root', {
            url: '',
            template: '<h1>Loading</h1>'
        })
        .state('error', {
            url: '/error/notfound',
            templateUrl: 'app/components/error/error.html'
        })
        .state('login', {
            url: '/login',
            views: {
                '': { templateUrl: 'app/components/login/login.html', controller: 'loginCtroller' }
            }
        })
        .state('logout', {
            url: '/logout',
            views: {
                '': { template:'<h1>Logout</h1>', controller: 'logoutCtroller' }
        }
    });
});
