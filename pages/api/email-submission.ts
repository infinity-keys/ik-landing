import type { NextApiRequest, NextApiResponse } from "next";
import sendgrid from "@sendgrid/mail";

import { gqlApiSdk } from "@lib/server";
import { cloudinaryUrl } from "@lib/images";
import { SENDGRID_SENDER_ACCOUNT } from "@lib/constants";
import { emailSchema } from "@lib/types";
import { generateUserDeleteUrl } from "@lib/utils";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY || "");

type Data = {
  error: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") return res.status(405).end();

  const submission = req.body.event.data.new;

  if (!submission)
    return res.status(400).json({ error: "Error processing your request" });

  const {
    puzzle_id,
    user_id,
    form_data: { email },
  } = submission;

  if (!puzzle_id) return res.status(400).json({ error: "Invalid Puzzle ID" });

  try {
    emailSchema.parse(email);
  } catch (e) {
    return res.status(400).json({ error: "Invalid email" });
  }

  const gql = await gqlApiSdk();
  const { puzzles_by_pk: puzzle } = await gql.GetPuzzleInfoById({ puzzle_id });
  const cloudinary_id = puzzle?.nft?.nft_metadatum?.cloudinary_id;

  if (!cloudinary_id)
    return res.status(400).json({ error: "No NFT available" });

  const deleteMeLink = await generateUserDeleteUrl(user_id, email);

  try {
    await sendgrid.send({
      to: email, // the recipient's email
      from: SENDGRID_SENDER_ACCOUNT, // the SendGrid's sender email
      subject: "Your New NFT Treasure Unlocked",
      html: `
      <div style="max-width: 660px; font-family: sans-serif; font-size: 17px">
      <p>
        You're smart and wonderful! Take a look at this Infinity Keys Trophy you
        discovered from solving the ${puzzle.simple_name} challenge. Nice
        one!
      </p>

      <p style="text-align: center">
        <img
            src="${cloudinaryUrl(cloudinary_id, 300, 300, false)}"
            height="300"
            width="300"
            alt="your new nft"
          />
      </p>
      <p>
        This Trophy is now saved to your Infinity Keys profile. Once you set up
        a Web3 wallet, you can claim this trophy as an NFT and use it in other
        IK challenges or see if it does more across the Web3 world. When you're
        ready for that, we suggest using
        <a href="https://rainbow.me/">Rainbow Wallet</a>, but no rush.🚶Go at
        your own pace.
      </p>
      <p>
        For more puzzles and challenges, visit the
        <a href="https://www.infinitykeys.io/puzzles">Infinity Keys Puzzle Page</a>. To join our growing community of builders, hunters, and weirdos
        follow us on <a href="https://twitter.com/InfinityKeys">Twitter</a> and
        join the
        <a href="https://discord.com/invite/infinitykeys">IK Discord</a>.
      </p>

      <img
        src="https://res.cloudinary.com/infinity-keys/image/upload/v1661555979/gifs/playingthegame_eavoxk.gif"
        height="108"
        width="260"
        alt="thanks for playing"
      />

      <p>See you on the next hunt!<br><em>- Infinity Keys</em></p>

      <hr/>

      <small style="padding-top: 16px">
      <a href="https://www.infinitykeys.io" style="margin: 0 12px 12px 0">Infinity Keys</a> | <a href="https://twitter.com/InfinityKeys" style="margin: 0 12px 12px">Twitter</a> | <a href="${deleteMeLink.toString()}" style="margin: 0 0 12px 12px">Delete My Info</a>
      </small>
    </div>

  `,
    });
  } catch (error) {
    return res.status(500).json({ error: "Error sending email" });
  }

  return res.status(200).json({ error: "" });
}
