const associatedAccountInfo = async (token, publicKey) => {
  //get the token account of the fromWallet Solana address, if it does not exist, create it
  let associatedAccount = await token.getOrCreateAssociatedAccountInfo(
    publicKey
  )
  return associatedAccount
}

module.exports = associatedAccountInfo
