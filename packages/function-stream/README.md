# Function Stream

## To run locally

<!-- @TODO: Add env file default -->

`cd packages/function-stream && yarn`

`yarn start:dev`

## Moralis Stream Setup

The `/moralis` route watches for incoming Moralis stream POST requests, and saves all valid function calls to our MongoDB instance.

### What is a valid function call?

Set up a Moralis stream and point the webhook URL to our `/moralis` endpoint. The URL should have the contract address we are monitoring, and the method ids of the functions we want users to have called. For example:

`https://{our-function-stream-url-on-render.com}/moralis/0x86935f11c86623dec8a25696e1c19a8659cbf95d?methodId=0x22c67519`

With multiple functions:

`https://{our-function-stream-url-on-render.com}/moralis/0x86935f11c86623dec8a25696e1c19a8659cbf95d?methodId=0x22c67519&methodId=0x85c3c3cf`

### Where to get the method ids?

Find the contract on the relevant chain explorer (Polygonscan, Etherscan, etc.) and find a transaction calling the function you want to monitor. The "Input Data" field will have the method id listen:

```
Function: interact(uint256[] _tokenIds) ***

MethodID: 0x22c67519
[0]:  0000000...
```

## Saving to the DB

The `/moralis` endpoint looks at incoming streams and saves any transactions that match the contract address and method ids from the URL parameters.

It is save to the db in the following format:

```js
// The contract address
"0x123": {
  // The method id
  "0x456": {
    // The users wallet address
    "0x789": [
      // Array of transactions
    ]
  },
}
```

https://function-stream.onrender.com/hasUserCalledFunction?contractAddress=0x86935f11c86623dec8a25696e1c19a8659cbf95d&methodId=0x22c67519&walletAddress=0x86f5badc9fB2Db49303D69aD0358b467cFd393E0
