import React from "react"
import { useTranslation } from "gatsby-plugin-react-i18next"

import { appStore } from "src/store/store"
import { render } from "src/tests/customRender"

import HeaderComponent from "./index"

jest.mock("gatsby-plugin-react-i18next", () => ({
  ...jest.requireActual("gatsby-plugin-react-i18next"),
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}))

describe("Header", () => {
  it("should render Logo", () => {
    const { queryByText } = render(
      <HeaderComponent
        isShopLogin={true}
        location={{
          pathname: "/",
        }}
      />,
      {
        store: appStore,
      }
    )

    expect(queryByText("Bookable24")).not.toBeNull()
  })
})
