import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <Link to={`/products/${product._id}`}>
        <div className="product-image-wrapper">
          <img src={product.image} alt={product.name} className="product-image" />
        </div>
        <div className="product-content">
          <h3 className="product-title">{product.name}</h3>
          <div className="price-container">
            <span className="currency-symbol">₹</span>
            <span className="price-value">{product.price}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
