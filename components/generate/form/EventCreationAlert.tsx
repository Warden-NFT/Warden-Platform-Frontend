import { Box, Stack, SxProps, Typography } from "@mui/material"
import { Theme } from "@mui/system"
import Link from "next/link"
import React from "react"
import AnnouncementIcon from "@mui/icons-material/Announcement"

interface Props {
  sx?: SxProps<Theme>
  title: string
  description: string
  hrefDescription: string
  href: string
  iconTheme?: SxProps<Theme>
}

function EventCreationAlert({
  sx,
  title,
  description,
  href,
  hrefDescription,
  iconTheme
}: Props) {
  return (
    <Box
      sx={{
        ...sx,
        borderRadius: 0,
        border: 1,
        padding: 2,
        position: "relative",
        overflow: "hidden"
      }}
    >
      <Box>
        <AnnouncementIcon
          sx={{
            fontSize: "80px",
            position: "absolute",
            rotate: "-20deg",
            opacity: 0.6,
            ...iconTheme
          }}
        />
        <Box sx={{ paddingLeft: 14 }}>
          <Typography
            variant="h6"
            component="h3"
            color="black"
            fontWeight="600"
          >
            {title}
          </Typography>
          <Stack direction="row" alignItems="center">
            <Typography
              variant="caption"
              component="p"
              fontSize="16px"
              color="black"
            >
              {description}
            </Typography>

            <Link href={href} style={{ marginLeft: 6 }}>
              <Typography variant="caption" component="p" fontSize="16px">
                {hrefDescription}
              </Typography>
            </Link>
          </Stack>
        </Box>
      </Box>
    </Box>
  )
}

export default EventCreationAlert
