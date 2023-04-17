# Function Stream

## To run locally

Fill in the .env variables with your Moralis stream API key and MongoDB uri (examples in the env.default)

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

It is saved as a new document in the db in the following format:

> **Note**<br>
> All keys are converted to lowercase before being saved.

```js
// The contract address
"0x86935f11c86623dec8a25696e1c19a8659cbf95d": {
  // The method id
  "0x22c67519": {
    // The user's wallet address
    "0xa752158f67b9fb39c29412g6f8e1c563ff6724f6": [
      // Array of transactions
    ]
  },
}
```

## Reading from the DB

The `/hasUserCalledFunction` route accepts GET requests with the following format. It can also handle multiple methodId parameters.

`https://{our-function-stream-url-on-render.com}/hasUserCalledFunction?contractAddress=0x86935f11c86623dec8a25696e1c19a8659cbf95d&methodId=0x22c67519&walletAddress=0xA752158F67b9Fb39c29412g6F8e1C563FF6724f6`

It counts matching documents and returns an array of booleans indicating whether the user has called the provided methodIds.


> **Note**<br>
> All parameters are converted to lowercase before doing the lookup.
