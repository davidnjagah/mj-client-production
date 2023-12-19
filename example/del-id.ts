import "dotenv/config";
import { IFSBot, IFS } from "../src";
/**
 *
 * a simple example of how to use the blend
 * ```
 * npx tsx example/del-id.ts
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
  const saveId = '4997180084';
  await client.Connect();
  client.delId(saveId);
}
main().catch((err) => {
  console.error(err);
  process.exit(1);
});
