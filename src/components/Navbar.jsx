import React, { useContext, useState, useRef, useEffect } from "react";
import { FaShoppingCart, FaTicketAlt } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const Navbar = () => {
  const { cartItems, dispatch } = useContext(CartContext);
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const cartRef = useRef(null);
  const navigate = useNavigate();

  // Tutup dropdown jika klik di luar
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (cartRef.current && !cartRef.current.contains(e.target)) {
        setShowCartDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClearCart = () => {
    dispatch({ type: "CLEAR_CART" });
    setShowCartDropdown(false);
  };

  const handleCheckout = () => {
    navigate("/checkout");
    setShowCartDropdown(false);
  };

  return (
    <nav className="flex justify-between items-center px-10 md:px-20 py-4 shadow-md bg-white sticky top-0 z-50">
      <div className="flex items-center gap-2 text-xl font-bold text-blue-600">
        <FaTicketAlt />
        <Link to="/">EventX</Link>
      </div>

      <div className="hidden md:flex gap-6 items-center relative" ref={cartRef}>
        <Link to="/" className="hover:text-blue-600">
          Home
        </Link>
        <a href="#faq" className="hover:text-blue-600">
          FAQ
        </a>
        <a href="#subscribe" className="hover:text-blue-600">
          Berlangganan
        </a>

        {/* Cart Button */}
        <button
          className="relative bg-blue-600 text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-blue-700 transition"
          onClick={() => setShowCartDropdown((prev) => !prev)}
        >
          <FaShoppingCart className="text-lg" />
          <span>Cart</span>
          {cartItems?.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
              {cartItems.length}
            </span>
          )}
        </button>

        {/* Cart Dropdown */}
        {showCartDropdown && (
          <div className="absolute right-0 top-14 w-80 bg-white shadow-lg rounded-md border z-50 p-4">
            <h3 className="text-lg font-semibold mb-2">Keranjang Tiket</h3>

            {cartItems.length === 0 ? (
              <p className="text-gray-500 text-sm">
                Belum ada tiket ditambahkan.
              </p>
            ) : (
              <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center border-b pb-2 text-sm"
                  >
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-xs text-gray-500">
                        Jumlah: {item.quantity}
                      </p>
                    </div>
                    <span className="text-blue-600 font-semibold">
                      Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Buttons */}
            {cartItems.length > 0 && (
              <div className="flex justify-between mt-4 gap-2">
                <button
                  onClick={handleClearCart}
                  className="bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300 text-sm"
                >
                  Clear
                </button>
                <button
                  onClick={handleCheckout}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                >
                  Checkout
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <FiMenu className="md:hidden text-2xl cursor-pointer" />
    </nav>
  );
};

export default Navbar;
