// Third-party Imports
import classnames from "classnames";

// Component Imports
import LayoutContent from "./components/vertical/LayoutContent";

// Util Imports
import { verticalLayoutClasses } from "./utils/layoutClasses";

// Styled Component Imports
import StyledContentWrapper from "./styles/vertical/StyledContentWrapper";
import AuthGuard from "@/components/authGuard/AuthGuard";
import { CircularProgress } from "@mui/material";

const VerticalLayout = (props) => {
  // Props
  const { navbar, footer, navigation, children } = props;

  return (
    <div className={classnames(verticalLayoutClasses.root, "flex flex-auto")}>
      {navigation || null}
      <AuthGuard
        fallback={
          <div className="flex items-center justify-center w-full">
            <CircularProgress />
          </div>
        }
      >
        <StyledContentWrapper
          className={classnames(
            verticalLayoutClasses.contentWrapper,
            "flex flex-col min-is-0 is-full"
          )}
        >
          {navbar || null}
          {/* Content */}
          <LayoutContent>{children}</LayoutContent>
          {footer || null}
        </StyledContentWrapper>
      </AuthGuard>
    </div>
  );
};

export default VerticalLayout;
