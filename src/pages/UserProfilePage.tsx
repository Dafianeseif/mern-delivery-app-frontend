import { useGetMyUser, useUpdateMyUser } from "@/api/MyUserApi";
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";

export default function UserProfilePage() {
    const {currentUser, isLoading: isGetLoading} = useGetMyUser();
    const {updateUser, isLoading: isUpdateLoading} = useUpdateMyUser();

    if (isGetLoading) {
        return <div>Loading...</div>;
    }

    if (!currentUser) {
        return <div>User not found</div>;
    }
  return (
    <UserProfileForm currentUser={currentUser} onSave={updateUser} isLoading ={isUpdateLoading } /> 
  );
}
