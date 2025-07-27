import type { ProfileLink } from "@/types/Api/ProfileInfoType";
import LinkCard from "../LinkCard/LinkCard";
import { useLang } from "@/context/LangProvider";
import { useRef } from "react";
import { useInView, motion } from "motion/react";

type PersonLeftPartProps = {
  fullName: string;
  link: string;
  profileLinks: ProfileLink[];
};

const PersonLeftPart = ({
  fullName,
  link,
  profileLinks,
}: PersonLeftPartProps) => {
  const { lang } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-35% 0px -35% 0px" });

  return (
    <motion.div
      ref={ref}
      animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -100 }}
      transition={{ duration: 0.5 }}
      className="flex-1 h-full min-w-[250px] flex items-center justify-center flex-col gap-20"
    >
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 items-center transition-all cursor-pointer  justify-center hover:scale-110 text-5xl lg:text-7xl text-main animate-my-gradient leading-tight"
      >
        {fullName}
      </a>
      <div className="flex flex-col gap-5 w-full justify-center items-center">
        {profileLinks?.map((ele: ProfileLink, index) => (
          <LinkCard
            key={index}
            href={ele.href}
            title={ele.title[lang]}
            img={ele?.img}
          />
        ))}
      </div>
    </motion.div>
  );
};
export default PersonLeftPart;
