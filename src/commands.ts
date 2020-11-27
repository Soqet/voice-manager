import { Client } from "discord.js";

import {
  Message
} from 'discord.js';

interface Command {
  name: string;
  command: Function;
  help: string
}

export class Commands {

  bot: Client;
  commands: Array<Command> = [
    {name: 'setVoiceChannel', command: this.setVoiceChannel, help: 'set voice channel'}
  ]

  constructor (bot: Client){
    this.bot = bot;
  }

  setVoiceChannel(message: Message, args: string) {
    

    
  }
}