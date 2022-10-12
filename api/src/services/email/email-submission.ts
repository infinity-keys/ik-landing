import sendgrid from '@sendgrid/mail'
import { buildUrl } from 'cloudinary-build-url'
import { MutationResolvers } from 'types/graphql'
import { z } from 'zod'

import { db } from 'src/lib/db'

/*

authentication
submission model
shared packages and api/lib

https://redwoodjs.com/docs/how-to/sending-emails#button-to-send-email
https://redwoodjs.com/docs/how-to/sending-emails#using-one-service-from-another-service
https://redwoodjs.com/docs/how-to/using-a-third-party-api

*/

export const CLOUDINARY_CLOUD_NAME = 'infinity-keys'

export const cloudinaryUrl = (
  id: string,
  height: number,
  width: number,
  circle: boolean,
  dpr: number
) => {
  return buildUrl(id, {
    cloud: {
      cloudName: CLOUDINARY_CLOUD_NAME,
    },
    transformations: {
      quality: '100',
      radius: circle ? 'max' : 0,
      format: 'png',
      dpr,
      resize: {
        type: 'scale',
        width,
        height,
      },
    },
  })
}

const SENDGRID_SENDER_ACCOUNT = 'noreply@infinitykeys.io'

sendgrid.setApiKey(process.env.SENDGRID_API_KEY || '')

export const emailSchema = z.string().min(5).email()

export const sendEmail: MutationResolvers['sendEmail'] = async ({
  email,
  puzzleId,
}) => {
  db.puzzle.findUnique({
    where: { puzzleId },
  })

  try {
    emailSchema.parse(email)
  } catch (e) {
    return {
      success: false,
      message: 'Email not valid',
    }
  }

  // const deleteMeLink = await generateUserDeleteUrl(user_id, email);
  const deleteMeLink = 'loca'

  try {
    await sendgrid.send({
      to: email, // the recipient's email
      from: SENDGRID_SENDER_ACCOUNT, // the SendGrid's sender email
      subject: 'Your New NFT Treasure Unlocked',
      html: `
      <div style="max-width: 660px; font-family: sans-serif; font-size: 17px">
      <p>
        You're smart and wonderful! Take a look at this Infinity Keys Trophy you
        discovered from solving the ${puzzleName} challenge. Nice
        one!
      </p>

      <p style="text-align: center">
        <img
            src="${cloudinaryUrl(cloudinaryId, 300, 300, false, 2)}"
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
    })
  } catch (error) {
    return {
      success: false,
      message: 'Problem sending email',
    }
  }

  return { success: true }
}
