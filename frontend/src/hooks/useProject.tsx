import { useEffect, useState } from "react";
import { type ProjectInfType } from "@/types/Api/ProjectInfoType";
import type { SandpackFiles } from "@codesandbox/sandpack-react";

const API_URL: string = "/";

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
      .then((data) => {
        for (const key in data) {
          if (data.hasOwnProperty(key) && key.endsWith(".wasm")) {
            data[key].code = Uint8Array.from(atob(data[key].code), (c) =>
              c.charCodeAt(0)
            );
          }
        }
        setProjectDemoData(data);
      })
      .then(() => setLoading(false))
      .catch(setError);
  }, [ProjectName]);
  return [projectDemoData, error, loading] as const;
}
