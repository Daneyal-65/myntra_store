import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateDetails } from "../../store/reducer";
import { useNavigate } from "react-router-dom";

export default function TrendingProducts() {
  const [products, setProducts] = useState([]); // Store products in state

  const dispatch = useDispatch(); // Dispatch function to update Redux state
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    // Fetch products data from API
    axios.get("https://fakestoreapi.com/products").then((res) => {
      setProducts(res.data); // Set products data in state
    });
  }, []); // Runs only once on component mount

  return (
    <div className="p-4">
      {/* Section Heading */}
      <h2 className="text-xl font-semibold mb-2">Trending Products</h2>

      {/* Products Grid */}
      <div className="grid grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            key={product.id} // Unique key for each product
            className="border p-4 rounded-md text-center bg-white shadow cursor-pointer"
            onClick={() => {
              dispatch(updateDetails(product)); // Update product details in Redux
              navigate("/product-details"); // Navigate to product details page
            }}
          >
            {/* Product Image */}
            <img
              src={product.image}
              alt={product.title}
              className="h-40 mx-auto"
              loading="lazy" // Lazy load the image
            />
            {/* Product Title */}
            <p className="mt-2 font-medium">{product.title}</p>
            {/* Product Price */}
            <p className="text-red-500 font-bold">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
