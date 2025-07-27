import { useGLTF,  useAnimations } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useEffect } from "react";

type ModelBGProps = {
  scale: number;
  position: number[];
};

const ModelPath = "/models/low_earth.glb";

export function ModelBG(props: ModelBGProps) {
  const { scene, animations, cameras } = useGLTF(ModelPath);
  const { actions } = useAnimations(animations, scene);
  const { set } = useThree();

  useEffect(() => {
    actions["Earth|Earth|IcosphereAction"]?.play();
  }, [actions]);

  useEffect(() => {
    if (cameras && cameras.length > 0) {
      const cam = cameras[0];
      if (cam instanceof THREE.PerspectiveCamera) {
        cam.aspect = window.innerWidth / window.innerHeight;
        cam.updateProjectionMatrix();
        set({ camera: cam });
      }
    }
  }, [cameras, set]);


  return <primitive object={scene} {...props} />;
}
