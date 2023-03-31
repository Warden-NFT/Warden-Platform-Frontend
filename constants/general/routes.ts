export interface AppRoute {
  name: string
  url: string
  subroutes: SubRoute[]
}

interface SubRoute {
  name: string
  url: string
}

export const APP_ROUTES: AppRoute[] = [
  {
    name: "Marketplace",
    url: "/marketplace",
    subroutes: []
  }
]

export const EVENT_ORGANIZER_APP_ROUTES: AppRoute[] = [
  {
    name: "Marketplace",
    url: "/marketplace",
    subroutes: []
  },
  {
    name: "Event",
    url: "/event",
    subroutes: []
  },
  {
    name: "Ticket",
    url: "/ticket",
    subroutes: []
  }
]

export const CUSTOMER_APP_ROUTES: AppRoute[] = [
  {
    name: "Marketplace",
    url: "/marketplace",
    subroutes: []
  },
  {
    name: "My Tickets",
    url: "/me",
    subroutes: []
  }
]
