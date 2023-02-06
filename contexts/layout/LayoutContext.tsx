import { createContext, Dispatch, SetStateAction, useState } from "react"
import {
  AlertDialogContent,
  AlertType
} from "../../interfaces/modal/alert.interface"

interface LayoutContextStruct {
  showLoadingBackdrop: boolean
  setShowLoadingBackdrop: Dispatch<SetStateAction<boolean>>
  showAlertDialog: boolean
  setShowAlertDialog: Dispatch<SetStateAction<boolean>>
  alertContent: AlertDialogContent
  setAlertContent: Dispatch<SetStateAction<AlertDialogContent>>
  showErrorAlert: (alertDialogContent: AlertDialogContent) => void
  hideErrorAlert: () => void
}

export const LayoutContext = createContext({} as LayoutContextStruct)

const LayoutContextProvider = ({ ...props }) => {
  // Loading
  const [showLoadingBackdrop, setShowLoadingBackdrop] = useState(false)

  // Alert
  const [showAlertDialog, setShowAlertDialog] = useState<boolean>(false)
  const [alertContent, setAlertContent] = useState<AlertDialogContent>({
    type: AlertType.ERROR,
    title: "Alert",
    description: "An error has occured. Please try again.",
    onClose: undefined,
    primaryAction: undefined
  })

  const showErrorAlert = (alertDialogContent: AlertDialogContent) => {
    setAlertContent(alertDialogContent)
    setShowAlertDialog(true)
  }

  const hideErrorAlert = () => {
    setShowAlertDialog(false)
  }

  const values: LayoutContextStruct = {
    showLoadingBackdrop,
    setShowLoadingBackdrop,
    showAlertDialog,
    setShowAlertDialog,
    alertContent,
    setAlertContent,
    showErrorAlert,
    hideErrorAlert
  }
  return <LayoutContext.Provider value={values} {...props} />
}

export default LayoutContextProvider
