// MUI Imports
import Button from "@mui/material/Button";

// Layout Imports
import LayoutWrapper from "@layouts/LayoutWrapper";
import VerticalLayout from "@layouts/VerticalLayout";
import HorizontalLayout from "@layouts/HorizontalLayout";

// Component Imports
import Providers from "@components/Providers";
import Navigation from "@components/layout/vertical/Navigation";
import Header from "@components/layout/horizontal/Header";
import Navbar from "@components/layout/vertical/Navbar";
import ScrollToTop from "@core/components/scroll-to-top";

// Util Imports
import { getMode, getSystemMode } from "@core/utils/serverHelpers";
import AuthGuard from "@/components/authGuard/AuthGuard";

const Layout = async ({ children }) => {
  // Vars
  const direction = "ltr";
  const mode = getMode();
  const systemMode = getSystemMode();

  return (
    <Providers direction={direction}>
      <LayoutWrapper
        systemMode={systemMode}
        verticalLayout={
          <VerticalLayout
            navigation={<Navigation mode={mode} systemMode={systemMode} />}
            navbar={<Navbar />}
          >
            {children}
          </VerticalLayout>
        }
        horizontalLayout={
          <HorizontalLayout header={<Header />}>{children}</HorizontalLayout>
        }
      />
      <ScrollToTop className="mui-fixed">
        <Button
          variant="contained"
          className="flex items-center justify-center p-0 rounded-full is-10 bs-10 min-is-0"
        >
          <i className="tabler-arrow-up" />
        </Button>
      </ScrollToTop>
    </Providers>
  );
};

export default Layout;
