import PersonLeftPart from "../PersonCard/PersonLeftPart";
import PersonRightPart from "../PersonCard/PersonRightPart";
import AboutCard from "../AboutCard/AboutCard";
import ProjectCard from "../ProjectCard/ProjectCard";
import { useProfileInfo } from "@/hooks/useProfileInfo";
import { useLang } from "@/context/LangProvider";
import { useEffect } from "react";

const ScrollContent = () => {
  const { lang } = useLang();
  const [profileInfo, error, loading] = useProfileInfo();

  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <div>
      {!loading && (
        <div className="flex flex-col w-screen">
          <div className=" w-full min-h-screen flex flex-wrap mt-[50px] mb-[50px] gap-5 items-center justify-center">
            <PersonLeftPart
              profileLinks={profileInfo?.profileLinks || []}
              fullName={profileInfo?.fullName?.[lang] || ""}
              link={profileInfo?.link || ""}
            />
            <PersonRightPart
              specialization={profileInfo?.specialization || ""}
              langs={profileInfo?.langs || []}
              stack={profileInfo?.stack || []}
            />
          </div>
          <div className="w-full flex mb-32 items-center justify-center flex-col gap-20">
            {profileInfo?.aboutMeCards?.map((card, index) => (
              <AboutCard
                key={index}
                title={card.title[lang]}
                text={card.text[lang]}
                index={index}
              />
            ))}
          </div>

          {profileInfo?.Projects?.map((name, index) => (
            <div
              key={index}
              className="w-full min-h-[100vh]  flex items-center justify-center"
            >
              <ProjectCard projectName={name} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ScrollContent;
