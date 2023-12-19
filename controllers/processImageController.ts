import { Request, Response, NextFunction } from 'express';

// Handle image request
// POST : api/processimage/imagegen
// PROTECTED
import "dotenv/config";
import { IFSBot, Midjourney } from "../src";
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

  const prompt = "an east african kenyan man who is a little bit buff with east african hair that is neatily shaven into a fade haircut and he has on a black business suit with black shirt and black tie.";
  const imageUri = `https://utfs.io/f/6fec6712-9a9b-4484-8eeb-3301c7120896-mood6h.jpg`;
  const saveId = "david7";
  await client.Connect();

    
    const Imagine = await client.Imagine(prompt, (uri: string, progress: string) => {
        console.log("Imagine loading", uri, "progress", progress);
    });

    if (!Imagine) {
        console.log("No image returned from Imagine.");
        return;
    }

    //console.log("Imagine response:", Imagine);

    const U1CustomID = Imagine.options?.find((o) => o.label === "U1")?.custom;
    if (!U1CustomID) {
      console.log("No U1 option found.");
      return;
    }

    const Upscale = await client.Upscale({
      index: 1,
      msgId: <string>Imagine.id,
      hash: <string>Imagine.hash,
      flags: Imagine.flags,
      content: Imagine.content,
      loading: (uri: string, progress: string) => {
        console.log("loading", uri, "progress", progress);
      },
    });
    //console.log(Upscale);

    if (!Upscale) {
      console.log("No response from Upscale.");
      return;
    }

    client.SaveId( saveId, imageUri, (uri) => {
      console.log("loading123---", uri);
    })
    .then(function (msg) {
      console.log("msg123", msg);
    })
    .catch(function(error) {
      console.error("An error occurred: ", error);
    });

    await sleep(3000);

    const SwapId = await client.SwapId( saveId, Upscale.uri, (uri) => {
      console.log("loading123---", uri);
    })
    .then(function (msg) {
      console.log("msg123", msg);
    })
    .catch(function(error) {
      console.error("An error occurred: ", error);
    });

    console.log("SwapId:", SwapId);
}

const handleImageGen = (req: Request, res: Response, next: NextFunction) => {
    // Uncomment the line below to log the request, if needed
    console.log("This is the request", req);
    main()
    .then((value) => {
        console.log("This is the value", value);
        res.json(value);
        //process.exit(0);
    })
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });

    
};

export { handleImageGen };
