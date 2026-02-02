import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';


export default function Landing() {
    return (
        <>
            <Navbar />
            <div className="hero">
                <h1>Glow Your Skin Naturally ✨</h1>
                <p>Premium skincare products for dull & tanned skin</p>
                <Link to="/products" className="btn">Explore Products</Link>
            </div>
        </>
    );
}