export enum Account {
  CUSTOMER = "CUSTOMER",
  EVENT_ORGANIZER = "EVENT_ORGANIZER"
}

export type Verification = "NotVerified" | "Verified"

export interface User {
  _id?: string
  image?: string
  phoneNumber: string
  email: string
  username: string
  verificationStatus: Verification
  accountType: Account
}

export interface CustomerUser extends User {
  firstName: string
  lastName: string
  accountType: Account.CUSTOMER
}

export interface EventOrganizerUser extends User {
  organizationName: string
  accountType: Account.EVENT_ORGANIZER
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
