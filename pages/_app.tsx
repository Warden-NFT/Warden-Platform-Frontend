import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/UI/navigation/Layout'
import { ThemeProvider } from '@mui/material/styles'
import AppTheme from '../configs/themes/theme'
import WagmiClient from '../configs/wagmi/client'
import { lightTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { WagmiConfig } from 'wagmi'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <WagmiConfig client={WagmiClient.wagmiClient}>
        <RainbowKitProvider
          chains={WagmiClient.chains}
          theme={lightTheme({
            accentColor: '#000',
            accentColorForeground: 'white',
            borderRadius: 'large'
          })}
        >
          <ThemeProvider theme={AppTheme}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  )
}
