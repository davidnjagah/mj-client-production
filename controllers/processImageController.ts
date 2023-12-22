import { Request, Response, NextFunction } from 'express';

// Handle image request
// POST : api/processimage/imagegen
// PROTECTED
import "dotenv/config";
import { IFSBot, Midjourney, IFS } from "../src";
import { sleep } from "../src/utils";
/**
 *
 * a simple example of how to use the blend
 * ```
 * npx tsx example/full-morph.ts
 * ```
 */
interface IncomingRequest {
 amount: string,
 imageUrl: string,
 prompt: string,
 resolution?: string,
}

async function main(req: IncomingRequest) {

  const {amount, imageUrl, prompt } = req;

  console.log("This is amount in main", amount);
  console.log("This is imageUrl in main", imageUrl);
  console.log("This is prompt in main", prompt);

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

  // const prompt = "an east african kenyan man who is a little bit buff with east african hair that is neatily shaven into a fade haircut and he has on a black business suit with black shirt and black tie.";
  // const savedimageUri = `https://utfs.io/f/6fec6712-9a9b-4484-8eeb-3301c7120896-mood6h.jpg`;
  // const amount = "1 2 3 4";
    await client.Connect();

    
    const Imagine = await client.Imagine(prompt, (uri: string, progress: string) => {
        console.log("Imagine loading", uri, "progress", progress);
    });

    if (!Imagine) {
        console.log("No image returned from Imagine.");
        return;
    }


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
    }) : {
        proxy_url: ""
      };
  
    const U3 = amount.includes("3") ? await client.Upscale({
      index: 3,
      msgId: <string>Imagine.id,
      hash: <string>Imagine.hash,
      flags: Imagine.flags,
      content: Imagine.content,
      loading: (uri: string, progress: string) => {
        console.log("loading", uri, "progress", progress);
      },
    }) :{
      proxy_url: ""
    };
  
    const U4 = amount.includes("4") ? await client.Upscale({
      index: 4,
      msgId: <string>Imagine.id,
      hash: <string>Imagine.hash,
      flags: Imagine.flags,
      content: Imagine.content,
      loading: (uri: string, progress: string) => {
        console.log("loading", uri, "progress", progress);
      },
    }) :{
      proxy_url: ""
    };
  

    if (!U1) {
      console.log("No response from Upscale.");
      return;
    }
  
    console.log("U1", { U1 });
  
    console.log("U2", { U2 });
  
    console.log("U3", { U3 });
  
    console.log("U4", { U4 });

    await clientIFS.Connect();

    // const saveid = await clientIFS.SaveId( imageUrl, (uri) => {
    //   console.log("loading123---", uri);
    // });

    // if (!saveid) {
    //     console.log("No response returned from saveid.");
    //     return;
    // }

    // const swapid1 = await clientIFS.SwapId( U1.uri, saveid.rid,  (uri) => {
    //   console.log("loading123---", uri);
    // })

    // if (!swapid1) {
    //   console.log("No response returned from saveid.");
    //   return;
    // }

    // const swapid2 = U2 ? 
    // await clientIFS.SwapId( U2.uri, saveid.rid,  (uri) => {
    //   console.log("loading123---", uri);
    // }) : 
    // {
    //   proxy_url: ""
    // };
  
    // const swapid3 = U3 ? 
    // await clientIFS.SwapId( U3.uri, saveid.rid,  (uri) => {
    //   console.log("loading123---", uri);
    // }) : 
    // {
    //   proxy_url: ""
    // };
  
    // const swapid4 = U4 ? 
    // await clientIFS.SwapId( U4.uri, saveid.rid,  (uri) => {
    //   console.log("loading123---", uri);
    // }) : 
    // {
    //   proxy_url: ""
    // };

    // await clientIFS.delId(saveid.rid)

    // console.log("idname", saveid.rid, "has been deleted" );

    // const urls: any [] = [swapid1.proxy_url, swapid2?.proxy_url, swapid3?.proxy_url, swapid4?.proxy_url]

    // return urls;

    const urls: any [] = [U1.proxy_url, U2?.proxy_url, U3?.proxy_url, U4?.proxy_url]

    clientIFS.Close();
    client.Close();
    console.log("InsightFaceSwap Client:", clientIFS);
    console.log("Midjourney Client:", client)
    return urls;
}


export const handleImageGen = (
  req: Request<{}, {}, IncomingRequest>, 
  res: Response,
  next: NextFunction
) => {
    
    console.log("This is the request in handleimageGen", req);

    main(req.body)
    .then((value) => {
        console.log("This is the value", value);
        res.json(value);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send(err.message)
    });

};
