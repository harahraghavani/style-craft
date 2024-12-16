"use client";
// MUI Imports
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

// Component Imports
import Logo from "@components/layout/shared/Logo";

// Config Imports
import themeConfig from "@configs/themeConfig";

// Styled Component Imports
import AuthIllustrationWrapper from "./AuthIllustrationWrapper";
import { Button } from "@mui/material";
import GoogleIcon from "@/@menu/svg/GoogleIcon";
import { useFirebase } from "@/hooks/Firebase/useFirebase";
import { LoadingButton } from "@mui/lab";

const LoginV1 = () => {
  const { firebaseMethods, states } = useFirebase();
  const { signUpWithGoogle } = firebaseMethods;
  const { isLoading } = states;
  return (
    <AuthIllustrationWrapper>
      <Card className="flex flex-col sm:is-[450px]">
        <CardContent className="sm:!p-12">
          <div className="flex justify-center mbe-6">
            <Logo />
          </div>
          <div className="flex flex-col gap-1 text-center mbe-6">
            <Typography variant="h4">{`Welcome to ${themeConfig.templateName}! 👋🏻`}</Typography>
            <Typography>
              Please sign-in to your account and start the adventure
            </Typography>
          </div>
          <LoadingButton
            fullWidth
            variant="contained"
            type="submit"
            startIcon={<GoogleIcon />}
            onClick={async () => {
              await signUpWithGoogle();
            }}
            disabled={isLoading}
            loading={isLoading}
            sx={{
              "& .MuiLoadingButton-loadingIndicator": {
                color: "black",
              },
            }}
          >
            Continue with Google
          </LoadingButton>
        </CardContent>
      </Card>
    </AuthIllustrationWrapper>
  );
};

export default LoginV1;
