import { SupportedDigitalCurrency } from "../../interfaces/currency/currency.interface"

interface SupportedCurrencies {
  name: string
  chain: string
  symbol: SupportedDigitalCurrency
}

export const SUPPORTED_DIGITAL_CURRENCIES: SupportedCurrencies[] = [
  {
    name: "Ethereum",
    chain: "Ethereum",
    symbol: "ETH"
  }
  // {
  //   name: "Matic",
  //   chain: "Polygon",
  //   symbol: "MATIC"
  // }
]
