import "dotenv/config";
import { Midjourney, detectBannedWords } from "../src";
import { url } from "inspector";
/**
 *
 * a simple example of how to use faceSwap
 * ```
 * npx tsx example/faceswap.ts
 * ```
 */
async function main() {
  const source = `https://media.discordapp.net/attachments/1178018872385884252/1183113492866281522/cmasfounder_Blend_together_these_9_high-resolution_photographs__5054f6f8-7a1a-4d4e-970e-d640bb0de4a8.png`;
  // const source = `https://cdn.discordapp.com/attachments/1108587422389899304/1129321826804306031/guapitu006_Cute_warrior_girl_in_the_style_of_Baten_Kaitos__111f39bc-329e-4fab-9af7-ee219fedf260.png`;
  const target = `https://media.discordapp.net/attachments/1178018872385884252/1183125001872887828/faf15aa72bf8fc7c682927164205e32b.jpg`;
  const client = new Midjourney({
    ServerId: <string>process.env.SERVER_ID,
    ChannelId: <string>process.env.CHANNEL_ID,
    SalaiToken: <string>process.env.SALAI_TOKEN,
    Debug: true,
    HuggingFaceToken: <string>process.env.HUGGINGFACE_TOKEN,
  });
  const info = await client.FaceSwap(target, source);
  console.log(info?.uri);
}
main()
  .then(() => {
    console.log("finished");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
