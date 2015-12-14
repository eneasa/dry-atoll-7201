/**
 * The Server namespace
 */
var Server = (function(){

    var PORT = 5555,

        http = require('http'),
        io = require('socket.io'),

        server = undefined,
        socket = undefined,
        person = undefined,

        /**
         * Connection server answer
         */
        serverAnswer = function(req, res) {

            // Send HTML headers and message
            res.writeHead(200,{ 'Content-Type': 'text/html' });
            res.end('<h1>Socket connected!</h1>');
        },



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
                if(msg == 'image') {
                    client.broadcast.emit('image', info);
                    //console.log(info);
                }
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
            server = http.createServer(serverAnswer);
            server.listen(PORT); // Define socket port to listen 

            console.log("Starting server on port: " + PORT);

            // Instantiate socket.io using the created server
            socket = io.listen(server);
            socket.on('connection', onConnectionCallback);
        })();


        /* NameSpace Public Methods */
        return {
            server: server
        }
})();
