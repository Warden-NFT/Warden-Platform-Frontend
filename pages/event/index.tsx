import React from "react"
import { withEventOrganizerGuard } from "../../guards/withAuth"
import AddIcon from "@mui/icons-material/Add"
import { useRouter } from "next/router"
import MyEvents from "../../components/event/MyEvents/EventsList/EventsList"
import BannerLayout from "../../components/UI/layout/BannerLayout"
import ContainerCard from "../../components/UI/card/ContainerCard"
import EventsSearch from "../../components/event/MyEvents/EventsSearch/EventsSearch"

function EventCreationPage() {
  const router = useRouter()
  const onCLickCreateEvent = () => {
    router.push("/event/create")
  }

  return (
    <BannerLayout
      backgroundImage="eventBackground"
      title="Events"
      subtitle="Create and manage NFT-ticket based events"
      enableActionButton
      action={onCLickCreateEvent}
      actionName="Create Event"
      actionIcon={<AddIcon />}
    >
      <ContainerCard>
        <EventsSearch />
        <MyEvents />
      </ContainerCard>
    </BannerLayout>
  )
}

export default withEventOrganizerGuard(EventCreationPage)
