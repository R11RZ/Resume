import { useScroll, Scroll, Loader } from "@react-three/drei";
import { motion, useTransform, useMotionValue } from "framer-motion";
import { useFrame } from "@react-three/fiber";
import PersonLeftPart from "../PersonCard/PersonLeftPart";
import PersonRightPart from "../PersonCard/PersonRightPart";
import AboutCard from "../AboutCard/AboutCard";
import ProjectCard from "../ProjectCard/ProjectCard";
import { useProfileInfo } from "@/hooks/useProfileInfo";
import { useLang } from "@/context/LangProvider";
import { useEffect } from "react";

const ScrollContent = () => {
  // lang is passed via prop drilling because Scroll_html uses a portal and doesn't inherit the current context
  const { lang } = useLang();
  const [profileInfo, error, loading] = useProfileInfo();

  const scroll = useScroll();
  const scrollOffset = useMotionValue(0);

  useEffect(()=>{
    console.log(error)
  }, [error])

  useFrame(() => {
    scrollOffset.set(scroll.offset);
  });

  const leftPersonX = useTransform(scrollOffset, [0, 0.2], [0, -1000]);
  const rightPersonX = useTransform(scrollOffset, [0, 0.2], [0, 1000]);

  return (
    <Scroll html>
      {!loading && (
        <div className="flex flex-col w-screen">
          <div className=" w-full min-h-screen flex flex-wrap mt-[40px] items-center justify-center">
            <motion.div
              style={{
                x: leftPersonX,
              }}
              className="text-3xl w-11/12 max-w-[700px]  flex  items-center justify-center animate-show-from-left"
            >
              <PersonLeftPart
                lang={lang}
                profileLinks={profileInfo?.profileLinks || [] }
                fullName={profileInfo?.fullName?.[lang] || ""}
                link={profileInfo?.link || ""}
              />
            </motion.div>
            <motion.div
              style={{
                x: rightPersonX,
              }}
              className="w-11/12 max-w-[700px]  flex items-center justify-center animate-show-from-right"
            >
              <PersonRightPart
                lang={lang}
                specialization={profileInfo?.specialization || ""}
                langs={profileInfo?.langs || []}
                stack={profileInfo?.stack || []}
              />
            </motion.div>
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
              <ProjectCard lang={lang} projectName={name} />
            </div>
          ))}
          {!loading && <Loader />}
        </div>
      )}
    </Scroll>
  );
};

export default ScrollContent;
