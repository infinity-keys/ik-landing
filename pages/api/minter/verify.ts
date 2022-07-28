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
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Signature>
) {
  const { account, tokenId, chainId, requisite } = req.query;

  if (
    typeof tokenId !== "string" ||
    typeof account !== "string" ||
    typeof chainId !== "string"
  )
    return res.status(500).end();

  // Check if we're supposed to be here
  if (!requisite) {
    const jwt = req.cookies[IK_ID_COOKIE];
    if (!jwt) return res.status(401).end();
    const gql = await gqlApiSdk();
    const { puzzles } = await gql.GetPuzzleInfoByNftId({ nftId: tokenId });
    const puzzleNames = puzzles.map(({ simple_name }) => simple_name);
    const canAccess = await jwtHasClaim(jwt, puzzleNames);
    if (!canAccess) return res.status(403).end();
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

  res.json({ signature });
}
