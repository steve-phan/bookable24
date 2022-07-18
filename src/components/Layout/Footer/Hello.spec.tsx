import React from "react"
import { render } from "src/tests/customRender"

import Hello from "./Hello"

test("render with styled-component", () => {
  const { getByText } = render(<Hello />)
  expect(getByText("Click me")).toBeInTheDocument()
})
