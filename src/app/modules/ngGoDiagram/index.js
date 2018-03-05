const angular = require('angular');

const app = angular.module('ngGoDiagramModule', []);

let GoDiagramController = import './controllers/goDiagram';

app.controller('goDiagramController', GoDiagramController);
app.directive('ngAudioDiagram', require('./directives/goDiagram'));
app.directive('ngAudioNode', require('./directives/goNode'));
