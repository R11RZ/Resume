import type { LangsType } from "@/context/LangProvider";
import TechCard from "../TechCard/TechCard";

type TechCard = {
  title: string;
  img: string;
};

type PersonRightPartProps = {
  specialization: string;
  lang:LangsType;
  langs: TechCard[];
  stack: TechCard[];
};

const text = {
	"ru" : "Активно работал с данными технологиями",
	"en" : "Actively worked with these technologies"
};

const PersonRightPart = ({
  specialization,
  langs,
  stack,
  lang
}: PersonRightPartProps
) => {

  return (
    <div className="flex h-full flex-1 items-center justify-center flex-col gap-6 ">
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
    </div>
  );
};
export default PersonRightPart;
