import { useEffect, useState } from "react";
import { fetchProduct } from "../services/api";
import ProductCart from "../components/ProductCart";


export default function Home(){

  const [products, setProducts] = useState([]);

  const [filteredProducts, setFilteredProducts] = useState([]);

  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("All");

  const [searhTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 6;

  useEffect(()=>{
    fetchProduct().then((res) => {
      const fetchedProduct = res.data;

      setProducts(fetchedProduct);
      setFilteredProducts(fetchedProduct);

      const uniqewCategories = [
        ...new Set(fetchedProduct.map((product) => product.category)),
      ];
      setCategories(uniqewCategories);
    });
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    filterProducts(term, category);
    setCurrentPage(1);
  }

  const handleCategoryChange = (e) => {
    const cat = e.target.value;
    setCategory(cat);
    filterProducts(searhTerm, cat);
    setCurrentPage(1);
  }

  const filterProducts = (term, cat) => {
    let result = products;

    if( cat !== "All"){
      result = result.filter((product) => product.category === cat);
    }
    if(term){
      result = result.filter((product) => product.title.toLowerCase().includes(term.toLowerCase()));
    }

    setFilteredProducts(result);
  }

  const indexOfLastProduct = currentPage * productsPerPage;

  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const pageNumbers = [...Array(totalPages).keys()].map((n)=> n+1);

  return(
    <div className="container mt-4">
      <h1 className="text-center mb-4">Top Products</h1>

      <div className="row mb-3">
        <div className="col-md-6">
          <input
          type="text"
          className="form-control"
          placeholder="Search product.."
          value={searhTerm}
          onChange={handleSearch}
          ></input>
        </div>
        <div className="col-md-6">
          <select
          className="form-select"
          value={category}
          onChange={handleCategoryChange}
          >
            <option value="All">All Categories</option>
            {categories.map((cat, index)=>(
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="row">
        {currentProducts.map((product)=>(
          <ProductCart key={product.id} product={product}></ProductCart>
        ))}
      </div>

      {totalPages > 1 && (
        <nav>
          <ul className="pagination justifycontent-center mt-4">
            {pageNumbers.map((number) => (
              <li key={number} className={`page-item ${currentPage === number ? "active" : ""}`}>
              <button onClick={()=> setCurrentPage(number)} className="page-link">
                {number}
              </button>
              </li>           
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}