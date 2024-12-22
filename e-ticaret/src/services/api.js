import axios from "axios";

const API_URL = "https://fakestoreapi.com";

export const fetchProduct = () => axios.get(`${API_URL}/products`);
export const fetchProductById = (id) => axios.get(`${API_URL}/products/${id}`);