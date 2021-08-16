const splToken = require('@solana/spl-token')

const createToken = async (connection, fromWallet, toWallet, decimals) => {
  //create new token mint
  let mint = await splToken.Token.createMint(
    connection,
    fromWallet,
    fromWallet.publicKey,
    null,
    decimals,
    splToken.TOKEN_PROGRAM_ID
  )

  //get the token account of the fromWallet Solana address, if it does not exist, create it
  let fromTokenAccount = await mint.getOrCreateAssociatedAccountInfo(
    fromWallet.publicKey
  )

  //get the token account of the toWallet Solana address, if it does not exist, create it
  var toTokenAccount = await mint.getOrCreateAssociatedAccountInfo(toWallet)

  return { mint, fromTokenAccount, toTokenAccount }
}
module.exports = createToken
