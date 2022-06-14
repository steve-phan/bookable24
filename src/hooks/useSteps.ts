import { useTranslation } from "gatsby-plugin-react-i18next"

export const useSteps = () => {
  const { t } = useTranslation()

  return [
    t("booking.steps.number"),
    t("booking.steps.time"),
    t("booking.steps.info"),
  ]
}
