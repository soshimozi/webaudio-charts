const angular = require('angular');

const ngGoNodeDirective = function ($window, goJs) {
    return {
        require:'^goDiagram',
        scope: {
            type: '@',
            parameters: '=props',
            key: '@',
            name: '@',
            requestValues: '&'
        },
        link: function(scope, elem, attr, ctrl) {
            
            console.log('link');
            
            // create a new object, extend class with parameters
            let node = {
                key: scope.key,
                type: scope.type,
                name: scope.name
            };
            
            scope.$watch('parameters', function() {
                // update node here
            }, true);

            scope.node = node = angular.extend(node, scope.parameters);
            ctrl.addNode(node); //angular.extend(node, scope.parameters));
        }
    };     
};

ngGoNodeDirective.$inject = ['$window', 'goJs'];
module.exports = ngGoNodeDirective;