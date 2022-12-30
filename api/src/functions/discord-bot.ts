import { chainIdLookup } from '@infinity-keys/constants'
//import Web3 from 'web3'

const discord = require('discord.js')
const Moralis = require('moralis').default

//const web3 = new Web3()
require('dotenv').config()
const app = express()
const port = 3000

const client = new discord.Client({
  intents: [],
})

client.login(process.env.PASS)

app.use(express.json())

app.post('/webhook', async (req, res) => {
  const { body, headers } = req

  try {
    Moralis.Streams.verifySignature({
      body,
      signature: headers['x-signature'],
    })

    // console.log(headers);
    // console.log(body);

    const from = body.txs[0].fromAddress
    //console.log(from);
    const tokenId = parseInt(body.logs[0].topic1, 16)
    //console.log(tokenId);
    const chainId = parseInt(body.chainId, 16)
    //console.log(chainId);
    const chain = chainIdLookup[chainId]

    const channel = await client.channels.fetch(process.env.CHANNEL)
    channel.send(`Token ID ${tokenId} claimed by ${from} from ${chain}`)

    return res.status(200).json()
  } catch (e) {
    console.log(e)
    console.log('Not Moralis')
    return res.status(400).json()
  }
})

Moralis.start({
  apiKey: process.env.APIKEY,
}).then(() => {
  app.listen(port, () => {
    console.log(`Listening to my stream`)
  })
})
