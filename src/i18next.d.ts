import enTranslations from "@/locale/translations/en.json";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "translation";
    resources: {
      translation: typeof enTranslations;
    };
  }
}
