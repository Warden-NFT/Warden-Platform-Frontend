import { getDefaultWallets } from "@rainbow-me/rainbowkit"
import { chain, configureChains, createClient } from "wagmi"
import { publicProvider } from "wagmi/providers/public"

let availableChains = [chain.polygon]
if (process.env.NEXT_PUBLIC_WARDEN_ENVIRONMENT === "local")
  availableChains = [chain.polygonMumbai]
if (process.env.NEXT_PUBLIC_WARDEN_ENVIRONMENT === "staging")
  availableChains = [chain.polygonMumbai]
if (process.env.NEXT_PUBLIC_WARDEN_ENVIRONMENT === "production")
  availableChains = [chain.polygon]

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
