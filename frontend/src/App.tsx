import "./App.css";
import Overlay from "./components/Overlay/Overlay";
import SceneWrapper from "./components/SceneWrapper/SceneWrapper";
import { LangProvider } from "./context/LangProvider";
import { ThemeProvider } from "./context/ThemeProvider";
import { useProfileInfo } from "./hooks/useProfileInfo";

function App() {
  const [profileInfo, error, loading] = useProfileInfo();

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <LangProvider>
          <Overlay link={profileInfo?.link} />
          <SceneWrapper  />

        </LangProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
