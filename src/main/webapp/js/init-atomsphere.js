/**
 * Created by ssge on 2015/10/23.
 */
var socket = $.atmosphere;
var subSocket;
var transport = 'websocket';
var websocketUrl = "http://localhost:8080/legob/engine/websockets/";
var request = {
    url: websocketUrl,
    contentType : "application/json",
    logLevel : 'debug',
    //shared : 'true',
    transport : transport ,
    fallbackTransport: 'long-polling',
    //reconnectInterval: 10000,
    //callback: callback,
    onMessage: function(message){
        $('#log-dialog>#log-content').append("<div class='log-message'>"+message.responseBody+"</div>")
    },
    onOpen: function(response) {
        console.log('Atmosphere onOpen: Atmosphere connected using ' + response.transport);
        transport = response.transport;
    },
    onReconnect: function (request, response) {
        console.log("Atmosphere onReconnect: Reconnecting");
    },
    onClose: function(response) {
        console.log('Atmosphere onClose executed');
    },
    onError: function(response) {
        console.log('Atmosphere onError: Sorry, but there is some problem with your '
            + 'socket or the server is down');
    }
};
subSocket = socket.subscribe(request);