// import i18n from "i18next";
// import { initReactI18next } from "react-i18next";
// import LanguageDetector from "i18next-browser-languagedetector";

// import en from "./translations/en.json";
// import fr from "./translations/fr.json";
// import es from "./translations/es.json";
// import zh from "./translations/zh.json";
// import ar from "./translations/ar.json";
// import ja from "./translations/ja.json";
// import pt from "./translations/pt.json";

// export const LANGUAGES = [
//   { code: "en", label: "English",    flag: "🇬🇧", dir: "ltr" },
//   { code: "fr", label: "Français",   flag: "🇫🇷", dir: "ltr" },
//   { code: "es", label: "Español",    flag: "🇪🇸", dir: "ltr" },
//   { code: "zh", label: "中文",        flag: "🇨🇳", dir: "ltr" },
//   { code: "ar", label: "العربية",    flag: "🇸🇦", dir: "rtl" },
//   { code: "ja", label: "日本語",      flag: "🇯🇵", dir: "ltr" },
//   { code: "pt", label: "Português",  flag: "🇵🇹", dir: "ltr" },
// ] as const;

// export type LanguageCode = typeof LANGUAGES[number]["code"];

// i18n
//   .use(LanguageDetector)   // detects language from localStorage / browser
//   .use(initReactI18next)
//   .init({
//     resources: {
//       en: { translation: en },
//       fr: { translation: fr },
//       es: { translation: es },
//       zh: { translation: zh },
//       ar: { translation: ar },
//       ja: { translation: ja },
//       pt: { translation: pt },
//     },
//     // LanguageDetector looks in localStorage under this key first
//     detection: {
//       order: ["localStorage", "navigator"],
//       lookupLocalStorage: "i18nLang",
//       caches: ["localStorage"],
//     },
//     fallbackLng: "en",
//     interpolation: {
//       escapeValue: false, // React already escapes values
//     },
//   });

// /**
//  * Call this whenever the language changes.
//  * It updates both i18next and the HTML dir attribute for RTL support.
//  */
// export function applyLanguage(code: LanguageCode): void {
//   const lang = LANGUAGES.find((l) => l.code === code);
//   if (!lang) return;
//   i18n.changeLanguage(code);
//   document.documentElement.setAttribute("lang", code);
//   document.documentElement.setAttribute("dir", lang.dir);
//   localStorage.setItem("i18nLang", code);
// }

// // Apply direction on initial load
// const savedLang = (localStorage.getItem("i18nLang") ?? "en") as LanguageCode;
// applyLanguage(savedLang);

// export default i18n;