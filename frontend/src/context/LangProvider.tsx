import React, { createContext, useContext, useEffect, useState , type ReactNode } from "react";


type LangContextType = {
  lang: "ru" | 'en';
  setLang: React.Dispatch<React.SetStateAction<string>>;
}

const LangContext= createContext<LangContextType | undefined>(undefined);

export const useLang = () => useContext(LangContext);

type LangProviderProps = {
  children: ReactNode;
};

export function LangProvider({ children }:LangProviderProps) {
  const [lang, setLang] = useState<string>(localStorage.getItem("lang") || "");
  useEffect(() => {
    if (!lang) {
      const navigator_lang:string = navigator.language || "en";
      const target:string  = navigator_lang.startsWith("ru") ? "ru" : "en";
      localStorage.setItem("lang", target);
      setLang(target);
      return;
    }
    localStorage.setItem("lang", lang);
  }, [lang]);
  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}
