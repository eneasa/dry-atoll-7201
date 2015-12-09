var http = require('http');
var io = require('socket.io');
var express = require("express");

var Server = (function(){

    PORT = 5000,
    app = express(),
    PORT = process.env.PORT || 5000,
    server = undefined,
    socket = undefined,

    /**
     * Connection server answer

    serverAnswer = function(req, res) {

        // Send HTML headers and message
        res.writeHead(200,{ 'Content-Type': 'text/html' });
        res.end('<h1>Socket connected!</h1>');
    },
    */


    /**
     * Client connection callback
     */
    onConnectionCallback = function (client) {
    
        // If not exists a player 1, create it
        console.log("Someone connected.");
        //console.log(client);
        client.broadcast.emit('msg', 'Someone connected');
        client.on('message', function (msg, info){
            console.log(msg);
            client.broadcast.emit('msg', msg);
            //client.send(msg);
        });

        client.on('disconnect', onDisconnect);
    },

    onDisconnect = function () {
        console.log('Someone disconnected');
    };

    /**
     * Initialization method. Bind the server and socket events
     */
    (function() {

        // Start the server
        //server = http.createServer(serverAnswer);
        //server.listen(PORT); // Define socket port to listen 
        //console.log("Starting server on port: " + PORT);

        app.use(express.static(__dirname + "/"));
        server = http.createServer(app);
        server.listen(PORT);
        console.log("http server listening on %d", PORT);


        // Instantiate socket.io using the created server
        socket = io.listen(server);
        socket.on('connection', onConnectionCallback);
    })();


    /* NameSpace Public Methods */
    return {
        server: server
    }
})();
