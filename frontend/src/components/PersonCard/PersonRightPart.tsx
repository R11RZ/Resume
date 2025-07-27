import { useLang } from "@/context/LangProvider";
import TechCard from "../TechCard/TechCard";
import { useRef } from "react";
import { useInView, motion } from "motion/react";

type TechCard = {
  title: string;
  img: string;
};

type PersonRightPartProps = {
  specialization: string;
  langs: TechCard[];
  stack: TechCard[];
};

const text = {
  ru: "Активно работал с данными технологиями",
  en: "Actively worked with these technologies",
};

const PersonRightPart = ({
  specialization,
  langs,
  stack,
}: PersonRightPartProps) => {
  const { lang } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-35% 0px -35% 0px" });

  return (
    <motion.div
      ref={ref}
      animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 100 }}
      transition={{ duration: 0.5 }}
      className="flex h-full flex-1 min-w-[300px] items-center justify-center flex-col gap-6 "
    >
      <h1 className="text-4xl text-main leading-tight">{specialization}</h1>
      <div className="flex flex-wrap gap-5 items-center justify-center">
        {langs?.map((ele, index) => (
          <TechCard key={index} title={ele.title} img={ele.img} />
        ))}
      </div>
      <h2 className="text-4xl text-main animate-my-gradient leading-tight">
        {text[lang]}
      </h2>
      <div className="flex flex-wrap gap-5 justify-center items-center">
        {stack?.map((ele, index) => (
          <TechCard key={index} title={ele.title} img={ele.img} />
        ))}
      </div>
    </motion.div>
  );
};
export default PersonRightPart;
