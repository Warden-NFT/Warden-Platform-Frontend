import { Cancel, CheckCircle } from "@mui/icons-material"
import { Box, Typography } from "@mui/material"
import { grey } from "@mui/material/colors"
import { useRouter } from "next/router"
import React from "react"
import ContainedButton from "../../../UI/button/ContainedButton"

type Props = {
  ticketListingSuccess: boolean | undefined
}

function SellTicketStep3({ ticketListingSuccess }: Props) {
  const router = useRouter()

  if (ticketListingSuccess === undefined) return null
  return (
    <Box sx={{ background: grey[200], p: 2, mt: 2 }}>
      {ticketListingSuccess ? (
        <Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography fontWeight="bold" variant="h6">
              Ticket Listing Successful
            </Typography>
            <CheckCircle />
          </Box>
          <Typography fontWeight="bold">Ticket Listing Successful</Typography>
          <Box sx={{ my: 2 }} />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <ContainedButton
              label="Back to marketplace"
              variant="outlined"
              onClick={() => router.push("/marketplace")}
            />
            <ContainedButton
              label="View my tickets"
              variant="contained"
              onClick={() => router.push("/me")}
            />
          </Box>
        </Box>
      ) : (
        <Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography fontWeight="bold" variant="h6">
              Ticket Listing Failed
            </Typography>
            <Cancel />
          </Box>
          <Typography>Ticket Listing Unsuccessful</Typography>
          <Box sx={{ my: 2 }} />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <ContainedButton
              label="Back to marketplace"
              variant="outlined"
              onClick={() => router.push("/marketplace")}
            />
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default SellTicketStep3
