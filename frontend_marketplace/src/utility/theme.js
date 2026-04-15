const THEME_KEY = "darkMode";

export function isDarkModeEnabled() {
  return localStorage.getItem(THEME_KEY) === "true";
}

export function applyTheme(isDarkMode) {
  document.documentElement.classList.toggle("dark", isDarkMode);
  document.body.classList.toggle("dark", isDarkMode);
}

export function setDarkMode(isDarkMode) {
  localStorage.setItem(THEME_KEY, String(isDarkMode));
  applyTheme(isDarkMode);
  window.dispatchEvent(new CustomEvent("themechange", { detail: { darkMode: isDarkMode } }));
}
