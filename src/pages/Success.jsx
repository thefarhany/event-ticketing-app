import React from "react";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        Checkout Berhasil!
      </h1>
      <p className="text-gray-700 mb-6">
        Terima kasih telah membeli tiket. Detail pembelianmu akan segera kami
        proses.
      </p>
      <Link to="/" className="text-blue-600 underline">
        Kembali ke Beranda
      </Link>
    </div>
  );
};

export default Success;
