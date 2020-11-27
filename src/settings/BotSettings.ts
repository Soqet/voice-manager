import mongoose from 'mongoose';
import settingsModel from './models/settingsModel'

interface IserverSettings {
  [server: string]: Isettings
}

export interface Isettings {
  prefix: string,
  category?: string,
  channel?: string,
  role?: string
}

interface IsettingsUpdate {
  prefix?: string,
  category?: string,
  channel?: string,
  role?: string
}

export default class BotSettings {
  private settings: IserverSettings = {};
  private isReady: boolean = false;

  constructor(private uri: string) {
    this.settings['default'] = { prefix: '!' };
  }

  async setup() {
    if (!this.isReady) {
      await mongoose.connect(this.uri, {useNewUrlParser: true, useUnifiedTopology: true});
      for await (let document of settingsModel.find()) {
        let object = document.toObject();
        this.settings[object.server] = { 
          prefix: object.prefix, 
          category: object.category, 
          channel: object.channel, 
          role: object.role
        }
      }
      this.isReady = true;
    }
  }

  async createSettings(server: string) {
    //console.log('foo in');
    this.settings[server] = this.settings['default'];
    const newSettings = new settingsModel({
      server: server,
      prefix: this.settings['default'].prefix,
      category: String(this.settings['default'].category),
      channel: String(this.settings['default'].channel)
    });
    //console.log(newSettings.toObject(), server);
    await newSettings.save();
    //console.log('foo out');
  }

  async updateSettings(server: string, settings: IsettingsUpdate) {
    let document = await settingsModel.findOne({ server: server });
    if (document == undefined) return false;
    await document.updateOne(settings);
    for(let key of Object.keys(settings)) {
      (this.settings[server] as any)[key] = (settings as any)[key]
    }
  }


  getSettings(server: string) {
    return this.settings[server]; 
  }

}