import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/layout";
import HomePage from "./pages/HomePage";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import UserProfilePage from "./pages/UserProfilePage";
import ProtectedRoute from "./auth/ProtectedRoute";
import ManageRestaurantPage from "./pages/ManageRestaurantPage";
import SearchPage from "./pages/SearchPage";
import DetailPage from "./pages/DetailPage";
import OrderStatusPage from "./pages/OrderStatusPage";
import CheckoutPage from "./components/CheckoutPage";
import RestaurantDetailPage from "./pages/RestaurantDetailPage";
import ManageOrdersPage from "./pages/ManageOrdersPage";
import AddRestaurantPage from "./pages/AddRestaurantPage";
import AllRestaurantAdmin from "./pages/AllRestraurantAdmin";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout showHero>
            <HomePage />
          </Layout>
        }
      />
      <Route path="/auth-callback" element={<AuthCallbackPage />} />
      <Route
        path="/search/:city"
        element={
          <Layout showHero={false}>
            <SearchPage />
          </Layout>
        }
      />
      <Route
        path="/detail/:restaurantId"
        element={
          <Layout showHero={false}>
            <DetailPage />
          </Layout>
        }
      />
      <Route path="/checkout" element={<CheckoutPage />} />

      <Route element={<ProtectedRoute />}>
        <Route
          path="/order-status"
          element={
            <Layout>
              <OrderStatusPage />
            </Layout>
          }
        />
        <Route
          path="/user-profile"
          element={
            <Layout>
              <UserProfilePage />
            </Layout>
          }
        />
      </Route>

      <Route element={<ProtectedRoute adminOnly />}>
        <Route path="/manage-restaurant" element={<ManageRestaurantPage />} />
        <Route
          path="/admin/restaurants/:id"
          element={<RestaurantDetailPage />}
        />
        <Route
          path="/admin/orders"
          element={ <ManageOrdersPage/>}
        />
        <Route
          path="/admin/restaurants/add"
          element={ <AddRestaurantPage/>}
        />
        <Route
          path="/admin/restaurants"
          element={ <AllRestaurantAdmin/>}
        />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
