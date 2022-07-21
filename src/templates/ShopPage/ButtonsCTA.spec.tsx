import React from "react"
import { render } from "src/tests/customRender"

import { ButtonsCTA } from "./ButtonsCTA"
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

    expect(getByText("Weiter")).toBeInTheDocument()
  })
})
