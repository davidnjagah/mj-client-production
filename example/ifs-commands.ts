import "dotenv/config";
import { IFSBot, Midjourney } from "../src";
/**
 *
 * a simple example of how to use the blend
 * ```
 * npx tsx example/save-id.ts
 * ```
 */
async function main() {
  const client = new Midjourney({
    ServerId: <string>process.env.SERVER_ID,
    ChannelId: <string>process.env.CHANNEL_ID,
    SalaiToken: <string>process.env.SALAI_TOKEN,
    BotId: IFSBot, // IFSBot
    Debug: true,
  });
  const imageUri = `https://media.discordapp.net/attachments/1183363774523121674/1183364229143740427/IMG_20231210_130000.jpg`;
  const saveId = "test1";
  await client.Connect();
  const msg = await client.SaveId( saveId, imageUri, 
    (uri: string, progress: string) => {
    console.log("loading", uri, "progress", progress);
    });
  console.log({ msg });
  if (!msg) {
    console.log("no message");
    return;
  }
}
main().catch((err) => {
  console.error(err);
  process.exit(1);
});
