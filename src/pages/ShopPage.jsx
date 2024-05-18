import { Link } from "react-router-dom";
import "../styles/ShopPage.css"

const ShopPage = ({ products }) => {
  const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

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
