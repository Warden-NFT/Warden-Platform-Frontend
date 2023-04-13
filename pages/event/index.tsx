import React from "react"
import { withEventOrganizerGuard } from "../../guards/withAuth"
import AddIcon from "@mui/icons-material/Add"
import { useRouter } from "next/router"
import EventList from "../../components/event/MyEvents/EventsList"
import BannerLayout from "../../components/UI/layout/BannerLayout"
import ContainerCard from "../../components/UI/card/ContainerCard"
import EventsSearch from "../../components/event/MyEvents/EventsSearch"
import { Container } from "@mui/system"
import Head from "next/head"
import { useEvents } from "../../hooks/useEvents"

function EventCreationPage() {
  const router = useRouter()
  const { events, getEventFromOrganizer, eventLoading, searchMyEvents } =
    useEvents()

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
      <Head>
        <title>Create an Event</title>
      </Head>
      <Container>
        <ContainerCard>
          <EventsSearch events={events} searchMyEvents={searchMyEvents} />
          <EventList
            events={events}
            getEventFromOrganizer={getEventFromOrganizer}
            eventLoading={eventLoading}
          />
        </ContainerCard>
      </Container>
    </BannerLayout>
  )
}

export default withEventOrganizerGuard(EventCreationPage)
