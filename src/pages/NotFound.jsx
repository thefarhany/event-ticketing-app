import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gray-50 px-6 text-center">
      <h1 className="text-6xl font-extrabold text-blue-600 mb-4">404</h1>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Halaman Tidak Ditemukan
      </h2>
      <p className="text-gray-500 mb-6 max-w-md">
        Ups! Sepertinya halaman yang kamu cari tidak tersedia atau sudah
        dipindahkan.
      </p>

      <Link
        to="/"
        className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
      >
        <FaArrowLeft /> Kembali ke Beranda
      </Link>
    </div>
  );
};

export default NotFound;
