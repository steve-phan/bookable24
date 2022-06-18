export interface IShopInfo {
  city: string
  cityCode: string
  company: string
  email: string
  firstName: string
  lastName: string
  phoneNumber: string
  shopName: string
  street: string
  uid?: string
  settings: {
    time: string
    slotTime: string
    weekdays: number[]
    closedRegularDay:
      | "none"
      | "Sun"
      | "Mon"
      | "Tue"
      | "Wed"
      | "Thu"
      | "Fri"
      | "Sat"
    closedSpecificDay: Date[]
    terminBefore?: number
    maxTerminPerSlot?: number
  }
}

export interface ICustomer {
  email: string
  firstName: string
  lastName: string
  phone: string
}
export interface IInfoUserProps extends ICustomer {
  require?: string
  isSubmitted?: boolean
}
export interface ITermin extends ICustomer {
  created_at?: string
  person: string
  require: null | string
  selectedDate: string
  selectedSlot: string
  slots?: string
  status: boolean
  __v?: number
  _id?: string
  canceled?: boolean
}

export interface IShop {
  email: string
  shopId: string
}

export interface IShopState {
  shopInfo: IShopInfo
  status: "login" | "loading" | "logout"
  isShopLogin: boolean
  allTermins: any[]
  isFetching: boolean
  cancelTermin: ITermin
}

export interface IShopQuery {
  shopEmail: string
  shopId: string
  isShopLogin: boolean
}

export interface Iaccount {
  email: string
  password: string
}
export type TCustomerInfo =
  | "firstName"
  | "lastName"
  | "email"
  | "phone"
  | "require"

export interface IBooking {
  person: number
  selectedDate: Date
  selectedSlot: number
  firstName: string
  lastName: string
  email: string
  phone: string
  require?: string
}

export interface IBookingState extends IBooking {
  isValidInfo: boolean
  isSubmitted: boolean
}
