import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";

const MobileNavLinks = () => {
  const { user, logout } = useAuth0();
  const roles = user?.["https://mern-delivery-app.com/roles"] || [];
  const isAdmin = roles.includes("admin");

  return (
    <>
      <Link
        to="/order-status"
        className="flex bg-white items-center font-bold hover:text-green-600"
      >
        Order Status
      </Link>

      {isAdmin && ( 
        <Link
          to="/manage-restaurant"
          className="flex bg-white items-center font-bold hover:text-green-500"
        >
          Manage Restaurants
        </Link>
      )}

      <Link
        to="/user-profile"
        className="flex bg-white items-center font-bold hover:text-green-500"
      >
        User Profile
      </Link>

      <Button
        onClick={() => logout()}
        className="flex items-center px-3 font-bold hover:bg-gray-500"
      >
        Log Out
      </Button>
    </>
  );
};

export default MobileNavLinks;
