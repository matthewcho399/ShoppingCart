import { Link } from "react-router-dom";
import "../styles/NavBar.css";

const Navbar = ({cartLength}) => {
  return (
    <div className="navbar">
      <div className="left-links">
        <Link to="/" className="home-btn">MOS</Link>
        <Link to="/shop">Shop</Link>
      </div>
      <Link to="/cart" className="cart">Cart ({cartLength})</Link>
    </div>
  );
};

export default Navbar;
