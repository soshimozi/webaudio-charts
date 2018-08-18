import '../node_modules/font-awesome/css/font-awesome.css';
import './styles/main.less';

import 'bootstrap';
import 'angular-route';
import 'angular-ui-bootstrap';
import 'underscore';

import './modules/ngGoDiagram';

const app = angular.module('webaudio-charts-app', [
    'ngRoute',
    'ui.bootstrap',
    'ngGoDiagramModule'
]);

import HomeController from './controllers/home-controller';
app.controller('HomeController', HomeController);

app.config(['$routeProvider', '$locationProvider', '$httpProvider', ($routeProvider, $locationProvider) => {
    
    $routeProvider
        .when('/', {
            template: require('./views/home.html'),
            controller: 'HomeController',
            controllerAs: 'vm',
            label: 'Home',
            scopes: []
        })
        .otherwise({ redirectTo: '/' });

    $locationProvider.hashPrefix('');
    $locationProvider.html5Mode(true);
}]);
