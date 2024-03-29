import "../styles/globals.css"
import type { AppProps } from "next/app"
import Layout from "../components/UI/navigation/Layout"
import { ThemeProvider } from "@mui/material/styles"
import AppTheme from "../configs/themes/theme"
import WagmiClient from "../configs/wagmi/client"
import { lightTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { WagmiConfig } from "wagmi"
import UserContextProvider from "../contexts/user/UserContext"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment"
import Head from "next/head"
import CreateEventContextProvider from "../contexts/event/CreateEventContext"
import LayoutContextProvider from "../contexts/layout/LayoutContext"
import MarketContextProvider from "../contexts/market/MarketContext"
import BotPreventionContextProvider from "../contexts/user/BotPreventionContext"
import MyTicketsContextProvider from "../contexts/tickets/MyTicketsContext"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* <meta name="viewport" content="width=1084,maximum-scale=1.0" /> */}
        <title>Warden NFT Ticket Platform</title>
      </Head>
      <BotPreventionContextProvider>
        <WagmiConfig client={WagmiClient.wagmiClient}>
          <RainbowKitProvider
            chains={WagmiClient.chains}
            theme={lightTheme({
              accentColor: "#000",
              accentColorForeground: "white",
              borderRadius: "none"
            })}
          >
            <ThemeProvider theme={AppTheme}>
              <LayoutContextProvider>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <UserContextProvider>
                    <MyTicketsContextProvider>
                      <CreateEventContextProvider>
                        <MarketContextProvider>
                          <Layout>
                            <Component {...pageProps} />
                          </Layout>
                        </MarketContextProvider>
                      </CreateEventContextProvider>
                    </MyTicketsContextProvider>
                  </UserContextProvider>
                </LocalizationProvider>
              </LayoutContextProvider>
            </ThemeProvider>
          </RainbowKitProvider>
        </WagmiConfig>
      </BotPreventionContextProvider>
    </>
  )
}
