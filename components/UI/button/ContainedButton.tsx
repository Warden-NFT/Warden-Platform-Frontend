import React from "react"
import { Button, SvgIconProps, SxProps } from "@mui/material"
import { motion } from "framer-motion"

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
  children
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
      <Button
        type={type ?? "button"}
        onClick={(e?: any) => {
          if (!component && e) e.preventDefault()
          onClick?.()
        }}
        startIcon={icon}
        variant={variant}
        disabled={disabled}
        component={component}
        sx={{
          borderRadius: 0,
          border: 2,
          width,
          height,
          boxShadow: "none",
          ...sx
        }}
      >
        {children ?? label}
      </Button>
    </motion.div>
  )
}

export default ContainedButton
