// Component Imports
import Login from "@views/Login";

// Server Action Imports
import { getServerMode } from "@core/utils/serverHelpers";

const LoginPage = () => {
  // Vars
  const mode = getServerMode();

  return (
    <div className="flex flex-col justify-center items-center min-bs-[100dvh] p-6">
      <Login mode={mode} />
    </div>
  );
};

export default LoginPage;
