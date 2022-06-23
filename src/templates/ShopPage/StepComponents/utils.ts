import { TFunction } from "gatsby-plugin-react-i18next"
import * as yup from "yup"

import { validatePhone } from "src/utils"

export const getSchema = (t: TFunction<string | string[], undefined>) => {
  return yup.object({
    firstName: yup
      .string()
      .trim()
      .required(t("booking.validation.error.fistName")),
    lastName: yup
      .string()
      .trim()
      .required(t("booking.validation.error.lastName")),
    email: yup
      .string()
      .trim()
      .email(t("booking.validation.error.email"))
      .required(t("booking.validation.error.email")),
    phone: yup
      .string()
      .trim()
      .test("valid-phone", t("booking.validation.error.phone"), tel => {
        return validatePhone(tel as string)
      })
      .required(t("booking.validation.error.phone")),

    require: yup.string().nullable(),
  })
}
