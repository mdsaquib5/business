import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import api from "../api/axios";

const Checkout = () => {
  const { cart, clearCart } = useContext(CartContext);
  const [form, setForm] = useState({
    customerName: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const products = cart.map(item => ({
      productId: item._id,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
    }));

    await api.post("/orders", {
      ...form,
      products,
    });

    // FREE WHATSAPP REDIRECT
    const message = encodeURIComponent(
      "Thank you for your order! We will contact you shortly with payment details."
    );

    window.location.href = `https://wa.me/${form.phone}?text=${message}`;

    clearCart();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Name" onChange={e => setForm({ ...form, customerName: e.target.value })} />
      <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Phone (91XXXXXXXXXX)" onChange={e => setForm({ ...form, phone: e.target.value })} />
      <textarea placeholder="Address" onChange={e => setForm({ ...form, address: e.target.value })} />
      <button type="submit">Place Order</button>
    </form>
  );
};

export default Checkout;
