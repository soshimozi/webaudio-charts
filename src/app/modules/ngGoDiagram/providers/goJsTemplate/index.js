'use strict';

const goJs = require('gojs');


function goJsTemplate() {

    function makeOscillatorTemplate(fillcolor, strokecolor, changeHandler) {
        
        console.log('changeHandler: ', changeHandler);
        
        var node = goJs.GraphObject.make(goJs.Node, "Spot",
            goJs.GraphObject.make(goJs.Panel, "Auto", { width: 100, height: 120 },
              goJs.GraphObject.make(goJs.Shape, "RoundedRectangle", {
                    fill: fillcolor, stroke: strokecolor, strokeWidth: 2,
                    spot1: goJs.Spot.TopLeft, spot2: goJs.Spot.BottomRight
                }),
              goJs.GraphObject.make(goJs.Panel, "Table",
                goJs.GraphObject.make(goJs.TextBlock, "Oscillator", {
                      row: 0,
                      margin: 3,
                      maxSize: new goJs.Size(80, NaN),
                      stroke: "white",
                      font: "bold 11pt Arial"
                  }),
                goJs.GraphObject.make(goJs.TextBlock, {
                      row: 2,
                      margin: 3,
                      editable: false,
                      maxSize: new goJs.Size(80, 40),
                      stroke: "white",
                      font: "bold 9pt Arial"
                  },
                  new goJs.Binding("text", "freq").makeTwoWay()),
                goJs.GraphObject.make(goJs.TextBlock, {
                      row: 3,
                      margin: 3,
                      editable: false,
                      maxSize: new goJs.Size(80, 40),
                      stroke: "white",
                      font: "bold 9pt Arial"
                  },
                  new goJs.Binding("text", "detune").makeTwoWay()),
                goJs.GraphObject.make(goJs.TextBlock, {
                      row: 4,
                      margin: 3,
                      editable: true,
                      maxSize: new goJs.Size(80, 40),
                      stroke: "white",
                      font: "bold 9pt Arial"
                  },
                  new goJs.Binding("text", "name").makeTwoWay())
              )
            ),
            goJs.GraphObject.make(goJs.Panel, "Vertical", {
                  alignment: goJs.Spot.Left,
                  alignmentFocus: new goJs.Spot(0, 0.5, -8, 0)
              }, [makePort("FREQ", true), makePort("TREM", true)]),
            goJs.GraphObject.make(goJs.Panel, "Vertical", {
                  alignment: goJs.Spot.Right,
                  alignmentFocus: new goJs.Spot(1, 0.5, 8, 0)
              }, [makePort("OUT", false)])
          );

        node.selectionAdornmentTemplate = goJs.GraphObject.make(goJs.Adornment, "Spot",
            goJs.GraphObject.make(goJs.Panel, "Auto",
                goJs.GraphObject.make(goJs.Shape, { 
                        stroke: "dodgerblue", 
                        strokeWidth: 2, 
                        fill: null}),
                goJs.GraphObject.make(goJs.Placeholder)),
            goJs.GraphObject.make(goJs.Panel, "Horizontal", { alignment: goJs.Spot.Top, alignmentFocus: goJs.Spot.Bottom },
                goJs.GraphObject.make("Button", { click: changeHandler  },
                    goJs.GraphObject.make(goJs.TextBlock, { text: "Change Props" })
                )
            )
        );
        
        return node;
    }

    function makePort(name, leftside) {

        var port = goJs.GraphObject.make(goJs.Shape, {
                name: "SHAPE",
                fill: "#919191",
                geometryString: "F1 m 0,0 l 5,0 1,4 -1,4 -5,0 1,-4 -1,-4 z",
                desiredSize: new goJs.Size(10, 10),
                portId: name,  // declare this object to be a "port"
                toMaxLinks: 1,  // don't allow more than one link into a port
                cursor: "pointer" // show a different cursor to indicate potential link point

            });

        var lab = goJs.GraphObject.make(goJs.TextBlock, name, { font: "bold 6pt sans-serif" });

        var panel = goJs.GraphObject.make(goJs.Panel, "Horizontal", { margin: new goJs.Margin(2, 0) });

        if (leftside) {
            port.toSpot = goJs.Spot.Left;
            port.toLinkable = true;
            lab.margin = new goJs.Margin(1, 0, 0, 1);
            panel.alignment = goJs.Spot.TopLeft;
            panel.add(port);
            panel.add(lab);
        } else {
            port.fromSpot = goJs.Spot.Right;
            port.fromLinkable = true;
            lab.margin = new goJs.Margin(1, 1, 0, 0);
            panel.alignment = goJs.Spot.TopRight;
            panel.add(lab);
            panel.add(port);
        }
        
        return panel;
    }


    function makeParameterTemplate(typename, icon, background, stroke, inports, outports, changeHandler, readonly) {
        
        var node = 
        goJs.GraphObject.make(goJs.Node, "Spot", { deletable: !!!readonly },
            goJs.GraphObject.make(goJs.Panel, "Auto", { width: 100, height: 120 },
              goJs.GraphObject.make(goJs.Shape, "RoundedRectangle", {
                    fill: background, stroke: stroke, strokeWidth: 2,
                    spot1: goJs.Spot.TopLeft, spot2: goJs.Spot.BottomRight
                }),
              goJs.GraphObject.make(goJs.Panel, "Table",
                goJs.GraphObject.make(goJs.TextBlock, typename, {
                      row: 0,
                      margin: 3,
                      maxSize: new goJs.Size(80, NaN),
                      stroke: "white",
                      font: "bold 11pt Arial"
                  }),
                goJs.GraphObject.make(goJs.Picture, icon, { row: 1, width: 55, height: 55 }),
                goJs.GraphObject.make(goJs.TextBlock, {
                      row: 2,
                      margin: 3,
                      editable: true,
                      maxSize: new goJs.Size(80, 40),
                      stroke: "white",
                      font: "bold 9pt Arial"
                  },
                  new goJs.Binding("text", "name").makeTwoWay())
              )
            ),
            goJs.GraphObject.make(goJs.Panel, "Vertical", {
                  alignment: goJs.Spot.Left,
                  alignmentFocus: new goJs.Spot(0, 0.5, -8, 0)
              }, inports),
            goJs.GraphObject.make(goJs.Panel, "Vertical", {
                  alignment: goJs.Spot.Right,
                  alignmentFocus: new goJs.Spot(1, 0.5, 8, 0)
              }, outports)
          );

        node.selectionAdornmentTemplate = goJs.GraphObject.make(goJs.Adornment, "Spot",
            goJs.GraphObject.make(goJs.Panel, "Auto",
                goJs.GraphObject.make(goJs.Shape, { 
                        stroke: "dodgerblue", 
                        strokeWidth: 2, 
                        fill: null}),
                goJs.GraphObject.make(goJs.Placeholder)),
            goJs.GraphObject.make(goJs.Panel, "Horizontal", { alignment: goJs.Spot.Top, alignmentFocus: goJs.Spot.Bottom },
                goJs.GraphObject.make("Button", { click: changeHandler  },
                    goJs.GraphObject.make(goJs.TextBlock, { text: "Change Props" })
                )
            )
        );

        return node;
    }            
    
    const templateProvider = function () {    
        return {
            getOscillatorTemplate: function (background, stroke, changeHandler) {
                return makeOscillatorTemplate(background, stroke, changeHandler);
            },
            getParameterTemplate: function (typename, icon, background, stroke, inports, outports, changeHandler, readonly) {
                return makeParameterTemplate(typename, icon, background, stroke, inports, outports, changeHandler, readonly);
            },
            getPort: function(name, leftside) {
                return makePort(name, leftside);
            }
        };
    };
    
    templateProvider.$inject = [];
    this.$get = templateProvider;
}


goJsTemplate.$inject = [];

module.exports = goJsTemplate;
