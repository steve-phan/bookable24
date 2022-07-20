import React from "react"

import { appStore } from "src/store/store"
import { render } from "src/tests/customRender"

import HeaderComponent from "./index"

describe("Header", () => {
  it("should render Logo, Kontakt and StartSeite menu", () => {
    const { queryByText } = render(
      <HeaderComponent
        isShopLogin={false}
        location={{
          pathname: "/",
        }}
      />,
      {
        store: appStore,
      }
    )
    expect(queryByText("Bookable24")).not.toBeNull()
    expect(queryByText("Kontakt")).not.toBeNull()
    expect(queryByText("StartSeite")).not.toBeNull()
  })
})
