import React from "react"
import { withEventOrganizerGuard } from "../../guards/withAuth"
import AddIcon from "@mui/icons-material/Add"
import { useRouter } from "next/router"
import MyEvents from "../../components/event/MyEvents/EventsList"
import BannerLayout from "../../components/UI/layout/BannerLayout"
import ContainerCard from "../../components/UI/card/ContainerCard"
import EventsSearch from "../../components/event/MyEvents/EventsSearch"
import { Container } from "@mui/system"

function EventCreationPage() {
  const router = useRouter()

  const onCLickCreateEvent = () => {
    router.push("/event/create")
  }

  return (
    <BannerLayout
      backgroundImage="/images/background/event-background.jpeg"
      title="Events"
      subtitle="Create and manage NFT-ticket based events"
      enableActionButton
      action={onCLickCreateEvent}
      actionName="Create Event"
      actionIcon={<AddIcon />}
    >
      <Container>
        <ContainerCard>
          <EventsSearch />
          <MyEvents />
        </ContainerCard>
      </Container>
    </BannerLayout>
  )
}

export default withEventOrganizerGuard(EventCreationPage)
