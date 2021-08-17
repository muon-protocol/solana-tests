const mintToken = async (token, fromTokenAccount, fromWallet, amount) => {
  //minting  new token to the "fromTokenAccount" account we just returned/created
  await token.mintTo(fromTokenAccount.address, fromWallet.publicKey, [], amount)
}

module.exports = mintToken
