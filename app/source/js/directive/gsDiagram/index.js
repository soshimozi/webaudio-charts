'use strict';
 
function GoDiagram($window, goJsTemplate, viewUrl, goJs) {
    
    return {
        restrict: 'E',
        scope: {
            gridHeight: '@',
            gridWidth: '@',
            showGrid: '@',
            height: '@',
            width: '@',
            options: '='
        },
        transclude: true,
        templateUrl: viewUrl('/partial/template/gsDiagram/index.html'),
        replace: true,
        controller: 'GoDiagramController',
        link: function(scope, elem, attrs, ctrl) {
            console.log('goDiagram - link');
        }
    };
}

// love our dependency injection and we are now safe from obfuscation
GoDiagram.$inject = ['$window', 'goJsTemplate', 'viewUrl', 'goJs'];

module.exports = GoDiagram;
