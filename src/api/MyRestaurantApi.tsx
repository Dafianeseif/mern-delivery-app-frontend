import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";
import { toast } from "sonner";

const API_BASE_URL =import.meta.env.VITE_API_BASE_URL;

export const useCreateMyrestaurant =()=>{
    const {getAccessTokenSilently} = useAuth0();
    const createMyrestaurantRequest =async (restaurantFormData: FormData)=>{
        const accessToken =await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
            method: 'POST',
            headers: {
            Authorization: `Bearer ${accessToken}`
            },
            body: restaurantFormData
        });

        if (!response.ok) {
            throw new Error('Failed to create restaurant');
        }

        return await response.json();

    };
    const { mutate: createRestaurant, isLoading, error, isSuccess } = useMutation(createMyrestaurantRequest);
    if (isSuccess) {
        toast.success('Restaurant created successfully');
    }
    if (error) {
        toast.error("Unable to update restaurant")
    }
    return {createRestaurant ,isLoading}
}


