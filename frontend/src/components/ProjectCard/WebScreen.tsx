import { gruvboxDark } from "@codesandbox/sandpack-themes";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackPreview,
} from "@codesandbox/sandpack-react";
import { useProjectDemo } from "@/hooks/useProject";

type WebScreenProps = {
  projectName: string;
  openSource: boolean;
};

const WebScreen = ({ projectName , openSource }: WebScreenProps) => {
  const [projectDemoData, error_demo] = useProjectDemo(projectName);
  return (
    <>
      {projectDemoData && (
        <SandpackProvider
          style={{
            width: "100%",
            height: "100%",
          }}
          template="static"
          files={projectDemoData}
          theme={gruvboxDark}
        >
          <SandpackLayout
            style={{
              width: "100%",
              height: "100%",
            }}
          >

            <SandpackPreview
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </SandpackLayout>
        </SandpackProvider>
      )}
    </>
  );
};

export default WebScreen;
