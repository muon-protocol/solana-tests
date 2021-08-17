require('dotenv').config()

const splToken = require('@solana/spl-token')
const web3 = require('@solana/web3.js')
const getKeyPair = require('./getKeyPair')
const associatedAccountInfo = require('./associatedAccountInfo')

;(async () => {
  const decimals = 9

  // Connect to cluster testnet
  const connection = new web3.Connection(
    web3.clusterApiUrl('testnet'),
    'confirmed'
  )

  const fromWallet = getKeyPair(process.env.FROM_PRIVATE_KEY)

  //create new token mint
  let token = await splToken.Token.createMint(
    connection,
    fromWallet,
    fromWallet.publicKey,
    null,
    decimals,
    splToken.TOKEN_PROGRAM_ID
  )
  await associatedAccountInfo(token, fromWallet.publicKey)
  const tokenPubKey = new web3.PublicKey(token.publicKey).toString()
  // console.log('Token Public Key:', tokenPubKey)
  console.log(
    `\nTo mint, add the following parameter to the env file:\n\n TOKEN_PUB_KEY='${tokenPubKey}'\n`
  )
})()
