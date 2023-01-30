import { getDefaultWallets } from "@rainbow-me/rainbowkit"
import { chain, configureChains, createClient } from "wagmi"
import { alchemyProvider } from "wagmi/providers/alchemy"
import { publicProvider } from "wagmi/providers/public"

const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.polygonMumbai],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY }),
    publicProvider()
  ]
)

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
