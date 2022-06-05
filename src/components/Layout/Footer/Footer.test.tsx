import React from "react"
import { render } from "@testing-library/react"
import "jest-styled-components"

import Footer from "./Footer"

test("Displays the correct title", () => {
  const { getByText } = render(<Footer />)
  expect(
    getByText(`@ ${new Date().getFullYear()} BookAble24`)
  ).toBeInTheDocument()
})
