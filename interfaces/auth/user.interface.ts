export enum Account {
  Customer = "Customer",
  EventOrganizer = "EventOrganizer"
}

export type Verification = "NotVerified" | "Verified"

export interface User {
  _id?: string
  phoneNumber: string
  email: string
  username: string
  verificationStatus: Verification
  accountType: Account
}

export interface CustomerUser extends User {
  firstName: string
  lastName: string
  accountType: Account.Customer
}

export interface EventOrganizerUser extends User {
  organizationName: string
  accountType: Account.EventOrganizer
}

export interface UserGeneralInfo {
  phoneNumber: string
  email: string
  username: string
  verificationStatus: Verification
  accountType: Account
  firstName?: string
  lastName?: string
  organizationName?: string
}
