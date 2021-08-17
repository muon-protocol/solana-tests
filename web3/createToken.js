const splToken = require('@solana/spl-token')

const createToken = async (connection, fromWallet, toWallet, decimals) => {
  //create new token mint
  let token = await splToken.Token.createMint(
    connection,
    fromWallet,
    fromWallet.publicKey,
    null,
    decimals,
    splToken.TOKEN_PROGRAM_ID
  )

  return token
}
module.exports = createToken
