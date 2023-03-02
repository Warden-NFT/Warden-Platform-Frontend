import { createContext, Dispatch, SetStateAction, useState } from "react"

interface BotPreventionContextStruct {
  token: string | null
  setToken: Dispatch<SetStateAction<string | null>>
}

export const BotPreventionContext = createContext(
  {} as BotPreventionContextStruct
)

const BotPreventionContextProvider = ({ ...props }) => {
  const [token, setToken] = useState<string | null>(null)

  const values: BotPreventionContextStruct = {
    token,
    setToken
  }
  return <BotPreventionContext.Provider value={values} {...props} />
}

export default BotPreventionContextProvider
