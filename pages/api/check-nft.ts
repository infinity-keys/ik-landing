// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";
import abi721 from "@nfts/balanceOf721.json";
import abi1155 from "@nfts/balanceOf1155.json";
import { chainIds } from "@lib/walletConstants";

import { IK_CLAIMS_NAMESPACE, IK_ID_COOKIE } from "@lib/constants";
import { makeUserToken, verifyToken } from "@lib/jwt";
import { IkJwt } from "@lib/types";
import { routeLandingUrl, routeSuccessUrl } from "@lib/utils";
import { uniq } from "lodash";
import { gqlApiSdk } from "@lib/server";
import { contractLookup, providerLookup } from "@lib/contractLookup";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    account,
    chainId,
    contractAddress,
    tokenId,
    successRoute,
    finalStep,
  } = req.query;

  if (
    typeof account !== "string" ||
    typeof chainId !== "string" ||
    typeof contractAddress !== "string" ||
    typeof successRoute !== "string" ||
    typeof finalStep !== "string"
  )
    return res.status(500).end();

  // No token Id for ERC721
  if (tokenId && typeof tokenId !== "string") return res.status(500).end();

  let nftPass;
  const final_step = finalStep === "true";

  if (chainId && tokenId && parseInt(chainId, 10) === 0) {
    const contractPromises = chainIds.map((chainId) =>
      contractLookup[chainId].checkIfClaimed(parseInt(tokenId, 10), account)
    );

    const contractClaims = await Promise.all(contractPromises);
    const claimed = contractClaims.some(Boolean);

    nftPass = claimed ? true : false;
  } else {
    const type721 = tokenId ? false : true;

    const provider = providerLookup[parseInt(chainId, 10)];

    // Dealing with ERC721
    if (type721) {
      try {
        const contract = new ethers.Contract(contractAddress, abi721, provider);
        const balance = parseInt(await contract.balanceOf(account), 10);
        nftPass = balance > 0;
      } catch (error) {
        console.log(error);
        return res.status(500).end();
      }
    } else {
      // Dealing with ERC1155
      try {
        const tokenIdAsNumber = tokenId ? parseInt(tokenId, 10) : undefined;
        const contract = new ethers.Contract(
          contractAddress,
          abi1155,
          provider
        );
        const balance = parseInt(
          await contract.balanceOf(account, tokenIdAsNumber),
          10
        );
        nftPass = balance > 0;
      } catch (error) {
        console.log(error);
        return res.status(500).end();
      }
    }
  }

  if (nftPass) {
    const token = req.cookies[IK_ID_COOKIE];
    if (!token) return res.status(401).end();

    // Validate token first
    let verified = undefined;
    try {
      verified = await verifyToken(token);
    } catch (e) {
      // Bad token
      return res.status(401).end();
    }

    const guessResults = { fail_route: "/", success_route: successRoute };
    const payload = verified.payload as unknown as IkJwt;

    guessResults.success_route = final_step
      ? routeSuccessUrl(successRoute)
      : routeLandingUrl(successRoute);

    const { puzzles } = payload.claims[IK_CLAIMS_NAMESPACE];
    payload.claims[IK_CLAIMS_NAMESPACE].puzzles = uniq([
      ...puzzles,
      successRoute,
    ]);

    const gql = await gqlApiSdk();

    await gql.UpsertUser({
      userId: payload.sub,
    });

    const newToken = await makeUserToken(payload);

    // Cookie for route access
    res.setHeader(
      "Set-Cookie",
      `${IK_ID_COOKIE}=${newToken}; HttpOnly; Path=/;`
    );
  }

  return res.json(nftPass);
}
