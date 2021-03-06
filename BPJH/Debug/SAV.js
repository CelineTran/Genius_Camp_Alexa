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
      var speechOutput = "Welcome to Celine's Madlib! Let's being with a name. All the utterances will follow " +
      "'The blank I choose is '. First give me a name.";
      this.response.speak(speechOutput).listen("What would you like to do?");
      this.emit(':responseReady');
    },
    'NameIntent': function () {
        var name = this.event.intent.slots.myName; 
        var speechOutput = "Great! Now give me a fruit that you love to eat.";
        var speechReprompt = "Let me say this again, this is my very first intent";
        this.response.speak(speechOutput).listen(speechReprompt);
        this.emit(':responseReady');
    },
    'FruitIntent': function () {
        this.attribute.fruit = "banana"; 
        var speechOutput = "Kinda gross but let's move on. Now give me a friend's name.";
        var speechReprompt = "Let me say this again, this is my very first intent";
        this.response.speak(speechOutput); 
        this.emit(':responseReady');
    },
    'FriendIntnent': function () {
        friend = myFriend; 
        var speechOutput = "Oooh! Sounds perfect! Lastly, give me your least favorite animal.";
        var speechReprompt = "Let me say this again, this is my very first intent";
        this.response.speak(speechOutput).listen(speechReprompt);
        this.emit(':responseReady');
    },
    'Animal Intent': function () {
        this.attributes.animal = this.event.intent.request.myAnimal.value; 
        var speechOutput = "One day name was riding on a " + this.atributes.animal + " eating a " + fruit + 
        ". When out of nowhere, a mighty figure appears out of the shadow. " + name + " frantically tries to hide behind the "
        + animal " only for " + friend + " to come running by snatching the " + this.attribute.fruit + " as a dinosaur stomps on "
        + name + " until " + " name they were nothing more than a " + fruit;
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
