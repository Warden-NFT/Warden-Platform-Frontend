import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from "@mui/material"
import { grey, red, yellow } from "@mui/material/colors"
import React, { useContext } from "react"
import { LayoutContext } from "../../contexts/layout/LayoutContext"
import {
  AlertDialogContent,
  AlertType
} from "../../interfaces/modal/alert.interface"

function AlertModal() {
  const { showAlertDialog, setShowAlertDialog, alertContent } =
    useContext(LayoutContext)

  const handleClose = () => {
    if (alertContent.onClose) alertContent.onClose()
    setShowAlertDialog(false)
  }

  const handlePrimaryAction = () => {
    if (alertContent.primaryAction) alertContent.primaryAction()
    setShowAlertDialog(false)
  }

  const getBorderColor = (alertContent: AlertDialogContent) => {
    switch (alertContent.type) {
    case AlertType.INFO:
      return grey[900]
    case AlertType.WARNING:
      return yellow[900]
    case AlertType.ERROR:
      return red[500]
    default:
      return grey[900]
    }
  }

  return (
    <Dialog
      open={showAlertDialog}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{ sx: { borderRadius: 0, minWidth: "320px" } }}
    >
      <DialogTitle
        id="alert-dialog-title"
        sx={{
          borderTop: "8px solid",
          borderColor: getBorderColor(alertContent)
        }}
      >
        {alertContent.title ?? "Alert"}
      </DialogTitle>
      {alertContent.description && (
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {alertContent.description}
          </DialogContentText>
        </DialogContent>
      )}
      {alertContent.type === AlertType.INFO && (
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handlePrimaryAction} autoFocus variant="contained">
            OK
          </Button>
        </DialogActions>
      )}
      {alertContent.type === AlertType.WARNING && (
        <DialogActions>
          <Button onClick={handlePrimaryAction} autoFocus>
            Understood
          </Button>
        </DialogActions>
      )}
      {alertContent.type === AlertType.ERROR && (
        <DialogActions>
          <Button onClick={handlePrimaryAction} autoFocus>
            Dismiss
          </Button>
        </DialogActions>
      )}
    </Dialog>
  )
}

export default AlertModal
