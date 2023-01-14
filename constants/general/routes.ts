interface AppRoute {
  name: string;
  url: string;
  subroutes: SubRoute[];
}

interface SubRoute {
  name: string;
  url: string;
}

export const APP_ROUTES: AppRoute[] = [
  {
    name: "Home",
    url: "/",
    subroutes: [],
  },
  {
    name: "Marketplace",
    url: "/marketplace",
    subroutes: [],
  },
  {
    name: "Create",
    url: "/create",
    subroutes: [
      {
        name: "Event",
        url: "/create/event",
      },
      {
        name: "Ticket",
        url: "/create/ticket",
      },
    ],
  },
];
