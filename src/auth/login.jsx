import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0(); // login hook provided by Auth0

  return (
    // log in page
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center">
      <h2 className="text-lg font-semibold text-gray-900">PLEASE LOG IN</h2>
      <p className="text-gray-500 mt-1">
        Login to view items in your wishlist,profile and bag.
      </p>
      <div className="my-6">
        <div className="w-16 h-16 border border-gray-300 rounded-lg flex items-center justify-center">
          <span className="text-gray-400 text-2xl">📄</span>
        </div>
      </div>
      {/* {login button} */}
      <button
        className="text-pink-600 border border-pink-600 hover:bg-pink-600 hover:text-white font-medium rounded-lg text-lg px-6 py-3 transition-all"
        onClick={() => loginWithRedirect()}
      >
        LOGIN
      </button>
    </div>
  );
};

export default LoginButton;
