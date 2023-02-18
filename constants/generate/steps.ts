export interface StepperSteps {
  step: number
  label: string
  header?: string
}

export const COMPLETE_MODE_STEPS: StepperSteps[] = [
  {
    step: 1,
    label: "Fill in ticket info"
  },
  {
    step: 2,
    label: "Upload asset to the right event type"
  },
  {
    step: 3,
    label: "Set some data about each of your asset"
  },
  {
    step: 4,
    label: "Hang tight and let us upload assets for you"
  }
]

export const LAYERED_MODE_STEPPER: StepperSteps[] = [
  {
    step: 1,
    label: "Fill in ticket info"
  },
  {
    step: 2,
    label: "Upload each layer"
  },
  {
    step: 3,
    label: "Order each layer"
  },
  {
    step: 4,
    label: "Customize Occurrence"
  },
  {
    step: 5,
    label: "Preview tickets"
  },
  {
    step: 6,
    label: "Select save options"
  }
]

export const MINI_LAYERED_FORM_STEPS = [
  {
    step: 1,
    title: "General settings"
  },
  {
    step: 2,
    title: "About the Ticket"
  },
  {
    step: 3,
    title: "Assets Settings"
  }
]

export const CREATE_EVENT_STEPS: StepperSteps[] = [
  {
    step: 1,
    header: "Event Details",
    label: "Information about your event"
  },
  {
    step: 2,
    header: "Event Itinerary",
    label: "Date, time, and location of your event"
  },
  {
    step: 3,
    header: "Event Ticket",
    label: "Select a suitable ticket for your event"
  }
]
