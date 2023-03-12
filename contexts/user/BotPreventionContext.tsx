import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState
} from "react"

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

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") {
      showRecaptcha()
    }
  }, [])

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
