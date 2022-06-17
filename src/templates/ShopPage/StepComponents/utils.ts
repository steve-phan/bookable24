import { TFunction } from "gatsby-plugin-react-i18next"
import * as yup from "yup"

import { validateEmail, validatePhone } from "src/utils"

export const getSchema = (t: TFunction<string | string[], undefined>) => {
  return yup.object({
    firstName: yup.string().required(t("booking.validation.error.fistName")),
    lastName: yup.string().required(t("booking.validation.error.lastName")),
    email: yup
      .string()
      .email(t("booking.validation.error.email"))
      .required(t("booking.validation.error.email")),
    phone: yup.string().required(t("booking.validation.error.phone")),
  })
}
