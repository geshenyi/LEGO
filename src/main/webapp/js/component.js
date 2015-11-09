/**
 * Created by ssge on 2015/10/22.
 */
joint.shapes.component = {};

var componentArr = [
    {"type": "BuildRequestComponentModel", "saveEvent": "saveBuildRequest", "modalSelector": "#buildRequestModal","modalView":"buildRequestModalView"},
    {"type": "CheckResponseComponentModel", "saveEvent": "saveCheckResponse", "modalSelector": "#checkResponseModal","modalView":"checkResponseModalView"},
    {"type": "SetCookieComponentModel", "saveEvent": "saveSetCookie", "modalSelector": "#setCookieModal","modalView":"setCookieModalView"},
    {"type": "DisableSurveyComponentModel", "saveEvent": "saveDisableSurvey", "modalSelector": "#disableSurveyModal","modalView":"disableSurveyModalView"},
    {"type": "ArtistPageComponentModel", "saveEvent": "saveArtistPage", "modalSelector": "#artistPageModal","modalView":"artistPageModalView"}

];

function createComponent(num){
    joint.shapes.component[componentArr[num].type] = joint.shapes.devs.Model.extend({
        markup: '<g class="rotatable"><g class="scalable"><rect class="body"/></g><text class="label"/><g class="inPorts"/><g class="outPorts"/></g><g class="element-tools"><g class="element-tool-remove"><circle fill="red" r="11"/><path transform="scale(.8) translate(-16, -16)" d="M24.778,21.419 19.276,15.917 24.777,10.415 21.949,7.585 16.447,13.087 10.945,7.585 8.117,10.415 13.618,15.917 8.116,21.419 10.946,24.248 16.447,18.746 21.948,24.248z"/><title>Remove this element from the model</title></g></g>',
        defaults: joint.util.deepSupplement({
            type: 'component.'+componentArr[num].type
        }, joint.shapes.devs.Model.prototype.defaults)
    });
    joint.shapes.component[componentArr[num].type + 'View'] = joint.shapes.devs.ModelView.extend({
        initialize: function () {
            var that = this;
            Backbone.on(componentArr[num].saveEvent, function (params) {

                console.log(params);
                that.params = params;
            });
            joint.shapes.devs.ModelView.prototype.initialize.apply(this, arguments)
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
                    this.openModal();
            }

            joint.dia.CellView.prototype.pointerclick.apply(this, arguments);
        },
        openModal: function () {
            $(componentArr[num].modalSelector)
                .modal('show')
            ;
//        var headerListViewObj = new headerListView({'attributes':{'endpoint':"http://test.com",'method':'POST'},'collection':new headerList([new header1({'name':'Content-type','value':'application/json'})])});
//            if (typeof this.buildRequestModalViewObj == 'undefined') {
            eval('new ' + componentArr[num].modalView + '({attributes: this.params})');
//            }

        }
    });
}

for(var i=0;i<componentArr.length;i++){
    createComponent(i);
}

//joint.shapes.component.BuildRequestComponentModel = joint.shapes.devs.Model.extend({
//    markup: '<g class="rotatable"><g class="scalable"><rect class="body"/></g><text class="label"/><g class="inPorts"/><g class="outPorts"/></g><g class="element-tools"><g class="element-tool-remove"><circle fill="red" r="11"/><path transform="scale(.8) translate(-16, -16)" d="M24.778,21.419 19.276,15.917 24.777,10.415 21.949,7.585 16.447,13.087 10.945,7.585 8.117,10.415 13.618,15.917 8.116,21.419 10.946,24.248 16.447,18.746 21.948,24.248z"/><title>Remove this element from the model</title></g></g>',
//    defaults: joint.util.deepSupplement({
//        type: 'component.BuildRequestComponentModel'
//    }, joint.shapes.devs.Model.prototype.defaults)
//
//});
//
//joint.shapes.component.BuildRequestComponentModelView = joint.shapes.devs.ModelView.extend({
//    initialize: function () {
//        var that = this;
//        Backbone.on('saveBuildRequest', function (params) {
//
//            console.log(params);
//            that.params = params;
//        });
//        joint.shapes.devs.ModelView.prototype.initialize.apply(this, arguments)
//    },
//    pointerclick: function (evt, x, y) {
//        this._dx = x;
//        this._dy = y;
//        this._action = '';
//
//        var className = evt.target.parentNode.getAttribute('class');
//
//        switch (className) {
//
//            case 'element-tool-remove':
//                this.model.remove();
//                return;
//                break;
//
//            default:
//                this.openModal();
//        }
//
//        joint.dia.CellView.prototype.pointerclick.apply(this, arguments);
//    },
//    openModal: function () {
//        $('#buildRequestModal')
//            .modal('show')
//        ;
////        var headerListViewObj = new headerListView({'attributes':{'endpoint':"http://test.com",'method':'POST'},'collection':new headerList([new header1({'name':'Content-type','value':'application/json'})])});
//        if (typeof this.buildRequestModalViewObj == 'undefined') {
//            this.buildRequestModalViewObj = new buildRequestModalView({attributes: this.params});
//        }
//
//    }
//});
//
//joint.shapes.component.CheckResponseComponentModel = joint.shapes.devs.Model.extend({
//    markup: '<g class="rotatable"><g class="scalable"><rect class="body"/></g><text class="label"/><g class="inPorts"/><g class="outPorts"/></g><g class="element-tools"><g class="element-tool-remove"><circle fill="red" r="11"/><path transform="scale(.8) translate(-16, -16)" d="M24.778,21.419 19.276,15.917 24.777,10.415 21.949,7.585 16.447,13.087 10.945,7.585 8.117,10.415 13.618,15.917 8.116,21.419 10.946,24.248 16.447,18.746 21.948,24.248z"/><title>Remove this element from the model</title></g></g>',
//    defaults: joint.util.deepSupplement({
//        type: 'component.CheckResponseComponentModel'
//    }, joint.shapes.devs.Model.prototype.defaults)
//
//});
//
//joint.shapes.component.CheckResponseComponentModelView = joint.shapes.devs.ModelView.extend({
//    initialize: function () {
//        var that = this;
//        Backbone.on('saveCheckResponse', function (params) {
//            that.params = params;
//        });
//        joint.shapes.devs.ModelView.prototype.initialize.apply(this, arguments)
//    },
//    pointerclick: function (evt, x, y) {
//        this._dx = x;
//        this._dy = y;
//        this._action = '';
//
//        var className = evt.target.parentNode.getAttribute('class');
//
//        switch (className) {
//
//            case 'element-tool-remove':
//                this.model.remove();
//                return;
//                break;
//
//            default:
//                this.openModal();
//        }
//
//        joint.dia.CellView.prototype.pointerclick.apply(this, arguments);
//    },
//    openModal: function () {
//        $('#checkResponseModal')
//            .modal('show')
//        ;
//        if (typeof this.checkResponseModalViewObj == 'undefined') {
//            this.checkResponseModalViewObj = new checkResponseModalView({attributes: this.params});
//        }
//
//    }
//});
//
//joint.shapes.component.SetCookieComponentModel = joint.shapes.devs.Model.extend({
//    markup: '<g class="rotatable"><g class="scalable"><rect class="body"/></g><text class="label"/><g class="inPorts"/><g class="outPorts"/></g><g class="element-tools"><g class="element-tool-remove"><circle fill="red" r="11"/><path transform="scale(.8) translate(-16, -16)" d="M24.778,21.419 19.276,15.917 24.777,10.415 21.949,7.585 16.447,13.087 10.945,7.585 8.117,10.415 13.618,15.917 8.116,21.419 10.946,24.248 16.447,18.746 21.948,24.248z"/><title>Remove this element from the model</title></g></g>',
//    defaults: joint.util.deepSupplement({
//        type: 'component.SetCookieComponentModel'
//    }, joint.shapes.devs.Model.prototype.defaults)
//
//});
//
//joint.shapes.component.SetCookieComponentModelView = joint.shapes.devs.ModelView.extend({
//    initialize: function () {
//        var that = this;
//        Backbone.on('saveSetCookie', function (params) {
//            that.params = params;
//        });
//        joint.shapes.devs.ModelView.prototype.initialize.apply(this, arguments)
//    },
//    pointerclick: function (evt, x, y) {
//        this._dx = x;
//        this._dy = y;
//        this._action = '';
//
//        var className = evt.target.parentNode.getAttribute('class');
//
//        switch (className) {
//
//            case 'element-tool-remove':
//                this.model.remove();
//                return;
//                break;
//
//            default:
//                this.openModal();
//        }
//
//        joint.dia.CellView.prototype.pointerclick.apply(this, arguments);
//    },
//    openModal: function () {
//        $('#setCookieModal')
//            .modal('show')
//        ;
//        if (typeof this.setCookieModalViewObj == 'undefined') {
//            this.setCookieModalViewObj = new setCookieModalView({attributes: this.params});
//        }
//
//    }
//});