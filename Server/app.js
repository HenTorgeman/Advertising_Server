var express = require('express')
var app = express()
var fs = require('fs');
// var socket = require('socket.io')
const ads_1 = require('./ads/ads_1.json')
const ads_2 = require('./ads/ads_2.json')
const ads_3 = require('./ads/ads_3.json')
// var future = document.getElementById("future");
// var io = socket.listen(app)

app.use(express.static(__dirname + '/node_modules'));
app.get('/screen=:id', function (req, res) {
    const id = req.params.id
    var template = ""
    var ads = null
    switch (id) {
        case '1':
            ads = ads_1;
            template = "template1"
            break;
        case '2':
            ads = ads_2;
            template = "template2"
            break;

    }
    // const html = fs.readFileSync(`./ads/Templates/` + template + `.html`, 'utf8')
    // res.json({ html: html, ads: ads })רקד
    res.sendFile(__dirname + `/` + template + `.html`);
});


app.listen(4200, function () {
    console.log("server is listening on port 4200...");
});