import { motion } from "framer-motion";
import { useContext, useState } from "react";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaMoneyBillWave,
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import events from "../data/event";
import usePageTitle from "../hooks/usePageTitle";

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useContext(CartContext);
  const event = events.find((e) => e.id === parseInt(id));

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    quantity: 1,
  });

  const titlePage = event.title;
  usePageTitle(titlePage);

  const totalPrice = event.price * form.quantity;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "quantity" ? parseInt(value) : value,
    }));
  };

  const handleAddCart = (e) => {
    e.preventDefault();

    const newItem = {
      id: event.id,
      title: event.title,
      price: event.price,
      quantity: form.quantity,
      customer: {
        name: form.name,
        email: form.email,
        phone: form.phone,
      },
    };

    dispatch({ type: "ADD_TO_CART", payload: newItem });
    alert("Tiket Berhasil Ditambahkan ke Keranjang");
  };

  if (!event) {
    return <p className="text-center py-10">Event tidak ditemukan.</p>;
  }

  return (
    <section className="px-10 md:px-20 py-10">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-600 mb-6"
      >
        <FaArrowLeft className="mr-2" /> Kembali ke Event
      </button>

      <div className="grid md:grid-cols-3 gap-10">
        <div className="md:col-span-2 space-y-6">
          <motion.img
            src={event.image}
            alt={event.title}
            className="rounded-xl w-full object-cover h-64"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
          />

          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-5">
              {event.title}
            </h1>
            <p className="text-gray-600 flex items-center gap-2 mb-2">
              <FaMapMarkerAlt /> {event.location}
            </p>
            <p className="text-gray-600 flex items-center gap-2">
              <FaCalendarAlt /> {event.date}
            </p>
            <p className="text-lg font-semibold text-blue-600 mt-2 flex items-center gap-2">
              <FaMoneyBillWave /> Rp {event.price.toLocaleString()}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Tentang Event</h2>
            <p className="text-gray-700 leading-relaxed">{event.description}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Diselenggarakan oleh</h2>
            <p className="text-gray-700">{event.organizer}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Informasi Tambahan</h2>
            <p className="text-gray-700">Kuota tersedia: {event.quota} tiket</p>
            <p className="text-gray-700">Batas pembelian: {event.deadline}</p>
          </div>
        </div>

        <aside className="bg-gray-50 p-6 rounded-xl shadow-md h-fit">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Pembelian Tiket
          </h2>
          <form onSubmit={handleAddCart} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700">
                Nama Lengkap
              </label>
              <input
                name="name"
                type="text"
                placeholder="Nama Lengkap"
                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700">Email</label>
              <input
                name="email"
                type="email"
                placeholder="Email"
                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700">Nomor HP</label>
              <input
                name="phone"
                type="tel"
                placeholder="+62 81234567890"
                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700">
                Jumlah Tiket
              </label>
              <input
                name="quantity"
                type="number"
                min={1}
                max={event.quota}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                value={form.quantity}
                onChange={handleChange}
              />
            </div>

            <div className="text-right text-blue-600 font-semibold">
              Total: Rp {totalPrice.toLocaleString()}
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md mt-2"
            >
              Tambah ke Keranjang
            </motion.button>
          </form>
        </aside>
      </div>
    </section>
  );
};

export default EventDetail;
