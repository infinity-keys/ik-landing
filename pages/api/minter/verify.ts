// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";
import { IK_CLAIMS_NAMESPACE, IK_ID_COOKIE } from "@lib/constants";
import { gqlApiSdk } from "@lib/server";
import { jwtHasClaim, jwtHasNoClaims, verifyToken } from "@lib/jwt";
import { contractAddressLookup } from "@lib/walletConstants";
import { IkJwt } from "@lib/types";

const privateKey = process.env.PRIVATE_KEY_VERIFY;
const secret = process.env.MINT_SECRET_VERIFY;

const wallet = new ethers.Wallet(privateKey || "");

type Signature = {
  signature: string;
  message: string;
  claimedTokens?: boolean[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Signature>
) {
  const { account, tokenId, chainId } = req.query;

  if (
    typeof tokenId !== "string" ||
    typeof account !== "string" ||
    typeof chainId !== "string"
  ) {
    return res
      .setHeader("Cache-Control", "max-age=31536000, public")
      .status(500)
      .end();
  }

  // All responses will have 15 second cache time
  res.setHeader("Cache-Control", "max-age=15, public");

  const jwt = req.cookies[IK_ID_COOKIE];
  if (!jwt) return res.status(401).end();

  // @TODO: make live after p0 event
  // if (await jwtHasNoClaims(jwt)) {
  //   // checks if they've solved any puzzles at all
  //   return res.status(401).end();
  // }

  // check if whether pack or puzzle and get gatedIds when pack
  const gql = await gqlApiSdk();
  const { puzzles, packs } = await gql.GetGatedIdsByNftId({
    nftIdNum: tokenId,
    nftIdInt: parseInt(tokenId),
  });

  if (!puzzles.length && !packs.length) return res.status(400).end();

  const getSignature = async () => {
    const chainIdAsNumber = parseInt(chainId, 10);
    const contractAddress = contractAddressLookup[chainIdAsNumber];

    if (!contractAddress) throw new Error("No contract address!");

    const hash = ethers.utils.solidityKeccak256(
      ["address", "address", "string", "string"],
      [contractAddress, account, tokenId, secret]
    );

    return await wallet.signMessage(ethers.utils.arrayify(hash));
  };

  // If not gated- its a single puzzle and we need to check cookie
  // If gated- its a pack, check the balance of the gatedIds
  if (packs.length) {
    // @TODO: make live after p0 event
    // const successRoutes = packs[0].pack_puzzles.map(
    //   ({ puzzle }) => puzzle.success_route
    // );
    // const canAccess = await jwtHasClaim(jwt, successRoutes);
    // if (!canAccess) return res.status(403).end();

    const gatedTokenIds = packs[0].pack_puzzles.map(({ puzzle }) => {
      if (!puzzle.nft) {
        throw new Error("NFT does not exist on this puzzle");
      }
      return puzzle?.nft?.tokenId.toString();
    });

    const baseUrl = req.headers.host || "infinitykeys.io";
    const { ownedStatus, message, claimedTokens } = await checkIfOwned(
      account,
      gatedTokenIds,
      chainId,
      baseUrl
    );

    if (!ownedStatus) {
      return res.json({ signature: "", message, claimedTokens });
    }

    // We do own!! Get siggy.
    try {
      const signature = await getSignature();

      return res.json({ signature, message: "", claimedTokens });
    } catch (e) {
      return res.status(500).end();
    }
  }

  if (puzzles.length) {
    const successRoutes = puzzles.map(({ success_route }) => success_route);
    const canAccess = await jwtHasClaim(jwt, successRoutes);
    if (!canAccess) return res.status(403).end();

    // We can access!! Get siggy.
    try {
      const signature = await getSignature();

      return res.json({ signature, message: "" });
    } catch (e) {
      return res.status(500).end();
    }
  }
}

const checkIfOwned = async (
  account: string,
  tokenIds: string[],
  chainId: string,
  baseUrl: string
) => {
  const tokenIdsParams = tokenIds.map((id) => `tokenids=${id}`).join("&");

  const url = `http://${baseUrl}/api/minter/check-balance?account=${account}&${tokenIdsParams}&chainId=${chainId}`;
  const response = await fetch(url);

  let message = "";
  if (response.ok) {
    const data = await response.json();
    if (!data.claimed) {
      message =
        "You do not have the required NFTS on this chain. Please ensure you have completed the above puzzles and are on the correct chain.";
    }
    return {
      ownedStatus: data.claimed,
      message,
      claimedTokens: data.claimedTokens,
    };
  } else {
    const message = "Something went wrong. Please try again.";
    return { ownedStatus: false, message };
  }
};
