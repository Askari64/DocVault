import { useUser } from "@clerk/react";
import { Navigate, Outlet } from "react-router";

function ProtectedRoute() {
  // 1. Destructure isLoaded alongside isSignedIn
  const { isLoaded, isSignedIn } = useUser();

  // 2. Pause rendering if Clerk is still checking the session
  if (!isLoaded) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-gray-500">Verifying session...</p>
      </div>
    );
  }

  // 3. Now that Clerk is absolutely sure, make the decision
  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;