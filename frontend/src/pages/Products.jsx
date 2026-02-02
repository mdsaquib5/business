import { useEffect, useState } from 'react';
import { api } from '../api/api';
import ProductCard from '../components/ProductCard';
import Navbar from '../components/Navbar';


export default function Products() {
    const [products, setProducts] = useState([]);


    useEffect(() => {
        api.get('/products').then(res => setProducts(res.data));
    }, []);


    return (
        <>
            <Navbar />
            <div className="container grid">
                {products.map(p => <ProductCard key={p._id} product={p} />)}
            </div>
        </>
    );
}