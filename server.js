/**
 * Created by jdrilla on 3/28/17.
 */
var express  = require('express');
var app      = express();;
var path = require('path');

//var __dirname = path.resolve(path.dirname(''));

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for use

// application -------------------------------------------------------------
app.get('*', function(req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

app.listen(8180);
console.log("App listening on port 8180");