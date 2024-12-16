// Component Imports
import Providers from "@components/Providers";
import BlankLayout from "@layouts/BlankLayout";

// Util Imports
import { getSystemMode } from "@core/utils/serverHelpers";
import AuthGuard from "@/components/authGuard/AuthGuard";
import { CircularProgress } from "@mui/material";

const Layout = ({ children }) => {
  // Vars
  const direction = "ltr";
  const systemMode = getSystemMode();

  return (
    <Providers direction={direction}>
      <AuthGuard
        fallback={
          <div className="flex items-center justify-center w-full h-full">
            <CircularProgress />
          </div>
        }
      >
        <BlankLayout systemMode={systemMode}>{children}</BlankLayout>
      </AuthGuard>
    </Providers>
  );
};

export default Layout;
