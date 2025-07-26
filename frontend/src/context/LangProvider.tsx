import React, { createContext, useContext, useEffect, useState , type ReactNode } from "react";


export type LangsType = "ru" | "en"

type LangContextType = {
  lang: LangsType;
  setLang: React.Dispatch<React.SetStateAction<LangsType>>;
}

const LangContext= createContext<LangContextType >(
  {lang: "ru" , setLang: ()=>{}}

);

export const useLang = () => useContext(LangContext);

type LangProviderProps = {
  children: ReactNode;
};

export function LangProvider({ children }:LangProviderProps) {
  const [lang, setLang] = useState<LangsType>(() => {
    const stored = localStorage.getItem("lang");
    return stored === "ru" || stored === "en" ? stored : "ru";
  });
  useEffect(() => {
    if (!lang) {
      const navigator_lang:string = navigator.language || "en";
      const target:LangsType  = navigator_lang.startsWith("ru") ? "ru" : "en";
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
