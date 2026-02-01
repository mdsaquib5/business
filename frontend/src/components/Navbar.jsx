import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const Navbar = () => {
  const { getCartCount } = useContext(CartContext);
  const cartCount = getCartCount();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">ShopHub</Link>
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/checkout" className="cart-link">
          <span className="cart-icon">🛒</span>
          {cartCount > 0 && (
            <span className="cart-count">{cartCount}</span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;