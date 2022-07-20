import React from "react"
import { useTranslation, I18nextProvider } from "gatsby-plugin-react-i18next"

import { ButtonSt, WrapRowSt } from "./ShopPage.styles"

export interface IButtonsCTAprops {
  activeStep: number
  handleBack: () => void
  handleNext: () => void
  // isNextButtonDisable: () => boolean
  handleConfirmSubmit: () => void
}

export const ButtonsCTA = ({
  activeStep,
  handleBack,
  handleNext,
  // isNextButtonDisable,
  handleConfirmSubmit,
}: IButtonsCTAprops) => {
  const { t } = useTranslation()
  return (
    <WrapRowSt>
      <ButtonSt
        disabled={activeStep === 0}
        variant="contained"
        color="primary"
        onClick={handleBack}
      >
        {t("button.back")}
      </ButtonSt>
      <ButtonSt
        // disabled={activeStep === 2 && !isValidInfo} //|| isNextButtonDisable()
        variant="contained"
        color="primary"
        onClick={() => {
          if (activeStep < 3) {
            handleNext()
          } else {
            handleConfirmSubmit()
          }
        }}
      >
        {activeStep < 2
          ? t("button.next")
          : activeStep === 2
          ? t("button.preview")
          : t("button.book")}
      </ButtonSt>
    </WrapRowSt>
  )
}
