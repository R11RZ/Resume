import type { MultyLangStringType } from "./utilType";

export type ProfileInfoType =  {
  fullName: MultyLangStringType;
  link: string;
  profileLinks: ProfileLink[];
  specialization: string;
  langs: Lang[];
  stack: Lang[];
  aboutMeCards: AboutMeCard[];
  Projects: string[];
}

type AboutMeCard = {
  title: MultyLangStringType;
  text: MultyLangStringType;
}

type Lang = {
  title: string;
  img: string;
}

export type ProfileLink = {
  title: MultyLangStringType;
  img: string;
  href: string;
}


