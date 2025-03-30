import { AdminSidebar } from "@/components/adminsidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useGetMyRestaurantOrders } from "@/api/MyRestaurantApi";
import OrderItemCard from "@/components/OrderItemCard";



export default function ManageOrdersPage() {
  const { orders } = useGetMyRestaurantOrders();
  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between border-b px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <h1 className="text-xl font-semibold">Orders</h1>
          </div>
        </header>
        <div className="p-4">
          <Tabs defaultValue="orders" className="w-full">
            <TabsContent value="orders" className="space-y-5">
            <h2 className="text-2xl font-bold">{orders?.length || 0} Active Orders</h2>
          <div className="space-y-4">
            {orders?.map((order) => (
              <OrderItemCard key={order._id} order={order} />
            ))}
          </div>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
