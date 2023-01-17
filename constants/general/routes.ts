interface AppRoute {
  name: string
  url: string
  subroutes: SubRoute[]
}

interface SubRoute {
  name: string
  url: string
}
// TODO set up app routes separately for event organizers and customers
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
