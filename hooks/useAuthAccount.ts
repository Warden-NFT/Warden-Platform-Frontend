import { useConnectModal } from "@rainbow-me/rainbowkit"
import { useEffect, useContext } from "react"
import { useAccount } from "wagmi"
import { LayoutContext } from "../contexts/layout/LayoutContext"
import { AlertType } from "../interfaces/modal/alert.interface"

export function useAuthAccount() {
  const { address } = useAccount()
  const { showErrorAlert } = useContext(LayoutContext)
  const { openConnectModal } = useConnectModal()

  useEffect(() => {
    if (!address) {
      openConnectModal && openConnectModal()
      showErrorAlert({
        type: AlertType.WARNING,
        title: "Please login to an Ethereum Chain",
        description:
          "Your action requires a wallet address. Please login with your wallet provider such as Metamask."
      })
    }
  }, [address, openConnectModal])
}
