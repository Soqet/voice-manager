import { Client } from 'discord.js';
import BotCore from './bot/BotCore';
import BotSettings from './settings/BotSettings';
import 'dotenv/config';

const {
  token,
  uri
} = process.env;


console.log(token, uri);
if (token == undefined || uri == undefined) throw new Error('pizda ti daun, gde token ili uri');

let botSettings = new BotSettings(uri as string);

let client: Client;
do {
  client = new Client();
} while(client == null)

//console.log('ku');

let botCore = new BotCore(client, botSettings, token);

botCore.setup();