import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import api from "../api/axios";
import { CartContext } from "../context/CartContext";

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart, cart } = useContext(CartContext);
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [cartCount, setCartCount] = useState(0);

    // Update cart count whenever cart changes
    useEffect(() => {
        const count = cart.reduce((total, item) => total + (item.quantity || 1), 0);
        setCartCount(count);
    }, [cart]);

    useEffect(() => {
        api.get(`/products/${id}`)
            .then(res => setProduct(res.data.product))
            .catch(console.error);
    }, [id]);

    // Mock additional images for the UI demo
    const additionalImages = [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
        "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
    ];

    if (!product) return (
        <div className="loading-container">
            <div className="loading-spinner"></div>
            <p className="loading-text">Loading product details...</p>
        </div>
    );

    const increaseQuantity = () => setQuantity(prev => prev + 1);
    const decreaseQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

    return (
        <div className="product-details-container">
            <div className="breadcrumb">
                <button onClick={() => navigate(-1)} className="back-button">
                    &larr; Back
                </button>
                <span>Home / Products / {product.name}</span>
                {cartCount > 0 && (
                    <div className="cart-indicator">
                        <span className="cart-icon">🛒</span>
                        <span className="cart-count">{cartCount}</span>
                    </div>
                )}
            </div>

            <div className="product-main">
                {/* Product Images Section */}
                <div className="product-images">
                    <div className="main-image-container">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="main-image"
                        />
                    </div>

                    <div className="thumbnail-images">
                        {additionalImages.map((img, index) => (
                            <div
                                key={index}
                                className={`thumbnail-container ${selectedImage === index ? 'active' : ''}`}
                                onClick={() => setSelectedImage(index)}
                            >
                                <img src={img} alt={`${product.name} view ${index + 1}`} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Product Info Section */}
                <div className="product-info">
                    <div className="product-header">
                        <h1 className="product-name">{product.name}</h1>
                        <div className="product-rating">
                            <span className="stars">★★★★★</span>
                            <span className="rating-count">(4.8/5.0)</span>
                        </div>
                    </div>

                    <div className="product-price-section">
                        <h2 className="product-price">₹{product.price.toLocaleString()}</h2>
                        <div className="product-meta">
                            <span className="availability in-stock">In Stock</span>
                            <span className="sku">SKU: PROD-{id}</span>
                        </div>
                    </div>

                    <div className="product-description">
                        <h3>Description</h3>
                        <p>{product.description}</p>
                        <ul className="feature-list">
                            <li>Premium quality materials</li>
                            <li>Durable and long-lasting</li>
                            <li>Includes manufacturer warranty</li>
                            <li>Free shipping on orders above ₹999</li>
                        </ul>
                    </div>

                    <div className="quantity-selector">
                        <h3>Quantity</h3>
                        <div className="quantity-controls">
                            <button
                                className="quantity-btn"
                                onClick={decreaseQuantity}
                                aria-label="Decrease quantity"
                            >
                                -
                            </button>
                            <span className="quantity-display">{quantity}</span>
                            <button
                                className="quantity-btn"
                                onClick={increaseQuantity}
                                aria-label="Increase quantity"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <div className="action-buttons">
                        <button
                            className="btn btn-buy-now"
                            onClick={() => {
                                addToCart(product, quantity);
                                navigate('/checkout');
                            }}
                        >
                            <span className="btn-icon">⚡</span>
                            Buy Now
                        </button>
                    </div>

                    <div className="product-actions">
                        <button className="action-link">
                            <span className="action-icon">❤️</span> Add to Wishlist
                        </button>
                        <button className="action-link">
                            <span className="action-icon">📤</span> Share Product
                        </button>
                    </div>
                </div>
            </div>

            {/* Additional Product Details Section */}
            <div className="additional-details">
                <div className="details-tabs">
                    <button className="tab active">Product Details</button>
                    <button className="tab">Specifications</button>
                    <button className="tab">Reviews (24)</button>
                    <button className="tab">Shipping Info</button>
                </div>

                <div className="tab-content">
                    <h3>About This Product</h3>
                    <p>{product.description} This premium product is designed with attention to detail and built to last. Each component is carefully selected to ensure maximum performance and satisfaction.</p>

                    <h4>Key Features</h4>
                    <ul>
                        <li>High-quality materials for durability</li>
                        <li>Ergonomic design for comfort</li>
                        <li>Easy to maintain and clean</li>
                        <li>Environmentally friendly packaging</li>
                        <li>30-day return policy</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;