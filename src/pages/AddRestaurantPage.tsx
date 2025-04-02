import { useCreateMyRestaurant } from "@/api/MyRestaurantApi";
import { AdminSidebar } from "@/components/adminsidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import ManageRestaurantForm from "@/forms/user-profile-form/manage-restaurant-form/ManageRestaurantForm";
import { Separator } from "@radix-ui/react-separator";

const AddRestaurantPage = () => {
  const { createRestaurant, isLoading } = useCreateMyRestaurant();

  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between border-b px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <h1 className="text-xl font-semibold">Add New Restaurant</h1>
          </div>
        </header>
        <div className="container mx-auto p-6">
          <Tabs defaultValue="manage-restaurant" className="w-full">
            <TabsContent
              value="manage-restaurant"
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <ManageRestaurantForm
                onSave={(data) => createRestaurant(data.restaurantFormData)}
                isLoading={isLoading}
              />
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AddRestaurantPage;
