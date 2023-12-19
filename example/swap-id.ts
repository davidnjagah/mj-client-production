import "dotenv/config";
import { IFSBot, IFS } from "../src";
/**
 *
 * a simple example of how to use the blend
 * ```
 * npx tsx example/swap-id.ts
 * ```
 */
async function main() {
  const client = new IFS({
    ServerId: <string>process.env.SERVER_ID,
    ChannelId: <string>process.env.CHANNEL_ID,
    SalaiToken: <string>process.env.SALAI_TOKEN,
    BotId: IFSBot, // IFSBot
    Debug: true,
  });
  const imageUri = `https://cdn.discordapp.com/attachments/1183359810947784748/1184804470505353286/cmasfounder_an_east_african_kenyan_man_who_is_a_little_bit_buff_b63294d2-a581-4d5f-a9c3-32271168183c.png?ex=658d4e26&is=657ad926&hm=7dad5e8565502c59b13cf4ddfd2e562dc797bb1730cbd4a9cd3779d5f5507fcf&`;
  const rid = "4997180084";
  await client.Connect();
  const msg = await client.SwapId( imageUri, rid,
    (uri: string, progress: string) => {
    console.log("loading", uri, "progress", progress);
    });
    console.log("This is the response for swapId", msg );
  if (!msg) {
    console.log("no message");
    return;
  }
}
main().catch((err) => {
  console.error(err);
  process.exit(1);
});
