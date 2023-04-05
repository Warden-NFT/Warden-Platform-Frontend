import {
  ButtonBase,
  Typography,
  Chip,
  Divider,
  Box,
  SxProps
} from "@mui/material"
import { grey, purple } from "@mui/material/colors"
import { Theme } from "@mui/system"
import { useRouter } from "next/router"
import React, { useContext } from "react"
import ContainerCard from "../../UI/card/ContainerCard"
import { ImageWithFallback } from "../../UI/image/ImageWithFallback"
import { LayoutContext } from "../../../contexts/layout/LayoutContext"
import { AlertType } from "../../../interfaces/modal/alert.interface"

type Props = {
  ticketId?: string
  image: string
  name: string
  ticketTypeLabel: string
  price: string
  enableRedirect?: boolean
  isMyTicket?: boolean
  isForSale?: boolean
  sx?: SxProps<Theme>
}

function TicketCard({
  ticketId,
  image,
  name,
  ticketTypeLabel,
  price,
  enableRedirect,
  isMyTicket,
  isForSale,
  sx
}: Props) {
  const { showErrorAlert } = useContext(LayoutContext)

  const router = useRouter()
  function handleRedirect() {
    const path = router.asPath

    if (isForSale) {
      showErrorAlert({
        title: "Ticket Listed For Sale",
        description: "You cannot access your ticket that you are selling",
        type: AlertType.WARNING
      })
      return
    }

    // if (isMyTicket) {
    //   router.push(`/my-tickets/${ticketId}`)
    // }

    if (ticketId && enableRedirect && path) {
      router.push(`${path}/${ticketId}`)
      return
    }
  }

  return (
    <ButtonBase onClick={handleRedirect} sx={{ width: "fit-content", ...sx }}>
      <ContainerCard
        sx={{
          p: 1,
          width: "210px",
          borderRadius: 1,
          textAlign: "start"
        }}
      >
        <ImageWithFallback
          src={image}
          width={210}
          height={200}
          alt={name}
          style={{
            objectFit: "cover",
            borderRadius: "4px"
          }}
        />
        <Typography sx={{ fontWeight: 500, lineHeight: 1.25 }}>
          {name}
        </Typography>
        <Box sx={{ height: 8 }} />
        <Typography sx={{ fontSize: 11, fontWeight: 300 }}>{name}</Typography>
        <Box sx={{ height: 8 }} />
        <Chip
          label={ticketTypeLabel}
          sx={
            ticketTypeLabel === "VIP"
              ? { background: purple[200], color: "#fff" }
              : { background: grey[200], color: "#000" }
          }
        />
        <Divider sx={{ borderColor: "#000", mx: -1, my: 2 }} />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5
          }}
        >
          <ImageWithFallback
            src="/images/crypto/eth.svg"
            width={20}
            height={20}
            alt="Ethereum"
          />
          <Typography sx={{ fontWeight: 600 }}>{price}</Typography>
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 500,
              color: grey[600]
            }}
          >
            eth
          </Typography>
        </Box>
      </ContainerCard>
    </ButtonBase>
  )
}

export default TicketCard
