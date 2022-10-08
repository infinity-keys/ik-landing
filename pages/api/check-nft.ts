// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";
import abi721 from "@nfts/balanceOf721.json";
import abi1155 from "@nfts/balanceOf1155.json";
import { RPCLookup } from "@lib/walletConstants";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { account, chainId, contractAddress, tokenId } = req.query;

  if (
    typeof account !== "string" ||
    typeof chainId !== "string" ||
    typeof contractAddress !== "string"
  )
    return res.status(500).end();

  if (tokenId && typeof tokenId !== "string") return res.status(500).end();
  const type721 = tokenId ? false : true;

  const provider = new ethers.providers.JsonRpcProvider(
    RPCLookup[parseInt(chainId, 10)]
  );

  // Dealing with ERC721
  if (type721) {
    try {
      const contract = new ethers.Contract(contractAddress, abi721, provider);
      const balance = parseInt(await contract.balanceOf(account), 10);
      const nftPass = balance > 0;

      return res.json({ nftPass });
    } catch (error) {
      console.log(error);
      return res.status(500).end();
    }
  } else {
    // Dealing with ERC1155
    try {
      const tokenIdAsNumber = tokenId ? parseInt(tokenId, 10) : undefined;
      const contract = new ethers.Contract(contractAddress, abi1155, provider);
      const balance = parseInt(
        await contract.balanceOf(account, tokenIdAsNumber),
        10
      );

      const nftPass = balance > 0;

      return res.json({ nftPass });
    } catch (error) {
      console.log(error);
      return res.status(500).end();
    }
  }
}
