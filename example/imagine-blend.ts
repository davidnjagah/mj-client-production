import "dotenv/config";
import { Midjourney } from "../src";
/**
 *
 * a simple example of how to use the blend
 * ```
 * npx tsx example/blend.ts
 * ```
 */
async function main() {
  const client = new Midjourney({
    ServerId: <string>process.env.SERVER_ID,
    ChannelId: <string>process.env.CHANNEL_ID,
    SalaiToken: <string>process.env.SALAI_TOKEN,
    Debug: true,
  });
  await client.Connect();
  const msg = await client.Imagine(
    "https://media.discordapp.net/attachments/1183363774523121674/1183364229143740427/IMG_20231210_130000.jpg https://media.discordapp.net/attachments/1183363774523121674/1183364229848371210/IMG_20231210_130022.jpg https://media.discordapp.net/attachments/1183363774523121674/1183364230670471278/IMG_20231210_130032.jpg https://media.discordapp.net/attachments/1183363774523121674/1183364231391875122/IMG_20231210_130038.jpg https://media.discordapp.net/attachments/1183363774523121674/1183364232151056415/IMG_20231210_130042.jpg a man in a black suite with black shirt and tie and is looking at the camera, super realistic, high definition",
    (uri: string, progress: string) => {
      console.log("loading", uri, "progress", progress);
    }
  );
  console.log({ msg });
  if (!msg) {
    console.log("no message");
    return;
  }
  const msg2 = await client.Upscale({
    index: 2,
    msgId: <string>msg.id,
    hash: <string>msg.hash,
    flags: msg.flags,
    content: msg.content,
    loading: (uri: string, progress: string) => {
      console.log("loading", uri, "progress", progress);
    },
  });
  console.log({ msg2 });
}
main().catch((err) => {
  console.error(err);
  process.exit(1);
});
