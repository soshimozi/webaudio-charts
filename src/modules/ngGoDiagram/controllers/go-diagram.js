const goJs = require('gojs');

//TODO: create seperate directives for each node type
// move template into node type and do away with goJsTemplate
export default class {
    
    constructor($scope, $element, $attrs, goJsTemplate) {
        
        this.$scope = $scope;
        this.goJsTemplate = goJsTemplate


        
        this.nodes = {};        

        this.model = new goJs.GraphLinksModel();
        

        
        
        // // TODO: Move into directive
        // let diagramContainer = $element[0].querySelector('#diagram');
        // angular.element(diagramContainer).children().remove();
    
        // // create the diagram
        // $scope.diagram = goJs.GraphObject.make(goJs.Diagram, diagramContainer, {            
        //            initialContentAlignment: goJs.Spot.Left,
        //            initialAutoScale: goJs.Diagram.UniformToFill,
        //            layout: goJs.GraphObject.make(goJs.LayeredDigraphLayout, { direction: 0 }),
        //            allowDrop: true,  // Nodes from the Palette can be dropped into the Diagram
        //            "undoManager.isEnabled": true
        //         });  
                
        // // add templates for various child controls
        // $scope.diagram.nodeTemplateMap.add("oscillator", goJsTemplate.getOscillatorTemplate(colors.red, colors.gray, () => this.handleChangeRequest));
        
        // $scope.diagram.nodeTemplateMap.add("filter", goJsTemplate.getParameterTemplate("Filter", "", colors.brown, colors.gray,
        //              [goJsTemplate.getPort("RES", true), goJsTemplate.getPort("CUTOFF", true), goJsTemplate.getPort("IN", true)],
        //              [goJsTemplate.getPort("OUT", false)], () => this.handleChangeRequest));
    
        // $scope.diagram.nodeTemplateMap.add("mixer", goJsTemplate.getParameterTemplate("Mixer", "", colors.blue, colors.gray,
        //              [goJsTemplate.getPort("INA", true), goJsTemplate.getPort("INB", true)],
        //              [goJsTemplate.getPort("OUT", false)], () => this.handleChangeRequest));
                     
        // $scope.diagram.nodeTemplateMap.add("OUTPUT", goJsTemplate.getParameterTemplate("OUTPUT", require("../../images/volume-high.png"), colors.blue, colors.gray,
        //                      [goJsTemplate.getPort("IN", true)],
        //                      [], () => this.handleChangeRequest, true));
                
            
        // // TODO: either supply this via a service to the directive (complete with a watch to replace)
        // // or generate from a model also generated from the directive (complete with a watch to replace)
        // let model = $scope.diagramModel = new goJs.GraphLinksModel();
    
        // model.nodeCategoryProperty = "type";
        // model.linkFromPortIdProperty = "frompid";
        // model.linkToPortIdProperty = "topid";
    
        // model.nodeDataArray = [{ "key": -1, "type": "OUTPUT" }];
    
        // model.linkDataArray = [];
        
        // $scope.diagram.linkTemplateMap = linkTemplateMap;
        // $scope.diagram.model = model;
        
        // $scope.diagram.addDiagramListener("LinkRelinked", (e) => this.processNodeLink(e));
        // $scope.diagram.addDiagramListener("LinkDrawn", (e) => this.processNodeLink(e));            
        
        // $scope.diagram.addDiagramListener("ChangedSelection", (e) => {
        //     var selnode = this.$scope.diagram.selection.first();
        //     this.$scope.diagram.model.selectedNodeData = (selnode instanceof goJs.Node ? selnode.data : null);
        // });

        // $scope.diagram.addDiagramListener("ModelChanged", (e) => { console.log("model changed: ", e)});
            
        // $scope.$watch('options', () => {
        //     console.log('options changed!');
        // });  
        
        
    }
    
    processNodeLink(e) {
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
    
    handleChangeRequest() {
        console.log('change handled');
    }
    
    addNode(node) {
        this.model.addNodeData(node);
        this.nodes[node.key] = node;
    }
    
    addLink(link) {
        //$scope.diagram.model.linkDataArray.push(link);
    }
    
    updateNodeProperty(nodeKey, propertyName, value) {
        // find node by key in array
        // then call $scope.diagram.model.setDataProperty(node, propertyName, value);
    }       
}
