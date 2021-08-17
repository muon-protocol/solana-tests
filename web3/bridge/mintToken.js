require('dotenv').config()
const BN = require('bn.js')
const web3 = require('@solana/web3.js')
const getKeyPair = require('./getKeyPair')
const parseArgv = require('./parsArgv')
const getTokenInfo = require('./getTokenInfo')
const associatedAccountInfo = require('./associatedAccountInfo')

;(async () => {
  let params = parseArgv()
  // amount for mint
  let amount = Number(params['amount']) * Math.pow(10, 9)
  // Connect to cluster testnet
  const connection = new web3.Connection(
    web3.clusterApiUrl('testnet'),
    'confirmed'
  )

  const fromWallet = getKeyPair(process.env.FROM_PRIVATE_KEY)

  //  get info token
  const token = await getTokenInfo(
    connection,
    fromWallet,
    process.env.TOKEN_PUB_KEY
  )
  //  get assosiated token account
  const fromTokenAccount = await associatedAccountInfo(
    token,
    fromWallet.publicKey
  )
  //minting  new token to the "fromTokenAccount" account we just returned/created
  await token.mintTo(fromTokenAccount.address, fromWallet.publicKey, [], amount)
})()
