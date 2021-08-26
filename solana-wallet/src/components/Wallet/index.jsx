import React, { useMemo } from 'react'
import { WalletProvider } from '@solana/wallet-adapter-react'
import {
  getLedgerWallet,
  getMathWallet,
  getPhantomWallet,
  getSolflareWallet,
  getSolletWallet,
  getSolongWallet,
  getTorusWallet
} from '@solana/wallet-adapter-wallets'
import { WalletDialogProvider } from '@solana/wallet-adapter-material-ui'
import Content from './Content'

const Wallet = () => {
  const wallets = useMemo(
    () => [
      getPhantomWallet(),
      getSolflareWallet(),
      getTorusWallet({
        options: { clientId: 'Get a client ID @ https://developer.tor.us' }
      }),
      getLedgerWallet(),
      getSolongWallet(),
      getMathWallet(),
      getSolletWallet()
    ],
    []
  )

  return (
    <WalletProvider wallets={wallets} autoConnect>
      <WalletDialogProvider>
        <Content />
      </WalletDialogProvider>
    </WalletProvider>
  )
}

export default Wallet
