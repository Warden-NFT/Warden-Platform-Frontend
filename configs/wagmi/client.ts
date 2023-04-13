import { getDefaultWallets } from "@rainbow-me/rainbowkit"
import { chain, configureChains, createClient } from "wagmi"
import { publicProvider } from "wagmi/providers/public"

const availableChains = [chain.polygon]
if (process.env.ENABLE_TESTNET === "true") {
  availableChains.push(chain.polygonMumbai)
}

const { chains, provider } = configureChains(availableChains, [
  publicProvider()
])

const { connectors } = getDefaultWallets({
  appName: "Warden Platform",
  chains
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

export default { wagmiClient, chains }
