import { useEffect, useState } from "react";
import api from "../api/axios";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/products")
      .then(res => setProducts(res.data.products))
      .catch(console.error);
  }, []);

  return (
    <div>
      {products.map(product => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default Products;
