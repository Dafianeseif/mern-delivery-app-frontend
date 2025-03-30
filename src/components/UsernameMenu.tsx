import { CircleUserRound } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

export default function UsernameMenu() {
    const { user, logout } = useAuth0();
    const roles = user?.["https://mern-delivery-app.com/roles"] || []; 
    const isAdmin = roles.includes("admin"); 


    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center px-2 font-bold hover:text-green-500 gap-2">
                <CircleUserRound className="text-green-500" />
                {user?.name}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {isAdmin && (
                    <DropdownMenuItem>
                        <Link to="/manage-restaurant" className="font-bold hover:text-green-500">
                            Manage Restaurant
                        </Link>
                    </DropdownMenuItem>
                )}
                <DropdownMenuItem>
                    <Link to="/user-profile" className="font-bold hover:text-green-500">
                        User Profile
                    </Link>
                </DropdownMenuItem>
                <Separator />
                <DropdownMenuItem>
                    <Button 
                        onClick={() => logout()} 
                        className="flex flex-1 font-bold bg-green-500">
                        Log Out
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
