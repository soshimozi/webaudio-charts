'use strict';

var angular = require('angular');

function GoDiagramController($scope, $element, $attrs, goJs, goJsTemplate) {
    
    function processNodeLink(e) {
        e.subject.category = "";

        var modulationMap = {
            "oscillator": ["FREQ", "TREM"],
            "filter": ["RES", "CUTOFF"],
            "gain" : ["GAIN"]
        };

        var modulation = false;
        var nodeCategory = e.subject.toNode.category;

        if (modulationMap.hasOwnProperty(nodeCategory)) {
            var i;
            for (i = 0; i < modulationMap[nodeCategory].length; i++) {
                if (modulationMap[nodeCategory][i] === e.subject.toPortId) {
                    modulation = true;
                    break;
                }
            }
        }

        if (modulation) {
            e.subject.category = "modulate";
        }
    }
    
    var colors = {
        "red": "#aa3939",
        "brown": "#aa6c39",
        "blue": "#226666",
        "green": "#2d882d",
        "white": "#fefefe",
        "gray": "#404040",
        "link": "#003333"
    };
    
    var controller = this;

    controller.nodes = {};
    
    controller.handleChangeRequest = function() {
        console.log('change handled');
    };
    
    controller.addNode = function(scp) {
        $scope.diagram.model.addNodeData(scp.node);
        controller.nodes[scp.key] = scp;
    };
    
    controller.addLink = function(link) {
        //$scope.diagram.model.linkDataArray.push(link);
    };
    
    controller.updateNodeProperty = function(nodeKey, propertyName, value) {
        // find node by key in array
        // then call $scope.diagram.model.setDataProperty(node, propertyName, value);
    };
    
    var linkTemplateMap = new goJs.Map("string", goJs.Link);
    linkTemplateMap.add("", 
        goJs.GraphObject.make(goJs.Link, {
            routing: goJs.Link.Orthogonal, corner: 5,
            relinkableFrom: true, relinkableTo: true
            },
            goJs.GraphObject.make(goJs.Shape, { stroke: colors.link, strokeWidth: 2 }),
            goJs.GraphObject.make(goJs.Shape, { stroke: colors.link, fill: colors.link, toArrow: "Standard" })
        )
    );
    
    linkTemplateMap.add("modulate",               
        goJs.GraphObject.make(goJs.Link, {
            routing: goJs.Link.Orthogonal, corner: 5,
            relinkableFrom: true, relinkableTo: true
            },
            new goJs.Binding("points").makeTwoWay(),
            goJs.GraphObject.make(goJs.Shape, { stroke: colors.link, strokeWidth: 2, strokeDashArray: [4, 4] }),
            goJs.GraphObject.make(goJs.Shape, { toArrow: "Standard", fill: colors.link, stroke: colors.link })
        )
    );
    
    
    var diagramContainer = $element[0].querySelector('#diagram');
    
    angular.element(diagramContainer).children().remove();

    // create the diagram
    $scope.diagram = goJs.GraphObject.make(goJs.Diagram, diagramContainer, {            
               initialContentAlignment: goJs.Spot.Left,
               initialAutoScale: goJs.Diagram.UniformToFill,
               layout: goJs.GraphObject.make(goJs.LayeredDigraphLayout, { direction: 0 }),
               allowDrop: true,  // Nodes from the Palette can be dropped into the Diagram
               "undoManager.isEnabled": true
            });  
            
    // add templates for various child controls
    $scope.diagram.nodeTemplateMap.add("oscillator", goJsTemplate.getOscillatorTemplate(colors.red, colors.gray, controller.handleChangeRequest));
    
    $scope.diagram.nodeTemplateMap.add("filter", goJsTemplate.getParameterTemplate("Filter", "", colors.brown, colors.gray,
                 [goJsTemplate.getPort("RES", true), goJsTemplate.getPort("CUTOFF", true), goJsTemplate.getPort("IN", true)],
                 [goJsTemplate.getPort("OUT", false)], controller.handleChangeRequest));

    $scope.diagram.nodeTemplateMap.add("mixer", goJsTemplate.getParameterTemplate("Mixer", "", colors.blue, colors.gray,
                 [goJsTemplate.getPort("INA", true), goJsTemplate.getPort("INB", true)],
                 [goJsTemplate.getPort("OUT", false)], controller.handleChangeRequest));
                 
    $scope.diagram.nodeTemplateMap.add("OUTPUT", goJsTemplate.getParameterTemplate("OUTPUT", "build/images/volume-high.png", colors.blue, colors.gray,
                         [goJsTemplate.getPort("IN", true)],
                         [], controller.handleChangeRequest, true));
            
        
    // TODO: either supply this via a service to the directive (complete with a watch to replace)
    // or generate from a model also generated from the directive (complete with a watch to replace)
    var model = $scope.diagramModel = new goJs.GraphLinksModel();

    model.nodeCategoryProperty = "type";
    model.linkFromPortIdProperty = "frompid";
    model.linkToPortIdProperty = "topid";

    model.nodeDataArray = [{ "key": -1, "type": "OUTPUT" }];

    model.linkDataArray = [];
    
    $scope.diagram.linkTemplateMap = linkTemplateMap;
    $scope.diagram.model = model;
    
    $scope.diagram.addDiagramListener("LinkRelinked", processNodeLink);
    $scope.diagram.addDiagramListener("LinkDrawn", processNodeLink);            
    
    $scope.diagram.addDiagramListener("ChangedSelection", function (e) {
        var selnode = $scope.diagram.selection.first();
        $scope.diagram.model.selectedNodeData = (selnode instanceof goJs.Node ? selnode.data : null);
    });
        
    $scope.$watch('options', function() {
        console.log('options changed!');
    });  
    

    
}

GoDiagramController.$inject = ['$scope', '$element', '$attrs', 'goJs', 'goJsTemplate'];

module.exports = GoDiagramController;