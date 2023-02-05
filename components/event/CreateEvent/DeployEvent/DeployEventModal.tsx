import { Backdrop, Box, Fade, Modal, Typography } from "@mui/material"
import { Stack } from "@mui/system"
import React from "react"
import ContainedButton from "../../../UI/button/ContainedButton"
import FlatCard from "../../../UI/card/FlatCard"

type Props = {
  open: boolean
  handleClose: () => void
}
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24
}

function DeployEventModal({ open, handleClose }: Props) {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      <Fade in={open}>
        <Box>
          <FlatCard sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Publish Your Event
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              When an event is published, a corresponding smart contract will be
              deployed. Proceed?
            </Typography>
            <Box sx={{ height: 12 }} />
            <Stack direction="row" gap={2} sx={{ justifyContent: "flex-end" }}>
              <ContainedButton label="Cancel" variant="outlined" />
              <ContainedButton label="Deploy Now" variant="contained" />
            </Stack>
          </FlatCard>
        </Box>
      </Fade>
    </Modal>
  )
}

export default DeployEventModal
