import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CartPage.css"

const Cart = ({ cart, setCart }) => {
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  useEffect(() => {
    if (cart.length > 0) {
      let t = 0;
      cart.forEach((p) => {
        t += p.quantity * p.price;
      });
      setTotal(t.toFixed(2));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  if (cart.length === 0) {
    return <div>Your cart is empty</div>;
  }

  const handleDelete = (product) => {
    setCart((oldCart) => {
      return oldCart.filter((p) => p !== product);
    });
  };

  return (
    <div className="cartPage">
      <div>
        <div className="cartHeader">
          <h2>Shopping Cart</h2>
          {cart.length === 1 ? (
            <p>{cart.length} item</p>
          ) : (
            <p>{cart.length} items</p>
          )}
        </div>
        <div className="cartContainer">
          <div className="productsCartContainer">
            {cart.map((product) => {
              const productTotal = product.quantity * product.price;
              return (
                <div key={product.id} className="cartProduct">
                  <img
                    src={product.image}
                    width={150}
                    height={150}
                    onClick={() => navigate(`/shop/${product.id}`)}
                    style={{ paddingLeft: 20, cursor: 'pointer' }}
                  />
                  <div className="productInfo">
                    <div className="productTopLine">
                      <p style={{ fontWeight: 'bold', paddingLeft: 40 }}>{product.title}</p>
                      <button onClick={() => handleDelete(product)}>X</button>
                    </div>
                    <p>{USDollar.format(product.price)}</p>
                    <p>Quantity: {product.quantity}</p>
                    <p>Total: {USDollar.format(productTotal)}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="checkoutBox">
            <div className="subtotal">
              <p>Subtotal</p>
              <p>{USDollar.format(total)}</p>
            </div>
            <button onClick={() => alert("Purchase Complete!")} className="checkoutBtn">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
