export interface EventSearchParams {
  searchTerm?: string | undefined
  startDate?: string | undefined
  endDate?: string | undefined
  location?: string | undefined
}

export const EVENT_LIST_MODE = {
  FEATURED: "FEATURED",
  LATEST: "LATEST"
}

export type EventListMode = keyof typeof EVENT_LIST_MODE
