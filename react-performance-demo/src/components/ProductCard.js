import React from "react";
import './ProductCard.css';

const ProductCard = ({product}) => {
    return(
        <div className="product-card">
            <img src={product.image} alt={product.title} loading="lazy"></img>
            <h2>{product.title}</h2>
            <p>${product.price}</p>
        </div>
    );
}

export default ProductCard;