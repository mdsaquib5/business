import { Link } from 'react-router-dom';


export default function Navbar() {
    return (
        <nav className="nav">
            <Link to="/" className="logo">GlowStore</Link>
            <Link to="/products" className="nav-link">Products</Link>
        </nav>
    );
}