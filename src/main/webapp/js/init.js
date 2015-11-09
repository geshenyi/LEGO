/**
 * Created by ssge on 2015/10/21.
 */
$(function () {
    var component = Backbone.Model.extend({
        defaults: function () {
            return {
                'name': 'noname',
                'type': null
            }
        }
    });

    var componentList = Backbone.Collection.extend({
        model: component
    });

    header1 = Backbone.Model.extend({
        defaults: function () {
            return {
                'name': null,
                'value': null
            }
        }
    });

    headerList = Backbone.Collection.extend({
        model: header1
    });

    headerView = Backbone.View.extend({
        tagName: "div",
        className: "pure-g",
        template: _.template($('#header').html()),
        events: {
            'change .input-header-name': "updateModel",
            'change .input-header-value': "updateModel"
        },
        initialize: function () {
            this.render();
        },
        render: function () {
            var html = this.template(this.model.toJSON());
            this.$el.html(html);
            this.headerName = this.$('.input-header-name');
            this.headerValue = this.$('.input-header-value');
            return this;
        },
        updateModel: function () {
            this.model.set({'name': this.headerName.val(), 'value': this.headerValue.val()});
            console.log(arguments);
        }
    });

    headerListView = Backbone.View.extend({
        el: '#header-div',
        initialize: function () {

            this.render();
        },
        render: function () {

            var $list = this.$el.empty();
            this.collection.each(function (model) {
                var header = new headerView({model: model});
                $list.append(header.render().el);
            });
            return this;
        }
    });

    buildRequestModalView = Backbone.View.extend({
        el: '#buildRequestModal',

        initialize: function () {
//            this.attributes = {'endpoint': "http://test.com", 'method': 'POST'};
            this.endpointInput = $('#input-endpoint');
            this.methodInput = $('#input-method');
            var headerArray = [];
            if (this.attributes != 'undefined' && this.attributes != null) {

                this.attributes.header.each(function (eachheader) {
                    headerArray.push(new header1({'name': eachheader.name, 'value': eachheader.value}));
                });

            } else {
                headerArray.push(new header1({'name': 'Content-type', 'value': ''}));
                headerArray.push(new header1({'name': 'Accept', 'value': ''}));
            }
            this.headerListViewObj = new headerListView(
                {'collection': new headerList(headerArray)});

            this.render();
        },
        events: {
            'click .button-save': 'save'
        },
        render: function () {
            this.endpointInput.val(this.attributes.endpoint || '');
            this.methodInput.val(this.attributes.method || '');

        },
        save: function () {
            this.$el.modal('hide');
            var buildRequestParams = {'endpoint': this.endpointInput.val(), 'method': this.methodInput.val(), 'header': []};
            this.headerListViewObj.collection.each(function (model) {
                buildRequestParams.header.push({'name': model.get('name'), 'value': model.get('value')});
            });
            Backbone.trigger('saveBuildRequest', buildRequestParams);
        }

    });

    checkResponseModalView = Backbone.View.extend({
        el: '#checkResponseModal',

        initialize: function () {
//            this.attributes = {'endpoint': "http://test.com", 'method': 'POST'};
            this.responseCodeLabelInput = $('#input-response-code-label');
            this.responseCodeValueInput = $('#input-response-code-value');

            this.render();
        },
        events: {
            'click .button-save': 'save'
        },
        render: function () {
            this.responseCodeLabelInput.val(this.attributes.label || '');
            this.responseCodeValueInput.val(this.attributes.value || '');

        },
        save: function () {
            this.$el.modal('hide');
            Backbone.trigger('saveCheckResponse', {'label': this.responseCodeLabelInput.val(), 'value': this.responseCodeValueInput.val()});
        }

    });

    setCookieModalView = Backbone.View.extend({
        el: '#setCookieModal',

        initialize: function () {
//            this.attributes = {'endpoint': "http://test.com", 'method': 'POST'};
//            this.responseCodeLabelInput = $('#input-response-code-label');
//            this.responseCodeValueInput = $('#input-response-code-value');
            this.scriptTextArea = $('#setcookie-body');
            this.render();
        },
        events: {
            'click .button-save': 'save'
        },
        render: function () {
            this.scriptTextArea.val(this.attributes.script || '');
//            this.responseCodeLabelInput.val(this.attributes.label || '');
//            this.responseCodeValueInput.val(this.attributes.value || '');

        },
        save: function () {
            this.$el.modal('hide');
            Backbone.trigger('saveSetCookie', {script: this.scriptTextArea.val()});
        }

    });

    disableSurveyModalView = Backbone.View.extend({
        el: '#disableSurveyModal',

        initialize: function () {
//            this.attributes = {'endpoint': "http://test.com", 'method': 'POST'};
//            this.responseCodeLabelInput = $('#input-response-code-label');
//            this.responseCodeValueInput = $('#input-response-code-value');
            this.scriptTextArea = $('#disablesurvey-body');
            this.render();
        },
        events: {
            'click .button-save': 'save'
        },
        render: function () {
            this.scriptTextArea.val(this.attributes.script || '');
//            this.responseCodeLabelInput.val(this.attributes.label || '');
//            this.responseCodeValueInput.val(this.attributes.value || '');

        },
        save: function () {
            this.$el.modal('hide');
            Backbone.trigger('saveDisableSurvey', {script: this.scriptTextArea.val()});
        }

    });

    artistPageModalView = Backbone.View.extend({
        el: '#artistPageModal',

        initialize: function () {
//            this.attributes = {'endpoint': "http://test.com", 'method': 'POST'};
//            this.responseCodeLabelInput = $('#input-response-code-label');
//            this.responseCodeValueInput = $('#input-response-code-value');
            this.scriptTextArea = $('#artistpage-body');
            this.render();
        },
        events: {
            'click .button-save': 'save'
        },
        render: function () {
            this.scriptTextArea.val(this.attributes.script || '');
//            this.responseCodeLabelInput.val(this.attributes.label || '');
//            this.responseCodeValueInput.val(this.attributes.value || '');

        },
        save: function () {
            this.$el.modal('hide');
            Backbone.trigger('saveArtistPage', {script: this.scriptTextArea.val()});
        }

    });

    checkResponseModalView = Backbone.View.extend({
        el: '#checkResponseModal',

        initialize: function () {
//            this.attributes = {'endpoint': "http://test.com", 'method': 'POST'};
            this.responseCodeLabelInput = $('#input-response-code-label');
            this.responseCodeValueInput = $('#input-response-code-value');

            this.render();
        },
        events: {
            'click .button-save': 'save'
        },
        render: function () {
            this.responseCodeLabelInput.val(this.attributes.label || '');
            this.responseCodeValueInput.val(this.attributes.value || '');

        },
        save: function () {
            this.$el.modal('hide');
            Backbone.trigger('saveCheckResponse', {'label': this.responseCodeLabelInput.val(), 'value': this.responseCodeValueInput.val()});
        }

    });



    var components = new componentList([
        new component({"name": "Build Request", type: 'BuildRequestComponentView'}),
        new component({"name": "Check Response", type: 'CheckResponseComponentView'}),
        new component({"name": "START", type: 'StartComponentView'}),
        new component({"name": "END", type: 'EndComponentView'}),
        new component({"name": "Set Cookie", type: 'SetCookieComponentView'}),
        new component({"name": "Disable Survey", type: 'DisableSurveyComponentView'}),
        new component({"name": "Artist Page", type: 'ArtistPageComponentView'})
    ]);

    var componentView = Backbone.View.extend({
        tagName: "div",
        className: "pure-u-1-2",
        template: _.template($('#component').html()),
        events: {
            'click .component': 'createComponent'
        },
        render: function () {
            var html = this.template(this.model.toJSON());
            this.$el.html(html);
            return this;
        }

    });

    var BuildRequestComponentView = componentView.extend({
        createComponent: function () {
            var m1 = new joint.shapes.component.BuildRequestComponentModel({
                name: 'BuildRequest',
                position: { x: 50, y: 50 },
                size: { width: 120, height: 90 },
                inPorts: ['IN'],
                outPorts: ['OUT'],
                attrs: {
                    '.label': { text: 'Build Request', 'ref-x': .5, 'ref-y': .3, 'font-size': 15 },
                    rect: { fill: '#white', stroke: '#88E5FF', 'stroke-width': "5"},
                    '.inPorts circle': { fill: '#7EFFCE' },
                    '.outPorts circle': { fill: '#FF6B96' }
                }
            });
            graph.addCell(m1);
        }
    });

    var CheckResponseComponentView = componentView.extend({
        createComponent: function () {

            var m1 = new joint.shapes.component.CheckResponseComponentModel({
                name: 'CheckResponse',
                position: { x: 50, y: 50 },
                size: { width: 134, height: 90 },
                inPorts: ['IN'],
                outPorts: ['OUT'],
                attrs: {
                    '.label': { text: 'Check Response', 'ref-x': .5, 'ref-y': .3, 'font-size': 15 },
                    rect: { fill: '#white', stroke: '#88E5FF', 'stroke-width': "5"},
                    '.inPorts circle': { fill: '#7EFFCE' },
                    '.outPorts circle': { fill: '#FF6B96' }
                }
            });
            graph.addCell(m1);
        }
    });

    var SetCookieComponentView = componentView.extend({
        createComponent: function () {

            var m1 = new joint.shapes.component.SetCookieComponentModel({
                name: 'SetCookie',
                position: { x: 50, y: 50 },
                size: { width: 134, height: 90 },
                inPorts: ['IN'],
                outPorts: ['OUT'],
                attrs: {
                    '.label': { text: 'Set Cookie', 'ref-x': .5, 'ref-y': .3, 'font-size': 15 },
                    rect: { fill: '#white', stroke: '#88E5FF', 'stroke-width': "5"},
                    '.inPorts circle': { fill: '#7EFFCE' },
                    '.outPorts circle': { fill: '#FF6B96' }
                }
            });
            graph.addCell(m1);
        }
    });

    var DisableSurveyComponentView = componentView.extend({
        createComponent: function () {

            var m1 = new joint.shapes.component.DisableSurveyComponentModel({
                name: 'DisableSurvey',
                position: { x: 50, y: 50 },
                size: { width: 134, height: 90 },
                inPorts: ['IN'],
                outPorts: ['OUT'],
                attrs: {
                    '.label': { text: 'Disable Survey', 'ref-x': .5, 'ref-y': .3, 'font-size': 15 },
                    rect: { fill: '#white', stroke: '#88E5FF', 'stroke-width': "5"},
                    '.inPorts circle': { fill: '#7EFFCE' },
                    '.outPorts circle': { fill: '#FF6B96' }
                }
            });
            graph.addCell(m1);
        }
    });

    var ArtistPageComponentView = componentView.extend({
        createComponent: function () {

            var m1 = new joint.shapes.component.ArtistPageComponentModel({
                name: 'ArtistPage',
                position: { x: 50, y: 50 },
                size: { width: 134, height: 90 },
                inPorts: ['IN'],
                outPorts: ['OUT'],
                attrs: {
                    '.label': { text: 'Artist Page', 'ref-x': .5, 'ref-y': .3, 'font-size': 15 },
                    rect: { fill: '#white', stroke: '#88E5FF', 'stroke-width': "5"},
                    '.inPorts circle': { fill: '#7EFFCE' },
                    '.outPorts circle': { fill: '#FF6B96' }
                }
            });
            graph.addCell(m1);
        }
    });

    var StartComponentView = componentView.extend({
        createComponent: function () {

            var m1 = new joint.shapes.removable.devs.RemovableModel({
                name: 'Start',
                position: { x: 50, y: 50 },
                size: { width: 134, height: 90 },
                outPorts: ['OUT'],
                attrs: {
                    '.label': { text: 'Start', 'ref-x': .5, 'ref-y': .3, 'font-size': 15 },
                    rect: { fill: '#white', stroke: '#88E5FF', 'stroke-width': "5"},
                    '.outPorts circle': { fill: '#FF6B96' }
                }
            });
            graph.addCell(m1);
        }
    });

    var EndComponentView = componentView.extend({
        createComponent: function () {

            var m1 = new joint.shapes.removable.devs.RemovableModel({
                name: 'End',
                position: { x: 50, y: 50 },
                size: { width: 134, height: 90 },
                inPorts: ['IN'],
                attrs: {
                    '.label': { text: 'End', 'ref-x': .5, 'ref-y': .3, 'font-size': 15 },
                    rect: { fill: '#white', stroke: '#88E5FF', 'stroke-width': "5"},
                    '.inPorts circle': { fill: '#7EFFCE' }
                }
            });
            graph.addCell(m1);
        }
    });


    var componentListView = Backbone.View.extend({
        el: '#component-view',
        initialize: function () {
            this.render();
        },
        render: function () {
            var $list = this.$el.empty();
            this.collection.each(function (model) {
                var component = eval('new ' + model.get('type') + '({\'model\': model})');

                $list.append(component.render().el);
            });
            return this;
        }
    });

    var appView = Backbone.View.extend({
        el: '#app',
        events: {
            'click #button-play': 'play',
            'click #button-play-ui': 'playui'
        },
        initialize: function () {
            this.render();
        },
        render: function () {
            componentListViewObj = new componentListView({collection: components});
        },
        play: function () {
//            $('#log > #content').empty();
            $('#log-dialog > #log-content').empty();
            $('#log-dialog').modal('show');
            setTimeout(function(){
                var playSteps = [];
                var start_point = graph.getCells().filter(function (each) {
                    return each.attributes.name == 'Start';
                });
                var link = graph.getConnectedLinks(start_point[0], {outbound: true})[0];
                while(typeof link != 'undefined'){
                    var targetId = link.get("target").id;
                    var targetModel = graph.getCell(targetId);
                    if(targetModel.get("name") == "End"){
                        break;
                    }
                    var targetView = paper.findViewByModel(targetModel);
                    playSteps.push({"name": targetModel.get("name"), "params": targetView.params});
                    link = graph.getConnectedLinks(targetModel, {outbound:true})[0];
                }
                console.log(playSteps);
                $.ajax({
                    type: "POST",
                    url: "http://localhost:8080/legob/engine/test",
                    contentType: "application/json",
                    data: JSON.stringify(playSteps),

                    success: function(){
                        console.log('success');
                    },
                    dataType: 'json'
                });
            },1000)

        },
        playui: function () {
//            $('#log > #content').empty();
            $('#log-dialog > #log-content').empty();
            $('#log-dialog').modal('show');
            setTimeout(function(){
                var playSteps = [];
                var start_point = graph.getCells().filter(function (each) {
                    return each.attributes.name == 'Start';
                });
                var link = graph.getConnectedLinks(start_point[0], {outbound: true})[0];
                while(typeof link != 'undefined'){
                    var targetId = link.get("target").id;
                    var targetModel = graph.getCell(targetId);
                    if(targetModel.get("name") == "End"){
                        break;
                    }
                    var targetView = paper.findViewByModel(targetModel);
                    playSteps.push({"name": targetModel.get("name"), "params": targetView.params});
                    link = graph.getConnectedLinks(targetModel, {outbound:true})[0];
                }
                console.log(playSteps);
                $.ajax({
                    type: "POST",
                    url: "http://localhost:8080/legob/engine/testui",
                    contentType: "application/json",
                    data: JSON.stringify(playSteps),

                    success: function(){
                        console.log('success');
                    },
                    dataType: 'json'
                });
            },1000)

        }
    });

//    var componentListViewObj = new componentListView({collection: components});
    appView = new appView();

    graph = new joint.dia.Graph;

    paper = new joint.dia.Paper({
        el: $('#myholder'),
        width: 1200,
        height: 900,
        model: graph,
        gridSize: 1,
        defaultLink: new joint.dia.Link({
            attrs: { '.marker-target': { d: 'M 10 0 L 0 5 L 10 10 z' } }
        })
    });


    paper.on('cell:pointerclick', function (cellView, evt, x, y) {
        console.log(arguments);
    });

    graph.on('add', function (cell) {
        if (cell.isLink()) {
            cell.on('change:target', function () {
                console.log(arguments);
            })
        } else {
            allCells[cell.id] = {};
        }
    });

    allCells = {};



});