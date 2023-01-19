import { Box, Grid, Typography } from '@mui/material'
import { Container, display } from '@mui/system'
import Head from 'next/head'
import Image from 'next/image'
import Ticket from '../components/UI/ticket/Ticket'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Warden</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        sx={{
          left: '50%',
          right: '50%',
          marginLeft: '-50vw',
          marginRight: '-50vw',
          display: 'flex',
          justifyContent: 'center',
          overflow: 'hidden'
        }}
      >
        <Image
          src="/images/landing/background.webp"
          height="600"
          width="2500"
          alt="background"
          style={{
            position: 'absolute',
            left: 0,
            objectFit: 'cover',
            width: '100vw',
            maxWidth: '100vw'
          }}
          draggable={false}
        />
        <Grid
          container
          justifyContent="center"
          sx={{ position: 'absolute', width: '1200px' }}
        >
          <Grid xs={4} maxWidth="xl" sx={{}}>
            <Box sx={{ height: 120 }} />
            <Typography variant="h3" component="h1">
              Warden
            </Typography>
            <Box sx={{ height: 12 }} />
            <Typography component="p">
              Platform for Combatting Event Ticketing Exploits using NFT Utility
              Platform with Added Revenue Generation Capabilities{' '}
            </Typography>
          </Grid>
          <Grid xs={8} maxWidth="xl">
            <Ticket
              img="/images/background/ticket-cover-test.jpg"
              eventName="Among Us Party"
              eventOrganizer="Warden"
              ticketType="GENERAL"
              date={new Date()}
              seat="A 14"
              location="MIRA HQ"
              QRCodeValue="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}
