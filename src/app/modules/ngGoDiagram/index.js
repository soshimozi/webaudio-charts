const angular = require('angular');

const app = angular.module('ngGoDiagramModule', []);

import GoDiagramController from './controllers/goDiagram';

app.controller('GoDiagramController', GoDiagramController);
app.directive('ngAudioDiagram', require('./directives/goDiagram'));
app.directive('ngAudioNode', require('./directives/goNode'));
app.provider('goJsTemplate', require('./providers/goJsTemplate'));


