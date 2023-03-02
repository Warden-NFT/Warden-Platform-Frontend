import { Box, Stack, Typography } from "@mui/material"
import { Container } from "@mui/system"
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React from "react"
import ContainedButton from "../components/UI/button/ContainedButton"
import ContainerCard from "../components/UI/card/ContainerCard"

function NotFoundPage() {
  const router = useRouter()

  const onClickHome = () => {
    router.push("/")
  }

  return (
    <Container
      maxWidth={false}
      sx={{ display: "flex", justifyContent: "center" }}
    >
      <Head>
        <title>Error 404</title>
      </Head>
      <ContainerCard>
        <Stack justifyContent="center" alignItems="center">
          <Image
            src="/images/common/404.gif"
            width={500}
            height={500}
            alt="not-found"
          />
          <Typography variant="h4" fontWeight="bold">
            Oops, page not found...
          </Typography>
          <Box sx={{ height: 12 }} />
          <Typography>This page doesn't exist or was removed!</Typography>
          <Typography>We suggest you go back to home</Typography>
          <Box sx={{ height: 24 }} />
          <ContainedButton
            label="Go back home"
            variant="contained"
            width="300px"
            onClick={onClickHome}
          />
        </Stack>
      </ContainerCard>
    </Container>
  )
}

export default NotFoundPage
