import React from "react"

import { render } from "src/tests/customRender"

import { NavLinks } from "./Navlinks"

describe("NavLinks", () => {
  it("should render correct the links was provided", () => {
    const routes = [{ name: "/" }, { name: "/about" }, { name: "/contact" }]
    const { queryAllByRole } = render(<NavLinks routes={routes} />)

    expect(queryAllByRole("link")).toHaveLength(3)
  })
})
