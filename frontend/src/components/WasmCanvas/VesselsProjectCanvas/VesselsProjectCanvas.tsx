import MyRaylibModule from "./index.js";
import { useEffect, useRef } from "react";

type EmscriptenModule = {
  canvas?: HTMLCanvasElement;
  locateFile?: (file: string) => string;

};

export default function VesselsProjectCanvas() {
  const canvasRef = useRef<HTMLCanvasElement |null>(null);

  useEffect(() => {
    const loadWasm = async () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      (window as any).Module = {
        canvas,
        locateFile: (path: string) => `/wasm/${path}`,
      };

      MyRaylibModule({
        canvas,
        locateFile: (file: string) => `/wasm/${file}`,
      }as EmscriptenModule).then((Module) => {
        console.log("WASM loaded!", Module);
      });
    };
    loadWasm();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id={"canvas-vessel-project"}
      className="bg-black w-full h-full rounded-2xl"
    ></canvas>
  );
}
