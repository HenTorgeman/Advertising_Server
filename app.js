var express = require('express')
var app = express()
const process = require('process')
const args = process.argv
const userName = args[2]
const pass = args[3]
const port = "8080";


const Messagedb = require('./Server/schemas_models/Ads');
const Admindb = require('./Server/schemas_models/Admin');
const Usersdb = require('./Server/schemas_models/User');

var mongoose = require('mongoose');
var mongoDB = "mongodb+srv://" + userName + ':' + pass + "@cluster0.6ykyw.mongodb.net/Ads_DB?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(makeDB())
    .then(() => app.listen(8080))
    .then(console.log("connected to mongo and server listening on port 8080"));


app.use(express.static(__dirname + '/node_modules'));

async function makeDB() {

    await Admindb.deleteMany({});
    await Messagedb.deleteMany({});
    await Usersdb.deleteMany({});

    Admindb.create({ userName: "eden", passWord: "123" });
    Admindb.create({ userName: "hen", passWord: "123" });
    Admindb.create({ userName: "bar", passWord: "123" });

    Usersdb.create({ userName: "1", password: "123", isConnected: false });
    Usersdb.create({ userName: "2", password: "123", isConnected: false });
    Usersdb.create({ userName: "3", password: "123", isConnected: false });

    const msgArr = require('./Server/Ads.json');
    Messagedb.insertMany(msgArr);
    return;
}

app.get('/Client', (request, response) => {

    response.sendFile(__dirname + '/Client/Index.html');

});

//Get all Massages from screen id
app.get('/ClientLogIn=:user_name&:user_pass', function (request, response) {

    console.log("Clicked");
    const user_name = request.params.user_name;
    const user_pass = request.params.user_pass;

    Usersdb.findOne({ userName: userName, password: user_pass })
        .then((usr) =>
            response.send(usr)).catch(err => {
                console.log(err);
            });
});

// app.get('/checkUser=:user', (request, response) => {

//     const userName = request.params.user;

//     Usersdb.findOne({ userName: userName })
//         .then((usr) => response.send(usr));
// });


//Get all Massages from screen id
app.get('/screen=:id', function (request, response) {

    const screen = request.params.id;
    Messagedb.find({ clientId: screen.toString() })
        .then((obj) => { response.send(obj) });
});

//Update Massage after editing
app.get('/updateMessage=:messageText&:messageTime&:msgID&:screenID&:newScreen', function (request, response) {

    const messageText = request.params.messageText;
    const messageTime = request.params.messageTime;
    const messageID = request.params.msgID;
    const screenID = request.params.screenID;
    const newScreen = request.params.newScreen;

    Messagedb.findById(messageID, (err, success) => {

        if (success) {

            success.clientId = newScreen;
            success.txt = messageText;
            success.interval = messageTime;
            success.save();

        }
        else {
            response.send(err);
        }
    });
    response.send(true);
});

//Add Massage to Screen 
app.get('/addNewMessage=:text&:duration&:id', function (request, response) {

    const messageText = request.params.text;
    const messageTime = request.params.duration;
    const screenID = request.params.id;


    Messagedb.create({ clientId: screenID.toString(), txt: messageText, interval: messageTime });

    response.send(true);
});

//Delete Massage From db 
app.get('/deleteMessage=:id', function (request, response) {

    const messageId = request.params.id;
    console.log(messageId);

    Messagedb.findById(messageId, (err, success) => {


        Messagedb.deleteOne(success);
        response.send(true);


    });
    response.send(err);

});

// Admin page
app.get('/admin', (request, response) => {
    response.sendFile(__dirname + '/Client/Login_Admin.html');
});

// Admin Login process
app.get('/admin=:userName&:passWord', (request, response) => {

    let userName = request.params.userName;
    let passWord = request.params.passWord;

    Admindb.exists({ userName: userName.toString(), passWord: passWord.toString() }, (res, err) => {
        if (!err) {
            response.send('access denied');
        }
        else {
            response.sendFile(__dirname + '/Client/Admin.html');
        }
    });
});

//Admin Edit name and password
app.get('/adminPassChange=:userName&:passWord&:newUser&:newPass', (request, response) => {

    let userName = request.params.userName;
    let passWord = request.params.passWord;
    let newUser = request.params.newUser;
    let newPass = request.params.newPass;

    Admindb.findOne({ userName: userName.toString(), passWord: passWord.toString() })
        .then((obj) => {

            if (obj == null) {
                response.send('user does not exist, failed to update');
                return;
            }

            obj.userName = newUser;
            obj.passWord = newPass;
            obj.save();
            response.send('user was updated');
        })
});



