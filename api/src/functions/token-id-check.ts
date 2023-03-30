// this function will be replaced with a service called "erc-721".
import Moralis from 'moralis'

if (!Moralis.Core.isStarted) {
  Moralis.start({
    apiKey: process.env.MORALIS_API_KEY,
  })
}

export const handler = async () => {
  const address = '0xa540a85fad845fc76a9c9a13c96ae1b1fa12ea07'
  const contractAddress = '0xa4e3513c98b30d4d7cc578d2c328bd550725d1d0'

  const chain = '0x89'

  const response = await Moralis.EvmApi.nft.getWalletNFTs({
    address,
    chain,
    tokenAddresses: [contractAddress],
  })

  console.log(response.toJSON())

  return {
    statusCode: 200,
  }
}
