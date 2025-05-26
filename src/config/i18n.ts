import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from "@/locale/translations/en.json";
import translationPTBR from "@/locale/translations/pt-br.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: translationEN,
    },
    "pt-BR": {
      translation: translationPTBR,
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export { i18n };
