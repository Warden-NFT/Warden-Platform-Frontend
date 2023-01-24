import { Grid, Container, Typography, SvgIconProps } from "@mui/material"
import { Box } from "@mui/system"
import React from "react"
import ContainedButton from "../button/ContainedButton"
import styles from "./BannerLayout.module.css"

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
        <Container className={styles.topSectionContainer}>
          <Box
            className={`${styles.backgroundImageContainer} ${styles[backgroundImage]}`}
          ></Box>
        </Container>
        <Box className={styles.topSectionContent}>
          <Box className={styles.titleSectionContainer}>
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
