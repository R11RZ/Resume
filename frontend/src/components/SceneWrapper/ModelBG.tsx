import { useGLTF, useScroll, useAnimations } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useEffect, useRef } from "react";

type ModelBGProps = {
  scale: number;
  position: number[];
};

const ModelPath = "/models/earth.glb";

export function ModelBG(props: ModelBGProps) {
  const scroll = useScroll();
  const { scene, animations, cameras } = useGLTF(ModelPath);
  const { actions } = useAnimations(animations, scene);
  const { set } = useThree();
  const cameraAction = useRef<THREE.AnimationAction>(null);

  useEffect(() => {
    actions["Earth|EarthAction"]?.play();

    if (actions["CameraAction"]) {
      const action = actions["CameraAction"];
      action.play();
      action.paused = true;
      cameraAction.current = action;
    }
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

  useFrame((_, delta) => {
    const action = cameraAction.current;
    if (action) {
      const duration = action.getClip().duration;
      const targetTime = duration * scroll.offset;
      action.time = THREE.MathUtils.damp(action.time, targetTime, 8, delta);
    }
  });

  return <primitive object={scene} {...props} />;
}
