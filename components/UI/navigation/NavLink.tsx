import { Button, SxProps, Theme, Typography } from "@mui/material"
import Link from "next/link"
import React from "react"

interface Props {
  route: { name: string; url: string }
  sx?: SxProps<Theme>
}

function NavLink({ route, sx }: Props) {
  return (
    <Link
      href={route.url}
      style={{ textDecoration: "none", display: "flex", alignItems: "center" }}
    >
      <Button
        variant="text"
        sx={{
          "&:hover": {
            backgroundColor: "white"
          },
          mr: 1,
          px: 1.5,
          ...sx
        }}
      >
        <Typography fontWeight="600" color="black" fontSize="14px">
          {route.name}
        </Typography>
      </Button>
    </Link>
  )
}

export default NavLink
