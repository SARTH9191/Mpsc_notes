import React, { createContext, useContext, useState, useEffect } from "react";
import { mr } from "../i18n/mr";
import { en } from "../i18n/en";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem("examvault_lang");
    return saved || "mr"; // Default Marathi per spec!
  });

  useEffect(() => {
    localStorage.setItem("examvault_lang", language);
    // Update html lang attribute
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "mr" ? "en" : "mr"));
  };

  const t = (key) => {
    const dict = language === "mr" ? mr : en;
    return dict[key] || mr[key] || en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t, isMarathi: language === "mr" }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
