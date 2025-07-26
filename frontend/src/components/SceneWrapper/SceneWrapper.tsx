import {
  ScrollControls,
} from "@react-three/drei";
import { Canvas,  } from "@react-three/fiber";
import { Suspense, } from "react";
import "./SceneWrapper.css";
import ScrollContent from "../ScrollContent/ScrollContent";
import { ModelBG } from "./ModelBG";




const SceneWrapper = () => {

  return (
    <div className="w-full h-screen">
      <Canvas   >
        <ambientLight />
        <directionalLight position={[5, 5, 5]} />

        <Suspense fallback={null}>
          <ScrollControls
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
            pages={10}
            damping={1}
            className="no-scrollbar"
          >
            <ModelBG scale={2} position={[0, 2.5, 0]} />

            <ScrollContent />
        </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default SceneWrapper;
