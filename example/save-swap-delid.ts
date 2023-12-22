import "dotenv/config";
import { IFS, IFSBot, Midjourney } from "../src";
import { sleep } from "../src/utils";
/**
 *
 * a simple example of how to use the blend
 * ```
 * npx tsx example/save-swap-delid.ts
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
  const imageUri = `https://cdn.discordapp.com/attachments/1183359810947784748/1184804470505353286/cmasfounder_an_east_african_kenyan_man_who_is_a_little_bit_buff_b63294d2-a581-4d5f-a9c3-32271168183c.png?ex=658d4e26&is=657ad926&hm=7dad5e8565502c59b13cf4ddfd2e562dc797bb1730cbd4a9cd3779d5f5507fcf&`;
  await clientIFS.Connect();

    const saveidmsg = await clientIFS.SaveId( savedimageUri, (uri) => {
      console.log("loading123---", uri);
    });

    if (!saveidmsg) {
        console.log("No response returned from saveid.");
        return;
    }

    const swapidmsg = await clientIFS.SwapId( imageUri, saveidmsg.rid,  (uri) => {
      console.log("loading123---", uri);
    })

    if (!swapidmsg) {
      console.log("No response returned from saveid.");
      return;
    }

    console.log("This is the SwapId Message", swapidmsg);

    clientIFS.delId(saveidmsg.rid)

    console.log("idname", saveidmsg.rid, "has been deleted" );
}
main()
  .then(() => {
    console.log("Done");
    //process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });