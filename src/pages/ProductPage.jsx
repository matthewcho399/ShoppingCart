import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/ProductPage.css"

const ProductPage = ({ cart, setCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const { productId } = useParams();
  const navigate = useNavigate();

  const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://fakestoreapi.com/products/${productId}`
        );
        const data = await response.json();
        setProduct(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    return () => setProduct(() => null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = () => {
    let productToAdd = product;
    if (cart.some((e) => e.title === productToAdd.title)) {
      let index = cart.findIndex(e => e.title === productToAdd.title);
      let newCart = cart;
      newCart[index].quantity += parseInt(quantity);
      setCart(newCart);
    } else {
      productToAdd.quantity = parseInt(quantity);
      setCart((oldCart) => [...oldCart, productToAdd]);
    }
    setQuantity(1);
  };

  if (!product) {
    return <>{null}</>
  }

  return (
    <div>
        <button onClick={() => navigate("/shop")}>Go Back</button>
        <div className="productContainer">
          <div className="productImage">
            <img src={product.image} width={300} height={300} />
          </div>
          <div className="product">
            <h2>{product.title}</h2>
            <p>{USDollar.format(product.price)}</p>
            <p>{product.description}</p>
            <div className="quantityBtn">
            <input
              type="number"
              min={1}
              max={99}
              value={quantity}
              onInput={(e) => setQuantity(e.target.value)}
            />
            <button onClick={handleAddToCart}>Add To Cart</button>
            </div>
          </div>
      </div>
    </div>
  );
};

export default ProductPage;
