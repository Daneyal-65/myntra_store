import React, { useEffect, useState } from "react";
import { X, ChevronDown, Clock } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromBag } from "../store/bag";
import Modal from "../ui/Modal";

export default function ShoppingCart() {
  const [pincode, setPincode] = useState(""); // to sotre pincode
  const [showOffers, setShowOffers] = useState(false); // hide and show offers
  const [selectedDonation, setSelectedDonation] = useState(null); // donation toggle
  const dispatch = useDispatch(); // hook for dispatch action
  // get all require data from redux store
  const cartItems = useSelector((state) => state.bag.items);

  return cartItems.length > 0 ? (
    <div className="max-w-7xl mx-auto p-4">
      {/* Progress Bar */}
      <div className="flex justify-between items-center mb-8 text-sm">
        <div className="flex justify-center gap-4 w-full absolute text-sm text-gray-600">
          <span className="font-medium">
            <strong className="underline">BAG </strong>------
          </span>
          <span>
            <strong>ADDRESS </strong> ------
          </span>
          <strong>PAYMENT</strong>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Delivery Check */}
          <div className="bg-pink-50 p-4 rounded-lg mb-6">
            <div className="flex items-center justify-between">
              <span>Check delivery time & services</span>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="ENTER PIN CODE"
                  className="border px-3 py-1 rounded"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                />
                <button className="text-pink-500 font-medium">APPLY</button>
              </div>
            </div>
          </div>

          {/* Available Offers */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4" />
              <span className="font-medium">Available Offers</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              10% Instant Discount on Federal Bank Credit and Debit Cards on a
              min spend of ₹3,000. T&A
            </p>
            <button
              className="text-pink-500 text-sm flex items-center gap-1"
              onClick={() => setShowOffers(!showOffers)}
            >
              Show More <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <input type="checkbox" checked readOnly />
                <span className="font-medium">
                  {cartItems.length}/{cartItems.length} ITEMS SELECTED
                </span>
              </div>
              <div className="flex gap-4 text-sm">
                <button
                  className="text-gray-600"
                  onClick={() =>
                    dispatch(removeFromBag(cartItems[cartItems.length - 1].id))
                  }
                >
                  REMOVE
                </button>
                <button className="text-gray-600">MOVE TO WISHLIST</button>
              </div>
            </div>

            {/* Cart Item */}
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 border-t py-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-24 object-cover"
                />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-600">
                        {item.description}
                      </p>
                      <p className="text-xs text-gray-500">
                        Sold by: {item.seller}
                      </p>
                    </div>
                    <button
                      className="text-gray-400"
                      onClick={() => dispatch(removeFromBag(item.id))}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex gap-4 mt-4">
                    <select className="border rounded px-2 py-1 text-sm">
                      <option>Size: {item.size}</option>
                    </select>
                    <select className="border rounded px-2 py-1 text-sm">
                      <option>Qty: {item.quantity}</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2 mt-4">
                    <span className="font-medium">
                      ₹{Math.floor(item.price * 82)}
                    </span>
                    <span className="text-gray-500 line-through text-sm">
                      ₹{Math.floor(item.price * 82 * 2)}
                    </span>
                    <span className="text-pink-500 text-sm">50%</span>
                  </div>

                  <div className="flex items-center gap-1 mt-2 text-xs text-gray-600">
                    <Clock className="w-3 h-3" />
                    <span>{item.returnDays} days</span> return available
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-1">
          {/* Coupons */}
          <div className="border rounded-lg p-4 mb-6">
            <h3 className="font-medium mb-4">COUPONS</h3>
            <div className="flex justify-between items-center">
              <span>Apply Coupons</span>
              <button className="text-pink-500 px-4 py-1 border border-pink-500 rounded">
                APPLY
              </button>
            </div>
          </div>

          {/* Donation */}
          <div className="border rounded-lg p-4 mb-6">
            <h3 className="text-sm text-gray-600 mb-4">
              SUPPORT TRANSFORMATIVE SOCIAL WORK IN INDIA
            </h3>
            <div className="flex items-center gap-2 mb-4">
              <input type="checkbox" />
              <span>Donate and make a difference</span>
            </div>
            <div className="flex gap-2 mb-4">
              {[10, 20, 50, 100].map((amount) => (
                <button
                  key={amount}
                  className={`px-3 py-1 rounded border ${
                    selectedDonation === amount
                      ? "border-pink-500 text-pink-500"
                      : "border-gray-300"
                  }`}
                  onClick={() => setSelectedDonation(amount)}
                >
                  ₹{amount}
                </button>
              ))}
            </div>
            <button className="text-pink-500 text-sm">Know More</button>
          </div>

          {/* Price Details */}
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-4">
              PRICE DETAILS ({cartItems.length} items)
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Total MRP</span>
                <span>
                  ₹
                  {Math.floor(
                    cartItems.reduce((acc, item) => {
                      return acc + item.price * 2 * 82;
                    }, 0)
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Discount on MRP</span>
                <span className="text-green-500">
                  -₹
                  {Math.floor(
                    cartItems.reduce((acc, item) => {
                      return acc + item.price * 82;
                    }, 0)
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Platform Fee</span>
                <span className="text-green-500">FREE</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping Fee</span>
                <span className="text-green-500">FREE</span>
              </div>
              <div className="flex justify-between font-medium pt-3 border-t">
                <span>Total Amount</span>
                <span>
                  ₹
                  {Math.floor(
                    cartItems.reduce((acc, item) => {
                      return acc + item.price * 82;
                    }, 0)
                  )}
                </span>
              </div>
            </div>
            <button className="w-full bg-pink-500 text-white py-3 rounded mt-4 font-medium">
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Modal />
  );
}
