import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";
import usePageTitle from "../hooks/usePageTitle";

const Checkout = () => {
  const { cartItems, dispatch } = useContext(CartContext);
  const [paymentMethod, setPaymentMethod] = useState("Transfer Bank");
  const navigate = useNavigate();

  const titlePage = "Checkout";
  usePageTitle(titlePage);

  const subtotal = cartItems.reduce(
    (acc, items) => acc + items.price * items.quantity,
    0
  );

  const handleCheckout = () => {
    dispatch({ type: "CLEAR_CART" });
    navigate("/success");
  };

  const handleQuantityChange = (id, type) => {
    dispatch({
      payload: id,
      type: type === "increase" ? "INCREASE_QUANTITY" : "DECREASE_QUANTITY",
    });
  };

  const handleRemove = (id) => {
    dispatch({
      payload: id,
      type: "REMOVE_FROM_CART",
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500 min-h-[60vh]">Keranjang kamu kosong.</p>
      ) : (
        <>
          <div className="overflow-x-auto mb-8">
            <table className="min-w-full table-auto border border-gray-300">
              <thead className="bg-blue-500 border border-gray-600 text-white">
                <tr>
                  <th className="py-2">Nama Event</th>
                  <th className="py-2 px-4">Jumlah</th>
                  <th className="py-2 px-4">Harga / Tiket</th>
                  <th className="py-2 px-4">Total</th>
                  <th className="py-2 px-4">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id} className="text-center border-t">
                    <td className="py-2 px-4 border border-gray-600">
                      {item.title}
                    </td>
                    <td className="py-2 px-4 border border-gray-600">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          className="p-1 bg-red-200 rounded"
                          onClick={() =>
                            handleQuantityChange(item.id, "decrease")
                          }
                        >
                          <CiSquareMinus size={20} />
                        </button>
                        {item.quantity}
                        <button
                          className="p-1 bg-green-200 rounded"
                          onClick={() =>
                            handleQuantityChange(item.id, "increase")
                          }
                        >
                          <CiSquarePlus size={20} />
                        </button>
                      </div>
                    </td>
                    <td className="py-2 px-4 border border-gray-600">
                      Rp {item.price.toLocaleString("id-ID")}
                    </td>
                    <td className="py-2 px-4 border border-gray-600">
                      Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                    </td>
                    <td className="py-2 px-4 border border-gray-600">
                      <button
                        className="px-4 py-2 bg-red-600 text-sm font-semibold flex items-center gap-1 mx-auto rounded-2xl text-white hover:bg-red-500"
                        onClick={() => handleRemove(item.id)}
                      >
                        <FaRegTrashAlt /> Hapus
                      </button>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="4" className="px-4 py-3 text-right font-bold">
                    Subtotal:
                  </td>
                  <td className="px-4 py-3 font-bold text-blue-600">
                    Rp{subtotal.toLocaleString("id-ID")}
                  </td>
                  <td />
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-gray-100 p-6 rounded shadow-md">
            <h3 className="text-xl font-bold mb-4">Metode Pembayaran</h3>

            <div className="mb-4">
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="Transfer Bank">Transfer Bank</option>
                <option value="QRIS">QRIS</option>
                <option value="Dana">Dana</option>
                <option value="GoPay">GoPay</option>
              </select>
            </div>

            <button
              onClick={handleCheckout}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Checkout;
