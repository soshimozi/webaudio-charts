const angular = require('angular');

require('angular-ui-bootstrap');
require('jquery/dist/jquery');

import '../../node_modules/bootstrap/dist/css/bootstrap';
import '../../node_modules/bootstrap/dist/css/bootstrap-theme';
import '../../node_modules/font-awesome/css/font-awesome.css';
import './styles/app.less';

const app = angular.module('angularjs-webpack-template-app', [
    'ui.bootstrap'
]);
