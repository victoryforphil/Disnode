var logger = require('disnode-logger');
const CommandManager = require ('./commandmanager');
const PluginManager   = require ("./pluginmanager");

class ServerManager{
  constructor(disnode){

    this.disnode   = disnode;
    this.commandManagers = [];
    this.pluginManagers  = [];
    this.DBManagers      = [];

  }

  GetCommandInstance(server){
    var self = this;

    var _checkInstance = self.CheckForCommandInstance(server);

    if(_checkInstance != null){
      return _checkInstance;
    }

    var _newInstance = new CommandManager(self.disnode,server);
    self.instances.push(_newInstance);

    logger.Success("ServerManager", "GetCommandInstance", "CommandManager Created: " + server)

    return _newInstance;


  }

  GetPluginInstance(server){
    var self = this;

    var _checkInstance = self.CheckForPluginInstance(server);

    if(_checkInstance != null){
      return _checkInstance;
    }

    var _newInstance = new PluginManager(self.disnode,server);
    self.instances.push(_newInstance);

    logger.Success("ServerManager", "GetCommandInstance", "PluginManager Created: " + server)

    return _newInstance;


  }

  CheckForCommandInstance(server){
    var self = this;

    for (var i = 0; i < self.commandManagers.length; i++) {
      var instance = self.commandManagers[i];
      if(instance.server = server){
        return(instance);
      }
    }

    return null;
  }

  CheckForPluginInstance(server){
    var self = this;

    for (var i = 0; i < self.pluginManagers.length; i++) {
      var instance = self.pluginManagers[i];
      if(instance.server = server){
        return(instance);
      }
    }

    return null;
  }

  CheckForDBInstance(server){
    var self = this;

    for (var i = 0; i < self.DBManagers.length; i++) {
      var instance = self.DBManagers[i];
      if(instance.server = server){
        return(instance);
      }
    }

    return null;
  }

}

module.exports = ServerManager;