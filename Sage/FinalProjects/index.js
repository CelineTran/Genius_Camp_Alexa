'use strict'; 
const Alexa = require('alexa-sdk');
const APP_ID = undefined;
const HELP_MESSAGE = 'HELP MESSAGE';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';
const FALLBACK_MESSAGE = 'I dont recognize that';
var ItemNames = ["", "Minecraft", "Brownie at Flik", "Jeff Bezos' Net Worth", "Porsche Cayenne S", "iPad Mini 5", "Vans Old Skool", "the Hope Diamond", "1000 V-Bucks", "Tesla Model X", "Grande Pumpkin Spice Latte", "One Ounce of Gold", "JK Rowling's chair"];
var ItemPrices = [0, 26.95, 2, 146300000000, 65700, 399, 60, 350000000, 10, 82000, 4.95, 1318, 394000 ];
var CurrentNumber = 1;
var PlayerOneName; 
var PlayerTwoName; 
var PlayerOneScore = 0;
var PlayerTwoScore = 0;
var accuracy; 
const handlers = {
    'LaunchRequest': function () {
      accuracy = 0;
      var speechOutput = "Welcome to guess the price! This is a two player game. Each player will guess the price of a different item, and the more accurate player wins! Guesses must be whole numbers. Player One, what is your name? ";
      this.response.speak(speechOutput).listen("Say that again?");
      this.emit(':responseReady');
    },
    'PlayerOneNameIntent': function () {
        PlayerOneName = this.event.request.intent.slots.PlayerOneName.value;
        var speechOutput = "Now what is the second player's name?";
        var speechReprompt = "Let me say this again, this is my very first intent";
        this.response.speak(speechOutput).listen(speechReprompt);
        this.emit(':responseReady');
    },
    'PlayerTwoNameIntent': function () {
        PlayerTwoName = this.event.request.intent.slots.PlayerTwoName.value;
        this.emit('QuestionIntent');
    },
    'QuestionIntent': function () {
        var speechOutput; 
        speechOutput = " Your percent error is " + ((Math.floor(accuracy*100) / 100) * 100) + " percent. "; 
        if (CurrentNumber == 13)
        {
            this.emit('DisplayScoresIntent');
        }
        if (CurrentNumber % 2 == 1)
        {
            speechOutput += "Player One, " + PlayerOneName + ", your item is " + ItemNames[CurrentNumber] + ". ";
        }
        else if (CurrentNumber % 2 == 0)
        {
            speechOutput += "Player Two, " + PlayerTwoName + ", your item is " + ItemNames[CurrentNumber] + ". ";
        }
        var speechReprompt = "Let me say this again, this is my very first intent";
        this.response.speak(speechOutput).listen(speechReprompt);
        this.emit(':responseReady');
    },
        'GetGuessIntent': function () {
        if (CurrentNumber % 2 == 1)
        {
            var PlayerOneGuess = this.event.request.intent.slots.Guess.value;
            accuracy = Math.abs((ItemPrices[CurrentNumber] -  PlayerOneGuess)/ItemPrices[CurrentNumber]);
            accuracy = (Math.floor(accuracy*100))/100;
            PlayerOneScore = PlayerOneScore + accuracy;
        }
        else if (CurrentNumber % 2 == 0)
        {
            var PlayerTwoGuess = this.event.request.intent.slots.Guess.value;
            accuracy = Math.abs((ItemPrices[CurrentNumber] -  PlayerTwoGuess)/ItemPrices[CurrentNumber]);
            accuracy = (Math.floor(accuracy*100))/100;
            PlayerTwoScore = PlayerTwoScore + accuracy;
        }
        CurrentNumber++;
        this.emit('QuestionIntent');
    },
    'DisplayScoresIntent': function () {
        var speechOutput;
        if (PlayerOneScore < PlayerTwoScore)
        {
            speechOutput = "Game over! Player One Wins! Player One's total error was " + PlayerOneScore*100 + " percent, and Player Two's total error was " + PlayerTwoScore*100 + " percent. ";
        }
        else
        {
            speechOutput = "Game over! Player Two Wins! Player One's total error was " + PlayerOneScore*100 + " percent, and Player Two's total error was " + PlayerTwoScore* + " percent. ";
        }
        

        var speechReprompt = "Let me say this again, this is my very first intent";
        this.response.speak(speechOutput).listen(speechReprompt);
        this.emit(':responseReady');
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
exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
