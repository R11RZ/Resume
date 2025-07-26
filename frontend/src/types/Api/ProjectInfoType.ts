import type { MultyLangStringType } from "./utilType";



export  type TechCardInfoType = {
    title: string;
    img:string;
}
export type LinkCardType = {
    title: MultyLangStringType;
    href: string;
    img:string;
}

export type ProjectInfType = {
    title: string;
    links: LinkCardType[];
    about: MultyLangStringType;
    problemsInProject : MultyLangStringType;
    stack: TechCardInfoType[];
    type: "wasm" | "web";
    index_wasm?: number ;
    openSource : boolean;
    preView : string;
    demoUrl?: string;
} 



