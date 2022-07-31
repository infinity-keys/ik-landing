// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";
import {
  AVAX_CHAIN_ID,
  CONTRACT_ADDRESS_AVAX,
  CONTRACT_ADDRESS_ETH,
  CONTRACT_ADDRESS_POLYGON,
  ETH_CHAIN_ID,
  POLYGON_CHAIN_ID,
  IK_ID_COOKIE,
} from "@lib/constants";
import { gqlApiSdk } from "@lib/server";
import { jwtHasClaim } from "@lib/jwt";

const privateKey = process.env.PRIVATE_KEY_VERIFY;
const secret = process.env.MINT_SECRET_VERIFY;

const wallet = new ethers.Wallet(privateKey || "");

type Signature = {
  signature: string;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Signature>
) {
  const { account, tokenId, chainId, gatedIds } = req.query;

  if (
    typeof tokenId !== "string" ||
    typeof account !== "string" ||
    typeof chainId !== "string"
  )
    return res.status(500).end();

  const gatedTokenIds =
    typeof gatedIds === "string"
      ? new Array(gatedIds) // if only looking for 1 value make into array
      : typeof gatedIds === "object"
      ? gatedIds
      : undefined;

  // If not gated- its a single puzzle and we need to check cookie
  // If gated- its a pack, check the balance of the gatedIds
  if (!gatedTokenIds) {
    const jwt = req.cookies[IK_ID_COOKIE];
    if (!jwt) return res.status(401).end();
    const gql = await gqlApiSdk();
    const { puzzles } = await gql.GetPuzzleInfoByNftId({ nftId: tokenId });
    const puzzleNames = puzzles.map(({ simple_name }) => simple_name);
    const canAccess = await jwtHasClaim(jwt, puzzleNames);
    if (!canAccess) return res.status(403).end();
  } else {
    const baseUrl = req.headers.host || "infinitykeys.io";
    const { ownedStatus, message } = await checkIfOwned(
      account,
      gatedTokenIds,
      chainId,
      baseUrl
    );
    if (typeof message !== "string") return res.status(500);
    if (!ownedStatus) return res.json({ signature: "", message: message });
  }

  const chainIdAsNumber = parseInt(chainId, 10);

  const contractAddress =
    chainIdAsNumber === AVAX_CHAIN_ID
      ? CONTRACT_ADDRESS_AVAX
      : chainIdAsNumber === ETH_CHAIN_ID
      ? CONTRACT_ADDRESS_ETH
      : chainIdAsNumber === POLYGON_CHAIN_ID
      ? CONTRACT_ADDRESS_POLYGON
      : undefined;
  if (!contractAddress) return res.status(500).end();

  const hash = ethers.utils.solidityKeccak256(
    ["address", "address", "string", "string"],
    [contractAddress, account, tokenId, secret]
  );

  const signature = await wallet.signMessage(ethers.utils.arrayify(hash));

  res.json({ signature: signature, message: "" });
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
    return { ownedStatus: data.claimed, message: message };
  } else {
    console.log(response.text());
    const message = "Something went wrong. Please try again.";
    return { ownedStatus: false, message: message };
  }
};
