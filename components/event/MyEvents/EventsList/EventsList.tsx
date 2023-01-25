import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button
} from "@mui/material"
import { Box } from "@mui/system"

import React from "react"
import styles from "./styles.module.css"

function EventsList() {
  return (
    <Box className={styles.eventsContainer}>
      {/* TODO: change placeholder data to real data */}
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
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      ))}
    </Box>
  )
}

export default EventsList
