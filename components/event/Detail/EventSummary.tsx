import { Chip, Divider, Grid, Stack, Typography } from "@mui/material"
import { Box } from "@mui/system"
import moment from "moment"
import Image from "next/image"
import React, { useContext, useEffect, useState } from "react"
import FadeEntrance from "../../motion/FadeEntrance"
import ContainedButton from "../../UI/button/ContainedButton"
import FallbackImage from "../../../public/images/common/fallback-image.svg"
import FlatCard from "../../UI/card/FlatCard"
import Link from "next/link"
import { Event } from "../../../interfaces/event/event.interface"
import { grey } from "@mui/material/colors"
import { useRouter } from "next/router"
import { LayoutContext } from "../../../contexts/layout/LayoutContext"
import { AlertType } from "../../../interfaces/modal/alert.interface"
import { ResaleTicketPurchasePermissionRequestsList } from "../../../dtos/ticket/ticket.dto"
import { useSmartContract } from "../../../hooks/useSmartContract"
import { useAccount } from "wagmi"
import EventManagement from "./EventManagement"
import { client } from "../../../configs/axios/axiosConfig"
import { CalendarToday, Launch, LocationOn } from "@mui/icons-material"

type Props = {
  event: Event
  isOrganizerView: () => boolean
  resaleTicketPurchaseRequests: ResaleTicketPurchasePermissionRequestsList
  getResaleTicketPurchaseRequests: (ticketCollectionId: string) => void
}

function EventSummary({
  event,
  isOrganizerView,
  resaleTicketPurchaseRequests,
  getResaleTicketPurchaseRequests
}: Props) {
  const { showErrorAlert } = useContext(LayoutContext)
  const router = useRouter()
  const { abi, bytecode, web3 } = useSmartContract()
  const { address } = useAccount()
  const { setShowLoadingBackdrop } = React.useContext(LayoutContext)

  // States
  const [eventImage, setEventImage] = useState(event?.image)
  const [checkedPrivileges, setCheckedPrivileges] = useState<boolean>(false)
  const [isSmartContractOwner, setIsSmartContractOwner] =
    useState<boolean>(false)

  function handleNavigateAdmission() {
    if (!event || !event.doorTime) return

    const now = moment()
    if (event.doorTime?.valueOf() < now.valueOf()) {
      showErrorAlert({
        type: AlertType.INFO,
        title: "Alert",
        description: "Your event is not ready for the door time"
      })
    }
    router.push({
      pathname: `${router.basePath}/admission`,
      query: {
        eid: event._id
      }
    })
  }

  const getEventOrganizerPrivileges = async () => {
    if (!abi || !bytecode || !web3 || !address) return
    // Check if the user is the owner of the smart contract using the wallet address (use owner() function in the smart contract)
    try {
      const contract = new web3.eth.Contract(abi.abi)
      contract.options.address = event.smartContractAddress
      contract.methods
        .owner()
        .call()
        .then((result: any) => {
          setIsSmartContractOwner(result === address)
        })
        .catch(() => {
          setCheckedPrivileges(true)
          showErrorAlert({
            type: AlertType.INFO,
            title: "Smart contract deployed",
            description:
              "The smart contract for your event has successfully been deployed to the blockchain."
          })
        })
        .finally(() => {
          setCheckedPrivileges(true)
        })
    } catch (error) {
      setCheckedPrivileges(true)
    }
  }

  const approveResaleTicketPurchaseRequest = async (
    permissionId: string,
    walletAddress: string,
    ticketId: number
  ) => {
    if (!abi || !bytecode || !web3 || !address) return

    setShowLoadingBackdrop(true)
    const contract = new web3.eth.Contract(abi.abi)
    contract.options.address = event.smartContractAddress
    contract.methods
      .approve(walletAddress, ticketId)
      .send({ from: address, gas: 5000000 })
      .then(async () => {
        const payload = {
          ticketCollectionId: event.ticketCollectionId,
          permissionId
        }
        try {
          await client.post("/ticket/permission/approve", payload)
          getResaleTicketPurchaseRequests(event.ticketCollectionId)
          setShowLoadingBackdrop(false)
        } catch (error) {
          setShowLoadingBackdrop(false)
          showErrorAlert({
            type: AlertType.ERROR,
            title: "Approval record error",
            description: `Address ${walletAddress} was granted the permisison to purcahse ticket ${ticketId}, but was not successfully recorded.`
          })
        }
      })
      .catch(() => {
        setShowLoadingBackdrop(false)
        showErrorAlert({
          type: AlertType.ERROR,
          title: "Approval Unsuccessful",
          description: `Unable to grant an approval for address ${walletAddress} to purcahse ticket ${ticketId}`
        })
      })
  }

  useEffect(() => {
    getEventOrganizerPrivileges()
  }, [abi, bytecode, web3, address])

  if (!event) return null
  return (
    <FadeEntrance>
      <FlatCard sx={{ padding: 0 }} noPadding>
        <Box sx={{ fontSize: 0, minHeight: "520px" }}>
          {event.image && (
            <Image
              src={(event.image as string) ?? eventImage}
              width={1200}
              height={520}
              alt="event image"
              draggable={false}
              onError={() => {
                setEventImage(FallbackImage)
                setTimeout(() => {
                  setEventImage(event.image as string)
                }, 500)
              }}
              style={{ objectFit: "cover", width: "100%" }}
            />
          )}
        </Box>
        <Box sx={{ borderTop: "2px solid #000" }}>
          <Grid container>
            <Grid item xs={12} lg={8}>
              <Box sx={{ borderColor: "#000", p: 2 }}>
                <Typography variant="h4">{event.name}</Typography>
              </Box>
              <Divider sx={{ mx: 2 }} />
              <Box sx={{ borderColor: "#000", p: 2 }}>
                <Typography fontWeight={600}>Description</Typography>
                <Typography>{event.description}</Typography>
              </Box>
              <Box sx={{ p: 2 }}>
                <Typography fontWeight={600}>Keywords</Typography>
                <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                  {event.eventKeywords &&
                    event.eventKeywords.map(
                      (keyword: string, index: number) => (
                        <Chip
                          key={index}
                          label={keyword}
                          color="primary"
                          variant="outlined"
                        />
                      )
                    )}
                </Stack>
              </Box>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Box sx={{ p: 2 }}>
                <Box sx={{ bgcolor: grey[200], p: 2 }}>
                  {event.online_url && (
                    <Box sx={{ height: 80 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between"
                        }}
                      >
                        <Typography
                          sx={{ fontSize: 18, fontWeight: 600, mb: 2 }}
                        >
                          Online Event
                        </Typography>
                        <Launch />
                      </Box>
                      <Link
                        href={event.online_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: "none" }}
                      >
                        <Box>
                          <ContainedButton
                            variant="outlined"
                            label="Join online event"
                            width="200px"
                            onClick={undefined}
                            isLink
                          />
                        </Box>
                      </Link>
                    </Box>
                  )}
                  {event.location && (
                    <Box sx={{ height: 80 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between"
                        }}
                      >
                        <Typography
                          sx={{ fontSize: 18, fontWeight: 600, mb: 2 }}
                        >
                          Event Location
                        </Typography>
                        <LocationOn />
                      </Box>
                      <Link
                        href={`https://www.google.com/maps/place/?q=place_id:${event.location.place_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: "none" }}
                      >
                        <Box>
                          <ContainedButton
                            variant="outlined"
                            label="Open in maps"
                            width="200px"
                            onClick={undefined}
                            isLink
                          />
                        </Box>
                      </Link>
                    </Box>
                  )}
                </Box>
                <Box sx={{ height: 16 }} />
                <Box
                  sx={{
                    bgcolor: grey[200],
                    p: 2
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between"
                    }}
                  >
                    <Typography sx={{ fontSize: 18, fontWeight: 600, mb: 2 }}>
                      Schedule
                    </Typography>
                    <CalendarToday />
                  </Box>

                  <Stack direction="row">
                    <Typography sx={{ width: 100 }}>Start</Typography>
                    <Typography>
                      {moment(event.startDate).format("lll")}
                    </Typography>
                  </Stack>
                  <Stack direction="row">
                    <Typography sx={{ width: 100 }}>End</Typography>
                    <Typography>
                      {moment(event.endDate).format("lll")}
                    </Typography>
                  </Stack>
                  <Stack direction="row">
                    <Typography sx={{ width: 100 }}>Doortime</Typography>
                    <Typography>
                      {moment(event.doorTime).format("lll")}
                    </Typography>
                  </Stack>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </FlatCard>
      {isOrganizerView() && event.smartContractAddress && (
        <EventManagement
          event={event}
          checkedPrivileges={checkedPrivileges}
          isSmartContractOwner={isSmartContractOwner}
          resaleTicketPurchaseRequests={resaleTicketPurchaseRequests}
          handleNavigateAdmission={handleNavigateAdmission}
          approveResaleTicketPurchaseRequest={
            approveResaleTicketPurchaseRequest
          }
        />
      )}
    </FadeEntrance>
  )
}

export default EventSummary
