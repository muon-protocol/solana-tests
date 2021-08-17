require('dotenv').config()

const web3 = require('@solana/web3.js')
const getKeyPair = require('./getKeyPair')
const createToken = require('./createToken')
const mintToken = require('./mintToken')
const tokenTransfer = require('./tokenTransfer')
const getTokenInfo = require('./getTokenInfo')
const associatedAccountInfo = require('./associatedAccountInfo')

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

  const fromWallet2 = getKeyPair(process.env.FROM_PRIVATE_KEY_2)
  const thirdWallet = new web3.PublicKey(process.env.THIRD_PUBLIC_KEY)

  // Create token and add to Wallet from and to Or get information from token
  console.log(
    '------------ Start creating token with decimal 9 or get information ------------'
  )
  const token = tokenPubKey
    ? await getTokenInfo(connection, fromWallet, toWallet, tokenPubKey)
    : await createToken(connection, fromWallet, toWallet, 9)
  const fromTokenAccount = await associatedAccountInfo(
    token,
    fromWallet.publicKey
  )
  const toTokenAccount = await associatedAccountInfo(token, toWallet)
  const thirdTokenAccount = await associatedAccountInfo(token, thirdWallet)

  console.log('------------ Start minting 100 token ------------')
  //  mint in wallet 1
  await mintToken(token, fromTokenAccount, fromWallet, 100000000000)

  console.log('------------ Start transfer 99 token to toWallet------------')

  // transfer from wallet 1 to wallet 2
  await tokenTransfer(
    connection,
    fromTokenAccount,
    toTokenAccount,
    fromWallet,
    99000000000
  )

  console.log('------------ Start transfer 1 token to third Wallet------------')

  // transfer from wallet 2 to wallet 3

  await tokenTransfer(
    connection,
    toTokenAccount,
    thirdTokenAccount,
    fromWallet2,
    1000000000
  )
})()
