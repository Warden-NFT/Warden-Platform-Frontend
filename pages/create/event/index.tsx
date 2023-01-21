import {
  Button,
  ButtonBase,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography
} from "@mui/material"
import { Box } from "@mui/system"
import React from "react"
import styles from "../../../styles/event/event-home.module.css"
import { withEventOrganizerGuard } from "../../../guards/withAuth"
import ContainerCard from "../../../components/UI/card/ContainerCard"
import AddIcon from "@mui/icons-material/Add"
import { useRouter } from "next/router"

function EventCreationPage() {
  const router = useRouter()
  const onClickCreateEvent = () => {
    router.push("/create/event/createEvent")
  }
  return (
    <Grid container spacing={0} marginTop={4} justifyContent="center">
      <Grid item xs={12}>
        <Container className={styles.topSectionContainer}>
          <Box className={styles.eventBackgroundImageContainer}></Box>
        </Container>
        <Box className={styles.topSectionContent}>
          <Typography variant="h3" color="#fff">
            Events
          </Typography>
          <Typography variant="h6" color="#fff">
            What mode would you like to use to generate your event ticket
          </Typography>
          <Box sx={{ height: 12 }}></Box>
          <ContainerCard>
            <Box className={styles.eventsContainer}>
              <Card className={styles.event}>
                <ButtonBase
                  sx={{ height: "100%", width: "100%" }}
                  onClick={onClickCreateEvent}
                >
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                  >
                    <AddIcon />
                    <Typography>Create a New Event</Typography>
                  </Box>
                </ButtonBase>
              </Card>
              {[1, 2, 3, 4, 5, 6, 7].map((card, index) => (
                <Card className={styles.event} key={index} elevation={0}>
                  <CardMedia
                    sx={{ height: 140 }}
                    image="https://bicevent.com/wp-content/uploads/2012/04/img-meeting-conference-home.jpg"
                    title="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Lizard
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button>
                  </CardActions>
                </Card>
              ))}
            </Box>
          </ContainerCard>
        </Box>
      </Grid>
    </Grid>
  )
}

export default withEventOrganizerGuard(EventCreationPage)
