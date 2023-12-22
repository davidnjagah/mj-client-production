import "dotenv/config";
import { IFS, IFSBot, Midjourney } from "../src";
import { sleep } from "../src/utils";
/**
 *
 * a simple example of how to use the blend
 * ```
 * npx tsx example/full-morph.ts
 * ```
 */
async function main() {

  const client = new Midjourney({
    ServerId: <string>process.env.SERVER_ID,
    ChannelId: <string>process.env.CHANNEL_ID,
    SalaiToken: <string>process.env.SALAI_TOKEN,
    Debug: true,
    Ws: true,
  });

  const clientIFS = new IFS({
      ServerId: <string>process.env.SERVER_ID,
      ChannelId: <string>process.env.CHANNEL_ID,
      SalaiToken: <string>process.env.SALAI_TOKEN,
      BotId: IFSBot, // IFSBot
      Debug: true,
  });

  const savedimageUri = `https://utfs.io/f/6fec6712-9a9b-4484-8eeb-3301c7120896-mood6h.jpg`;
  const prompt = "an east african kenyan man who is a little bit buff with east african hair that is neatily shaven into a fade haircut and he has on a black business suit with black shirt and black tie.";
  const saveId = "david7";
  const amount = "1"
  await client.Connect();

    
    const Imagine = await client.Imagine(prompt, (uri: string, progress: string) => {
        console.log("Imagine loading", uri, "progress", progress);
    });

    if (!Imagine) {
        console.log("No image returned from Imagine.");
        return;
    }

    console.log("Imagine response:", Imagine);

    const U1 = await client.Upscale({
      index: 1,
      msgId: <string>Imagine.id,
      hash: <string>Imagine.hash,
      flags: Imagine.flags,
      content: Imagine.content,
      loading: (uri: string, progress: string) => {
        console.log("loading", uri, "progress", progress);
      },
    });

    const U2 = amount.includes("2") ? await client.Upscale({
      index: 2,
      msgId: <string>Imagine.id,
      hash: <string>Imagine.hash,
      flags: Imagine.flags,
      content: Imagine.content,
      loading: (uri: string, progress: string) => {
        console.log("loading", uri, "progress", progress);
      },
    }) : null;

    const U3 = amount.includes("3") ? await client.Upscale({
      index: 3,
      msgId: <string>Imagine.id,
      hash: <string>Imagine.hash,
      flags: Imagine.flags,
      content: Imagine.content,
      loading: (uri: string, progress: string) => {
        console.log("loading", uri, "progress", progress);
      },
    }) : null;

    const U4 = amount.includes("4") ? await client.Upscale({
      index: 4,
      msgId: <string>Imagine.id,
      hash: <string>Imagine.hash,
      flags: Imagine.flags,
      content: Imagine.content,
      loading: (uri: string, progress: string) => {
        console.log("loading", uri, "progress", progress);
      },
    }) : null;

    console.log(U1);

    if (!U1) {
      console.log("No response from Upscale.");
      return;
    }

    await clientIFS.Connect();

    const saveidmsg = await clientIFS.SaveId( savedimageUri, (uri) => {
      console.log("loading123---", uri);
    });

    if (!saveidmsg) {
        console.log("No response returned from saveid.");
        return;
    }

    const swapidmsg = await clientIFS.SwapId( U1.uri, saveidmsg.rid,  (uri) => {
      console.log("loading123---", uri);
    })

    if (!swapidmsg) {
      console.log("No response returned from saveid.");
      return;
    }

    console.log("This is the SwapId Message", swapidmsg);

    await clientIFS.delId(saveidmsg.rid)

    console.log("idname", saveidmsg.rid, "has been deleted" );
}
main()
  .then(() => {
    console.log("Done");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });