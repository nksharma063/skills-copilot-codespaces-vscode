// create web server
// handles requests and sends responses
// listens on port 3000
// node comments.js

// 1. create server
// 2. handle requests
// 3. send responses

var http = require('http');
var fs = require('fs');

var comments = [
    {
        name: "John",
        message: "I like pie."
    },
    {
        name: "Jane",
        message: "I like cake."
    }
];

// create server
var server = http.createServer(function (req, res) {
    console.log('Request was made: ' + req.url);
    // handle requests
    if (req.url === '/home' || req.url === '/') {
        // send response
        res.writeHead(200, { 'Content-Type': 'text/html' });
        fs.createReadStream(__dirname + '/index.html').pipe(res);
    } else if (req.url === '/comments') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(comments));
    } else if (req.url === '/comments/add' && req.method === 'POST') {
        var body = '';
        req.on('data', function (data) {
            body += data;
        });
        req.on('end', function () {
            var comment = JSON.parse(body);
            comments.push(comment);
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(JSON.stringify(comments));
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        fs.createReadStream(__dirname + '/404.html').pipe(res);
    }
});

server.listen(3000, localhost);