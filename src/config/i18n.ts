import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationEN from "@/locale/translations/en.json";
import translationPTBR from "@/locale/translations/pt-br.json";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    supportedLngs: ["en", "pt-BR"],
    resources: {
      en: { translation: translationEN },
      "pt-BR": { translation: translationPTBR },
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export { i18n };
