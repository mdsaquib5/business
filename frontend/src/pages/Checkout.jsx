import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Checkout() {
    const { cart, setCart } = useCart()
    const navigate = useNavigate()

    const [customer, setCustomer] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        quantity: ''
    })

    const totalPrice = cart.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
    )

    const totalQuantity = cart.reduce(
        (sum, item) => sum + item.qty,
        0
    )

    const totalAmount = cart.length > 0 ? cart[0].price * (customer.quantity || totalQuantity) : 0

    const placeOrder = (e) => {
        e.preventDefault()

        const productMessage = cart
            .map(
                (p) =>
                    `${p.name} x ${p.qty} - ₹${p.price} each`
            )
            .join('\n')

        const message = `
🛒 New Order Received

👤 Customer Details
Name: ${customer.name}
Email: ${customer.email}
Phone: ${customer.phone}
Address: ${customer.address}
Quantity: ${customer.quantity}

📦 Products
${productMessage}

📊 Order Summary
Total Items: ${customer.quantity || totalQuantity}
Total Amount: ₹${totalAmount}
Please send this message to seller for confirmation
    `

        window.location.href = `https://wa.me/+918700546207?text=${encodeURIComponent(
            message
        )}`

        setCart([])
        navigate('/thankyou')
    }

    return (
        <div className="container">
            <h2>Checkout</h2>

            <form onSubmit={placeOrder} className="form">
                <input
                    placeholder="Name"
                    required
                    onChange={(e) =>
                        setCustomer({ ...customer, name: e.target.value })
                    }
                />

                <input
                    type="email"
                    placeholder="Email"
                    required
                    onChange={(e) =>
                        setCustomer({ ...customer, email: e.target.value })
                    }
                />

                <input
                    placeholder="Phone"
                    required
                    onChange={(e) =>
                        setCustomer({ ...customer, phone: e.target.value })
                    }
                />

                <input
                    type="number"
                    placeholder="Quantity"
                    required
                    min="1"
                    onChange={(e) =>
                        setCustomer({ ...customer, quantity: e.target.value })
                    }
                />

                <textarea
                    placeholder="Address"
                    required
                    onChange={(e) =>
                        setCustomer({ ...customer, address: e.target.value })
                    }
                />

                <button className="btn">
                    Place Order on WhatsApp
                </button>
            </form>
        </div>
    )
}
