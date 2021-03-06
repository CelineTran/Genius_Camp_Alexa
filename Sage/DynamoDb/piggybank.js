'use strict';
const Alexa = require('alexa-sdk');
const AWS = require('aws-sdk'); 
var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'}); 

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this: const APP_ID = 'amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1';
const APP_ID = undefined;

//Alexa will speak out the help message when a user says help
//For an idea of what you should say
//-> "You can say tell me a space fact, or, you can say exit... What can I help you with?"
const HELP_MESSAGE = 'HELP MESSAGE';
const HELP_REPROMPT = 'What can I help you with?';

//Alexa will speak out the stop message when the program ends
const STOP_MESSAGE = 'Goodbye!';
const FALLBACK_MESSAGE = 'I dont recognize that';

var money = 0; 

const handlers = {
    'LaunchRequest': function () {
      var speechOutput = "Welcome to Celine's PiggyBank! You can add names and add money";
      this.response.speak(speechOutput).listen("What would you like to do?");
      this.emit(':responseReady');
    },
    'AddName': function () {
        var newName = this.event.request.intent.slots.myName.value; 
        var params = {
            Item: {
                "Name": {S: newName},
                "Amount": {N: "0"}
            },
            TableName: "CelinesPiggybank"
        };
        dynamodb.putItem(params, function(err,data){
            if(err){
                console.log(err, err.stack); 
            }
            else {
                console.log(data); 
            }
        });
        var speechOutput = "Added " + newName + " to your piggybank!";
        var speechReprompt = "Let me say this again, this is my very first intent";
        this.response.speak(speechOutput).listen(speechReprompt);
        this.emit(':responseReady');
    },
    'AddMoney': function () {
        var name = this.event.request.intent.slots.myName.value; 
        var newMoney = this.event.request.intent.slots.money.value; 
        getData(name).then((money) => {
            var newAmount = (+money) + (+newMoney); 
            var params = {
                Item: {
                    "Name": {S: name},
                    "Amount": {N: newAmount.toString()}
                },
                TableName: "CelinesPiggybank"
            };
            dynamodb.putItem(params, function(err, data){
                if(err){
                    console.log(err,err.stack); 
                }
                else{
                    console.log(data); 
                }
            });
            var speechOutput = "Added " + newMoney + " dollars to " + name + "'s account! "; 
            speechOutput += "There is now " + newAmount + " in your account"; 
            var speechReprompt = "Let me say this again, this is my very first intent";
            this.response.speak(speechOutput).listen(speechReprompt);
            this.emit(':responseReady');
        })
        .catch((error) => {
            console.log(error);
            var speechOutput = "There was an error with that";
            var speechReprompt = "Let me say this again, this is my very first intent";
            this.response.speak(speechOutput).listen(speechReprompt);
            this.emit(':responseReady');
        }); 
    },
    'RemoveName': function () {
        var newName = this.event.request.intent.slots.myName.value; 
        var params = {
            Key: {
                "Name": {S: newName},
            },
            TableName: "CelinesPiggybank"
        };
        dynamodb.deleteItem(params, function(err,data){
            if(err){
                console.log(err, err.stack); 
            }
            else {
                console.log(data); 
            }
        });
        var speechOutput = "Ok removed " + newName + " from your piggybank";
        var speechReprompt = "Let me say this again, this is my very first intent";
        this.response.speak(speechOutput).listen(speechReprompt);
        this.emit(':responseReady');
    },
    'GetMoney': function () {
        var name = this.event.request.intent.slots.name.value; 
        getData(name)
        .then( (money) => {
            var speechOutput = "There is " + money + " dollars in " + name + "'s account!"; 
            this.response.speak(speechOutput).listen(""); 
            this.emit(':responseReady'); 
        })
        .catch( (err) => {
            console.log(err); 
            var speechOutput = "There was an error with that"; 
            this.response.speak(speechOutput).listen(""); 
            this.emit(':responseReady'); 
        }); 
    },
    'SubtractMoney': function () {
        var newMoney = this.event.request.intent.slots.money.value; 
        var name = this.event.request.intent.slots.name.value; 
        var speechOutput; 
        getData(name)
        .then( (money) =>{
            var newAmount = (+money) - (+newMoney); 
            var params = {
                TableName: "Piggybank", 
                Item: {
                    "Name": {S: name},
                    "Amount": {N: newAmount.toString()}
                }
            }; 
            dynamodb.putItem(params, function(err,data){
                if(err) console.log(err, err.stack); 
                else console.log(data); 
            }); 
            speechOutput = "Subtracted " + newMoney + " from " + name + "'s account! ";
            speechOutput += "There is now " + newAmount + " in your account."; 
            this.response.speak(speechOutput).listen("");
            this.emit(':responseReady');
        })
        .catch( (error) => {
            console.log(error); 
            speechOutput = "There was an error with that"; 
            this.response.speak(speechOutput).listen(""); 
            this.emit(':responseReady'); 
        }); 
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
     'AMAZON.FallbackIntent': function () {
        this.response.speak(FALLBACK_MESSAGE).listen(HELP_REPROMPT);
        this.emit(':responseReady');
    },
};

//=========================================================================================================================================
//Editing anything below this line might break your skill.
//=========================================================================================================================================

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

function getData(name){
    var params = {
        Key: {
            "Name": {S: name}
        },
        TableName: "CelinesPiggybank",
        ProjectionExpression : 'Amount'
    };
    
    return new Promise((resolve, reject) => {
        dynamodb.getItem(params, function(err, data){
            if(err){
                console.log(err); 
            }
            else {
                money = data.Item.Amount.N; 
                resolve(money); 
                console.log(data); 
            }
        });
    });
}
