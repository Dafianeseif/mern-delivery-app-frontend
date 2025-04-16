import { useGetMyRestaurants } from "@/api/MyRestaurantApi";
import { AdminSidebar } from "@/components/adminsidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function  AllRestaurantAdmin() {
    
  const { restaurants } = useGetMyRestaurants();

  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between border-b px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <h1 className="text-xl font-semibold">Manage Restaurants</h1>
          </div>
        </header>
        <div className="p-4">
          <Tabs defaultValue="restaurants" className="w-full">
            <TabsContent value="restaurants" className="space-y-5">
              <h2 className="text-2xl font-bold">{restaurants?.length || 0} Restaurants</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {restaurants?.map((restaurant) => (
                  <Card key={restaurant._id} className="hover:shadow-lg transition">
                    <CardHeader>
                      <CardTitle>{restaurant.restaurantName}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{restaurant.city}</p>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button asChild>
                        <Link to={`/admin/restaurants/${restaurant._id}`}>
                          Manage <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
                {restaurants?.length === 0 && (
                  <div className="col-span-full text-center py-10 text-muted-foreground">
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
