import "dotenv/config";
import { IFSBot, Midjourney } from "../src";

async function main() {
  try {
    const client = new Midjourney({
      ServerId: <string>process.env.SERVER_ID,
      ChannelId: <string>process.env.CHANNEL_ID,
      SalaiToken: <string>process.env.SALAI_TOKEN,
      Debug: true,
      Ws: true,
    });

    const swapId = "david4";

    await client.Connect();
    console.log("Client initialized.");

    const prompt = "an east african kenyan man who is a little bit buff with east african hair that is neatily shaven into a fade haircut and he has on a black business suit with black shirt and black tie.";

    const Imagine = await client.Imagine(prompt, (uri: string, progress: string) => {
      console.log("Imagine loading", uri, "progress", progress);
    });

    if (!Imagine) {
      console.log("No image returned from Imagine.");
      return;
    }

    console.log("Imagine response:", Imagine);

    const U1CustomID = Imagine.options?.find((o) => o.label === "U1")?.custom;
    if (!U1CustomID) {
      console.log("No U1 option found.");
      return;
    }

    const Upscale = await client.Custom({
      msgId: <string>Imagine.id,
      flags: Imagine.flags,
      customId: U1CustomID,
      loading: (uri: string, progress: string) => {
        console.log("Upscale loading", uri, "progress", progress);
      },
    });
    if (!Upscale) {
      console.log("No response from Upscale.");
      return;
    }
    
    console.log("Upscale response:", Upscale);

    const msg = await client.SwapId( swapId, Upscale.uri, 
      (uri: string, progress: string) => {
      console.log("loading", uri, "progress", progress);
      });
    console.log( msg );
    if (!msg) {
      console.log("no message");
      return;
    }

  } catch (error) {
    console.error("Error occurred:", error);
  } finally {
    console.log("Main function completed.");
  }
}

main()
  .then(() => {
    console.log("Done");
    //process.exit(0);
  })
  .catch((err) => {
    console.error("Unhandled error:", err);
    process.exit(1);
  });
