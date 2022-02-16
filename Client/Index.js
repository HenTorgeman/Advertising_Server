

$(document).ready(function () {
    console.log("Ready");
});

document.getElementById("login").addEventListener("click", e => {

    var user_name = document.getElementById("username").value;
    var user_pass = document.getElementById("userpass").value;

    console.log(user_name);
    console.log(user_pass);

    if (user_name == "" || user_pass == "")
        alert("Cant log in wothout values");
    else {


        $.ajax({
            url: "http://localhost:8080/ClientLogIn=" + user_name + '&' + user_pass,
            type: "GET",
            success: (data) => {
                console.log(data);
                alert('LogedIn');
                reset_page();
            },
            error: function (err) {
                console.log(err);
            }
        });


    }


});

function reset_page() {
    document.getElementById("login").style.display = "none";

}

// $(document).ready(function () {

//     msgInA = 0;
//     var msg = [];
//     var id = prompt('pick a screen');
//     let passWord = "";

//     console.log("id");
//     console.log(id);

//     $.ajax({

//         url: "https://localhost:8080/checkUser=" + id,
//         type: "GET",
//         success: (usr) => {

//             console.log("Back from server");
//             console.log(usr);

//             if (usr == []) {
//                 $('#tempA').html("user does not exist");
//                 return;
//             }

//             if (usr.connected)
//                 validUser();
//             else {

//                 passWord = prompt('enter pass word');
//                 if (passWord == usr.passWord) {

//                     logIn();
//                     validUser();
//                 } else {
//                     $('#tempA').html("incorrect password")
//                 }
//             }
//         },
//         error: function (err) {
//             console.log("Error");
//             console.log(err);
//         }
//     });

//     function logIn() {

//         $.ajax({
//             url: "http://localhost:8080/userLogIn=" + id,
//             type: "GET"
//         });
//     }

//     function validUser() {

//         $.ajax({
//             url: "http://localhost:8080/screen=" + id,
//             type: "GET",
//             success: function (arr) {
//                 $('user').innerText = "Hello User " + id;
//                 $('#changePaswwordBttn').show();
//                 $('#logOut').show();
//                 msg = arr;
//                 rend();
//             },
//             error: function (err) {
//                 console.log(err);
//             }
//         });
//     }


//     function rend() {

//         checkMessage = msg.shift();

//         if (checkMessage == undefined)
//             return;
//         else
//             displayMessage(checkMessage);

//         setTimeout(rend, 1000 * parseInt(checkMessage.length));
//     }


//     function displayMessage(msg) {

//         if (msg == null)
//             return;


//         if (msg.template == 'A') {

//             $.ajax({
//                 url: "http://localhost:8080/template=" + 'A',
//                 type: "GET",
//                 success: function (file) {

//                     msgInA = msg;
//                     $("#tempA").html(file);
//                 },
//                 error: function (err) {
//                     console.log(err);
//                 }
//             });
//         }
//         if (msg.template == 'B') {

//             $.ajax({
//                 url: "http://localhost:8080/template=" + 'B',
//                 type: "GET",
//                 success: function (file) {
//                     msgInB = msg;
//                     $("#tempA").html(file);
//                 },
//                 error: function (err) {
//                     console.log(err);
//                 }
//             });
//         }
//         if (msg.template == 'C') {

//             $.ajax({
//                 url: "localhost:8080/template=" + 'C',
//                 type: "GET",
//                 success: function (file) {
//                     msgInC = msg;
//                     $("#tempA").html(file);
//                 },
//                 error: function (err) {
//                     console.log(err);
//                 }
//             });
//         }
//     }

//     $('#logOut').click(() => {

//         $.ajax({
//             url: "http://localhost:8080/userLogOut=" + id,
//             type: "GET"
//         });

//         $('#tempA').hide();
//         $('#changePaswwordBttn').hide();
//         $('#logOut').hide();
//     });

//     $('#changePaswwordBttn').click(() => {

//         const newPassWord = prompt('choose a new password');
//         if (newPassWord == null)
//             return;


//         $.ajax({
//             url: "http://localhost:8080/userPassWordChange=" + id + '&' + newPassWord,
//             type: "GET",
//             success: (response) => {
//                 alert(response);
//             }
//         });
//     });


// });


