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
import {
  WalletDialogProvider,
  WalletDisconnectButton,
  WalletMultiButton
} from '@solana/wallet-adapter-material-ui'

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
        <div className="row mt-5">
          <div className="col-2">
            <WalletMultiButton />
          </div>
          <div className="col-3">
            <WalletDisconnectButton />
          </div>
        </div>
      </WalletDialogProvider>
    </WalletProvider>
  )
}

export default Wallet
