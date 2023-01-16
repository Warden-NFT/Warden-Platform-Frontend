import { SupportedDigitalCurrency } from "../../interfaces/currency/currency.interface";

interface SupportedCurrencies {
  name: string;
  symbol: SupportedDigitalCurrency
}

export const SUPPORTED_DIGITAL_CURRENCIES: SupportedCurrencies[] = [
  {
    name: 'Ethereum',
    symbol: 'ETH'
  },
  {
    name: 'Polygon',
    symbol: 'MATIC'
  }
]