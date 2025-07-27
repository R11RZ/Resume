import { Canvas } from "@react-three/fiber";
import "./SceneWrapper.css";
import ScrollContent from "../ScrollContent/ScrollContent";
import { ModelBG } from "./ModelBG";

const SceneWrapper = () => {
  return (
    <div className="w-full h-screen">
      <Canvas className="absolute z-0 top-0 left-0 ">
        <ambientLight />
        <directionalLight position={[5, 5, 5]} />
        <ModelBG scale={2} position={[0, 2.5, 0]} />
      </Canvas>
      <div className="absolute top-0 left-0 overflow-scroll w-[100dvw] h-[100dvh]  no-scroll-bar ">
        <ScrollContent />
      </div>
    </div>
  );
};

export default SceneWrapper;
