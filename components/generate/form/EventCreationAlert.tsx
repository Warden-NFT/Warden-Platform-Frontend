import { Box, Stack, SxProps, Typography } from "@mui/material"
import { Theme } from "@mui/system"
import React from "react"
import AnnouncementIcon from "@mui/icons-material/Announcement"
import ContainedButton from "../../UI/button/ContainedButton"
import { useRouter } from "next/router"

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
  const router = useRouter()
  return (
    <Box
      sx={{
        ...sx,
        borderRadius: 2,
        padding: 2,
        position: "relative",
        overflow: "hidden"
      }}
    >
      <Box>
        <AnnouncementIcon
          sx={{
            fontSize: "60px",
            position: "absolute",
            opacity: 0.6,
            ...iconTheme
          }}
        />
        <Stack
          direction="row"
          sx={{
            paddingLeft: 10,
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <Box>
            <Typography
              variant="h6"
              component="h3"
              color="black"
              fontWeight="600"
            >
              {title}
            </Typography>
            <Typography
              variant="caption"
              component="p"
              fontSize="16px"
              color="black"
            >
              {description}
            </Typography>
          </Box>

          <ContainedButton
            onClick={() => router.push(href)}
            label={hrefDescription}
            variant="outlined"
            sx={{ backgroundColor: "white" }}
          />
        </Stack>
      </Box>
    </Box>
  )
}

export default EventCreationAlert
