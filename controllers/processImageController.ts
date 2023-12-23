import { Request, Response, NextFunction } from 'express';

// Handle image request
// POST : api/fetchimages
// PROTECTED
import "dotenv/config";
import { IFSBot, Midjourney, IFS } from "../src";

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
  

    if (!U1) {
      console.log("No response from Upscale.");
      return;
    }
  
    console.log("U1", { U1 });
  
    console.log("U2", { U2 });
  
    console.log("U3", { U3 });
  
    console.log("U4", { U4 });

    await clientIFS.Connect();

    const saveid = await clientIFS.SaveId( imageUrl, (uri) => {
      console.log("loading123---", uri);
    });

    if (!saveid) {
        console.log("No response returned from saveid.");
        return;
    }

    const swapid1 = await clientIFS.SwapId( U1.uri, saveid.rid,  (uri) => {
      console.log("loading123---", uri);
    })

    if (!swapid1) {
      console.log("No response returned from saveid.");
      return;
    }

    const swapid2 = U2 ? 
    await clientIFS.SwapId( U2.uri, saveid.rid,  (uri) => {
      console.log("loading123---", uri);
    }) : 
    null;
  
    const swapid3 = U3 ? 
    await clientIFS.SwapId( U3.uri, saveid.rid,  (uri) => {
      console.log("loading123---", uri);
    }) : 
    null;
  
    const swapid4 = U4 ? 
    await clientIFS.SwapId( U4.uri, saveid.rid,  (uri) => {
      console.log("loading123---", uri);
    }) : 
    null;

    await clientIFS.delId(saveid.rid)

    console.log("idname", saveid.rid, "has been deleted" );

    client.Close();
    clientIFS.Close();

    if (swapid2 && !swapid3 && !swapid4){
      const urls: any [] = [swapid1.proxy_url, swapid2.proxy_url];
      return urls;
    }

    if (swapid2 && swapid3 && !swapid4){
      const urls: any [] = [swapid1.proxy_url, swapid2.proxy_url, swapid3.proxy_url];
      return urls;
    }

    if (swapid2 && swapid3 && swapid4){
      const urls: any [] = [swapid1.proxy_url, swapid2.proxy_url, swapid3.proxy_url, swapid4.proxy_url];
      return urls;
    }

    const url: any [] = [swapid1.proxy_url];
    return url;
}


export const handleImageGen = (
  req: Request<{}, {}, IncomingRequest>, 
  res: Response,
  next: NextFunction
) => {

    //console.log("This is the request in handleimageGen", req);
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
