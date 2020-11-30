
import { Client, Guild, Message, User, VoiceState, GuildMember } from 'discord.js';
import BotSettings from '../settings/BotSettings';


interface ImethodsList {
  [method: string]: Function 
}



enum callCode {
  success = 0,
  fail = 1,
  nothing = 2
}

interface ICallResult {
  code: callCode;
  message: string;
}

export default class BotCore  {

  private methodsList: ImethodsList = {};

  constructor(private bot: Client, private botSettings: BotSettings, private token: string) {
    this.methodsList['setPrefix'] = this.setPrefix;
    //this.methodsList['setDefaultSettings'] = this.setDefaultSettings;
    this.methodsList['setChannel'] = this.setChannel;
  }

  async setup() {
    await this.botSettings.setup();
    
    this.bot.login(this.token);
    
    this.bot.on("ready", async () => {console.log(this.bot.user!.username + " started")});
    
    this.bot.on('message', async (message) => {
      let result = await this.onMessage(message);
      if(result.code != callCode.nothing) {
        if(result.code == callCode.success) message.channel.send(result.message);
        else message.channel.send(result.message);
      }
    });

    this.bot.on('voiceStateUpdate', (oldState, newState) => {
      this.onVoiceStateUpdate(oldState, newState);
    })
  }

  async onVoiceStateUpdate (oldState: VoiceState, newState: VoiceState) {
    if (!newState.member?.user.bot && newState.channelID == this.botSettings.getSettings(newState.guild.id).channel) {
      let newChannel = await newState.guild.channels.create(`${newState.member!.user.username}'s channel`, { 
        type: 'voice', 
        parent: newState.channel?.parent?.id,
        permissionOverwrites: [ 
          {id: newState.member!.id, allow: 292553745, type: 'member'},
          {id: newState.guild.roles.everyone, deny: 1048576, type: 'role'},
          {id: (newState.guild.member(this.bot.user!.id) as GuildMember), allow: 1049648, type: 'member'}
        ]
      });
      await newState.setChannel(newChannel);
    }
    if (!newState.member?.user.bot 
      && oldState.channel?.parentID == this.botSettings.getSettings(oldState.guild.id).category 
      && oldState.channel?.members.size == 0 
      && oldState.channelID != this.botSettings.getSettings(oldState.guild.id).channel
    ) {
      await oldState.channel.delete();
    }
    return {code: callCode.nothing, message: 'nothing happened'};
  }

  async setPrefix(message: Message, args?: Array<string>): Promise<ICallResult> {

    let result;
    try{
      if (args != undefined) { 
        result = await this.botSettings.updateSettings(message.guild!.id, {prefix: !!args[0] ? args[0] : ''});
      }
      console.log(`Successful seting a prefix on ${message.guild!.id} (${message.guild!.name}).`);
      return {code: callCode.success, message: 'Success.'};
    } catch {
      console.log(`Failed to set a prefix on ${message.guild!.id} (${message.guild!.name}).`);
      return {code: callCode.fail, message: 'Fail.'}
    }
  }

  async setDefaultSettings(message: Message, args: Array<string>) {
    //console.log(this.botSettings);
    //console.log(server);
    //console.log(message);
    let result;
    try {
      result =  await this.botSettings.createSettings(message.guild!.id);
      console.log(`Successful seting default settings on ${message.guild!.id} (${message.guild!.name}).`);
      return {code: callCode.success, message: 'Success.'};
    } catch {
      console.log(`Failed to set default settings on ${message.guild!.id} (${message.guild!.name}).`);
      return {code: callCode.fail, message: 'Fail.'};
    }
  }

  
  async onMessage(message: Message): Promise<ICallResult> {
      if(message.author.username != this.bot.user!.username && message.author.discriminator != this.bot.user!.discriminator) { // && 
        if(message.guild != null){
          const settings = this.botSettings.getSettings(message.guild.id);
          let prefix: string;
          if(settings == undefined) {
            prefix = this.botSettings.getSettings('default').prefix;
            this.setDefaultSettings(message, []);
          } else prefix = settings.prefix;
          const content = message.content.substring(prefix.length);
          if (message.content.startsWith(prefix)) {
            const command = content.split(/\s/)[0];
            //console.log(this.botSettings);
            const isHavePermissions = await this.checkRoles(message.guild!.member(message.author) as GuildMember);
            if(this.methodsList.hasOwnProperty(command) && isHavePermissions.code == callCode.success) { 
              return await this.methodsList[command].call(this, message, content.split(/\s/).slice(1));
            }
            else {
              if (isHavePermissions.code == callCode.fail) {
                return isHavePermissions;
              } else {
                return {code: callCode.fail, message: 'Undefined command.'}
              }
            }
          }
        }
      }
    return {code: callCode.nothing, message: 'nothing happened'}
  }

  async setChannel(message: Message, args: Array<string>): Promise<ICallResult> {
    let result;
    try{
        result = await this.botSettings.updateSettings(message.guild!.id, { 
          channel: String(message.guild!.member(message.author)!.voice.channelID), 
          category:  String(message.guild!.member(message.author)!.voice.channel!.parentID)
        });
        console.log(`Successful seting a channel on ${message.guild!.id} (${message.guild!.name}).`);
        return {code: callCode.success, message: 'Success.'};
    } catch {
      console.log(`Failed to set a channel on ${message.guild!.id} (${message.guild!.name}).`);
      return {code: callCode.fail, message: 'Fail.'};
    }
  }
/*
  async setRole(message: Message, args: Array<string>) {
    let result;
    try{
        result = await this.botSettings.updateSettings(message.guild!.id, { 
          role: 
        });
        return callResult.success
    } catch {
      return callResult.fail
    }
  }
*/
  async checkRoles(user: GuildMember) {
    let result;
    const adminPermission = 8;
    try{
      console.log()
      if(user.id == user.guild.ownerID) return {code: callCode.success, message: 'Success.'};
      const roles = user.roles.cache;
      for(let role of roles.keyArray()) {
        console.log(roles.get(role)?.permissions.bitfield, (roles.get(role)?.permissions.bitfield as any as number) & adminPermission);
        if((roles.get(role)?.permissions.bitfield as any as number) & adminPermission) {
          return {code: callCode.success, message: 'Success.'}
        }
      }
      return {code: callCode.fail, message: "You don't have permissions for that command."};
    } catch (error) {
      console.log(error);
      return {code: callCode.fail, message: "You don't have permissions for that command."};
    }
  }
  
}