'use strict';
const Alexa = require('alexa-sdk');

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

const handlers = {
    'LaunchRequest': function () {
      var speechOutput = "Don't know what to eat? Let me help. First, do you possibly have any noodles? Answer with I have or don't have noodles ";
      this.response.speak(speechOutput).listen("What would you like to do?");
      this.emit(':responseReady');
    },
    'NoodleIntent': function () {
        var speechOutput;
        var NoodleAnswer = this.event.request.intent.slots.NoodleAnswer.value;
        if(NoodleAnswer == "have"){
            speechOutput = "How about sauce? Answer with I have sauce or I don't have sauce. ";
        }    
        else if(NoodleAnswer == "don't have"){
            speechOutput = "Okay, do you have any bread?";
        }
        var speechReprompt = "Let me say this again, this is my very first intent";
        this.response.speak(speechOutput).listen(speechReprompt);
        this.emit(':responseReady');
    },
    'SauceIntent': function () {
        var speechOutput;
        var SauceAnswer = this.event.request.intent.slots.SauceAnswer.value;
        if(SauceAnswer == "have"){
            speechOutput = "Sounds like you can have pasta. Get cooking! ";
        }    
        else if(SauceAnswer == "don't have"){
            speechOutput = "Okay, do you have any bread? Answer yes or no ";
        }
        var speechReprompt = "Let me say this again, this is my very first intent";
        this.response.speak(speechOutput).listen(speechReprompt);
        this.emit(':responseReady');
    },    
    'BreadIntent': function () {
        var speechOutput;
        var answer = this.event.request.intent.slots.answer.value;
        if(answer == "yes"){
            speechOutput = "Sounds like you can make a sandwich. Let's see what type you can make. Okay, do you have cheese? Answer with I have that, or I don't have that. ";
        }    
        else if(answer == "no"){
            speechOutput = "Maybe check your freezer or pantry to see if you have any food you want . But if you don't have or want that, then I guess that means this is a good time to tell you about my new favorite app, Postmates. Postmates is the largest, most reliable on-demand delivery and pickup platform. Use code MEALTIME for 100 dollars in delivery fee credit. With the largest on-demand network in the industry, you can explore your city, find its hidden hotspots, and watch as we bring your new favorites right to your door. Download the Postmates app for iOS or Android for free now! You'll thank me later ";
        }
        var speechReprompt = "Let me say this again, this is my very first intent";
        this.response.speak(speechOutput).listen(speechReprompt);
        this.emit(':responseReady');
    },
    'CheeseIntent': function () {
        var speechOutput;
        var cheeseAnswer = this.event.request.intent.slots.cheeseAnswer.value;
        if(cheeseAnswer == "have"){
            speechOutput = "Do you have the meats? Answer with we have or don't have the meats. " ;
        }    
        else if(cheeseAnswer == "don't have"){
            speechOutput = "Hmm, do you have peanut butter and jelly? Answer with I have or don't have those. ";
        }
        var speechReprompt = "Let me say this again, this is my very first intent";
        this.response.speak(speechOutput).listen(speechReprompt);
        this.emit(':responseReady');  
    },
    'MeatIntent': function () {
        var speechOutput;
        var MeatAnswer = this.event.request.intent.slots.MeatAnswer.value;
        if(MeatAnswer == "have"){
            speechOutput = "Make a sandwich with whatever meat and cheese you have. Feel free to add condiments or any other things. " ;
        }    
        else if(MeatAnswer == "don't have"){
            speechOutput = "Ok, you can make a grilled cheese. Get cooking! ";
        }
        var speechReprompt = "Let me say this again, this is my very first intent";
        this.response.speak(speechOutput).listen(speechReprompt);
        this.emit(':responseReady');      
    },
    'PBJIntent': function () {
        var speechOutput;
        var PBJanswer = this.event.request.intent.slots.PBJanswer.value;
        if(PBJanswer == "have"){
            speechOutput = "There's your answer! A simple spell, yet quite unbreakable. " ;
        }    
        else if(PBJanswer == "don't have"){
            speechOutput = "Just make some toast then, or check your pantry or freezer. But before you do that let me tell you about my new favorite app, Postmates. Postmates is the largest, most reliable on-demand delivery and pickup platform. Use code MEALTIME for 100 dollars in delivery fee credit. With the largest on-demand network in the industry, you can explore your city, find its hidden hotspots, and watch as we bring your new favorites right to your door. Download the Postmates app for iOS or Android for free now! You'll thank me later ";
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

//=========================================================================================================================================
//Editing anything below this line might break your skill.
//=========================================================================================================================================

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
