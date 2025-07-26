import {  useProjectInfo } from "@/hooks/useProject";
import { motion, useInView } from "framer-motion";

import { useRef, useState } from "react";

import ImgPlaceHolder from "../ImgPlaceHolder/ImgPlaceHolder";
import TechCard from "../TechCard/TechCard";
import WebScreen from "./WebScreen";
import WasmSceen from "./WasmSceen";
import LinkCard from "../LinkCard/LinkCard";

type ProjectCardProps = {
  projectName: string;
  lang: string;
};

const text = {
  stack: {
    ru: "СТЕК",
    en: "STACK",
  },
  about: {
    ru: "О Проекте",
    en: "About Project",
  },
  problemsInProject: {
    ru: "Полученный опыт",
    en: "Experience Gained",
  },
};

const ProjectCard = ({ projectName, lang }: ProjectCardProps) => {
  const [needShowDemo, setNeedShowDemo] = useState<boolean>(false);
  const [projectInfo, error] = useProjectInfo(projectName);

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-30% 0px -30% 0px" });

  return (
    <motion.div
      ref={ref}
      animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -100 }}
      transition={{ duration: 0.5 }}
      className="w-[95%] flex flex-wrap justify-center items-center "
    >
      <h2 className="text-main text-5xl p-5">{projectInfo?.title}</h2>
      <div className="flex flex-wrap w-full items-center justify-center m-5 gap-5">
        {projectInfo?.links?.map((link, index) => (
          <LinkCard
            key={index}
            href={link?.href}
            img={link?.img}
            title={link?.title?.[lang]}
          />
        ))}
      </div>

      <div className="flex flex-wrap w-full gap-2 items-center justify-center ">
        <div
          className=" flex h-[50vh] w-10/12 max-w-[800px] cursor-pointer  bg-gray-800 rounded-2xl"
          onClick={() => (!needShowDemo ? setNeedShowDemo(true) : null)}
        >
          {!needShowDemo && projectInfo && (
            <ImgPlaceHolder PreView={projectInfo?.preView} />
          )}
          {projectInfo?.type === "web" &&
            needShowDemo &&
            projectInfo?.demoUrl && (
              <WebScreen projectName={projectInfo.demoUrl} openSource={projectInfo.openSource} />
            )}
          {projectInfo?.type === "wasm" &&
            projectInfo?.index_wasm !== undefined &&
            needShowDemo && <WasmSceen index_wasm={projectInfo.index_wasm} />}
        </div>
        <div className="flex p-5 w-10/12 max-w-[700px] gap-5  min-h-[50vh] rounded-2xl flex-col ">
          <div className="flex flex-col w-full items-start justify-center">
            <h3 className="text-main text-3xl w-full  p-2 flex items-center justify-center pl-6">
              {text.stack?.[lang]}
            </h3>
            <div className="flex  gap-6 p-6 flex-wrap justify-center items-center">
              {projectInfo?.stack?.map((ele, index) => {
                return <TechCard key={index} title={ele.title} img={ele.img} />;
              })}
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-5">
            <h3 className="text-main text-3xl w-full p-2  flex items-center justify-center pl-6">
              {text.about?.[lang]}
            </h3>
            <div className="bg-accent min-h-20 rounded-2xl flex items-center p-5  text-indent shadow-card border-1 text-justify ">
              {projectInfo?.about?.[lang]}
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-5">
            <h3 className="text-main text-3xl w-full p-2  flex text-left items-center justify-center pl-6">
              {text.problemsInProject?.[lang]}
            </h3>
            <div className="bg-accent min-h-20 rounded-2xl flex items-center p-5  text-justify text-indent shadow-card border-1">
              {projectInfo?.problemsInProject?.[lang]}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
