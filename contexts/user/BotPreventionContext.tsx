import { createContext, Dispatch, SetStateAction, useState } from "react"

interface BotPreventionContextStruct {
  token: string | null
  setToken: Dispatch<SetStateAction<string | null>>
  isRecaptchaShown: boolean
  setIsRecaptchaShown: Dispatch<SetStateAction<boolean>>
  showRecaptcha: () => void
}

export const BotPreventionContext = createContext(
  {} as BotPreventionContextStruct
)

const BotPreventionContextProvider = ({ ...props }) => {
  const [token, setToken] = useState<string | null>(null)
  const [isRecaptchaShown, setIsRecaptchaShown] = useState<boolean>(false)

  function showRecaptcha() {
    if (!token) {
      setIsRecaptchaShown(true)
    }
  }

  const values: BotPreventionContextStruct = {
    token,
    setToken,
    showRecaptcha,
    isRecaptchaShown,
    setIsRecaptchaShown
  }
  return <BotPreventionContext.Provider value={values} {...props} />
}

export default BotPreventionContextProvider
