import { useState, useEffect } from "react";
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
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://fakestoreapi.com/products", {
          mode: "cors",
        });
        const data = await response.json();
        console.log(data);
        data.forEach((p) => {
          setProducts((oldProducts) => [...oldProducts, p]);
        });
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    return () => setProducts(() => []);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar cartLength={cart.length}/>
      <Routes>
        <Route path="/" element={<HomePage />} errorElement={<ErrorPage />} />
        <Route
          path="shop"
          element={<ShopPage products={products}/>}
          errorElement={<ErrorPage />}
        />
        <Route
          path="shop/:productId"
          element={<ProductPage products={products} cart={cart} setCart={setCart} />}
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
