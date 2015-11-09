//custom shapes

joint.shapes.tm = {};

joint.shapes.tm.toolElement = joint.shapes.basic.Generic.extend({

    toolMarkup: ['<g class="element-tools">',
        '<g class="element-tool-remove"><circle fill="red" r="11"/>',
        '<path transform="scale(.8) translate(-16, -16)" d="M24.778,21.419 19.276,15.917 24.777,10.415 21.949,7.585 16.447,13.087 10.945,7.585 8.117,10.415 13.618,15.917 8.116,21.419 10.946,24.248 16.447,18.746 21.948,24.248z"/>',
        '<title>Remove this element from the model</title>',
        '</g>',
        '</g>'].join(''),

    defaults: joint.util.deepSupplement({
        attrs: {
            text: { 'font-weight': 400, 'font-size': 'small', fill: 'black', 'text-anchor': 'middle', 'ref-x': .5, 'ref-y': .5, 'y-alignment': 'middle' },
        },
    }, joint.shapes.basic.Generic.prototype.defaults)

});

joint.shapes.tm.Actor = joint.shapes.tm.toolElement.extend({

    markup: '<g class="rotatable"><g class="scalable"><rect/></g><text/></g>',

    defaults: joint.util.deepSupplement({

        type: 'tm.Actor',
        attrs: {
            rect: { fill: 'white', stroke: 'black', 'stroke-width': 1, 'follow-scale': true, width: 160, height: 80 },
            text: { ref: 'rect'}
        },
        size: { width: 160, height: 80 }
    }, joint.shapes.tm.toolElement.prototype.defaults)
});


//custom view

joint.shapes.tm.ToolElementView = joint.dia.ElementView.extend({

    initialize: function() {

        joint.dia.ElementView.prototype.initialize.apply(this, arguments);
    },

    render: function () {

        joint.dia.ElementView.prototype.render.apply(this, arguments);

        this.renderTools();
        this.update();

        return this;
    },

    renderTools: function () {

        var toolMarkup = this.model.toolMarkup || this.model.get('toolMarkup');

        if (toolMarkup) {

            var nodes = V(toolMarkup);
            V(this.el).append(nodes);

        }

        return this;
    },

    pointerclick: function (evt, x, y) {

        this._dx = x;
        this._dy = y;
        this._action = '';

        var className = evt.target.parentNode.getAttribute('class');

        switch (className) {

            case 'element-tool-remove':
                this.model.remove();
                return;
                break;

            default:
        }

        joint.dia.CellView.prototype.pointerclick.apply(this, arguments);
    }

});


joint.shapes.tm.ActorView = joint.shapes.tm.ToolElementView;

//create the paper and add the shape

var graph = new joint.dia.Graph;

var paper = new joint.dia.Paper({
    el: $('#paper'),
    width: 600,
    height: 200,
    model: graph,
    gridSize: 1
});

var actor = new joint.shapes.tm.Actor({
    position: {x:100, y:30},
    attrs: {text: {text: 'process'}}
});

graph.addCell(actor);