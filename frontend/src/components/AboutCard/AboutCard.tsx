import { useRef } from "react";
import { motion, useInView } from "framer-motion";

type AboutCardProps = {
  title: string;
  text: string;
  index: number;
};

const AboutCard = ({ title, text, index, ...props }: AboutCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-30% 0px -30% 0px" });
  return (
    <motion.div
      ref={ref}
      animate={{
        opacity: inView ? 1 : 0,
        x: inView ? 0 : index % 2 ? -100 : 100,
      }}
      transition={{ duration: 0.5 }}
      className=" w-full flex  items-center justify-center "
    >
      <div
        className={`w-10/12 max-w-[800px]  rounded-3xl border-1 shadow-card  flex items-center justify-${
          index % 2 ? "end" : "start"
        }`}
        {...props}
      >
        <div className="w-full  bg-neutral-900 p-7 rounded-3xl opacity-90 flex flex-col gap-3">
          <h2 className="text-2xl font-bold text-left">{title}</h2>
          <div className="text-xl text-indent text-justify flex justify-center items-center">
            {text}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutCard;
