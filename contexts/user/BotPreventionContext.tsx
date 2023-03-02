import { createContext, Dispatch, SetStateAction, useState } from "react"

interface BotPreventionContextStruct {
  token: string | null
  setToken: Dispatch<SetStateAction<string | null>>
  showModal: boolean
  setShowModal: Dispatch<SetStateAction<boolean>>
}

export const BotPreventionContext = createContext(
  {} as BotPreventionContextStruct
)

const BotPreventionContextProvider = ({ ...props }) => {
  const [token, setToken] = useState<string | null>(null)
  const [showModal, setShowModal] = useState<boolean>(false)

  const values: BotPreventionContextStruct = {
    token,
    setToken,
    showModal,
    setShowModal
  }
  return <BotPreventionContext.Provider value={values} {...props} />
}

export default BotPreventionContextProvider
