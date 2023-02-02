import { createContext, Dispatch, SetStateAction, useState } from "react"

interface LayoutContextStruct {
  showLoadingBackdrop: boolean
  setShowLoadingBackdrop: Dispatch<SetStateAction<boolean>>
}
export const LayoutContext = createContext({} as LayoutContextStruct)

const LayoutContextProvider = ({ ...props }) => {
  const [showLoadingBackdrop, setShowLoadingBackdrop] = useState(false)

  const values: LayoutContextStruct = {
    showLoadingBackdrop,
    setShowLoadingBackdrop
  }
  return <LayoutContext.Provider value={values} {...props} />
}

export default LayoutContextProvider
