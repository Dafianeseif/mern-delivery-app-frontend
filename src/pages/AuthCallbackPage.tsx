import { useCreateMyUser } from "@/api/MyUserApi";
import ScouterLoader from "@/components/ScouterLoader";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthCallbackPage() {
  const navigate = useNavigate();
  const { user, isAuthenticated, getIdTokenClaims } = useAuth0();
  const { createUser } = useCreateMyUser();
  const hasCreatedUser = useRef(false);

  useEffect(() => {
    const handleRedirect = async () => {
      if (!isAuthenticated) {
        console.log("Utilisateur non authentifié, en attente...");
        return;
      }

      if (user?.sub && user?.email && !hasCreatedUser.current) {
        try {
          console.log("Création de l'utilisateur...");
          await createUser({ auth0Id: user.sub, email: user.email });
          hasCreatedUser.current = true;
          console.log("Utilisateur créé avec succès.");
        } catch (error) {
          console.error("Erreur lors de la création de l'utilisateur:", error);
        }
      }

      const claims = await getIdTokenClaims();
      console.log("Claims complets:", claims);
      const roles = claims?.["https://mern-delivery-app.com/roles"] || [
        "client",
      ];
      console.log("Roles:", roles);
      const isAdmin = Array.isArray(roles) && roles.includes("admin");
      console.log("Is Admin:", isAdmin);

      if (isAdmin) {
        navigate("/manage-restaurant");
      } else {
        navigate("/");
      }
    };

    handleRedirect().catch((error) => {
      console.error("Erreur dans handleRedirect:", error);
    });
  }, [isAuthenticated, user, createUser, navigate, getIdTokenClaims]);

  return (
    <div>
      <ScouterLoader />
    </div>
  );
}
