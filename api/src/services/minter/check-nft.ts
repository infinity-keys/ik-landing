import abi1155 from '@infinity-keys/contracts/src/balanceOf1155.json'
import abi721 from '@infinity-keys/contracts/src/balanceOf721.json'
import { ethers } from 'ethers'
import fetch from 'node-fetch'
import { QueryResolvers } from 'types/graphql'

import { RPCLookup } from 'src/lib/walletConstants'

export const checkNft: QueryResolvers['checkNft'] = async ({
  account,
  chainId,
  contractAddress,
  tokenId,
  // successRoute,
  // finalStep,
}) => {
  if (parseInt(chainId, 10) === 0) {
    // If chain id is set to 0 (no chain is 0) then it is a poap
    // no contract address for poap, tokenId = Poap Event Id
    const url = `https://api.poap.tech/actions/scan/${account}/${tokenId}`

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'X-API-Key': process.env.POAP_API_KEY,
      },
    }

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        if (json.event) {
          // Have to move this return statement below to allow for cookies!
          return { success: true }
        }
      })
      .catch((err) => console.error('error:' + err))

    // If no event or error return false
    // Have to move this return statement below to allow for cookies!
    return { success: false }
  }

  // No token Id for ERC721
  const type721 = tokenId ? false : true

  const provider = new ethers.providers.JsonRpcProvider(
    RPCLookup[parseInt(chainId, 10)]
  )

  let nftPass

  // Dealing with ERC721
  if (type721) {
    try {
      const contract = new ethers.Contract(contractAddress, abi721, provider)
      const balance = parseInt(await contract.balanceOf(account), 10)
      nftPass = balance > 0
    } catch (error) {
      console.log(error)
      return { success: false }
    }
  } else {
    // Dealing with ERC1155
    try {
      const tokenIdAsNumber = tokenId ? parseInt(tokenId, 10) : undefined
      const contract = new ethers.Contract(contractAddress, abi1155, provider)
      const balance = parseInt(
        await contract.balanceOf(account, tokenIdAsNumber),
        10
      )
      nftPass = balance > 0
    } catch (error) {
      console.log(error)
      return { success: false }
    }
  }

  // if (nftPass) {
  //   const token = req.cookies[IK_ID_COOKIE];
  //   if (!token) return res.status(401).end();

  //   // Validate token first
  //   let verified = undefined;
  //   try {
  //     verified = await verifyToken(token);
  //   } catch (e) {
  //     // Bad token
  //     return res.status(401).end();
  //   }

  //   const guessResults = { fail_route: "/", success_route: successRoute };
  //   const payload = verified.payload as unknown as IkJwt;

  //   guessResults.success_route = final_step
  //     ? routeSuccessUrl(successRoute)
  //     : routeLandingUrl(successRoute);

  //   const { puzzles } = payload.claims[IK_CLAIMS_NAMESPACE];
  //   payload.claims[IK_CLAIMS_NAMESPACE].puzzles = uniq([
  //     ...puzzles,
  //     successRoute,
  //   ]);

  //   const gql = await gqlApiSdk();

  //   await gql.UpsertUser({
  //     userId: payload.sub,
  //   });

  //   const newToken = await makeUserToken(payload);

  //   // Cookie for route access
  //   res.setHeader(
  //     "Set-Cookie",
  //     `${IK_ID_COOKIE}=${newToken}; HttpOnly; Path=/;`
  //   );
  // }

  return { success: true, nftPass }
}
