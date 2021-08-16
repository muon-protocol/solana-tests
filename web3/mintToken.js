const mintToken = async (mint, fromTokenAccount, fromWallet, amount) => {
  //minting  new token to the "fromTokenAccount" account we just returned/created
  const result = await mint.mintTo(
    fromTokenAccount.address,
    fromWallet.publicKey,
    [],
    amount
  )
}

module.exports = mintToken
