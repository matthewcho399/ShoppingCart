import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import ErrorPage from "./pages/ErrorPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import "./styles/App.css";

const App = () => {
  const [cart, setCart] = useState([]);

  return (
    <>
      <Navbar cartLength={cart.length}/>
      <Routes>
        <Route path="/" element={<HomePage />} errorElement={<ErrorPage />} />
        <Route
          path="shop"
          element={<ShopPage />}
          errorElement={<ErrorPage />}
        />
        <Route
          path="shop/:productId"
          element={<ProductPage cart={cart} setCart={setCart} />}
          errorElement={<ErrorPage />}
        />
        <Route
          path="cart"
          element={<CartPage cart={cart} setCart={setCart} />}
          errorElement={<ErrorPage />}
        />
      </Routes>
    </>
  );
};

export default App;
