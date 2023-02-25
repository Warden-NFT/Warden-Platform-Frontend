import { Box, CircularProgress, Container, Typography } from "@mui/material"
import Image from "next/image"
import React from "react"
import { MarketEvents } from "../../../interfaces/market/marketEvent.interface"
import ContainerCard from "../../UI/card/ContainerCard"

type Props = {
  marketEvents: MarketEvents | undefined
}

function OrganizerInfoCard({ marketEvents }: Props) {
  return (
    <ContainerCard
      sx={{
        width: 300,
        height: 160,
        backgroundColor: "#fff",
        textAlign: "center"
      }}
    >
      {marketEvents ? (
        <>
          <Box
            sx={{
              marginTop: -8,
              display: "flex",
              justifyContent: "center"
            }}
          >
            <Image
              src={marketEvents?.organizerInfo.profileImage as string}
              width={120}
              height={120}
              alt="organizer profile image"
              style={{
                objectFit: "cover",
                borderRadius: "50%",
                border: "4px solid #000"
              }}
            />
          </Box>
          <Box sx={{ height: 16 }} />
          <Typography
            variant="h5"
            component="h2"
            textAlign="center"
            fontWeight={600}
          >
            {marketEvents?.organizerInfo.organizationName}
          </Typography>
          <Typography>{marketEvents?.organizerInfo.email}</Typography>
          <Typography fontWeight={200}>Event Organizer</Typography>
        </>
      ) : (
        <CircularProgress />
      )}
    </ContainerCard>
  )
}

export default OrganizerInfoCard
