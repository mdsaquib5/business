import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import api from "../api/axios";
import { CartContext } from "../context/CartContext";

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useContext(CartContext);
    const [product, setProduct] = useState(null);

    useEffect(() => {
        api.get(`/products/${id}`)
            .then(res => setProduct(res.data.product))
            .catch(console.error);
    }, [id]);

    if (!product) return <p>Loading...</p>;

    return (
        <div>
            <img src={product.image} width="250" />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <h3>₹{product.price}</h3>

            <button onClick={() => addToCart(product)}>
                Add to Cart
            </button>
            <button onClick={() => {
                addToCart(product);
                navigate('/checkout');
            }}>
                Buy Now
            </button>
        </div>
    );
};

export default ProductDetails;