import React from "react"
import { SvgIconProps, SxProps } from "@mui/material"
import { motion } from "framer-motion"
import { LoadingButton } from "@mui/lab"

interface Props {
  label: string
  width?: string
  height?: string
  variant: "outlined" | "text" | "contained"
  onClick?: () => void
  disabled?: boolean
  type?: "button" | "submit" | "reset"
  icon?: React.ReactElement<SvgIconProps>
  sx?: SxProps
  component?: any
  children?: React.ReactNode
  isLink?: boolean
  isLoading?: boolean
}

function ContainedButton({
  label,
  width,
  height,
  variant,
  onClick,
  disabled,
  type,
  icon,
  sx,
  component,
  children,
  isLink,
  isLoading
}: Props) {
  return (
    <motion.div
      whileHover={
        disabled
          ? {}
          : {
            y: -6,
            boxShadow: "5px 5px 0 rgba(0, 0, 0, 1)"
          }
      }
      style={{ width }}
    >
      <LoadingButton
        type={type ?? "button"}
        onClick={(e?: any) => {
          if (isLink) return
          if (!component && e) e.preventDefault()
          onClick?.()
        }}
        startIcon={icon}
        variant={variant}
        disabled={disabled}
        component={component}
        loading={isLoading}
        sx={{
          borderRadius: 0,
          border: 2,
          width,
          height,
          boxShadow: "none",
          ...sx
        }}
        size="small"
      >
        {children ?? label}
      </LoadingButton>
    </motion.div>
  )
}

export default ContainedButton
