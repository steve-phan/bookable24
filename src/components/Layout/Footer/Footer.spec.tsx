import React from "react"
import { render } from "src/tests/customRender"

import Footer from "./Footer"

test("Displays the correct title", () => {
  const { getByText } = render(<Footer />)
  expect(
    getByText(`@ ${new Date().getFullYear()} BookAble24`)
  ).toBeInTheDocument()
})
