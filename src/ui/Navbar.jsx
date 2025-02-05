import { Search, User, Heart, ShoppingBag } from "lucide-react";
import { navItems } from "../constants/links";
import { useState } from "react";
import { Prodoctstore } from "../constants/data";
import { Link, useNavigate } from "react-router-dom";
import ProfileDropdown from "../components/Profile/userProfile";
import { useDispatch } from "react-redux";
import { updateDetails } from "../store/reducer";

export default function Navbar() {
  const [query, setQuery] = useState(""); // Search input state
  const navigate = useNavigate(); // Navigation function
  const [filteredNames, setFilteredNames] = useState([]); // Filtered search suggestions
  const dispatch = useDispatch(); // Redux dispatch function

  const handleSearchBar = (e) => {
    const value = e.target.value; // Get search query
    setQuery(value); // Update search input state
    if (value.trim() === "") {
      setFilteredNames([]); // Clear suggestions if input is empty
      return;
    }
    // Filter product store by title
    const suggestions = Prodoctstore.filter((name) => {
      if (name.title.toLowerCase().startsWith(value.toLowerCase())) {
        return name.title; // Return products starting with the query
      }
    });
    setFilteredNames(suggestions); // Update filtered suggestions
  };

  const handleSearch = (name) => {
    dispatch(updateDetails(name)); // Update product details in Redux
    setQuery(""); // Reset search input
    setFilteredNames([]); // Clear filtered suggestions
    navigate("/product-details"); // Navigate to product details page
  };

  return (
    <nav className="border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 ">
            <Link to="/" className="flex items-center">
              <img
                src="https://i.pinimg.com/originals/68/6d/c5/686dc532a1d5ba6a70057b87815eb929.png"
                alt="Logo"
                className="h-12 w-12"
              />
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.label} // Unique key for each nav item
                to={`${item.href}/${item.category.toLocaleLowerCase()}`} // Navigate to category page
                className="text-sm font-semibold text-gray-700 hover:text-pink-500 relative"
              >
                {item.label} {/* Navigation item label */}
              </Link>
            ))}
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl mx-8">
            <div className="relative">
              {/* Search Icon */}
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              {/* Search Input */}
              <input
                onChange={handleSearchBar} // Handle input change
                value={query} // Controlled input
                type="text"
                placeholder="Search for products, brands and more"
                className="w-full bg-gray-50 border border-gray-200 rounded-md py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500"
              />
            </div>
            {/* Search suggestions */}
            {filteredNames.length > 0 && (
              <ul className="absolute bg-gray-50 rounded-md w-1/3">
                {filteredNames.map((name, index) => (
                  <li
                    onClick={() => handleSearch(name)} // Handle suggestion click
                    key={index} // Unique key for each suggestion
                    className="p-1 px-2 hover:bg-gray-300 cursor-pointer shadow-3xl "
                  >
                    {name.title} {/* Display product title */}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Right Icons */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="#" className="flex flex-col items-center group">
              <ProfileDropdown /> {/* User profile dropdown */}
            </Link>
            <Link to="/wishlist" className="flex flex-col items-center group">
              <Heart className="h-5 w-5 text-gray-700 group-hover:text-pink-500" />
              <span className="text-xs mt-1 text-gray-700 group-hover:text-pink-500">
                Wishlist {/* Wishlist icon and label */}
              </span>
            </Link>
            <Link to="/cart" className="flex flex-col items-center group">
              <ShoppingBag className="h-5 w-5 text-gray-700 group-hover:text-pink-500" />
              <span className="text-xs mt-1 text-gray-700 group-hover:text-pink-500">
                Bag {/* Shopping bag icon and label */}
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-pink-500">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
