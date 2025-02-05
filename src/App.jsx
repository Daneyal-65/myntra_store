import React, { useEffect, useState, lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./ui/Navbar";
import Footer from "./ui/Footer";
import ProtectedRoutes from "./auth/protected";
import Loading from "./ui/Loader";

// Lazy load pages
const Home = lazy(() => import("./pages/HomePage"));
const Cart = lazy(() => import("./pages/CartPage"));
const ProductListByCategoryPage = lazy(() =>
  import("./pages/productListByCategoryPage")
);
const ProductDetailsPage = lazy(() => import("./pages/productDetailsPage"));
const Login = lazy(() => import("./auth/login"));
const WishListPage = lazy(() => import("./pages/wishList"));

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTime = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(loadTime);
  }, []);

  return (
    <BrowserRouter>
      <Navbar />

      {/* Suspense ensures lazy loading works properly */}
      <Suspense fallback={<Loading />}>
        {loading ? (
          <Loading />
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/product-details" element={<ProductDetailsPage />} />
            <Route
              path="/productlist/:category"
              element={<ProductListByCategoryPage />}
            />

            {/* Protected Routes */}
            <Route
              path="/cart"
              element={
                <ProtectedRoutes>
                  <Cart />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/wishlist"
              element={
                <ProtectedRoutes>
                  <WishListPage />
                </ProtectedRoutes>
              }
            />
          </Routes>
        )}
      </Suspense>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
