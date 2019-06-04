'use strict';
const Alexa = require('alexa-sdk');
const APP_ID = undefined;
const HELP_MESSAGE = 'HELP MESSAGE';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';
const FALLBACK_MESSAGE = 'I dont recognize that';
const handlers = {
    'LaunchRequest': function () {
        this.attributes.HP = 100;
        this.attributes.attack = 10;
        this.attributes.defense = 0;
        this.attributes.point = 0;
        this.attributes.death = false;
        this.attributes.bossFight = false;
        this.attributes.dragonDead = false;
      var speechOutput = "Welcome to my game, brave adventurer! You could choose to explore, upgrade stats, or check your profile. Now go and defeat the evil dragon.";
      this.response.speak(speechOutput).listen("What would you like to do?");
      this.emit(':responseReady');
    },
    'Explore': function () {
        var speechOutput;
        var randomNum2 = Math.floor(Math.random()*7);
        var randomMonsters = ["slime", "spider", "skeleton", "zombie", "troll", "drake", "lich"];
        this.attributes.monster = randomMonsters [randomNum2];
        var randomNum = Math.floor(Math.random()*9);
        var randomScenario = ["You found the dragon's lair, enter or escape?", "You see a " + this.attributes.monster + "! Attack or escape?", "You see a " + this.attributes.monster + "! Attack or escape?", "You see a " + this.attributes.monster + "! Attack or escape?", "You found a chest! Do you open it?", "You see a " + this.attributes.monster + "! Attack or escape?", "You see a " + this.attributes.monster + "! Attack or escape?", "You see a " + this.attributes.monster + "! Attack or escape?", "You found a chest! Do you open it?"];
        var scenario = randomScenario [randomNum];
        if (this.attributes.dragonDead == false && this.attributes.death == false) {
            speechOutput = scenario;
        } else if (this.attributes.death == true) {
            speechOutput = "You are dead.";
        } else if (this.attributes.dragonDead == true && this.attributes.death == false) {
            speechOutput = "You already slayed the dragon! There's no need to go exploring now.";
        }
        var speechReprompt = scenario;
        this.response.speak(speechOutput).listen(speechReprompt);
        this.emit(':responseReady');
    },
    'MonsterScenario': function () {
        var speechOutput;
        var slimeDeath = "<audio src='soundbank://soundlibrary/cartoon/amzn_sfx_boing_short_1x_01'/>";
        var spiderDeath = "<audio src='soundbank://soundlibrary/animals/amzn_sfx_rat_squeaks_01'/>";
        var skeletonDeath = "<audio src='soundbank://soundlibrary/foley/amzn_sfx_object_on_table_2x_01'/>";
        var zombieDeath = "<audio src='soundbank://soundlibrary/animals/amzn_sfx_bear_roar_small_01'/>";
        var trollDeath = "<audio src='soundbank://soundlibrary/animals/amzn_sfx_lion_roar_01'/>";
        var lichDeath = "<audio src='soundbank://soundlibrary/magic/amzn_sfx_ghost_spooky_01'/>";
        var drakeDeath = "<audio src='soundbank://soundlibrary/animals/amzn_sfx_cat_purr_02'/>";
        var attackSound = "<audio src='soundbank://soundlibrary/foley/amzn_sfx_swoosh_fast_1x_01'/>";
        var escapeSound = "<audio src='soundbank://soundlibrary/human/amzn_sfx_person_running_01'/>";
        var playerDeath = "<audio src='soundbank://soundlibrary/ui/gameshow/amzn_ui_sfx_gameshow_negative_response_02'/>";
        var playerDefense = this.attributes.defense;
        var optionAttack = this.event.request.intent.slots.attack.value;
        var optionEscape = this.event.request.intent.slots.escape.value;
        
        if (this.attributes.bossFight == false && this.attributes.monster == "slime" && optionAttack && 0 < (10 - this.attributes.defense) && 0 < this.attributes.HP - (10 - this.attributes.defense)){
            this.attributes.HP -= (10 - playerDefense);
            this.attributes.point += 2;
            speechOutput = attackSound + slimeDeath + "You took " + (10 - this.attributes.defense) + " damage and earned 2 points! You now have " + this.attributes.HP + " health and " + this.attributes.point + " unused points";
        } else if (this.attributes.bossFight == false && this.attributes.monster == "spider" && optionAttack && 0 < (20 - this.attributes.defense) && 0 < this.attributes.HP - (20 - this.attributes.defense)){
            this.attributes.HP -= (20 - this.attributes.defense);
            this.attributes.point += 3;
            speechOutput = attackSound + spiderDeath + "You took " + (20 - this.attributes.defense) + " damage and earned 3 points! You now have " + this.attributes.HP + " health and " + this.attributes.point + " unused points";
        } else if (this.attributes.bossFight == false && this.attributes.monster == "skeleton" && optionAttack && 0 < (50 - this.attributes.defense) && 0 < this.attributes.HP - (50 - this.attributes.defense)){
            this.attributes.HP -= (50 - this.attributes.defense);
            this.attributes.point += 10;
            speechOutput = attackSound + skeletonDeath + "You took " + (50 - this.attributes.defense) + " damage and earned 10 points! You now have " + this.attributes.HP + " health and " + this.attributes.point + " unused points";
        } else if (this.attributes.bossFight == false && this.attributes.monster == "zombie" && optionAttack && 0 < this.attributes.HP - 50){
            this.attributes.HP -= 50;
            this.attributes.point += 15;
            speechOutput = attackSound + zombieDeath + "You took 50 true damage and earned 15 points! You now have " + this.attributes.HP + " health and " + this.attributes.point + " unused points";
        } else if (this.attributes.bossFight == false && this.attributes.monster == "troll" && optionAttack && 0 < (100 - this.attributes.defense) && 0 < this.attributes.HP - (100 - this.attributes.defense)){
            this.attributes.HP -= (100 - this.attributes.defense);
            this.attributes.point += 40;
            speechOutput = attackSound + trollDeath + "You took " + (100 - this.attributes.defense) + " damage and earned 40 points! You now have " + this.attributes.HP + " health and " + this.attributes.point + " unused points";
        } else if (this.attributes.bossFight == false && this.attributes.monster == "drake" && optionAttack && 0 < (30 - this.attributes.defense)*10 && 0 < this.attributes.HP - (30 - this.attributes.defense)*10){
            this.attributes.HP -= (30 - this.attributes.defense)*10;
            this.attributes.point += 20;
            speechOutput = attackSound + drakeDeath + "You took " + (30 - this.attributes.defense) + " damage 10 times and earned 20 points! You now have " + this.attributes.HP + " health and " + this.attributes.point + " unused points";
        } else if (this.attributes.bossFight == false && this.attributes.monster == "lich" && optionAttack && 0 < this.attributes.HP - 300){
            this.attributes.HP -= 200;
            this.attributes.point += 50;
            speechOutput = attackSound + lichDeath + "You took 300 true damage and earned 50 points! You now have " + this.attributes.HP + " health and " + this.attributes.point + " unused points";
        } else if (this.attributes.bossFight == false && this.attributes.monster == "slime" && optionAttack && 0 >= (10 - this.attributes.defense)){
            this.attributes.point += 2;
            speechOutput = attackSound + slimeDeath + "You earned 2 points! You now have " + this.attributes.point + " unused points";
        } else if (this.attributes.bossFight == false && this.attributes.monster == "spider" && optionAttack && 0 >= (20 - this.attributes.defense)){
            this.attributes.point += 3;
            speechOutput = attackSound + spiderDeath + "You earned 3 points! You now have " + this.attributes.point + " unused points";
        } else if (this.attributes.bossFight == false && this.attributes.monster == "skeleton" && optionAttack && 0 >= (50 - this.attributes.defense)){
            this.attributes.point += 10;
            speechOutput = attackSound + skeletonDeath + "You earned 10 points! You now have " + this.attributes.point + " unused points";
        } else if (this.attributes.bossFight == false && this.attributes.monster == "troll" && optionAttack && 0 >= (100 - this.attributes.defense)){
            this.attributes.point += 40;
            speechOutput = attackSound + trollDeath + "You earned 40 points! You now have " + this.attributes.point + " unused points";
        } else if (this.attributes.bossFight == false && this.attributes.monster == "drake" && optionAttack && 0 >= (30 - this.attributes.defense)*10){
            this.attributes.point += 20;
            speechOutput = attackSound + drakeDeath + "You earned 20 points! You now have " + this.attributes.point + " unused points";
        } else if (this.attributes.bossFight == false && optionEscape){
            speechOutput = escapeSound + "You ran away!";
        } else if (this.attributes.bossFight == true && optionEscape){
            speechOutput = "You cannot run away!";
        } else if (0 >= this.attributes.HP){
            speechOutput = "You are dead.";
            this.attributes.death = true;
        } else {
            speechOutput = playerDeath + "You died from a " + this.attributes.monster;
        }
        var speechReprompt = "";
        this.response.speak(speechOutput).listen(speechReprompt);
        this.emit(':responseReady');
    },
    'ChestScenario': function () {
        var speechOutput;
        var chestSound = "<audio src='soundbank://soundlibrary/foley/amzn_sfx_wooden_door_creaks_open_01'/>";
        var goodSound = "<audio src='soundbank://soundlibrary/ui/gameshow/amzn_ui_sfx_gameshow_positive_response_01'/>";
        var badSound = "<audio src='soundbank://soundlibrary/ui/gameshow/amzn_ui_sfx_gameshow_negative_response_01'/>";
        var Yes = this.event.request.intent.slots.yes.value;
        var No = this.event.request.intent.slots.no.value;
        var randomNum = Math.floor(Math.random()*2);
        var luck = ["good", "bad"];
        var Luck = luck [randomNum];
        if (Yes && Luck == "good"){
            var add = Math.floor(Math.random()*10);
            var addpoint = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            var addPoint = addpoint [add];
            this.attributes.point += addPoint;
            speechOutput = chestSound + goodSound + "Lucky! You got " + addPoint + " points!";
        } else if (Yes && Luck == "bad"){
            var take = Math.floor(Math.random()*5);
            var takepoint = [1, 2, 3, 4, 5];
            var takePoint = takepoint [take];
            this.attributes.point -= takePoint;
            speechOutput = chestSound + badSound + "Bummer! the chest ate" + takePoint + " points from you.";
        } else if (No){
            speechOutput = "You didn't open the chest.";
        }
        
        var speechReprompt = "";
        this.response.speak(speechOutput).listen(speechReprompt);
        this.emit(':responseReady');
    },
    'Upgrade': function () {
        var speechOutput = "You could choose to upgrade your health, attack, or defense.";
        var speechReprompt = "You could choose to upgrade your health, attack, or defense.";
        this.response.speak(speechOutput).listen(speechReprompt);
        this.emit(':responseReady');
    },
    'UpgradeStats': function () {
        var speechOutput;
        var optionUpgradeHP = this.event.request.intent.slots.hp.value;
        var optionUpgradeDEF = this.event.request.intent.slots.defense.value;
        var optionUpgradeATT = this.event.request.intent.slots.attackStat.value;
        var EXPAmount = this.event.request.intent.slots.expAmount.value;
        
        if (optionUpgradeHP && 0 < this.attributes.point && 0 <= (this.attributes.point - 1*EXPAmount)){
            this.attributes.HP += 10*EXPAmount;
            this.attributes.point -= EXPAmount;
            speechOutput = "You spent " + EXPAmount + " points and increased your health by " + 10*EXPAmount;
        } else if (optionUpgradeDEF && 0 < this.attributes.point && 0 <= (this.attributes.point - 1*EXPAmount)){
            this.attributes.defense += 1*EXPAmount;
            this.attributes.point -= 1*EXPAmount;
            speechOutput = "You spent " + EXPAmount + " points and increased your defense by " + EXPAmount;
        } else if (optionUpgradeATT && 0 < this.attributes.point && 0 <= (this.attributes.point - 1*EXPAmount)){
            this.attributes.attack += 1*EXPAmount;
            this.attributes.point -= 1*EXPAmount;
            speechOutput = "You spent " + EXPAmount + " points and increased your attack by " + EXPAmount;
        } else {
            speechOutput = "You don't have enough points!";
        }
        
        var speechReprompt = "You could choose to upgrade your health or defense.";
        this.response.speak(speechOutput).listen(speechReprompt);
        this.emit(':responseReady');
    },
    'CheckProfile': function () {
        var speechOutput = "You have " + this.attributes.HP + " health, " 
        + this.attributes.attack + " attack, "
        + this.attributes.defense + " defense, and " 
        + this.attributes.point + " unused points.";
        var speechReprompt = "You could choose to upgrade your health or defense.";
        this.response.speak(speechOutput).listen(speechReprompt);
        this.emit(':responseReady');
    },
    'BossScenario': function () {
        var walkSound = "<audio src='soundbank://soundlibrary/human/amzn_sfx_human_walking_03'/>";
        this.attributes.bossFight = true;
        this.attributes.bossHP = 3000;
        this.attributes.bossATT = 300;
        this.attributes.bossDEF = 300;
        this.attributes.bossWeak = false;
        var speechOutput = walkSound + "You entered the lair! The dragon has 3000 health. You could choose to attack the dragon or find its weakness.";
        var speechReprompt = "";
        this.response.speak(speechOutput).listen(speechReprompt);
        this.emit(':responseReady');
    },
    'BossFight': function () {
        var speechOutput;
        var attackSound = "<audio src='soundbank://soundlibrary/foley/amzn_sfx_swoosh_fast_1x_01'/>";
        var fireBreathSound = "<audio src='soundbank://soundlibrary/magic/amzn_sfx_magic_blast_1x_01'/>";
        var playerDeath = "<audio src='soundbank://soundlibrary/ui/gameshow/amzn_ui_sfx_gameshow_negative_response_02'/>";
        var alreadyDead = "<audio src='soundbank://soundlibrary/ui/gameshow/amzn_ui_sfx_gameshow_negative_response_01'/>";
        var optionAttack = this.event.request.intent.slots.attackBoss.value;
        var optionAnalyze = this.event.request.intent.slots.findWeakness.value;
        var randomNum = Math.floor(Math.random()*3);
        var analyzeResult = ["success", "failure", "failure"];
        this.attributes.result = analyzeResult [randomNum];
        var randomNum2 = Math.floor(Math.random()*3);
        var bossResponse = ["attack", "skill", "heal"];
        this.attributes.bossAction = bossResponse [randomNum2];
            
        if (this.attributes.death == false && 0 < this.attributes.HP - (this.attributes.bossATT - this.attributes.defense) && 0 < this.attributes.HP && 0 < this.attributes.bossHP - (this.attributes.attack - this.attributes.bossDEF) && 0 < this.attributes.bossHP && 0 < (this.attributes.bossATT - this.attributes.defense) && this.attributes.bossAction == "attack" && this.attributes.bossFight == true && optionAttack && 0 < (this.attributes.attack - this.attributes.bossDEF)){
            this.attributes.bossHP -= (this.attributes.attack - this.attributes.bossDEF);
            this.attributes.HP -= (this.attributes.bossATT - this.attributes.defense);
            speechOutput = attackSound + "You attacked the dragon and dealt " + (this.attributes.attack - this.attributes.bossDEF) + " damage! "
            + "The dragon now has " + this.attributes.bossHP + " health left. "
            + "The dragon attacked you and dealt " + (this.attributes.bossATT - this.attributes.defense) + " damage! "
            + "You now have " + this.attributes.HP + " health left.";
        } else if (this.attributes.death == false && 0 < this.attributes.HP - (this.attributes.bossATT - this.attributes.defense) && 0 < this.attributes.HP && 0 < this.attributes.bossHP && 0 < (this.attributes.bossATT - this.attributes.defense) && this.attributes.bossAction == "attack" && this.attributes.bossFight == true && optionAttack && 0 >= (this.attributes.attack - this.attributes.bossDEF)){
            this.attributes.HP -= (this.attributes.bossATT - this.attributes.defense);
            speechOutput = attackSound + "You attacked the dragon and dealt 0 damage! "
            + "The dragon attacked you and dealt " + (this.attributes.bossATT - this.attributes.defense) + " damage! "
            + "You now have " + this.attributes.HP + " health left.";
        } else if (this.attributes.death == false && 0 < this.attributes.HP - (this.attributes.bossATT - this.attributes.defense) && 0 < this.attributes.HP && 0 < this.attributes.bossHP && 0 < (this.attributes.bossATT - this.attributes.defense) && this.attributes.bossAction == "attack" && optionAnalyze && this.attributes.result == "success") {
            this.attributes.bossWeak = true;
            this.attributes.bossDEF = 0;
            this.attributes.HP -= (this.attributes.bossATT - this.attributes.defense);
            speechOutput = "You found its weakness! Your attacks now disregard dragon's defense. "
            + "The dragon attacked you and dealt " + (this.attributes.bossATT - this.attributes.defense) + " damage! "
            + "You now have " + this.attributes.HP + " health left.";
        } else if (this.attributes.death == false && 0 < this.attributes.HP - (this.attributes.bossATT - this.attributes.defense) && 0 < this.attributes.HP && 0 < this.attributes.bossHP && 0 < (this.attributes.bossATT - this.attributes.defense) && this.attributes.bossAction == "attack" && optionAnalyze && this.attributes.result == "failure") {
            this.attributes.HP -= (this.attributes.bossATT - this.attributes.defense);
            speechOutput = "You didn't find its weakness. "
            + "The dragon attacked you and dealt " + (this.attributes.bossATT - this.attributes.defense) + " damage! "
            + "You now have " + this.attributes.HP + " health left.";
        } else if (this.attributes.death == false && 0 < this.attributes.HP - 50 && 0 < this.attributes.HP && 0 < this.attributes.bossHP - (this.attributes.attack - this.attributes.bossDEF) && 0 < this.attributes.bossHP && this.attributes.bossAction == "skill" && this.attributes.bossFight == true && optionAttack && 0 < (this.attributes.attack - this.attributes.bossDEF)){
            this.attributes.bossHP -= (this.attributes.attack - this.attributes.bossDEF);
            this.attributes.HP -= 50;
            speechOutput = attackSound + "You attacked the dragon and dealt " + (this.attributes.attack - this.attributes.bossDEF) + " damage! "
            + "The dragon now has " + this.attributes.bossHP + " health left. "
            + fireBreathSound
            + "You lost 50 health from the fire breath. "
            + "You now have " + this.attributes.HP + " health left.";
        } else if (this.attributes.death == false && 0 < this.attributes.HP - 50 && 0 < this.attributes.HP && 0 < this.attributes.bossHP && this.attributes.bossAction == "skill" && this.attributes.bossFight == true && optionAttack && 0 >= (this.attributes.attack - this.attributes.bossDEF)){
            this.attributes.HP -= 50;
            speechOutput = attackSound + "You attacked the dragon and dealt 0 damage! "
            +fireBreathSound
            + "You lost 50 health from the fire breath. "
            + "You now have " + this.attributes.HP + " health left.";
        } else if (this.attributes.death == false && 0 < this.attributes.HP - 50 && 0 < this.attributes.HP && 0 < this.attributes.bossHP && this.attributes.bossAction == "skill" && optionAnalyze && this.attributes.result == "success") {
            this.attributes.bossWeak = true;
            this.attributes.bossDEF = 0;
            this.attributes.HP -= 50;
            speechOutput = "You found its weakness! Your attacks now disregard dragon's defense. "
            + fireBreathSound
            + "You lost 50 health from the fire breath. "
            + "You now have " + this.attributes.HP + " health left.";
        } else if (this.attributes.death == false && 0 < this.attributes.HP - 50 && 0 < this.attributes.HP && 0 < this.attributes.bossHP && this.attributes.bossAction == "skill" && optionAnalyze && this.attributes.result == "failure") {
            this.attributes.HP -= 50;
            speechOutput = "You didn't find its weakness. "
            +fireBreathSound
            + "You lost 50 health from the fire breath. "
            + "You now have " + this.attributes.HP + " health left.";
        } else if (this.attributes.death == false && 0 < this.attributes.HP && 0 < this.attributes.bossHP - (this.attributes.attack - this.attributes.bossDEF) && 0 < this.attributes.bossHP && this.attributes.bossAction == "heal" && this.attributes.bossFight == true && optionAttack && 0 < (this.attributes.attack - this.attributes.bossDEF)){
            this.attributes.bossHP -= (this.attributes.attack - this.attributes.bossDEF);
            this.attributes.bossHP += 100;
            speechOutput = attackSound + "You attacked the dragon and dealt " + (this.attributes.attack - this.attributes.bossDEF) + " damage! "
            + "The dragon healed 100 health. "
            + "The dragon now has " + this.attributes.bossHP + " health left.";
        } else if (this.attributes.death == false && 0 < this.attributes.HP && 0 < this.attributes.bossHP && this.attributes.bossAction == "heal" && this.attributes.bossFight == true && optionAttack && 0 >= (this.attributes.attack - this.attributes.bossDEF)){
            this.attributes.bossHP += 100;
            speechOutput = attackSound + "You attacked the dragon and dealt 0 damage! "
            + "The dragon healed 100 health. "
            + "The dragon now has " + this.attributes.bossHP + " health.";
        } else if (this.attributes.death == false && 0 < this.attributes.HP && 0 < this.attributes.bossHP && this.attributes.bossAction == "heal" && optionAnalyze && this.attributes.result == "success") {
            this.attributes.bossWeak = true;
            this.attributes.bossDEF = 0;
            this.attributes.bossHP += 100;
            speechOutput = "You found its weakness! Your attacks now disregard dragon's defense. "
            + "The dragon healed 100 health. "
            + "The dragon now has " + this.attributes.bossHP + " health.";
        } else if (this.attributes.death == false && 0 < this.attributes.HP && 0 < this.attributes.bossHP && this.attributes.bossAction == "heal" && optionAnalyze && this.attributes.result == "failure") {
            this.attributes.bossHP += 100;
            speechOutput = "You didn't find its weakness. "
            + "The dragon healed 100 health. "
            + "The dragon now has " + this.attributes.bossHP + " health.";
        } else if (this.attributes.death == false && 0 < this.attributes.HP && 0 < this.attributes.bossHP - (this.attributes.attack - this.attributes.bossDEF) && 0 < this.attributes.bossHP && 0 >= (this.attributes.bossATT - this.attributes.defense) && this.attributes.bossAction == "attack" && this.attributes.bossFight == true && optionAttack && 0 < (this.attributes.attack - this.attributes.bossDEF)){
            this.attributes.bossHP -= (this.attributes.attack - this.attributes.bossDEF);
            speechOutput = attackSound + "You attacked the dragon and dealt " + (this.attributes.attack - this.attributes.bossDEF) + " damage! "
            + "The dragon now has " + this.attributes.bossHP + " health left. "
            + "The dragon attacked you and dealt 0 damage.";
        } else if (this.attributes.death == false && 0 < this.attributes.HP && 0 < this.attributes.bossHP && 0 >= (this.attributes.bossATT - this.attributes.defense) && this.attributes.bossAction == "attack" && this.attributes.bossFight == true && optionAttack && 0 >= (this.attributes.attack - this.attributes.bossDEF)){
            speechOutput = attackSound + "You attacked the dragon and dealt 0 damage! "
            + "The dragon attacked you and dealt 0 damage.";
        } else if (this.attributes.death == false && 0 < this.attributes.HP && 0 < this.attributes.bossHP && 0 >= (this.attributes.bossATT - this.attributes.defense) && this.attributes.bossAction == "attack" && optionAnalyze && this.attributes.result == "success") {
            this.attributes.bossWeak = true;
            this.attributes.bossDEF = 0;
            speechOutput = "You found its weakness! Your attacks now disregard dragon's defense. "
            + "The dragon attacked you and dealt 0 damage.";
        } else if (this.attributes.death == false && 0 < this.attributes.HP && 0 < this.attributes.bossHP && 0 >= (this.attributes.bossATT - this.attributes.defense) && this.attributes.bossAction == "attack" && optionAnalyze && this.attributes.result == "failure") {
            speechOutput = "You didn't find its weakness. "
            + "The dragon attacked you and dealt 0 damage.";
        } else if (this.attributes.death == false && 0 < this.attributes.HP && 0 >= this.attributes.bossHP - (this.attributes.attack - this.attributes.bossDEF) || 0 >= this.attributes.bossHP) {
            this.attributes.dragonDead = true;
            speechOutput = "Congradulations brave adventurer! You have slayed the dragon and saved your homeland!"
        } else if (0 >= this.attributes.HP) {
            this.attributes.death = true;
            speechOutput = alreadyDead + "You are already dead!";
        } else if (this.attributes.death == false && 0 >= this.attributes.HP - (this.attributes.bossATT - this.attributes.defense) && this.attributes.bossAction == "attack") {
            this.attributes.HP = 0;
            this.attributes.death = true;
            speechOutput = playerDeath + "You died to stomping.";
        } else if (this.attributes.death == false && 0 >= this.attributes.HP - 50 && this.attributes.bossAction == "skill") {
            this.attributes.HP = 0;
            this.attributes.death = true;
            speechOutput = fireBreathSound + playerDeath + "You died to a fire breath.";
        }
        
        var speechReprompt = "";
        this.response.speak(speechOutput).listen(speechReprompt);
        this.emit(':responseReady');
    },
    
    'AMAZON.HelpIntent': function () {
        var speechOutput = "You could choose to explore, upgrade stats, or check your profile.";
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

//=========================================================//
// Editing anything below this line might break your skill //
//=========================================================//

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
