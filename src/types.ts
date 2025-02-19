export type  User = {
    _id: string;
    auth0Id: string;
    name: string;
    adressLine1: string;
    city: string;
    country: string;
    };  
    
    export type RestaurantType = {
        _id: string;
        user: string;
        restaurantName: string;
        city: string;
        country: string;
        deliveryPrice: number;
        estimatedDeliveryTime: number;
    };