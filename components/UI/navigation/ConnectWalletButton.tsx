import React from "react"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import "@rainbow-me/rainbowkit/styles.css"

function ConnectWalletButton() {
  return (
    <ConnectButton
      showBalance={{
        smallScreen: false,
        largeScreen: false
      }}
      accountStatus={{
        smallScreen: "avatar",
        largeScreen: "avatar"
      }}
      label="Connect Wallet"
    />
  )
}

export default ConnectWalletButton
