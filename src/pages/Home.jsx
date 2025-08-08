import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiSearch } from "react-icons/fi";
import events from "../data/event";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import usePageTitle from "../hooks/usePageTitle";

const Home = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Semua");

  const categories = ["Musik", "Seminar", "Olahraga", "Teater"];

  const titlePage = "Ticket App";
  usePageTitle(titlePage);

  const filteredEvents = events.filter((event) => {
    const matchSearch = event.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory = category === "Semua" || event.category === category;

    return matchSearch && matchCategory;
  });

  return (
    <>
      <section className="bg-gradient-to-br from-blue-50 to-white py-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
        >
          Temukan & Beli Tiket Event Favoritmu
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-gray-600 max-w-xl mx-auto mb-6"
        >
          Dari konser musik, seminar edukatif, hingga acara olahraga – semua
          dalam satu platform.
        </motion.p>
      </section>

      <section className="px-20 py-10 bg-white">
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between mb-10">
          <div className="flex gap-2 items-center border px-4 py-2 rounded-md w-full md:w-1/2 shadow-sm">
            <FiSearch className="text-gray-400" />
            <input
              type="text"
              placeholder="Cari nama event..."
              className="w-full outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex gap-2 overflow-auto md:overflow-visible">
            {["Semua", ...categories].map((cat) => (
              <button
                key={cat}
                className={`px-4 py-2 rounded-full border transition ${
                  category === cat
                    ? "bg-blue-600 text-white border-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-6">Daftar Event</h2>
        {filteredEvents.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <motion.div
                key={event.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-lg shadow-md overflow-hidden border"
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
                  <p className="text-sm text-gray-600">{event.location}</p>
                  <p className="text-sm text-gray-600">{event.date}</p>
                  <p className="text-blue-600 font-bold mt-2">
                    Rp{event.price.toLocaleString()}
                  </p>
                  <a
                    href={`/event/${event.id}`}
                    className="mt-4 inline-block text-sm bg-blue-600 text-white mx-auto px-4 py-2 w-full text-center rounded-full hover:bg-blue-700"
                  >
                    Lihat Detail
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-10">
            Tidak ada event yang cocok dengan pencarian.
          </p>
        )}
      </section>

      <section className="px-10 md:px-20 py-10 bg-white">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Event Unggulan
        </h2>
        <Swiper
          modules={[Autoplay]}
          pagination={{ clickable: true }}
          spaceBetween={20}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="flex gap-4"
        >
          {events.map((event) => (
            <SwiperSlide key={event.id} className=" bg-blue-100 rounded-xl p-4">
              <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
              <p className="text-sm">{event.location}</p>
              <p className="text-sm">{event.date}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section id="faq" className="px-20 py-10 bg-gray-50">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">FAQ</h2>
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-md shadow">
            <h4 className="font-semibold">Bagaimana cara membeli tiket?</h4>
            <p className="text-sm text-gray-600 mt-2">
              Pilih event favoritmu, klik detail, tentukan jumlah tiket, dan
              tambahkan ke keranjang.
            </p>
          </div>
          <div className="bg-white p-4 rounded-md shadow">
            <h4 className="font-semibold">Apakah bisa refund?</h4>
            <p className="text-sm text-gray-600 mt-2">
              Kebijakan refund tergantung masing-masing event. Silakan cek
              detail event terkait.
            </p>
          </div>
        </div>
      </section>

      <section
        id="subscribe"
        className="px-6 py-10 bg-blue-600 text-white text-center"
      >
        <h2 className="text-2xl font-bold mb-4">
          Ingin Selalu Update Event Terbaru?
        </h2>
        <p className="mb-6">
          Daftarkan email kamu untuk mendapatkan info terbaru setiap minggu!
        </p>
        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          <input
            type="email"
            placeholder="Email kamu..."
            className="px-4 py-2 bg-gray-100 rounded-md text-black w-64"
          />
          <button className="bg-white text-blue-600 px-6 py-2 rounded-md font-semibold">
            Langganan
          </button>
        </div>
      </section>
    </>
  );
};

export default Home;
