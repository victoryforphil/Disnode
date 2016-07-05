var DisnodeBot = require("../DisnodeLib/Disnode.js"); //defines DisnodeBot
// above is testing require use require("disnode"); instead if you installed via NPM

var testBot = new DisnodeBot(""); //Defines the testBot in the "" is where your discord bot oauth token would go
var botCommands = {}; //defines an object for local bot commands
testBot.on("Bot_Ready", function(){ //event emitter called when the bot is ready for init
    console.log('[TEST_BOT - BotReady] Bot Ready.');
    testBot.enableVoiceManager({voiceEvents:true}); //enables voice manager required for audio player

    //enables audio player with an object that passes a 'path(String)' and 'maxVolume(float)'
    testBot.enableAudioPlayer({path: './Audio/', maxVolume:2.0});

    //enables config manager which is a required library for loading commands
    testBot.enableConfigManager({path:"./TestBotConfig.json"});

    //loads config from previous given path and executes 'OnLoad' after loading the config
    testBot.config.manager.loadConfig(OnLoad);
});
var OnLoad = function(){
  //cleverbot functionality passed is a object containing the channel that cleverbot will speak in
  testBot.enableCleverManager({channelid:"185614233168248833"});

  //enables wolfram-alpha functionality inside "" is your APP ID from WolframAPI
  testBot.enableWolfram({key:""});

  //enables youtube manager which allows for taking youtube videos and converts them to mp3
  testBot.enableYoutubeManager();

  //enables the command handler which allows for recognizing commands from regular messages takes and object with the command prefix
  testBot.enableCommandHandler({prefix: "#"});

  //setting a command context for command written in the bot. passes in an object that contains local command functions
  testBot.command.handler.AddContext(botCommands,"testbot");

  //loads the command list pulled from the config manager
  testBot.command.handler.LoadList(testBot.config.manager.config.commands)
}

testBot.on("Bot_Init", function () { //event emitter that is called before bot ready
  console.log("[TEST_BOT - BotReady] Bot Init.");
});


testBot.on("Bot_RawMessage", function(msg){ //event emitter called when the bot obtains a message
  console.log("[TEST_BOT - RawMessage] |" + msg.author.name + " :: " + msg.content);
});
//export a function that starts the bot. this allows you to have a script that launches more than one Disnode Bot
exports.Start = function () {
  testBot.startBot();
};
//this adds a function to the botCommands to be referenced in local context when creating commands
botCommands.cmdTestContext = function(ParsedMsg){
  testBot.bot.sendMessage(ParsedMsg.msg.channel, "THIS WAS CALLED IN THIS CONTEXT " );
}