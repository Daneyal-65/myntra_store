import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Prodoctstore } from "../constants/data";
import { updateDetails } from "../store/reducer";
import { useDispatch, useSelector } from "react-redux";
import { Heart } from "lucide-react";
import { updateWishListDetails } from "../store/wishlist";
import { useAuth0 } from "@auth0/auth0-react";
export default function productListByCategoryPage() {
  // to store categorized data
  const [products, setProducts] = useState([]);

  const { isAuthenticated } = useAuth0(); // authentication
  // get category from url using hook
  const { category } = useParams();
  // console.log(category);
  const dispatch = useDispatch(); // dispatch action to update the redux store
  const navigate = useNavigate(); // hook for navigation
  // get all wished products from redux store
  const isWished = useSelector((state) => state.wishlist.wished);

  // navigate to product detail page with updated state
  const handleDetailsPage = (product) => {
    dispatch(updateDetails(product));
    navigate("/product-details");
  };
  // handling wishedList and authenticating
  const handleWishList = (product) => {
    if (!isAuthenticated) {
      navigate("/product-details");
      return;
    }
    dispatch(updateWishListDetails(product));
  };
  // filter item based on category
  useEffect(() => {
    if (category) {
      const filteredItem = Prodoctstore.filter((item) => {
        if (category === "groceries") {
          return item.category === "electronics" || item.category === category;
        }
        return item.category === category;
      });
      filteredItem.sort((a, b) => b.id - a.id);
      setProducts(filteredItem);
    }
  }, [category]);
  return (
    // {product list }
    <div className="grid grid-cols-4 gap-4 px-2">
      {products.map((product) => (
        <div
          key={product.id}
          className="border p-4 rounded-md text-center bg-white shadow"
        >
          <img
            src={product.image}
            alt={product.title}
            className="h-40 mx-auto cursor-pointer"
            loading="lazy"
            onClick={() => handleDetailsPage(product)}
          />
          <button
            className={`border border-gray-300 rounded-md font-medium 
          flex w-full gap-3 items-center justify-center my-1 cursor-pointer ${
            isWished.includes(product.id) ? "bg-rose-900 text-white" : ""
          }`}
            onClick={() => handleWishList(product)}
          >
            <Heart className="w-5 h-5" />
            WISHLIST
          </button>
          <div
            className=" cursor-pointer"
            onClick={() => handleDetailsPage(product)}
          >
            <p className="mt-2 font-medium">{product.title}</p>
            <p className="text-red-500 font-bold">${product.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
