import React from 'react'
import {
  WalletDisconnectButton,
  WalletMultiButton
} from '@solana/wallet-adapter-material-ui'
import { useWallet } from '@solana/wallet-adapter-react'
import { Connection } from '@solana/web3.js'

const Content = () => {
  const DECIMAL_OFFSET = 1000000000

  const { publicKey, wallet, connected } = useWallet()
  const accountAddress = publicKey?.toString()
  const [balance, setBalance] = React.useState(null)
  const connection = new Connection('https://api.testnet.solana.com')
  connection
    .getBalance(publicKey)
    .then((balance) => setBalance(balance / DECIMAL_OFFSET))
    .catch((error) => {
      console.log(error)
      setBalance(null)
    })
  console.log({ publicKey, wallet, connected, accountAddress })
  return (
    <>
      <div className="row mt-5">
        <div className="col-2">
          <WalletMultiButton />
        </div>
        <div className="col-3">
          <WalletDisconnectButton />
        </div>
      </div>
      <div className="row col-12 mt-5">
        <h3 className="mb-5">Your account address :{accountAddress}</h3>

        <h2>Your SOL balances :{balance}</h2>
      </div>
    </>
  )
}

export default Content
