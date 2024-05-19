import i18n from "i18next";
import translationEn from "./i18n/locales/translationEn.json";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: translationEn,
  },
  fr: {
    translation: {
      "Welcome to React": "Bienvenue à React et react-i18next",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
