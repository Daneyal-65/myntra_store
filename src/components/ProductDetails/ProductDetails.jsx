import { useEffect, useState } from "react";
import { Heart, Star, Truck, Package, RefreshCw } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { addToBag } from "../../store/bag";
import { updateSize } from "../../store/reducer";
import { updateWishListDetails } from "../../store/wishlist";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {
  // State variables
  const [selectedSize, setSelectedSize] = useState(""); // Stores the selected size
  const [error, setError] = useState(""); // Stores error message for size selection
  const [clicked, setClicked] = useState(false); // Handles add to bag button animation
  const [mainImage, setMainImage] = useState(0); // Stores the index of the main product image
  const [pincode, setPincode] = useState(""); // Stores user-entered pincode

  // Redux state and dispatch
  const prodDetails = useSelector((state) => state.ProductDetails.value); // Fetch product details from Redux store
  const dispatch = useDispatch(); // Redux dispatch function

  // Authentication and navigation hooks
  const { isAuthenticated } = useAuth0(); // Check if user is logged in
  const navigate = useNavigate(); // For programmatic navigation

  // Dummy image array (assuming product has multiple images)
  const images = [prodDetails.image, prodDetails.image, prodDetails.image];

  // Effect to reset 'clicked' state after 600ms (for button animation)
  useEffect(() => {
    let id = setTimeout(() => {
      setClicked(false);
    }, 600);
    return () => clearTimeout(id);
  }, [clicked]);

  // Available sizes for selection
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  // Function to handle adding product to bag
  const handleAddToBag = () => {
    if (!isAuthenticated) {
      navigate("/login"); // Redirect to login if user is not authenticated
      return;
    }
    if (prodDetails.size) {
      dispatch(addToBag(prodDetails)); // Add product to bag
      setClicked(true); // Trigger animation
      setError(""); // Clear error
    } else {
      setError("select the size !"); // Show error if size is not selected
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Side - Product Images */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg border">
            <img
              src={images[mainImage] || "/placeholder.svg"}
              alt="Product"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {/* Thumbnail images */}
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setMainImage(index)}
                className={`aspect-square border rounded-md overflow-hidden ${
                  mainImage === index ? "border-2 border-pink-500" : ""
                }`}
              >
                <img
                  src={img || "/placeholder.svg"}
                  alt={`Product ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right Side - Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold">{prodDetails.category}</h1>
            <p className="text-gray-600">{prodDetails.title}</p>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center bg-green-100 px-2 py-0.5 rounded">
                <span className="text-sm font-medium">
                  {prodDetails.rating.rate}
                </span>
                <Star className="w-4 h-4 ml-1 fill-green-600 text-green-600" />
              </div>
              <span className="text-gray-500 text-sm">
                {prodDetails.rating.count} Ratings
              </span>
            </div>
          </div>

          {/* Price Section */}
          <div className="border-t border-b py-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">
                ₹{Math.floor(prodDetails.price * 82)}
              </span>
              <span className="text-gray-500 line-through">
                ₹{Math.floor(prodDetails.price * 82 * 2)}
              </span>
              <span className="text-orange-500">(50% OFF)</span>
            </div>
            <p className="text-green-600 text-sm">inclusive of all taxes</p>
          </div>

          {/* Size Selection */}
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">SELECT SIZE</h3>
              <div className="flex flex-wrap gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      setSelectedSize(size);
                      dispatch(updateSize(size));
                    }}
                    className={`h-12 w-12 rounded-full border flex items-center justify-center ${
                      selectedSize === size
                        ? "border-pink-500 text-pink-500"
                        : "hover:border-gray-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            {error && <div className="text-red-800">{error}</div>}
          </div>

          {/* Add to Bag and Wishlist Buttons */}
          <div className="flex gap-4">
            <button
              className={`flex-1 bg-pink-500 text-white py-4 rounded-md font-medium relative cursor-pointer ${
                clicked ? "font-black bg-pink-100 animate-pulse opacity-50" : ""
              }`}
              onClick={handleAddToBag}
            >
              {!clicked ? "ADD TO BAG" : "ADDED"}
            </button>
            <button
              className="flex-1 border border-gray-300 py-4 rounded-md font-medium flex items-center justify-center gap-2"
              onClick={() => {
                if (!isAuthenticated) {
                  navigate("/login");
                  return;
                }
                dispatch(updateWishListDetails(prodDetails));
              }}
            >
              <Heart className="w-5 h-5" /> WISHLIST
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
