class ModerationPlugin {
  constructor() {}
  default (command) {
    var self = this;
    self.disnode.bot.SendEmbed(command.msg.channel, {
      color: 3447003,
      author: {},
      fields: [{
        name: 'Guild Moderation Commands',
        inline: false,
        value: self.helplist(command),
      }, {
        name: 'Notice',
        inline: false,
        value: "As of right now, only the **Guild Owner** can use these commands",
      }],
      footer: {}
    });
  }
  helplist(command) {
    var self = this;
    var msg = "";
    for (var i = 0; i < self.class.commands.length; i++) {
      msg += "**" + self.disnode.botConfig.prefix + self.class.config.prefix + " " + self.class.commands[i].cmd + "** - " + self.class.commands[i].desc + "\n";
    }
    return msg;
  }
  commandKick(command) {
    var self = this;
    if (command.msg.userID == self.guildOwner(command)) {
      if (command.params[0] == undefined) {
        self.disnode.bot.SendMessage(command.msg.channel, ":warning: No user has been inputed.");
      } else {
        var uid = command.params[0];
        uid = uid.replace(/\D/g, '');
        self.disnode.bot.Kick(command.msg.server, uid);
        self.disnode.bot.SendMessage(command.msg.channel, "User **" + self.U2ID(command) + "** - (" + uid + ") has been kicked.");
      }
    } else self.AccessDenied(command);
  }
  commandBan(command) {
    var self = this;
    if (command.msg.userID == self.guildOwner(command)) {
      if (command.params[0] == undefined) {
        self.disnode.bot.SendMessage(command.msg.channel, ":warning: No user has been inputed.");
      } else if (command.params[1] == undefined) {
        var uid = command.params[0];
        uid = uid.replace(/\D/g, '');
        self.disnode.bot.Ban(command.msg.server, uid);
        self.disnode.bot.SendMessage(command.msg.channel, "User **" + self.U2ID(command) + "** - (" + uid + ") has been banned.");
      } else {
        var uid = command.params[0];
        uid = uid.replace(/\D/g, '');
        self.disnode.bot.Ban(command.msg.server, uid, command.params[1]);
        self.disnode.bot.SendMessage(command.msg.channel, "User **" + self.U2ID(command) + "** - (" + uid + ") has been banned, and messages from " + command.params[1] + " day(s) deleted.");
      }
    } else self.AccessDenied(command);
  }
  commandSoftban(command) {
    var self = this;
    if (command.msg.userID == self.guildOwner(command)) {
      if (command.params[0] == undefined) {
        self.disnode.bot.SendMessage(command.msg.channel, ":warning: No user has been inputed.");
      } else {
        var uid = command.params[0];
        uid = uid.replace(/\D/g, '');
        self.disnode.bot.Ban(command.msg.server, uid, "1");
        setTimeout(function() {
          self.disnode.bot.Unban(command.msg.server, uid);
        }, 500);
        self.disnode.bot.SendMessage(command.msg.channel, "User **" + self.U2ID(command) + "** - (" + uid + ") has been softbanned, and messages from the past day deleted.");
      }
    } else self.AccessDenied(command);
  }
  commandUnban(command) {
    var self = this;
    if (command.msg.userID == self.guildOwner(command)) {
      if (command.params[0] == undefined) {
        self.disnode.bot.SendMessage(command.msg.channel, ":warning: No user has been inputed.");
      } else {
        var uid = command.params[0];
        uid = uid.replace(/\D/g, '');
        self.disnode.bot.Unban(command.msg.server, uid);
        self.disnode.bot.SendMessage(command.msg.channel, "User **" + self.U2ID(command) + "** - (" + uid + ") has been unbanned.");
      }
    } else self.AccessDenied(command);
  }
  commandMute(command) {
    var self = this;
    if (command.msg.userID == self.guildOwner(command)) {
      if (command.params[0] == undefined) {
        self.disnode.bot.SendMessage(command.msg.channel, ":warning: No user has been inputed.");
      } else {
        var uid = command.params[0];
        uid = uid.replace(/\D/g, '');
        self.disnode.bot.Mute(command.msg.server, uid);
        self.disnode.bot.SendMessage(command.msg.channel, "User **" + self.U2ID(command) + "** - (" + uid + ") has been muted.");
      }
    } else self.AccessDenied(command);
  }
  commandUnmute(command) {
    var self = this;
    if (command.msg.userID == self.guildOwner(command)) {
      if (command.params[0] == undefined) {
        self.disnode.bot.SendMessage(command.msg.channel, ":warning: No user has been inputed.");
      } else {
        var uid = command.params[0];
        uid = uid.replace(/\D/g, '');
        self.disnode.bot.Unmute(command.msg.server, uid);
        self.disnode.bot.SendMessage(command.msg.channel, "User **" + self.U2ID(command) + "** - (" + uid + ") has been unmuted.");
      }
    } else self.AccessDenied(command);
  }
  AccessDenied(command) {
    var self = this;
    self.disnode.bot.SendEmbed(command.msg.channel, {
      color: 15158332,
      author: {},
      fields: [{
        name: "Stop",
        inline: false,
        value: "**As of right now it\'s a Guild Owner command**",
      }],
      footer: {}
    });
  }
  guildOwner(command) {
    var ownerID = this.disnode.bot.client.servers[command.msg.server].owner_id;
    return ownerID;
  }
  U2ID(command) {
    var uid = command.params[0];
    uid = uid.replace(/\D/g, '');
    var mID = this.disnode.bot.client.users[uid].username;
    return mID;
  }
}
module.exports = ModerationPlugin;
// Made by Hazed SPaCE✘#2574