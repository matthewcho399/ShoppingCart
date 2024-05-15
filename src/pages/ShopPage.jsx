import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/ShopPage.css"

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

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
    <div className="shopPage">
      <h2>All Products</h2>
      <div className="productsContainer">
      {products.length &&
        products.map((product) => {
          return (
            <Link
              to={`/shop/${product.id}`}
              key={product.id}
              className="product"
            >
              <img src={product.image} width={200} height={200} />
              <p>{product.title}</p>
              <p>{USDollar.format(product.price)}</p>
            </Link>
          );
        })}
      </div>

    </div>
  );
};

export default ShopPage;
