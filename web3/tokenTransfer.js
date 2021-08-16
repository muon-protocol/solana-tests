const web3 = require('@solana/web3.js')
const splToken = require('@solana/spl-token')

const tokenTransfer = async (
  connection,
  fromTokenAccount,
  toTokenAccount,
  fromWallet,
  amount
) => {
  // Add token transfer instructions to transaction
  var transaction = new web3.Transaction().add(
    splToken.Token.createTransferInstruction(
      splToken.TOKEN_PROGRAM_ID,
      fromTokenAccount.address,
      toTokenAccount.address,
      fromWallet.publicKey,
      [],
      amount
    )
  )

  // Sign transaction, broadcast, and confirm
  var signature = await web3.sendAndConfirmTransaction(
    connection,
    transaction,
    [fromWallet],
    { commitment: 'confirmed' }
  )
  console.log('SIGNATURE', signature)
}
module.exports = tokenTransfer
