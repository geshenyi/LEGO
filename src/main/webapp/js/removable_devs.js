/**
 * Created by ssge on 2015/10/21.
 */

joint.shapes.removable = {};
joint.shapes.removable.devs = {};

joint.shapes.removable.devs.RemovableModel = joint.shapes.devs.Model.extend({
    markup: '<g class="rotatable"><g class="scalable"><rect class="body"/></g><text class="label"/><g class="inPorts"/><g class="outPorts"/></g><g class="element-tools"><g class="element-tool-remove"><circle fill="red" r="11"/><path transform="scale(.8) translate(-16, -16)" d="M24.778,21.419 19.276,15.917 24.777,10.415 21.949,7.585 16.447,13.087 10.945,7.585 8.117,10.415 13.618,15.917 8.116,21.419 10.946,24.248 16.447,18.746 21.948,24.248z"/><title>Remove this element from the model</title></g></g>',
    defaults: joint.util.deepSupplement({
        type: 'removable.devs.RemovableModel'
    },joint.shapes.devs.Model.prototype.defaults)

});

joint.shapes.removable.devs.RemovableModelView = joint.shapes.devs.ModelView.extend({

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
                this.openModal();
        }

        joint.dia.CellView.prototype.pointerclick.apply(this, arguments);
    },
    openModal: function(){
        console.log('In openmodal');
        $('.ui.modal')
            .modal('show')
        ;

    }
});