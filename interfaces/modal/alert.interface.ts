export enum AlertType {
  ERROR = "ERROR",
  INFO = "INFO",
  WARNING = "WARNING"
}

export interface AlertDialogContent {
  type: AlertType
  title?: string
  description?: string
  onClose?: () => void
  primaryAction?: () => void
}
