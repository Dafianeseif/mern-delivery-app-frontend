import { useParams } from "react-router-dom";
import {
  useGetRestaurantById,
  useUpdateMyRestaurant,
} from "@/api/MyRestaurantApi"; // Importer le hook
import { AdminSidebar } from "@/components/adminsidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import ManageRestaurantForm from "@/forms/user-profile-form/manage-restaurant-form/ManageRestaurantForm";
import { Separator } from "@radix-ui/react-separator";

const RestaurantDetailPage = () => {
  const { id } = useParams<{ id?: string }>();

  const { restaurant } = useGetRestaurantById(id!);
  const { updateRestaurant, isLoading: isUpdateLoading } =
    useUpdateMyRestaurant();

  if (!id) {
    return <div>Restaurant ID is missing.</div>;
  }

  if (!restaurant) {
    return <div>Restaurant not found.</div>;
  }

  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between border-b px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <h1 className="text-xl font-semibold">
              Manage {restaurant.restaurantName}
            </h1>
          </div>
        </header>
        <div className="container mx-auto p-6">
          <Tabs defaultValue="manage-restaurant" className="w-full">
            <TabsContent
              value="manage-restaurant"
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <ManageRestaurantForm
                key={restaurant._id}
                restaurant={restaurant}
                onSave={(data) => {
                  updateRestaurant({
                    restaurantId: data.restaurantId ?? "", 
                    restaurantFormData: data.restaurantFormData,
                  });
                }}
                isLoading={isUpdateLoading}
              />
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default RestaurantDetailPage;
