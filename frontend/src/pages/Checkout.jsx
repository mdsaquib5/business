import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import api from "../api/axios";

const Checkout = () => {
  const { cart, clearCart, getCartCount, updateQuantity, removeFromCart } = useContext(CartContext);
  const [form, setForm] = useState({
    customerName: "",
    email: "",
    phone: "",
    address: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const cartCount = getCartCount();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    const newErrors = {};
    if (!form.customerName.trim()) newErrors.customerName = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Email is invalid";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^[0-9]{10}$/.test(form.phone)) newErrors.phone = "Please enter a valid 10-digit phone number";
    if (!form.address.trim()) newErrors.address = "Address is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    const products = cart.map(item => ({
      productId: item._id,
      name: item.name,
      quantity: item.quantity || 1,
      price: item.price,
    }));

    try {
      await api.post("/orders", {
        ...form,
        products,
      });

      // FREE WHATSAPP REDIRECT
      const message = encodeURIComponent(
        `Thank you for your order, ${form.customerName}! We will contact you shortly with payment details.\n\nOrder Summary:\n${products.map(p => `${p.name} x${p.quantity} - ₹${p.price * p.quantity}`).join('\n')}\n\nTotal: ₹${cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0)}`
      );

      window.location.href = `https://wa.me/91${form.phone}?text=${message}`;

      clearCart();
    } catch (error) {
      console.error("Order submission failed:", error);
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const totalAmount = cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  const shippingFee = totalAmount > 999 ? 0 : 99;
  const finalTotal = totalAmount + shippingFee;

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <h1>Checkout</h1>
        <p className="checkout-subtitle">
          {cartCount > 0 
            ? `Complete your purchase (${cartCount} ${cartCount === 1 ? 'item' : 'items'} in cart)` 
            : 'Your cart is empty'
          }
        </p>
      </div>

      <div className="checkout-layout">
        {/* Left Column: Order Summary */}
        <div className="order-summary-section">
          <h2 className="section-title">Order Summary</h2>

          {cart.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-cart-icon">🛒</div>
              <p>Your cart is empty</p>
              <p>Add some products to your cart to proceed with checkout</p>
              <a href="/products" className="continue-shopping-btn">Continue Shopping</a>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cart.map((item, index) => (
                  <div key={index} className="cart-item">
                    <div className="cart-item-image">
                      <img src={item.image || "https://via.placeholder.com/80"} alt={item.name} />
                    </div>
                    <div className="cart-item-details">
                      <h4 className="item-name">{item.name}</h4>
                      <p className="item-price">₹{item.price.toLocaleString()}</p>
                      <div className="cart-item-controls">
                        <div className="quantity-controls">
                          <button
                            className="quantity-btn"
                            onClick={() => updateQuantity(item._id, (item.quantity || 1) - 1)}
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span className="quantity-display">{item.quantity || 1}</span>
                          <button
                            className="quantity-btn"
                            onClick={() => updateQuantity(item._id, (item.quantity || 1) + 1)}
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                        <button
                          className="remove-btn"
                          onClick={() => removeFromCart(item._id)}
                          aria-label="Remove item"
                        >
                          🗑️ Remove
                        </button>
                      </div>
                    </div>
                    <div className="cart-item-total">
                      ₹{(item.price * (item.quantity || 1)).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-totals">
                <div className="total-row">
                  <span>Subtotal</span>
                  <span>₹{totalAmount.toLocaleString()}</span>
                </div>
                <div className="total-row">
                  <span>Shipping</span>
                  <span className={shippingFee === 0 ? "free-shipping" : ""}>
                    {shippingFee === 0 ? "FREE" : `₹${shippingFee}`}
                  </span>
                </div>
                {totalAmount < 999 && (
                  <div className="shipping-note">
                    <span className="info-icon">ℹ️</span>
                    Add ₹{(999 - totalAmount).toLocaleString()} more for free shipping
                  </div>
                )}
                <div className="total-row final-total">
                  <span>Total</span>
                  <span className="total-amount">₹{finalTotal.toLocaleString()}</span>
                </div>
              </div>

              <div className="payment-methods">
                <h3>Payment Methods</h3>
                <div className="payment-options">
                  <div className="payment-option active">
                    <span className="payment-icon">💳</span>
                    <span>Cash on Delivery</span>
                  </div>
                  <div className="payment-option">
                    <span className="payment-icon">📱</span>
                    <span>UPI / QR Code</span>
                  </div>
                  <div className="payment-option">
                    <span className="payment-icon">🏦</span>
                    <span>Bank Transfer</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Right Column: Checkout Form - Only show when cart has items */}
        {cart.length > 0 && (
          <div className="checkout-form-section">
            <h2 className="section-title">Shipping Information</h2>
            <p className="form-description">Please fill in your details to complete the order</p>

            <form onSubmit={handleSubmit} className="checkout-form" noValidate>
              <div className="form-group">
                <label htmlFor="customerName">
                  Full Name <span className="required">*</span>
                </label>
                <input
                  id="customerName"
                  name="customerName"
                  type="text"
                  placeholder="Enter your full name"
                  value={form.customerName}
                  onChange={handleInputChange}
                  className={errors.customerName ? "error" : ""}
                />
                {errors.customerName && <span className="error-message">{errors.customerName}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">
                  Email Address <span className="required">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={form.email}
                  onChange={handleInputChange}
                  className={errors.email ? "error" : ""}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="phone">
                  Phone Number <span className="required">*</span>
                </label>
                <div className="phone-input-wrapper">
                  <span className="country-code">+91</span>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="9876543210"
                    value={form.phone}
                    onChange={handleInputChange}
                    className={errors.phone ? "error" : ""}
                    maxLength="10"
                  />
                </div>
                {errors.phone && <span className="error-message">{errors.phone}</span>}
                <p className="input-hint">We'll contact you on WhatsApp for order confirmation</p>
              </div>

              <div className="form-group">
                <label htmlFor="address">
                  Delivery Address <span className="required">*</span>
                </label>
                <textarea
                  id="address"
                  name="address"
                  placeholder="Enter your complete address including street, city, state, and PIN code"
                  rows="4"
                  value={form.address}
                  onChange={handleInputChange}
                  className={errors.address ? "error" : ""}
                />
                {errors.address && <span className="error-message">{errors.address}</span>}
              </div>

              <div className="form-actions">
                <button
                  type="submit"
                  className="submit-order-btn"
                  disabled={isSubmitting || cart.length === 0}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner"></span>
                      Processing Order...
                    </>
                  ) : (
                    <>
                      <span className="btn-icon">🚀</span>
                      Place Order & Continue to WhatsApp
                    </>
                  )}
                </button>

                <div className="security-note">
                  <span className="lock-icon">🔒</span>
                  <span>Your information is secure. We never share your details.</span>
                </div>
              </div>
            </form>

            <div className="checkout-features">
              <div className="feature">
                <span className="feature-icon">🛡️</span>
                <div>
                  <h4>Secure Checkout</h4>
                  <p>256-bit SSL encryption</p>
                </div>
              </div>
              <div className="feature">
                <span className="feature-icon">🚚</span>
                <div>
                  <h4>Fast Delivery</h4>
                  <p>3-5 business days</p>
                </div>
              </div>
              <div className="feature">
                <span className="feature-icon">↩️</span>
                <div>
                  <h4>Easy Returns</h4>
                  <p>30-day return policy</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;