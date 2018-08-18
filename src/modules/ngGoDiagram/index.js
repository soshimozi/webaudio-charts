const angular = require('angular');

const app = angular.module('ngGoDiagramModule', []);

import GoDiagramController from './controllers/go-diagram';

app.controller('GoDiagramController', GoDiagramController);
app.directive('ngAudioDiagram', require('./directives/go-diagram'));
app.directive('ngAudioNode', require('./directives/go-node'));
app.provider('goJsTemplate', require('./providers/goJsTemplate'));


import goJs from 'gojs';

app.service('goJs', () => {
    return {
        library: goJs
    }
});