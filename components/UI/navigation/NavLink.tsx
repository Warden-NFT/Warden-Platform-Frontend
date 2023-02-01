import { Button, Typography } from "@mui/material"
import Link from "next/link"
import React from "react"

interface Props {
  route: { name: string; url: string }
}

function NavLink({ route }: Props) {
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
          mr: 2,
          px: 1.5
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
