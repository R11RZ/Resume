import { useEffect, useState } from "react";
import { type ProjectInfType } from "@/types/Api/ProjectInfoType";
import type { SandpackFiles } from "@codesandbox/sandpack-react";

const API_URL: string = "http://127.0.1:8000/";

export function useProjectInfo(ProjectName: string) {
  const [projectInfo, setProjectInfo] = useState<ProjectInfType>();
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    setError(undefined);
    fetch(API_URL + ProjectName)
      .then((res) => res.json())
      .then(setProjectInfo)
      .then(() => setLoading(false))
      .catch(setError);
  }, [ProjectName]);
  return [projectInfo, error, loading] as const;
}

export function useProjectDemo(ProjectName: string) {
  const [projectDemoData, setProjectDemoData] = useState<SandpackFiles | null>(
    null
  );
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    setError(undefined);
    fetch(API_URL + ProjectName)
      .then((res) => res.json())
      .then((data: object) => {
        const files = data as Record<string, any>;
        for (const key in files) {
          if (Object.prototype.hasOwnProperty.call(files, key) && key.endsWith(".wasm")) {
            files[key].code = Uint8Array.from(atob(files[key].code), (c) =>
              c.charCodeAt(0)
            );
          }
        }
        setProjectDemoData(files);
      })
      .then(() => setLoading(false))
      .catch(setError);
  }, [ProjectName]);
  return [projectDemoData, error, loading] as const;
}
