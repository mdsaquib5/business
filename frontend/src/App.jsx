import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AppLayout />}>
                    <Route index element={<Home />} />
                    <Route path="products" element={<Products />} />
                    <Route path="products/:id" element={<ProductDetails />} />
                    <Route path="checkout" element={<Checkout />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
