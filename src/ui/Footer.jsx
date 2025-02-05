const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8 px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-4 gap-8 text-sm text-gray-700">
        {/* Online Shopping */}
        <div>
          <h3 className="font-semibold mb-3">ONLINE SHOPPING</h3>
          <ul className="space-y-2">
            {[
              "Men",
              "Women",
              "Kids",
              "Home & Living",
              "Beauty",
              "Gift Cards",
              "Myntra Insider",
            ].map((item) => (
              <li key={item} className="cursor-pointer hover:underline">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Policies */}
        <div>
          <h3 className="font-semibold mb-3">CUSTOMER POLICIES</h3>
          <ul className="space-y-2">
            {[
              "Contact Us",
              "FAQ",
              "T&C",
              "Terms Of Use",
              "Track Orders",
              "Shipping",
              "Cancellation",
              "Returns",
              "Privacy Policy",
              "Grievance Redressal",
            ].map((item) => (
              <li key={item} className="cursor-pointer hover:underline">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="font-semibold mb-3">USEFUL LINKS</h3>
          <ul className="space-y-2">
            {[
              "Blog",
              "Careers",
              "Site Map",
              "Corporate Information",
              "Whitehat",
              "Cleartrip",
            ].map((item) => (
              <li key={item} className="cursor-pointer hover:underline">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Experience Myntra App */}
        <div>
          <h3 className="font-semibold mb-3">
            EXPERIENCE MYNTRA APP ON MOBILE
          </h3>
          <div className="flex space-x-4 mb-4">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Google Play"
              className="w-32"
            />
          </div>
          <h3 className="font-semibold mb-3">KEEP IN TOUCH</h3>
          <div className="flex space-x-3 text-xl">
            <span className="cursor-pointer">📘</span>
            <span className="cursor-pointer">🐦</span>
            <span className="cursor-pointer">▶️</span>
            <span className="cursor-pointer">📸</span>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto mt-6 flex justify-between text-gray-700 text-sm">
        <div className="flex space-x-4">
          <div className="flex items-center">
            <span className="text-lg mr-2">✅</span>
            <p>100% ORIGINAL guarantee for all products at myntra.com</p>
          </div>
          <div className="flex items-center">
            <span className="text-lg mr-2">🔄</span>
            <p>
              Return within <span className="font-semibold">14 days</span> of
              receiving your order
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
