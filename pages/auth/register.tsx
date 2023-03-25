import {
  Button,
  Divider,
  FormLabel,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from "@mui/material"
import { Box } from "@mui/system"
import React, { useContext, useEffect, useState } from "react"
import ContainerCard from "../../components/UI/card/ContainerCard"
import Link from "next/link"
import EventOrganizerRegisterForm from "../../components/auth/EventOrganizerRegisterForm"
import { purple } from "@mui/material/colors"
import CustomerRegisterForm from "../../components/auth/CustomerRegisterForm"
import FadeEntrance from "../../components/motion/FadeEntrance"
import { UserContext } from "../../contexts/user/UserContext"
import { useRouter } from "next/router"
import Head from "next/head"

type RegisterMode = "Customer" | "EventOrganizer"

function Register() {
  const [registerMode, setRegisterMode] = useState<RegisterMode>("Customer")
  const { user } = useContext(UserContext)
  const router = useRouter()
  const { referrer } = router.query

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newMode: RegisterMode
  ) => {
    setRegisterMode(newMode)
  }

  useEffect(() => {
    if (user && user.verificationStatus === "NotVerified") {
      router.push("/auth/confirm-phone")
      return
    }
  }, [user])

  if (user) return null
  return (
    <Grid
      container
      spacing={0}
      marginTop={4}
      marginBottom={4}
      justifyContent="center"
    >
      <Head>
        <title>Warden | Register</title>
      </Head>
      <Grid item xs={12} sm={8} lg={6} xl={4}>
        <FadeEntrance>
          <ContainerCard>
            <>
              <Typography variant="h5" fontWeight="bold" component="h1">
                Register
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Box
                sx={{
                  padding: 2,
                  backgroundColor: purple[50]
                }}
              >
                <FormLabel sx={{ fontWeight: 600 }}>
                  Are you registering as a customer or an event organizer?
                </FormLabel>
                <Box sx={{ my: 2 }} />
                <Box>
                  <ToggleButtonGroup
                    color="primary"
                    value={registerMode}
                    exclusive
                    onChange={handleChange}
                    aria-label="Platform"
                    sx={{}}
                  >
                    <ToggleButton value="Customer">Customer</ToggleButton>
                    <ToggleButton value="EventOrganizer">
                      Event Organizer
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Box>
              </Box>
              <Divider sx={{ my: 2 }} />

              {registerMode === "Customer" && <CustomerRegisterForm />}
              {registerMode === "EventOrganizer" && (
                <EventOrganizerRegisterForm />
              )}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  my: 2,
                  gap: 1,
                  alignItems: "center"
                }}
              >
                <Typography>Already have an account?{"   "}</Typography>
                <Link
                  href={{
                    pathname: "/auth/login",
                    query: {
                      referrer
                    }
                  }}
                  style={{ textDecoration: "none" }}
                >
                  <Button disableElevation variant="outlined" color="primary">
                    Log in now
                  </Button>
                </Link>
              </Box>
            </>
          </ContainerCard>
        </FadeEntrance>
      </Grid>
    </Grid>
  )
}

export default Register
