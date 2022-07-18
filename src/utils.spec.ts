import { validateEmail, validatePhone, timeAgo, ItimeAgoMess } from "./utils"

describe("validateEmail", () => {
  it("should return `true` with a valid Email", () => {
    const result = validateEmail("hello@bookable24.de")
    expect(result).toBe(true)
  })
  it("should return `false` with an invalid Email", () => {
    const result = validateEmail("hello@bookable24")
    expect(result).toBe(false)
  })
})

describe("validatePhone", () => {
  it("should return `true` with a valid Phone", () => {
    const result = validatePhone("01745285555")
    expect(result).toBe(true)
  })
  it("should return `false` with an invalid Phone", () => {
    const result = validatePhone("01745sA4")
    expect(result).toBe(false)
  })
})

describe("timeAgo", () => {
  const showMess: ItimeAgoMess = {
    second: "second ago",
    minute: "minute ago",
    halfhour: "halfhour ago",
    hour: "hour ago",
    hours: "hours ago",
    day: "day ago",
    week: "week ago",
    month: "month ago",
  }

  it("should return value month ago", () => {
    const result = timeAgo(
      "Mon Jul 11 2022 16:03:50 GMT+0200",
      showMess,
      new Date("2022-07-25")
    )
    expect(result).toEqual("month ago")
  })

  it("should return value day ago", () => {
    const result = timeAgo(
      "Mon Jul 11 2022 16:03:50 GMT+0200",
      showMess,
      new Date("2022-07-14")
    )
    expect(result).toEqual("2 day ago")
  })
})
