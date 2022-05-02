export interface IshopInfo {
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
    closedDay: "none" | "Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat"
    terminBefore?: number
    maxTerminPerSlot?: number
  }
}

export interface IshopState {
  shopInfo: IshopInfo
  status: "login" | "loading" | "logout"
  isShopLogin: boolean
  allTermins: any[]
  settings: {
    time: string
    slotTime: string
    closedDay: "none" | "Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat"
    weekdays: number[]
    terminBefore?: number
    maxTerminPerSlot?: number
  }
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

export interface IShop {
  email: string
  shopId: string
}
