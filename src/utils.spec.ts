import { validatePhone, validateEmail } from "./utils"

describe("validateEmail", () => {
  it("should return true with a valid Email", () => {
    const result = validateEmail("hello@bookable24.de")
    expect(result).toBe(true)
  })
})
