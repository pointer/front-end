
import { createI18n } from "vue-i18n";
import en from "../locales/en.json";
import ar from "../locales/ar.json";
import fr from "../locales/fr.json";

function loadLocaleMessages() {
  const locales = [{ fr: fr }, { en: en }, { ar: ar }];
  const messages = {};
  locales.forEach((lang) => {
    const key = Object.keys(lang);
    messages[key] = lang[key];
  });
  return messages;
}

const numberFormats = {
  en: {
    currency: {
      style: "currency",
      currency: "USD",
      currencyDisplay: "symbol",
    },
    percent: {
      style: "percent",
    },
    decimal: {
      style: "decimal",
    },
  },
  ar: {
    currency: {
      style: "currency",
      currency: "AED",
      currencyDisplay: "symbol",
    },
    percent: {
      style: "percent",
    },
    decimal: {
      style: "decimal",
    },
  },
};

const datetimeFormats = {
  en: {
    shortFormat: {
      dateStyle: "short",
    },
    long: {
      year: 'numeric', month: 'short', day: 'numeric',
      weekday: 'short', hour: 'numeric', minute: 'numeric'
    },
    longDate:{
        year: 'numeric', month: 'short', day: 'numeric',
    },
    longMonth:{
      year: 'numeric', month: 'long', day: 'numeric',
  }
  },
  ar: {
    shortFormat: {
      dateStyle: "short",
    },
    long: {
      year: 'numeric', month: 'short', day: 'numeric',
      weekday: 'short', hour: 'numeric', minute: 'numeric'
    },
    longDate:{
      year: 'numeric', month: 'short', day: 'numeric',
    },
    longMonth:{
      year: 'numeric', month: 'long', day: 'numeric',
  }
    },
  fr: {
    shortFormat: {
      dateStyle: "short",
    },
    long: {
      year: 'numeric', month: 'short', day: 'numeric',
      weekday: 'short', hour: 'numeric', minute: 'numeric'
    },
    longDate:{
      year: 'numeric', month: 'short', day: 'numeric',
    },
    longMonth:{
      year: 'numeric', month: 'long', day: 'numeric',
  }
  },  
};

export default createI18n({
  locale: "fr",
  fallbackLocale: "en",
  legacy: false,
    messages: loadLocaleMessages(),
    numberFormats,
  datetimeFormats,
});