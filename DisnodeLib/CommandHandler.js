"use strict"
// Command Handler Controls and Parses Every Message against a list of Commands/
// Consider the dispatcher of your app

class CommandHandler{
  // Set Inital Varibles
  // Prefix: The Command Prefix for this list.
  // List: List of Command Objects

  constructor(prefix,list){
    this.prefix = prefix;
    this.list = list;
  }

  // Parse the message and run any commands it contains
  RunMessage(msg){
    // Get the prefix
    var msgContent = msg.content;
    var firstLetter = msgContent.substring(0,1)

    // Check if it is the prefix, else ignore
    if(firstLetter == this.prefix){
      var command = "";

      // Check if the message has a space, require for command parsing
      if(CheckSpace(msgContent)){
        // Get command string as anything before the first space
        command = msgContent.substring(1,msgContent.indexOf(" "));
        console.log(command);
      }else {
        // Get the command as just the string (minus the prefix)
        command = msgContent.substring(1);
      }

      // Check if command is registered
      if(CheckForCommand(command, this.list)){
        // Get the command
        var commandObject = GetCommand(command, this.list);
        // Run the command
        commandObject.run(msg, GetParmas(msgContent));
      }
    }
  }
}

function CheckSpace(toCheck){
  if(toCheck.indexOf(" ") != -1){
    return true;
  }
  else{
    return false;
  }
}

function CheckForCommand(toSearch, list){
  for (var i = 0; i < list.length; i++) {
    if(list[i].cmd == toSearch){
      return true;
    }
  }
  return false;
}

function GetCommand(toSearch, list){
  var returnCommand;
  for (var i = 0; i < list.length; i++) {
    if(list[i].cmd == toSearch){
      returnCommand = list[i];
    }
  }
  return returnCommand;
}

function GetParmas(raw){
  var parms = [];
  var lastSpace;
  var end;
  while(!end){
    var beginSpace = raw.indexOf(" ", lastSpace + 1);
    var endSpace = raw.indexOf(" ", beginSpace + 1);
    if(endSpace == -1){
      endSpace = raw.length;
      end= true;
    }
    var pam = raw.substring(beginSpace + 1, endSpace);
    parms.push(pam);
    lastSpace = beginSpace;
  }
  return parms;
}
module.exports.CommandHandler = CommandHandler;
