import React from "react"
import { render } from "@testing-library/react"

import Hello from "./Hello"

it("Test Hello Component", () => {
  const { getByText } = render(<Hello />)
  expect(getByText("Hello")).toBeInTheDocument()
})
