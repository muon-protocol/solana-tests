require('dotenv').config()

const web3 = require('@solana/web3.js')
const getKeyPair = require('./getKeyPair')
const createToken = require('./createToken')
const mintToken = require('./mintToken')
const tokenTransfer = require('./tokenTransfer')
const getTokenInfo = require('./getTokenInfo')

;(async () => {
  // const tokenPubKey = ''
  const tokenPubKey = '7wXz36nMD1AjcaMwV8PCQFuNZe1212NdwV9ndvnsui7k'

  // Connect to cluster
  const connection = new web3.Connection(
    web3.clusterApiUrl('testnet'),
    'confirmed'
  )

  const fromWallet = getKeyPair(process.env.FROM_PRIVATE_KEY)
  const toWallet = new web3.PublicKey(process.env.TO_PUBLIC_KEY)

  // Create token and add to Wallet from and to Or get information from token
  console.log(
    '------------ Start creating token with decimal 9 or get information ------------'
  )
  const { token, fromTokenAccount, toTokenAccount } = tokenPubKey
    ? await getTokenInfo(connection, fromWallet, toWallet, tokenPubKey)
    : await createToken(connection, fromWallet, toWallet, 9)

  console.log('------------ Start minting 100 token ------------')

  await mintToken(token, fromTokenAccount, fromWallet, 100000000000)

  console.log('------------ Start transfer 99 token to toWallet------------')

  // await tokenTransfer(
  //   connection,
  //   fromTokenAccount,
  //   toTokenAccount,
  //   fromWallet,
  //   99000000000
  // )
})()
