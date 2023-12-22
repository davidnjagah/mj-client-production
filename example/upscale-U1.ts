import "dotenv/config";
import { Midjourney } from "../src";
/**
 *
 * a simple example of how to use the Upscale command
 * ```
 * npx tsx example/upscale-U1.ts
 * ```
 */
async function main() {
  const client = new Midjourney({
    ServerId: <string>process.env.SERVER_ID,
    ChannelId: <string>process.env.CHANNEL_ID,
    SalaiToken: <string>process.env.SALAI_TOKEN,
    Debug: true,
  });
  const msg = await client.Imagine("a man on the beach with a surreal sunset");
  const amount = '1 2 3';

  console.log({ msg });
  if (!msg) {
    console.log("no message");
    return;
  }

  const U1 = await client.Upscale({
    index: 1,
    msgId: <string>msg.id,
    hash: <string>msg.hash,
    flags: msg.flags,
    content: msg.content,
    loading: (uri: string, progress: string) => {
      console.log("loading", uri, "progress", progress);
    },
  });

  const U2 = amount.includes("2") ? await client.Upscale({
    index: 2,
    msgId: <string>msg.id,
    hash: <string>msg.hash,
    flags: msg.flags,
    content: msg.content,
    loading: (uri: string, progress: string) => {
      console.log("loading", uri, "progress", progress);
    },
  }) : null;

  const U3 = amount.includes("3") ? await client.Upscale({
    index: 3,
    msgId: <string>msg.id,
    hash: <string>msg.hash,
    flags: msg.flags,
    content: msg.content,
    loading: (uri: string, progress: string) => {
      console.log("loading", uri, "progress", progress);
    },
  }) : null;

  const U4 = amount.includes("4") ? await client.Upscale({
    index: 4,
    msgId: <string>msg.id,
    hash: <string>msg.hash,
    flags: msg.flags,
    content: msg.content,
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

  U2 ? console.log("SwapId 2 shall activate") : console.log("SwapId 2 has been skipped");

  U3 ? console.log("SwapId 3 shall activate") : console.log("SwapId 3 has been skipped");

  U4 ? console.log("SwapId 4 shall activate") : console.log("SwapId 4 has been skipped");
  //use quotes instead of null for the return
  //will return an empty qoute for the swapid2 - 4 if they have no upscale
}
main().catch((err) => {
  console.error(err);
  process.exit(1);
});
