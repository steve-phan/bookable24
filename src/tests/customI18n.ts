import i18n from "i18next"
import { initReactI18next, getI18n } from "gatsby-plugin-react-i18next"
import { deLanguage, enLanguage, vnLanguage } from "src/locales"

i18n.use(initReactI18next).init({
  lng: "de",
  fallbackLng: "de",

  // have a common namespace used around the full app
  // ns: ["translation"],
  // defaultNS: "translation",

  debug: true,

  interpolation: {
    escapeValue: false, // not needed for react!!
  },

  resources: {
    de: { translation: deLanguage },
    en: { translation: enLanguage },
    vn: { translation: vnLanguage },
  },
})

export default i18n
