import {
  DefaultMJConfig,
  DefaultIFSConfig,
  LoadingHandler,
  MJConfig,
  MJConfigParam,
  IFSMessage,
} from "./interfaces";
import { MidjourneyApi } from "./midjourney.api";
import { InsightFaceSwapApi } from "./insightfaceswap.api";
import {
  nextNonce,
  random,
} from "./utils";
import { IFSWsMessage } from "./discord.ifsws";
import { IFSDiscordMessage } from "./discord.ifsmessage";

export class IFS extends IFSDiscordMessage  {
  public config: MJConfig;
  private wsClient?: IFSWsMessage;
  public MJApi: MidjourneyApi;
  public IFSApi: InsightFaceSwapApi;
  constructor(defaults: MJConfigParam) {
    const { SalaiToken } = defaults;
    if (!SalaiToken) {
      throw new Error("SalaiToken are required");
    }
    super(defaults);
    this.config = {
      ...DefaultMJConfig,
      ...defaults,
    };
    this.MJApi = new MidjourneyApi(this.config);
    this.IFSApi = new InsightFaceSwapApi(this.config);
  }
  async Connect() {
    if (!this.config.Ws) {
      return this;
    }
    //if auth failed, will throw error
    if (this.config.ServerId) {
      await this.MJApi.getCommand("settings");
    } else {
      await this.MJApi.allCommand();
    }
    if (this.wsClient) return this;
    this.wsClient = new IFSWsMessage(this.config, this.IFSApi);
    await this.wsClient.onceReady();
    return this;
  }
  async init() {
    await this.Connect();
    const settings = await this.Settings();
    if (settings) {
      // this.log(`settings:`, settings.content);
      const remix = settings.options.find((o) => o.label === "Remix mode");
      if (remix?.style == 3) {
        this.config.Remix = true;
        this.log(`Remix mode enabled`);
      }
    }
    return this;
  }

  async SaveId(imageUri: string, loading?: LoadingHandler){
    if (!this.config.Ws) {
      const seed = random(1000000000, 9999999999);
      imageUri = `[${seed}] ${imageUri}`;
    } else {
      await this.getWsClient();
    }

    const nonce = nextNonce();
    const DcImage = await this.MJApi.UploadImageByUri(imageUri);
    const nonceid = nonce.split(' ')[0];
    console.log("This is nonceid", nonceid);
    const rid = `${Math.trunc(Math.random()*10000000000)}`;
    //const rid = '4997180084';
    this.log(`SaveId`, rid, DcImage, "nonce", nonce);
    const saveIdRes = `idname ${rid} created`
    
    const httpStatus = await this.IFSApi.saveIdApi(rid, DcImage, nonce);
    //console.log(httpStatus);
    if (httpStatus !== 204) {
      throw new Error(`savedIdApi failed with status ${httpStatus}`);
    }
    if (this.wsClient) {
      return await this.wsClient.waitSaveIdMessage({ nonce, rid: rid, saveidres: saveIdRes, loading });
    } else {
      this.log(`await generate image`);
      const msg = await this.WaitIFSMessage(saveIdRes, loading);
      this.log(`image generated`, imageUri);
      return msg;
    }
  }

  async SwapId(imageUri: string, rid: string, loading?: LoadingHandler) {
    if (!this.config.Ws) {
      const seed = random(1000000000, 9999999999);
      imageUri = `[${seed}] ${imageUri}`;
    } else {
      await this.getWsClient();
    }

    const nonce = nextNonce();
    const regex = /^(.*\.(png|jpg))/;
    const match = imageUri.match(regex);

    if (match && match[1]) {
      // Return the part of the URL up to the .png or .jpg
      imageUri = match[1];
    } else {
      // Return the original URL if no match is found (or if it doesn't end with .png)
      imageUri = imageUri;
    }
    console.log(imageUri);
    const DcImage = await this.MJApi.UploadImageByUri(imageUri);
    this.log(`SwapId`, rid, DcImage, "nonce", nonce);

    const httpStatus = await this.IFSApi.swapIdApi(rid, DcImage, nonce);
    //console.log(httpStatus);
    if (httpStatus !== 204) {
      throw new Error(`swapIdApi failed with status ${httpStatus}`);
    }
    if (this.wsClient) {
      return await this.wsClient.waitSwapIdMessage({ nonce, loading, rid });
    } else {
      this.log(`await generate image`);
      const msg = await this.WaitSwapIdMessage(imageUri, loading);
      this.log(`image generated`, imageUri);
      return msg;
    }
  }

  async delId(idname: string) {
    const nonce = nextNonce();
    this.log(`DelId`, idname, "nonce", nonce);
    
    const httpStatus = await this.IFSApi.delIdApi(idname, nonce);
    if (httpStatus !== 204) {
      throw new Error(`delIdApi failed with status ${httpStatus}`);
    }
  }

  // check ws enabled && connect
  private async getWsClient() {
    if (!this.config.Ws) {
      throw new Error(`ws not enabled`);
    }
    if (!this.wsClient) {
      await this.Connect();
    }
    if (!this.wsClient) {
      throw new Error(`ws not connected`);
    }
    return this.wsClient;
  }



  async Settings() {
    const wsClient = await this.getWsClient();
    const nonce = nextNonce();
    const httpStatus = await this.MJApi.SettingsApi(nonce);
    if (httpStatus !== 204) {
      throw new Error(`ImagineApi failed with status ${httpStatus}`);
    }
    return wsClient.waitSettings();
  }
  async Reset() {
    const settings = await this.Settings();
    if (!settings) {
      throw new Error(`Settings not found`);
    }
    const reset = settings.options.find((o) => o.label === "Reset Settings");
    if (!reset) {
      throw new Error(`Reset Settings not found`);
    }
    const httpstatus = await this.MJApi.CustomApi({
      msgId: settings.id,
      customId: reset.custom,
      flags: settings.flags,
    });
    if (httpstatus !== 204) {
      throw new Error(`Reset failed with status ${httpstatus}`);
    }
  }

  async Info() {
    const wsClient = await this.getWsClient();
    const nonce = nextNonce();
    const httpStatus = await this.MJApi.InfoApi(nonce);
    console.log(httpStatus);
    if (httpStatus !== 204) {
      throw new Error(`InfoApi failed with status ${httpStatus}`);
    }
    return wsClient.waitInfo();
  }

  async Fast() {
    const nonce = nextNonce();
    const httpStatus = await this.MJApi.FastApi(nonce);
    if (httpStatus !== 204) {
      throw new Error(`FastApi failed with status ${httpStatus}`);
    }
    return null;
  }
  async Relax() {
    const nonce = nextNonce();
    const httpStatus = await this.MJApi.RelaxApi(nonce);
    if (httpStatus !== 204) {
      throw new Error(`RelaxApi failed with status ${httpStatus}`);
    }
    return null;
  }

  Close() {
    if (this.wsClient) {
      this.wsClient.close();
      this.wsClient = undefined;
    }
  }
}
