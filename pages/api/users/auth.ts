import type { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";
import { nanoid } from "nanoid";
import uniq from "lodash/uniq";
import differenceBy from "lodash/differenceBy";

import { gqlApiSdk } from "@lib/server";
import { IK_CLAIMS_NAMESPACE, IK_ID_COOKIE, welcome } from "@lib/constants";
import { makeUserToken, verifyToken } from "@lib/jwt";
import { IkJwt } from "@lib/types";
import { MigrateUserSubmissionsDocument } from "@lib/generated/graphql";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { publicAddress, signature } = req.body;

  if (!publicAddress || !signature) return res.status(401).end();

  const token = req.cookies[IK_ID_COOKIE];
  // Validate token first
  let verified = undefined;
  try {
    verified = await verifyToken(token);
  } catch (e) {
    // Bad token
    return res.status(401).end();
  }
  // Pull payload off the token
  const payload = verified.payload as unknown as IkJwt;

  const gql = await gqlApiSdk();
  const userInfo = await gql.UserByPublicAddress({ publicAddress });

  const { users } = userInfo;
  if (!users.length) throw new Error("Cannot find user.");
  const [user] = users;
  const message = `${welcome}\n\n${user.nonce}`;
  const verifiedAddess = ethers.utils.verifyMessage(message, signature);

  // Bail if addresses don't match
  if (verifiedAddess !== publicAddress) return res.status(403).end();

  // Build up JWT with all submitted puzzle Ids from database, but merge in what
  // exists in the current JWT

  // 1. Get original userId by publicAddress
  const { user_id: userId } = user; // "new" userId from DB
  const oldUserId = payload.sub; // "old" userId from JWT
  // 2. Get all success routes from user's submissions
  const { submissions } = userInfo;
  const submitted = submissions.map(
    (submission) => submission.puzzle.success_route
  );
  // 3. Rebuild JWT with all success routes + any in existing JWT
  const { puzzles } = payload.claims[IK_CLAIMS_NAMESPACE];
  payload.claims[IK_CLAIMS_NAMESPACE].puzzles = uniq([
    ...puzzles,
    ...submitted,
  ]);
  payload.claims[IK_CLAIMS_NAMESPACE].walletConnected = true;
  // 4. Re-assign old userId to current user's new JWT
  const newToken = await makeUserToken(payload, userId);
  // 5. Cookie with JWT with users new ID and access
  res.setHeader("Set-Cookie", `${IK_ID_COOKIE}=${newToken}; HttpOnly; Path=/;`);
  // 6. Migrate JWT user's submissions to new userId from db
  if (oldUserId !== userId) {
    const { fromUser, toUser } = await gql.MigrateUserSubmissions({
      fromUser: oldUserId,
      toUser: userId,
    });

    const diff = differenceBy(fromUser, toUser, "puzzle_id");
    const diffPromises = diff.map(async (sub) =>
      gql.UserSubmission({
        user_id: userId,
        puzzle_id: sub.puzzle_id,
        form_data: sub.form_data,
      })
    );
    await Promise.all(diffPromises);
  }

  // Change nonce before returning success
  await gql.AddWalletToUser({
    userId, // This is "new" userId matching up with existing wallet
    publicAddress,
    nonce: nanoid(),
  });
  return res.status(200).end();
}
