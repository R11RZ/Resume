import { Loader, ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import "./SceneWrapper.css";
import ScrollContent from "../ScrollContent/ScrollContent";
import { ModelBG } from "./ModelBG";

const SceneWrapper = () => {
  return (
    <div className="w-full h-screen">
      <Canvas className="absolute z-0 top-0 left-0 ">
        <ambientLight />
        <directionalLight position={[5, 5, 5]} />

        <Suspense fallback={null}>
          <ScrollControls
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
            pages={20}
            damping={1}
          >
            <ModelBG scale={2} position={[0, 2.5, 0]} />
          </ScrollControls>
        </Suspense>
      </Canvas>
      <Loader />
      <div className="absolute top-0 left-0 overflow-scroll w-[100dvw] h-[100dvh]  no-scroll-bar ">
        <ScrollContent />
      </div>
    </div>
  );
};

export default SceneWrapper;
