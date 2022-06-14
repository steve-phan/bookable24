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

export interface ITermin {
  created_at?: string
  email: string
  first_name: string
  last_name: string
  person: string
  phone: string
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

export interface IshopQuery {
  shopemail: string
  shopId: string
  isShopLogin: boolean
}

export interface Iaccount {
  email: string
  password: string
}

export interface IbookingState {
  numberOfGuest: number
  selectedDate: Date
  selectedSlot: number
  guestInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
    require: string
  }
  isValidInfo: boolean
}

// export interface IAppointment {
//   email: string
//   first_name: string
//   last_name: string
//   person: string
//   phone: string
//   require: string
//   selectedDate: Date
//   selectedSlot: string
//   status: boolean
// }
