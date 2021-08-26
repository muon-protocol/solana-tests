import React from 'react'
import {
  WalletDisconnectButton,
  WalletMultiButton
} from '@solana/wallet-adapter-material-ui'
import { useWallet } from '@solana/wallet-adapter-react'
import { Connection } from '@solana/web3.js'

const Content = () => {
  const DECIMAL_OFFSET = 1000000000

  const {
    name,
    adapter,
    publicKey,
    wallet,
    connected,
    ready,
    connecting,
    disconnecting,
    autoApprove
  } = useWallet()
  const accountAddress = publicKey?.toString()
  const [balance, setBalance] = React.useState(null)
  const [isFunded, setIsFunded] = React.useState(false)
  const connection = new Connection('https://api.testnet.solana.com')
  connection
    .getBalance(publicKey)
    .then((balance) => setBalance(balance / DECIMAL_OFFSET))
    .catch((error) => {
      console.log(error)
      setBalance(null)
    })
  console.log({
    name,
    adapter,
    publicKey,
    wallet,
    connected,
    ready,
    connecting,
    disconnecting,
    autoApprove
  })
  const getSol = async () => {
    const res = await connection.requestAirdrop(publicKey, 1000000000)
    if (res) setIsFunded(res)
    // const balance = await connection.getBalance(publicKey)
    // console.log({ balance })
    // setBalance(balance / DECIMAL_OFFSET)
  }
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
        <h3>Your account address :{accountAddress}</h3>
      </div>
      <div className="row col-12 mt-5">
        <h2>Your SOL balances :{balance}</h2>
      </div>
      <div className="row col-12 mt-5">
        <button className="btn btn-success" onClick={getSol}>
          Faucet
        </button>
      </div>
      <div className="row col-12 mt-5">
        {isFunded && <div className="alert alert-success">Address Funded!</div>}
      </div>
    </>
  )
}

export default Content
