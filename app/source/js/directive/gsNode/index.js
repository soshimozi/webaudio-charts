'use strict';

var angular = require('angular');

 
function GsNode($window, goJs) {
    return {
        require:'^gsDiagram',
        scope: {
            type: '@',
            parameters: '=props',
            key: '@',
            name: '@',
            requestValues: '&'
        },
        link: function(scope, elem, attr, ctrl) {
            
            console.log('link');
            
            scope.$watch('parameters', function() {
            }, true);
            
            // create a new object, extend class with parameters
            var node = {
                key: scope.key,
                type: scope.type,
                name: scope.name
            };
            
            scope.node = angular.extend(node, scope.parameters);
            ctrl.addNode(scope); //angular.extend(node, scope.parameters));
        }
    };
}


GsNode.$inject = ['$window', 'goJs'];

module.exports = GsNode;