import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  TextField,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material"
import { Box, Stack } from "@mui/system"

import React, { useState } from "react"
import ContainerCard from "../UI/card/ContainerCard"
import styles from "./MyEvents.module.css"

function MyEvents() {
  enum SORT_BY {
    lastCreated = "LAST_CREATED",
    alphabetical = "ALPHABETICAL"
  }
  const [sortBy, setSortBy] = useState<SORT_BY>(SORT_BY.lastCreated)
  const handleSearchChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    console.log(e.currentTarget.value)
  }
  return (
    <ContainerCard>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-end"
      >
        <Box>
          <InputLabel>Search Events</InputLabel>
          <TextField
            onChange={handleSearchChange}
            id="event-search-input"
            data-testid="event-search-input"
            placeholder="ex: My Concert"
            variant="outlined"
            size="small"
            className={styles.eventSearchInput}
          />
        </Box>
        <Box>
          <InputLabel>Sort By</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={sortBy}
            size="small"
            onChange={(e) => setSortBy(e.target.value as SORT_BY)}
          >
            <MenuItem value={SORT_BY.lastCreated}>Last Created</MenuItem>
            <MenuItem value={SORT_BY.alphabetical}>Alphabetical</MenuItem>
          </Select>
        </Box>
      </Stack>

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
    </ContainerCard>
  )
}

export default MyEvents
