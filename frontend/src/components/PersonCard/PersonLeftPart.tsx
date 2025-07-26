import type { ProfileLink } from "@/types/Api/ProfileInfoType";
import LinkCard from "../LinkCard/LinkCard";
import type { LangsType } from "@/context/LangProvider";


type PersonLeftPartProps = {
  fullName: string;
  link: string;
  profileLinks : ProfileLink[];
  lang: LangsType;
};

const PersonLeftPart = ({ fullName, link , profileLinks , lang}: PersonLeftPartProps) => {
  return (
    <div className="w-full h-full flex items-center justify-center flex-col gap-20">
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-1 items-center transition-all cursor-pointer  justify-center hover:scale-110 text-5xl lg:text-7xl text-main animate-my-gradient leading-tight"
    >
      {fullName}
    </a>
    <div className="flex flex-wrap w-full justify-center items-center">
    {profileLinks?.map((ele:ProfileLink , index)=>(
      <LinkCard key={index} href={ele.href}  title={ele.title[lang]} img={ele?.img}  />
    ))}
    </div>
    </div>
  );
};
export default PersonLeftPart;
