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
      var speechOutput = "Welcome to Fortnite Loot. If you would like to know all the named locations, simply say, yes I would, or, no i wouldn't.";
      this.response.speak(speechOutput).listen("What would you like to do?");
      this.emit(':responseReady');
    },
    'QIntent': function () {
        var speechOutput;
        var no = this.event.request.intent.slots.no.value;
        var yes = this.event.request.intent.slots.yes.value;
        if("no" == no){
            speechOutput = "To select where you want to land, say: lets land at, and then your named location of choice";
        }
        if("yes" == yes){
            speechOutput = "There are 19 named locations. They are: junk junction, pleasant park, haunted hills, the block, lazy lagoon, loot lake, snobby shores, Neo tilted, shifty shafts, polar peak, frosty flights, dusty divot, mega mall, sunny steps, paradise palms, happy hamlet, pressure plant, lonely lodge and salty springs. To select where you want to land, say: lets land at, and then your named location of choice.";
        }
        this.response.speak(speechOutput).listen("What would you like to do?");
        this.emit(':responseReady');
    },
    'LocationIntent': function () {
       var speechOutput;
        var landChoice = this.event.request.intent.slots.landChoice.value;
        if("junk junction" == landChoice){
            speechOutput = "Junk Junction. Would you like to land at main building, basketball court, or construction crane?";
        }
        if("pleasant park" == landChoice){
            speechOutput = "Pleasant Park. Which house do you want to land at?";
        }
        if("haunted hills" == landChoice){
            speechOutput = "Haunted Hills. Would you like to land at the main building, or the cemetery?";
        }
        if("the block" == landChoice){
            speechOutput = "The Block has just changed, please choose a different location";
        }
        if("lazy lagoon" == landChoice){
            speechOutput = "Lazy Lagoon. Would you like to land at the boat, the dock, or the beaches?";
        }
        if("loot lake" == landChoice){
            speechOutput = "Loot Lake. Would you like to land at factories or the lake's center?";
        }
        if("snobby shores" == landChoice){
            speechOutput = "Snobby Shores. Which house do you want to land at?";
        }
        if("Neo tilted" == landChoice){
            speechOutput = "Neo Tilted. Which building do you want to land at?";
        }
        if("shifty shafts" == landChoice){
            speechOutput = "Shifty Shafts. Would you like to land at the shafts or the houses?";
        }
        if("polar peak" == landChoice){
            speechOutput = "Polar Peak. Which building do you want to land at?";
        }
        if("frosty flights" == landChoice){
            speechOutput = "Frosty FLights. Would you like to land at uppers, lowers, main, or hangars?";
        }
        if("dusty divot" == landChoice){
            speechOutput = "Dusty Divot. Would you like to land at diner or in the divot?";
        }
        if("mega mall" == landChoice){
            speechOutput = "Mega Mall. Which building do you want to land at?";
        }
        if("sunny steps" == landChoice){
            speechOutput = "Sunny Steps. Which building do you want to land at?";
        }
        if("paradise palms" == landChoice){
            speechOutput = "Paradise Palms. Which building do you want to land at?";
        }
        if("happy hamlet" == landChoice){
            speechOutput = "Happy Hamlet. Which building do you want to land at?";
        }
        if("pressure plant" == landChoice){
            speechOutput = "Pressure Plant. Do you want to land at uppers or lowers?";
        }
        if("lonely lodge" == landChoice){
            speechOutput = "Lonely Lodge. Do you want to land at the lodge or the tower?";
        }
        if("salty springs" == landChoice){
            speechOutput = "Salty Springs. Which house would you like to land at?";
        }
        var speechReprompt = "Let me say this again, this is my very first intent";
        this.response.speak(speechOutput).listen(speechReprompt);
        this.emit(':responseReady');
    },
    'LootIntent': function () {
    var speechOutput;
    var loot = ["bsolutely nothing", "bsolutely nothing", "n epic Tactical Assault Rifle", "n epic Tactical Assault Rifle", 
    " rare tactical assault rifle", " rare tactical assault rifle", " rare tactical assault rifle", " legendary tactical assault rifle", 
    "n uncommon Infantry Rifle", "n uncommon Infantry Rifle", "n uncommon Infantry Rifle", "n uncommon Infantry Rifle", " common infantry rifle", 
    " common infantry rifle"," common infantry rifle"," common infantry rifle"," common infantry rifle", " common heavy assault rifle", 
    " common heavy assault rifle"," common heavy assault rifle"," common heavy assault rifle"," common heavy assault rifle", 
    "n uncommon heavy assault rifle", "n uncommon heavy assault rifle","n uncommon heavy assault rifle","n uncommon heavy assault rifle", 
    " rare heavy assault rifle", " rare heavy assault rifle"," rare heavy assault rifle", " common assault rifle", " common assault rifle",
    " common assault rifle"," common assault rifle"," common assault rifle",  "n uncommon assault rifle", "n uncommon assault rifle",
    "n uncommon assault rifle","n uncommon assault rifle", " rare assault rifle", " rare assault rifle"," rare assault rifle", "n epic scar", 
    "n epic scar", "legendary scar", "n uncommon Drum Gun", "n uncommon Drum Gun","n uncommon Drum Gun","n uncommon Drum Gun", "rare drumgun", 
    "rare drumgun","rare drumgun", " legendary Minigun", "n epic minigun", "n epic minigun", "n uncommon semi-auto sniper rifle", 
    "n uncommon semi-auto sniper rifle","n uncommon semi-auto sniper rifle","n uncommon semi-auto sniper rifle", " rare semi auto sniper rifle", 
    " rare semi auto sniper rifle"," rare semi auto sniper rifle", " legendary suppressed Sniper Rifle", "n epic heavy sniper rifle", 
    "n epic heavy sniper rifle", "n epic Suppressed Sniper Rifle", "n epic Suppressed Sniper Rifle", " legendary heavy sniper rifle", 
    " rare Hunting Rifle", " rare Hunting Rifle"," rare Hunting Rifle", "n uncommon hunting rifle", "n uncommon hunting rifle","n uncommon hunting rifle",
    "n uncommon hunting rifle", " rare Combat Shotgun", " rare Combat Shotgun"," rare Combat Shotgun", "n epic combat shotgun", "n epic combat shotgun", 
    " legendary combat shotgun", " common Tactical Shotgun", " common Tactical Shotgun"," common Tactical Shotgun"," common Tactical Shotgun",
    " common Tactical Shotgun", "n uncommon tactical shotgun", "n uncommon tactical shotgun","n uncommon tactical shotgun","n uncommon tactical shotgun", 
    " rare tactical shotgun", " rare tactical shotgun"," rare tactical shotgun", " common flint knock pistol", " common flint knock pistol", 
    " common flint knock pistol"," common flint knock pistol"," common flint knock pistol", "n uncommon Flint-Knock Pistol", "n uncommon Flint-Knock Pistol","n uncommon Flint-Knock Pistol","n uncommon Flint-Knock Pistol", "n epic Hand Cannon", "n epic Hand Cannon", " legendary hand cannon", " pair of epic Dual Pistols", " pair of epic Dual Pistols", " pair of rare dual pistols", " pair of rare dual pistols"," pair of rare dual pistols", "n epic Suppressed Pistol", "n epic Suppressed Pistol", " rare suppressed pistol", " rare suppressed pistol"," rare suppressed pistol", " common Pistol", " common Pistol"," common Pistol"," common Pistol"," common Pistol", "n uncommon pistol", "n uncommon pistol","n uncommon pistol","n uncommon pistol", "n epic Rocket Launcher", "n epic Rocket Launcher", " rare Grenade Launcher", " rare Grenade Launcher"," rare Grenade Launcher", "n epic grenade launcher", "n epic grenade launcher", " legendary grenade launcher", " boom bow", " pair of shadow bombs", " pair of shadow bombs"," pair of shadow bombs"," pair of shadow bombs", " stack of Grenades", " stack of Grenades"," stack of Grenades"," stack of Grenades"," stack of Grenades", " stack of Dynamite", " stack of Dynamite"," stack of Dynamite"," stack of Dynamite", " stack of Stink Bombs", " stack of Stink Bombs"," stack of Stink Bombs", "slurp juice", "slurp juice", " medkit", " medkit"," medkit"," medkit", " stack of mini shield potions", " stack of mini shield potions"," stack of mini shield potions"," stack of mini shield potions", " big shield potion", " big shield potion"," big shield potion", " chug jug", " bush", " stack of bandages", " stack of bandages"," stack of bandages"," stack of bandages"," stack of bandages", " rift to go", " rift to go", " stack of redeploy", " stack of redeploy"," stack of redeploy", " campfire", " campfire"," campfire", " spike trap", " spike trap"," spike trap"," spike trap", " mounted turret", " launch pad", " launch pad", " stack of impulse grenades", " stack of impulse grenades", " stack of impulse grenades", " stack of boogie bombs", " stack of boogie bombs", " stack of boogie bombs"];  
    var loot2 = ["bsolutely nothing", "bsolutely nothing", "n epic Tactical Assault Rifle", "n epic Tactical Assault Rifle", 
    " rare tactical assault rifle", " rare tactical assault rifle", " rare tactical assault rifle", " legendary tactical assault rifle", 
    "n uncommon Infantry Rifle", "n uncommon Infantry Rifle", "n uncommon Infantry Rifle", "n uncommon Infantry Rifle", " common infantry rifle", 
    " common infantry rifle"," common infantry rifle"," common infantry rifle"," common infantry rifle", " common heavy assault rifle", 
    " common heavy assault rifle"," common heavy assault rifle"," common heavy assault rifle"," common heavy assault rifle", 
    "n uncommon heavy assault rifle", "n uncommon heavy assault rifle","n uncommon heavy assault rifle","n uncommon heavy assault rifle", 
    " rare heavy assault rifle", " rare heavy assault rifle"," rare heavy assault rifle", " common assault rifle", " common assault rifle",
    " common assault rifle"," common assault rifle"," common assault rifle",  "n uncommon assault rifle", "n uncommon assault rifle",
    "n uncommon assault rifle","n uncommon assault rifle", " rare assault rifle", " rare assault rifle"," rare assault rifle", "n epic scar", 
    "n epic scar", "legendary scar", "n uncommon Drum Gun", "n uncommon Drum Gun","n uncommon Drum Gun","n uncommon Drum Gun", "rare drumgun", 
    "rare drumgun","rare drumgun", " legendary Minigun", "n epic minigun", "n epic minigun", "n uncommon semi-auto sniper rifle", 
    "n uncommon semi-auto sniper rifle","n uncommon semi-auto sniper rifle","n uncommon semi-auto sniper rifle", " rare semi auto sniper rifle", 
    " rare semi auto sniper rifle"," rare semi auto sniper rifle", " legendary suppressed Sniper Rifle", "n epic heavy sniper rifle", 
    "n epic heavy sniper rifle", "n epic Suppressed Sniper Rifle", "n epic Suppressed Sniper Rifle", " legendary heavy sniper rifle", 
    " rare Hunting Rifle", " rare Hunting Rifle"," rare Hunting Rifle", "n uncommon hunting rifle", "n uncommon hunting rifle","n uncommon hunting rifle",
    "n uncommon hunting rifle", " rare Combat Shotgun", " rare Combat Shotgun"," rare Combat Shotgun", "n epic combat shotgun", "n epic combat shotgun", 
    " legendary combat shotgun", " common Tactical Shotgun", " common Tactical Shotgun"," common Tactical Shotgun"," common Tactical Shotgun", 
    " common Tactical Shotgun", "n uncommon tactical shotgun", "n uncommon tactical shotgun","n uncommon tactical shotgun","n uncommon tactical shotgun", 
    " rare tactical shotgun", " rare tactical shotgun"," rare tactical shotgun", " common flint knock pistol", " common flint knock pistol", 
    " common flint knock pistol"," common flint knock pistol"," common flint knock pistol", "n uncommon Flint-Knock Pistol", "n uncommon Flint-Knock Pistol","n uncommon Flint-Knock Pistol","n uncommon Flint-Knock Pistol", "n epic Hand Cannon", "n epic Hand Cannon", " legendary hand cannon", " pair of epic Dual Pistols", " pair of epic Dual Pistols", " pair of rare dual pistols", " pair of rare dual pistols"," pair of rare dual pistols", "n epic Suppressed Pistol", "n epic Suppressed Pistol", " rare suppressed pistol", " rare suppressed pistol"," rare suppressed pistol", " common Pistol", " common Pistol"," common Pistol"," common Pistol"," common Pistol", "n uncommon pistol", "n uncommon pistol","n uncommon pistol","n uncommon pistol", "n epic Rocket Launcher", "n epic Rocket Launcher", " rare Grenade Launcher", " rare Grenade Launcher"," rare Grenade Launcher", "n epic grenade launcher", "n epic grenade launcher", " legendary grenade launcher", " boom bow", " pair of shadow bombs", " pair of shadow bombs"," pair of shadow bombs"," pair of shadow bombs", " stack of Grenades", " stack of Grenades"," stack of Grenades"," stack of Grenades"," stack of Grenades", " stack of Dynamite", " stack of Dynamite"," stack of Dynamite"," stack of Dynamite", " stack of Stink Bombs", " stack of Stink Bombs"," stack of Stink Bombs", "slurp juice", "slurp juice", " medkit", " medkit"," medkit"," medkit", " stack of mini shield potions", " stack of mini shield potions"," stack of mini shield potions"," stack of mini shield potions", " big shield potion", " big shield potion"," big shield potion", " chug jug", " bush", " stack of bandages", " stack of bandages"," stack of bandages"," stack of bandages"," stack of bandages", " rift to go", " rift to go", " stack of redeploy", " stack of redeploy"," stack of redeploy", " campfire", " campfire"," campfire", " spike trap", " spike trap"," spike trap"," spike trap", " mounted turret", " launch pad", " launch pad", " stack of impulse grenades", " stack of impulse grenades", " stack of impulse grenades", " stack of boogie bombs", " stack of boogie bombs", " stack of boogie bombs"];  
    var randomNum1 = Math.floor(Math.random()*72);
    var randomNum2 = Math.floor(Math.random()*72);
    var enLoot = loot[randomNum1];
    var urLoot = loot2[randomNum2];
    speechOutput = "You picked up a" + urLoot + " and a nearby enemy picked up a" + enLoot + " . Good luck in the battle!" ;
    this.response.speak(speechOutput).listen();
    this.emit(':responseReady');
    },
    'SessionEndedRequest':function() {
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
