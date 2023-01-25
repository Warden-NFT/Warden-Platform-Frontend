import React from "react"
import { Button, SvgIconProps } from "@mui/material"
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
}

function ContainedButton({
  label,
  width,
  height,
  variant,
  onClick,
  disabled,
  type,
  icon
}: Props) {
  return (
    <motion.div
      whileHover={
        disabled
          ? {}
          : {
            y: -6,
            boxShadow: '5px 5px 0 rgba(0, 0, 0, 1)',
            borderRadius: '20px'
          }
      }
      style={{ borderRadius: '20px', width }}
    >
      <Button
        type={type ?? "button"}
        onClick={(e) => {
          e.preventDefault()
          onClick?.()
        }}
        startIcon={icon}
        variant={variant}
        disabled={disabled}
        sx={{
          borderRadius: "20px",
          border: 2,
          width,
          height,
          boxShadow: "none"
        }}
      >
        {label}
      </Button>
    </motion.div>
  )
}

export default ContainedButton
