import React from "react"
import { withEventOrganizerGuard } from "../../../../guards/withAuth"

function TicketAdmissionPage() {
  return <div>TicketAdmissionPage</div>
}

export default withEventOrganizerGuard(TicketAdmissionPage)
