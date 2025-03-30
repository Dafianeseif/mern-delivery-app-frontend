import type { Order, OrderStatus } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ORDER_STATUS } from "@/config/order-status-config";
import { useUpdateMyRestaurantOrder } from "@/api/MyRestaurantApi";
import { useEffect, useState } from "react";

type Props = {
  order: Order;
};

const OrderItemCard = ({ order }: Props) => {
  const { updateRestaurantStatus, isLoading } = useUpdateMyRestaurantOrder();
  const [status, setStatus] = useState<OrderStatus>(order.status);

  useEffect(() => {
    setStatus(order.status);
  }, [order.status]);

  const handleStatusChange = async (newStatus: OrderStatus) => {
    try {
      await updateRestaurantStatus({
        orderId: order._id as string,
        status: newStatus,
      });
      setStatus(newStatus);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const createdAt = new Date(order.createdAt);

  return (
    <Card className="overflow-hidden shadow-md">
      <CardHeader className="bg-muted/50 p-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Order #{order._id}</CardTitle>
            <CardDescription>
              {format(createdAt, "MMM do, yyyy 'at' h:mm a")}
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Select
              value={status}
              disabled={isLoading}
              onValueChange={(value) => handleStatusChange(value as OrderStatus)}
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent position="popper">
                {ORDER_STATUS.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-2">
          <div>
            <div className="font-semibold">Customer</div>
            <div>{order.deliveryDetails.name}</div>
            <div className="text-sm text-muted-foreground">
              {order.deliveryDetails.email}
            </div>
          </div>
          <div>
            <div className="font-semibold">Delivery Address</div>
            <div className="text-sm">
              {order.deliveryDetails.addressLine1}, {order.deliveryDetails.city}
            </div>
          </div>
          <Separator className="my-2" />
          <div>
            <div className="font-semibold mb-2">Items</div>
            <ul className="space-y-2">
              {order.cartItems.map((item) => (
                <li key={item.menuItemId} className="flex justify-between">
                  <div>
                    {item.quantity} x {item.name}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/50 p-4 flex justify-between">
        <div className="font-semibold">Total</div>
        <div className="font-semibold">
          {(order.totalAmount / 100).toFixed(2)} TND
        </div>
      </CardFooter>
    </Card>
  );
};

export default OrderItemCard;
