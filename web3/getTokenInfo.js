const web3 = require('@solana/web3.js')
const splToken = require('@solana/spl-token')

const getTokenInfo = async (connection, fromWallet, toWallet, tokenPubKey) => {
  const token = new splToken.Token(
    connection, // connection
    new web3.PublicKey(tokenPubKey), // publicKey of token
    splToken.TOKEN_PROGRAM_ID, // programId deployed on chain
    fromWallet // payer
  )

  //get the token account of the fromWallet Solana address, if it does not exist, create it
  let fromTokenAccount = await token.getOrCreateAssociatedAccountInfo(
    fromWallet.publicKey
  )
  //get the token account of the toWallet Solana address, if it does not exist, create it
  var toTokenAccount = await token.getOrCreateAssociatedAccountInfo(toWallet)

  return { token, fromTokenAccount, toTokenAccount }
}
module.exports = getTokenInfo
