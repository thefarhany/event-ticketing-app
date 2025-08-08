import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white px-6 pt-8 pb-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold">EventX</h3>
          <p className="text-sm text-gray-300">
            Platform tiket event favoritmu.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 text-sm text-gray-300 text-center">
          <Link to="/">Home</Link>
          <Link to="#faq">FAQ</Link>
          <Link to="#subscribe">Berlangganan</Link>
          <Link to="/cart">Cart</Link>
        </div>
      </div>

      <div className="mt-6 text-center text-sm text-gray-400 border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} EventX. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
