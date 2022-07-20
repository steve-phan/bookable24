import React from "react"
import { render } from "src/tests/customRender"

import { ButtonsCTA } from "./ButtonsCTA"

jest.mock("gatsby-plugin-react-i18next", () => ({
  ...jest.requireActual("gatsby-plugin-react-i18next"),
  useI18next: () => ({ language: "de", languages: ["de", "en", "vn"] }),
  useTranslation: () => ({
    //TODO: Config Locales Provider for testing.
    t: (key: string) => key.split(".")[1].toUpperCase(),
  }),
}))

const no = () => {}

describe("ButtonCTA", () => {
  it("should render the Next button when activeStep equal 1", () => {
    const { queryByText, getByText } = render(
      <ButtonsCTA
        activeStep={1}
        handleConfirmSubmit={no}
        handleNext={no}
        handleBack={no}
      />
    )

    expect(getByText("NEXT")).toBeInTheDocument()
  })
})
