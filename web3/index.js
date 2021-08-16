require('dotenv').config()

const web3 = require('@solana/web3.js')
const getKeyPair = require('./getKeyPair')
const createToken = require('./createToken')

;(async () => {
  // private key Source and public key dest
  const fromPrivateKey = process.env.FROM_PRIVATE_KEY
  const toPubKey = process.env.TO_PUBLIC_KEY

  // Connect to cluster
  var connection = new web3.Connection(
    web3.clusterApiUrl('testnet'),
    'confirmed'
  )

  const fromWallet = getKeyPair(fromPrivateKey)
  const toWallet = new web3.PublicKey(toPubKey)

  // Create token and add to Wallet from and to
  const { mint, fromTokenAccount, toTokenAccount } = await createToken(
    connection,
    fromWallet,
    toWallet
  )
})()
