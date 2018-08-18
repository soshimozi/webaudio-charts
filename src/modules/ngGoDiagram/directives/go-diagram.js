
const angular = require('angular');

const ngAudioDiagram = function ($window, goJsService, goJsTemplate) {
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
        link: function(scope, element, attrs, ctrl) {

            let colors = {
                "red": "#aa3939",
                "brown": "#aa6c39",
                "blue": "#226666",
                "green": "#2d882d",
                "white": "#fefefe",
                "gray": "#404040",
                "link": "#003333"
            };  

            let goJs = goJsService.library;

            let diagramContainer = element[0].querySelector('#diagram');
            angular.element(diagramContainer).children().remove();            

            let $make = goJs.GraphObject.make;
    
            let linkTemplateMap = new goJs.Map("string", goJs.Link);
            linkTemplateMap.add("", 
                $make(goJs.Link, {
                    routing: goJs.Link.Orthogonal, corner: 5,
                    relinkableFrom: true, relinkableTo: true
                    },
                    $make(goJs.Shape, { stroke: colors.link, strokeWidth: 2 }),
                    $make(goJs.Shape, { stroke: colors.link, fill: colors.link, toArrow: "Standard" })
                )
            );
            
            linkTemplateMap.add("modulate",               
            $make(goJs.Link, {
                    routing: goJs.Link.Orthogonal, corner: 5,
                    relinkableFrom: true, relinkableTo: true
                    },
                    new goJs.Binding("points").makeTwoWay(),
                    $make(goJs.Shape, { stroke: colors.link, strokeWidth: 2, strokeDashArray: [4, 4] }),
                    $make(goJs.Shape, { toArrow: "Standard", fill: colors.link, stroke: colors.link })
                )
            );


            
            // create the diagram
            let diagram = $make(goJs.Diagram,  diagramContainer, {            
                    initialContentAlignment: goJs.Spot.Left,
                    initialAutoScale: goJs.Diagram.UniformToFill,
                    layout: $make(goJs.LayeredDigraphLayout, { direction: 0 }),
                    allowDrop: true,  // Nodes from the Palette can be dropped into the Diagram
                    "undoManager.isEnabled": true,
                    "ModelChanged": (e) => {console.log("ModelChanged: ", e)}
                });  
                
            // add templates for various child controls
            diagram.nodeTemplateMap.add("oscillator", goJsTemplate.getOscillatorTemplate(colors.red, colors.gray, () => this.handleChangeRequest));
        
            diagram.nodeTemplateMap.add("filter", goJsTemplate.getParameterTemplate("Filter", "", colors.brown, colors.gray,
                     [goJsTemplate.getPort("RES", true), goJsTemplate.getPort("CUTOFF", true), goJsTemplate.getPort("IN", true)],
                     [goJsTemplate.getPort("OUT", false)], () => ctrl.handleChangeRequest));
    
            diagram.nodeTemplateMap.add("mixer", goJsTemplate.getParameterTemplate("Mixer", "", colors.blue, colors.gray,
                     [goJsTemplate.getPort("INA", true), goJsTemplate.getPort("INB", true)],
                     [goJsTemplate.getPort("OUT", false)], () => ctrl.handleChangeRequest));
                     
            diagram.nodeTemplateMap.add("OUTPUT", goJsTemplate.getParameterTemplate("OUTPUT", require("../images/volume-high.png"), colors.blue, colors.gray,
                             [goJsTemplate.getPort("IN", true)],
                             [], () => ctrl.handleChangeRequest, true));
                
            

            // TODO: either supply this via a service to the directive (complete with a watch to replace)
            // or generate from a model also generated from the directive (complete with a watch to replace)
            let model = diagram.model = ctrl.model;
    
            model.nodeCategoryProperty = "type";
            model.linkFromPortIdProperty = "frompid";
            model.linkToPortIdProperty = "topid";
    
            model.nodeDataArray = [{ "key": -1, "type": "OUTPUT" }];
    
            model.linkDataArray = [];
        
            diagram.linkTemplateMap = linkTemplateMap;
        
            diagram.addDiagramListener("LinkRelinked", (e) => ctrl.processNodeLink(e));
            diagram.addDiagramListener("LinkDrawn", (e) => ctrl.processNodeLink(e));            
        
            diagram.addDiagramListener("ChangedSelection", (e) => {
                var selnode = diagram.selection.first();
                model.selectedNodeData = (selnode instanceof goJs.Node ? selnode.data : null);
            });

            //diagram.addDiagramListener("ModelChanged", (e) => { console.log("model changed: ", e)});
            
            scope.$watch('options', () => {
                console.log('options changed!');
            });  

        }
    };       
};

ngAudioDiagram.$inject = ['$window', 'goJs', 'goJsTemplate'];
module.exports = ngAudioDiagram;