'use strict';
var app = require('angular').module('angular-application');

app.directive('gsDiagram', require('./gsDiagram'));
app.directive('gsNode', require('./gsNode'));