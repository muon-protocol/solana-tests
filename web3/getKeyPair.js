const web3 = require('@solana/web3.js')
const bs58 = require('bs58')

// get keyKeypair from privateKey
const getKeyPair = (privateKey) => {
  // decode private key
  const address = bs58.decode(privateKey)
  // convert to unit8Array
  const secretKey = new Uint8Array(address)

  return web3.Keypair.fromSecretKey(secretKey)
}

module.exports = getKeyPair
