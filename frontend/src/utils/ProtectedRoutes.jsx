import { useUser } from "@clerk/react";
import { Navigate, Outlet } from "react-router";

function ProtectedRoute() {
  const { isSignedIn } = useUser();

  if (!isSignedIn) return <Navigate to="/" replace />;
  return <Outlet />;
}

export default ProtectedRoute;
