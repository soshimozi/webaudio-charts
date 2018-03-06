const angular = require('angular');

const app = angular.module('ngGoDiagramModule', []);

import GoDiagramController from './controllers/goDiagram';

app.controller('goDiagramController', GoDiagramController);
app.directive('ngAudioDiagram', require('./directives/goDiagram'));
app.directive('ngAudioNode', require('./directives/goNode'));



