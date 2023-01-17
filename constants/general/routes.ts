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
    name: 'Home',
    url: '/home',
    subroutes: []
  },
  {
    name: 'Marketplace',
    url: '/marketplace',
    subroutes: []
  },
  {
    name: 'Create',
    url: '/create',
    subroutes: [
      {
        name: 'Event',
        url: '/create/event'
      },
      {
        name: 'Ticket',
        url: '/create/ticket'
      }
    ]
  }
]

export const EVENT_ORGANIZER_APP_ROUTES: AppRoute[] = [
  {
    name: 'Home',
    url: '/home',
    subroutes: []
  },
  {
    name: 'Marketplace',
    url: '/marketplace',
    subroutes: []
  },
  {
    name: 'Create',
    url: '/create',
    subroutes: [
      {
        name: 'Event',
        url: '/create/event'
      },
      {
        name: 'Ticket',
        url: '/create/ticket'
      }
    ]
  }
]

export const CUSTOMER_APP_ROUTES: AppRoute[] = [
  {
    name: 'Home',
    url: '/home',
    subroutes: []
  },
  {
    name: 'Marketplace',
    url: '/marketplace',
    subroutes: []
  }
]
