import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../api/api';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';


export default function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);


    useEffect(() => {
        api.get(`/products/${id}`).then(res => setProduct(res.data));
    }, [id]);


    if (!product) return <p className="loading">Loading...</p>;


    return (
        <>
            <Navbar />
            <div className="container detail">
                <img src={product.image} />
                <div>
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    <h3>₹{product.price}</h3>
                    <button className="btn" onClick={() => {
                        addToCart(product);
                        navigate('/checkout');
                    }}>Add to Cart</button>
                </div>
            </div>
        </>
    );
}