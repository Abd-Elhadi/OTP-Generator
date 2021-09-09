const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const socketio = require("socket.io");

// init Vonage
const Vonage = require('@vonage/server-sdk')

const vonage = new Vonage({
  apiKey: "a6645d18",
  apiSecret: "hBIq4S3OTFLBIugq"
})


var generatedOTP = null;

// Init app
const app = express();

// Template engine setup
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

// Public folder setup
app.use(express.static('public'));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Index route
app.get('/', (req, res) => {
    res.render('index');
});

// Catch form submit
app.post('/', (req, res) => {
    res.send(req.body);
    console.log(req.body);
    const number = req.body.number;
    const text = req.body.text;

    const from = "OTP Generator";
    const to = number;
    const otp = Math.floor(Math.random()*90000) + 10000;
    generatedOTP = otp;
    console.log("The OTP is: " + otp)
    const message = 'Your OTP number is: ' + otp;

    // vonage.message.sendSms(from, to, message, {type: 'unicode'}, (err, responseData) => {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         if(responseData.messages[0]['status'] === "0") {
    //             console.log("Message sent successfully.");
    //             // Get data from response
    //             const data = {
    //                 id: responseData.messages[0]['message-id'],
    //                 number: responseData.messages[0]['to'],
    //             };
        
    //             // Emit to the client
    //             io.emit('smsStatus', data);
    //         } else {
    //             console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
    //         }
    //     }
    // })
});

// Catch form confirm
app.post('/verify', function(req, res){
    const otp = req.body.otp;
    if(otp == generatedOTP){
        //console.alert("Success")
        const data = 'Authentication completed';
              
        // Emit to the client
        io.emit('verStatus', data);
        // console.log("Matched");
        // console.log(req.body);
        // res.send("Authentication completed");
    }
    else{
        // console.log("Not Matched");
        const data = 'OTP is incorrect';
              
        // Emit to the client
        io.emit('verStatus', data);
        console.log(req.body);
        // res.render('otp', {msg : 'otp is incorrect'});
    }
}); 

/// Define port
const port = 3000;

// Start server
const server = app.listen(port, () => console.log(`Server started on port ${port}`));

// Connect to socket.io
const io = socketio(server);
io.on('connection', (socket) => {
  console.log('Connected');
  io.on('disconnect', () => {
    console.log('Disconnected');
  })
});
