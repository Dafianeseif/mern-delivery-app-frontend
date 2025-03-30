import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ adminOnly = false }) {
  const { isAuthenticated, isLoading, getIdTokenClaims } = useAuth0();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    const checkRole = async () => {
      if (isAuthenticated) {
        const claims = await getIdTokenClaims();
        const roles = claims?.["https://mern-delivery-app.com/roles"] || ["client"];
        setIsAdmin(Array.isArray(roles) && roles.includes("admin"));
      }
    };
    checkRole();
  }, [isAuthenticated, getIdTokenClaims]);

  if (isLoading || isAdmin === null) {
    return <div>Chargement...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}   