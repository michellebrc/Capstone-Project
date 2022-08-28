import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCartThunk, getCartThunk } from "../redux/Reducer/cart";
import products from "../data/productData";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function Product() {
  const dispatch = useDispatch();
  const [uploadImage, setUploadImage] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/menu").then((res) => {
      setProducts(res.data);
    });
  }, []);
 
  return (
    <div className="cardWrapper">
      {products.map((product) => (
        <div className="Wrapper" key={product.id}>
          <img src={"http://localhost:8000/image/" + product.image} alt="" />
          <h4>{product.name}</h4>
          <h4>{product.price}</h4>
          <button
            className="btn"
            onClick={() => dispatch(addCartThunk(product.id, product.name))}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
