// Context Imports
import { VerticalNavProvider } from "@menu/contexts/verticalNavContext";
import { SettingsProvider } from "@core/contexts/settingsContext";
import ThemeProvider from "@components/theme";

// Util Imports
import {
  getMode,
  getSettingsFromCookie,
  getSystemMode,
} from "@core/utils/serverHelpers";
import { FirebaseProvider } from "@/context/Firebase/FirebaseContext";
import { Toaster } from "react-hot-toast";

const Providers = (props) => {
  // Props
  const { children, direction } = props;

  // Vars
  const mode = getMode();
  const settingsCookie = getSettingsFromCookie();
  const systemMode = getSystemMode();

  return (
    <FirebaseProvider>
      <VerticalNavProvider>
        <SettingsProvider settingsCookie={settingsCookie} mode={mode}>
          <ThemeProvider direction={direction} systemMode={systemMode}>
            {children}
          </ThemeProvider>
          <Toaster />
        </SettingsProvider>
      </VerticalNavProvider>
    </FirebaseProvider>
  );
};

export default Providers;
