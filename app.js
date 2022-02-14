const e = require('express');
var express = require('express')
var app = express()
var fs = require('fs');
// var socket = require('socket.io')
const ads_1 = require('./Server/ads/ads_1.json')
const ads_2 = require('./Server/ads/ads_2.json')
const ads_3 = require('./Server/ads/ads_3.json')
// var future = document.getElementById("future");
// var io = socket.listen(app)

app.use(express.static(__dirname + '/Server/node_modules'));
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
    res.sendFile(__dirname + `/Server/` + template + `.html`);
});


app.listen(8080, function () {
    console.log("server is listening on port 4200...");
});

// Admin LogIn
app.get('/admin', (request, response) => {
    response.sendFile(__dirname + '/Client/Login_Admin.html');
});

app.get('/admin=:userName&:passWord', (request, response) => {

    let userName = request.params.userName;
    let passWord = request.params.passWord;
    //Admindb.exists({ userName: userName.toString(), passWord: passWord.toString() }, (res, err) => {
    //if (!err) {
    //response.sendFile(__dirname + '/Client/Admin.html');
    //}
    // }
    // else {
    //     response.send('access denied');

    // }


    response.sendFile(__dirname + '/Client/Admin.html');

});

