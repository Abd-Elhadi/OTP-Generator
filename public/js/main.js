const numberInput = document.getElementById("number");
const otpInput = document.getElementById("otp");
const textInput = document.getElementById("msg");
const button = document.getElementById("button");
const response = document.querySelector(".response");
const confirm = document.getElementById("confirm");

button.addEventListener("click", send, false);
confirm.addEventListener("click", verify, false);

var givenOTP;

const socket = io();
socket.on('smsStatus', function(data){
  if(data.error){
    response.innerHTML = '<h5>Text message sent to ' + data.error + '</h5>';
  }else{
    response.innerHTML = '<h5>Text message sent to ' + data.number + '</h5>';
  }
});

socket.on('verStatus', function(data){
    if(data.error){
      response.innerHTML = '<h5>' + data.err + '</h5>';
    }else{
      response.innerHTML = '<h5>' + data + '</h5>';
    }
});


function send(){
    const number = numberInput.value.replace(/\D/g, '');
    const text = textInput.value;

    fetch('/', {
        method: 'post',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({number: number, text: text})
    })
    .then(function(res){
        console.log(res);
    })
    .catch(function(err) {
        console.log(err);
    });
}

function verify (req, res){
    // console.log("Req.data: " + otpInput.value.replace(/\D/g, ''));
    const otp = otpInput.value.replace(/\D/g, '');
    fetch('/verify', {
        method: 'post',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({otp: otp})
        // body: JSON.stringify({msg: msg})
    })
    .then(function(res){
        console.log(otp);
        // console.log(req.body);
        // console.log(req.body);
        // console.log(msg);
        // console.log("main: " + res);
        // return res.json();
        // response.innerHTML = res.json;
        //response.innerHTML = '<h5> Figure it out </h5>';
        // console.log(res);
    })
    // .then(function(data) {
    //     // `data` is the parsed version of the JSON returned from the above endpoint.
    //     console.log(data);  // { "userId": 1, "id": 1, "title": "...", "body": "..." }
    //   })
    .catch(function(err) {
        console.log(err);
    });

    // alert("Hellllooooo")
    // if(req.body.otp == otp){
    //     console.log("Success")
    //     res.send("You has been successfully registered");
    // }
    // else{
    //     console.log("Failure");
    //     res.render('otp',{msg : 'otp is incorrect'});
    // }
}