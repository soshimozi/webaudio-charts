const ngGoDiagramDirective = function ($window, goJsTemplate, viewUrl, goJs) {
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
        template: require('../views/goDiagram'),
        replace: true,
        controller: 'GoDiagramController',
        link: function(scope, elem, attrs, ctrl) {
            console.log('goDiagram - link');
        }
    };       
};

ngGoDiagramDirective.$inject = ['$window', 'goJsTemplate', 'viewUrl', 'goJs'];
module.exports = ngGoDiagramDirective;