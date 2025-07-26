import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useLang } from "@/context/LangProvider";

type HeaderProps = {
  link: string;
};
const textBtn = {
  en: "Contact me",
  ru: "Связаться со мной",
};

const Overlay = ({ link }: HeaderProps) => {
  const { lang, setLang } = useLang();
  return (
    <div className="fixed  pointer-events-none w-screen h-screen z-20 p-5 flex items-end justify-between flex-col   ">
      <div className="">
        <ToggleGroup
          className="shadow-card pointer-events-auto w-[100px]"
          type="single"
          value={lang}
          onValueChange={(e) => setLang(e)}
        >
          <ToggleGroupItem value="ru">Ru</ToggleGroupItem>
          <ToggleGroupItem value="en">Eng</ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="  flex items-center justify-center w-[300px] h-10 rounded-3xl border-soft shadow-card ">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto cursor-pointe transition-transform hover:scale-110  text-main w-full h-full flex items-center justify-center"
        >
          {textBtn[lang]}
        </a>
      </div>
    </div>
  );
};

export default Overlay;
