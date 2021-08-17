const web3 = require('@solana/web3.js')
const splToken = require('@solana/spl-token')

const getTokenInfo = async (connection, fromWallet, toWallet, tokenPubKey) => {
  const token = new splToken.Token(
    connection, // connection
    new web3.PublicKey(tokenPubKey), // publicKey of token
    splToken.TOKEN_PROGRAM_ID, // programId deployed on chain
    fromWallet // payer
  )

  return token
}
module.exports = getTokenInfo
