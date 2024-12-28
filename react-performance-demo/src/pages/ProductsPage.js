import React, { useEffect, useState } from "react"
import { fetchProducts } from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";
import ProductCard from "../components/ProductCard";
import './ProductPage.css';
const ProductsPage = () =>{
    const[products, setProducts] = useState([]);
    const[loading, setLoading] = useState(true);


    useEffect(()=>{
        const loadProducts = async () => {
            const data = await fetchProducts();
            setProducts(data);
            setLoading(false);
        };

        loadProducts();
    }, []);

    if(loading){
        return(
            <div className="loading-container">
                <LoadingSpinner/>
            </div>
        );
    }
    return(
        <div className="products-page">
            <h1>Products</h1>
            <div className="products-grid">
                {products.map((product)=>(
                    <ProductCard key={product.id} product={product}/>
                ))}
            </div>
        </div>
    );
}

export default ProductsPage;