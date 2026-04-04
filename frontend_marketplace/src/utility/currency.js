const CURRENCY_KEY = "marketplace_currency";
const CURRENCY_EVENT = "currencychange";

const CURRENCY_CONFIG = {
  INR: { locale: "en-IN", fractionDigits: 0 },
  USD: { locale: "en-US", fractionDigits: 0 },
  EUR: { locale: "de-DE", fractionDigits: 0 },
};

// Base rates are relative to USD.
const TO_USD_RATE = {
  USD: 1,
  INR: 1 / 83,
  EUR: 1 / 0.92,
};

function parseAmount(value) {
  if (typeof value === "number") {
    return { amount: value, currency: "USD" };
  }

  const raw = String(value ?? "").trim();
  const amount = Number(raw.replace(/[^0-9.]/g, "")) || 0;

  if (raw.includes("₹")) return { amount, currency: "INR" };
  if (raw.includes("€")) return { amount, currency: "EUR" };
  return { amount, currency: "USD" };
}

function convertAmount(amount, fromCurrency, toCurrency) {
  const fromRate = TO_USD_RATE[fromCurrency] || 1;
  const toRate = TO_USD_RATE[toCurrency] || 1;
  const inUsd = amount * fromRate;
  return inUsd / toRate;
}

export function getSelectedCurrency() {
  const value = localStorage.getItem(CURRENCY_KEY);
  return CURRENCY_CONFIG[value] ? value : "INR";
}

export function setSelectedCurrency(currency) {
  if (!CURRENCY_CONFIG[currency]) return;

  localStorage.setItem(CURRENCY_KEY, currency);
  window.dispatchEvent(new CustomEvent(CURRENCY_EVENT, { detail: { currency } }));
}

export function formatCurrency(value, currency = getSelectedCurrency()) {
  const { amount, currency: sourceCurrency } = parseAmount(value);
  const converted = convertAmount(amount, sourceCurrency, currency);
  const config = CURRENCY_CONFIG[currency] || CURRENCY_CONFIG.INR;

  return new Intl.NumberFormat(config.locale, {
    style: "currency",
    currency,
    maximumFractionDigits: config.fractionDigits,
  }).format(converted);
}

export function subscribeCurrencyChange(onChange) {
  const handler = (event) => onChange(event.detail?.currency || getSelectedCurrency());
  window.addEventListener(CURRENCY_EVENT, handler);

  return () => window.removeEventListener(CURRENCY_EVENT, handler);
}
