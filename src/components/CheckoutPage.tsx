import { useLocation } from "react-router-dom";
import { CartItem } from "@/pages/DetailPage";

interface CheckoutState {
  cartItems: CartItem[];
  paymentUrl: string;
}

const CheckoutPage = () => {
  const location = useLocation();
  const state = location.state as CheckoutState | undefined;
  const { cartItems, paymentUrl } = state || {};

  if (!cartItems || !paymentUrl) {
    return (
      <div className="flex items-center justify-center h-screen text-2xl font-bold text-red-600">
        Invalid checkout session
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="text-center py-5 bg-white shadow-md">
        <h1 className="text-3xl font-bold text-gray-800">Checkout</h1>
      </header>

      {/* Contenu principal en écran divisé */}
      <div className="flex flex-1">
        {/* Section Résumé de Commande */}
        <div className="w-1/2 p-6 flex items-center justify-center">
          <div className="w-full h-full rounded-xl shadow-xl overflow-hidden border border-gray-300 bg-white">
            <iframe
              srcDoc={`<html>
              <head>
                <style>
                  body {
                    font-family: Arial, sans-serif;
                    background-color: #f9fafb;
                    padding: 20px;
                    color: #333;
                  }
                  h2 {
                    text-align: center;
                    color: #4F46E5;
                    font-size: 24px;
                    margin-bottom: 20px;
                  }
                  ul {
                    list-style: none;
                    padding: 0;
                  }
                  li {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    background: #ffffff;
                    margin: 10px 0;
                    padding: 15px;
                    border-radius: 8px;
                    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
                    transition: transform 0.2s ease-in-out;
                  }
                  li:hover {
                    transform: scale(1.02);
                  }
                  .item-name {
                    font-weight: bold;
                    font-size: 16px;
                  }
                  .price {
                    color: #10B981;
                    font-weight: bold;
                  }
                  .quantity {
                    background: #4F46E5;
                    color: white;
                    border-radius: 50%;
                    width: 25px;
                    height: 25px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: bold;
                  }
                </style>
              </head>
              <body>
                <h2>🛒 Votre commande</h2>
                <ul>
                  ${cartItems
                    .map(
                      (item) =>
                        `<li>
                          <span class="item-name">${item.name}</span>
                          <span class="quantity">${item.quantity}</span>
                          <span class="price">${((item.price * item.quantity) / 100).toFixed(2)} TND</span>
                        </li>`
                    )
                    .join("")}
                    
                </ul>
              </body>
            </html>`}
              className="w-full h-full"
            ></iframe>
          </div>
        </div>

        {/* Section Paiement */}
        <div className="w-1/2 p-6 flex items-center justify-center">
          <div className="w-full h-full rounded-xl shadow-xl overflow-hidden border border-gray-300 bg-white">
            <iframe
              src={paymentUrl}
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
