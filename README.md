# OTP-Generator
Node.js app that uses Vonage to send OTP text messages

### Version
1.0.0

## Usage

### Installation

Install the dependencies

```sh
$ npm install
```

### Serve
To serve in the browser

```sh
$ npm start
```

## App Info

### Vonage API Keys
You will need to add your own Vonage api key and secret number

OTP verification is done in the following steps:

1. A unique number is created with the phone number and then sent to the user. 

2. The user receives the OTP via SMS. 

3. The user enters back the number. 

4. The server verifies the entered number and returns a message back.

### Author

Abd Elhadi Omar

### Version

1.0.0
