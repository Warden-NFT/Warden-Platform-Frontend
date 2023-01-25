import { Grid, Container, Typography, SvgIconProps } from "@mui/material"
import { Box } from "@mui/system"
import React from "react"
import ContainedButton from "../button/ContainedButton"

type Props = {
  children: React.ReactNode
  backgroundImage: string
  title: string
  subtitle: string
  enableActionButton: boolean
  action?: () => void
  actionName?: string
  actionIcon?: React.ReactElement<SvgIconProps>
}

function BannerLayout({
  children,
  backgroundImage,
  title,
  subtitle,
  enableActionButton,
  action,
  actionName,
  actionIcon
}: Props) {
  return (
    <Grid container spacing={0} marginTop={4} justifyContent="center">
      <Grid item xs={12}>
        <Container sx={{ height: 300 }}>
          <Box
            sx={{
              height: "300px",
              backgroundSize: "cover",
              backgroundPosition: "center center",
              padding: 3,
              width: "100vw",
              position: "absolute",
              left: 0,
              backgroundImage: `linear-gradient(to bottom, rgba(86, 41, 231, 0.5), rgba(0, 0, 0, 0.7)), url(${backgroundImage})`
            }}
          />
        </Container>
        <Box sx={{ position: "relative", top: -160, mx: 8 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              width: "100%"
            }}
          >
            <Box>
              <Typography variant="h3" color="#fff">
                {title}
              </Typography>
              <Typography variant="h6" color="#fff">
                {subtitle}
              </Typography>
            </Box>
            {enableActionButton && (
              <Box>
                <ContainedButton
                  label={actionName ?? ""}
                  variant="contained"
                  width="200px"
                  icon={actionIcon}
                  onClick={action}
                />
              </Box>
            )}
          </Box>
          <Box sx={{ height: 12 }}></Box>
          {children}
        </Box>
      </Grid>
    </Grid>
  )
}

export default BannerLayout
