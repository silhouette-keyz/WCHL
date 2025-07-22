import React, { useState } from "react";

type Price = { type: string; value: string };
type EventData = {
  title: string;
  date: string;
  duration: string;
  location: string;
  image: string;
  description: string;
  fullDescription: string;
  prices: Price[];
  discount: string;
};

const eventsData: Record<string, EventData> = {
  event1: {
    title: "Ruang Bermusik 2025",
    date: "19-20 Juli 2025",
    duration: "2 hari",
    location: "Tasikmalaya",
    image: "/img/event.jpg",
    description: "Gala konser Ruang Bermusik 2025...",
    fullDescription:
      "Gala konser Ruang Bermusik 2025 akan diselenggarakan akhir pekan ini Sabtu, 19 Juli hingga Minggu, 20 Juli 2025. Festival musik ini digelar di arena Lanud Wiriadinata, Tasikmalaya, Jawa Barat. Sederet musisi populer dari berbagai aliran kekinian siap mengisi line upRuang Bermusik tahun ini, seperti, Maliq & D'Essentials, Adnan Veron x HBRP hingga Perunggu. Tidak hanya perhelatan musik, Ruang Bermusik 2025 turut menghadirkan pelaku industri kreatif juga hiburan dari kesenian lokal. Selain itu berbagai sajian kuliner, banyak pilihan makanan dan minuman mulai dari kuliner tradisional hingga modern khas Tasikmalaya yang menggiurkan.",
    prices: [
      { type: "Early Bid Special - 2 Day Pass", value: "IDR 100.000" },
      { type: "Normal - 2 Day Pass (19-20 Juli 2025)", value: "IDR 200.000" },
      {
        type: "Presale 1 - 2 Day Pass (19-20 Juli 2025)",
        value: "IDR 150.000",
      },
    ],
    discount: "50%",
  },
  event2: {
    title: "La La Land in the concert",
    date: "26 Juli 2025",
    duration: "1 hari",
    location: "JIExpo Kemayoran.",
    image: "/img/event1.jpg",
    description: "La La Land in Corcert di Jakarta...",
    fullDescription:
      "La La Land in Corcert di Jakarta akan diselenggarakan pada 26 Juli 2025 di Jakarta International Expo atau JIExpo, Kemayoran. Sebelum akhirnya tiba di Jakarta, La La Land in Concert akan menyapa penggemarnya di Boston 7 Juni 2025.",
    prices: [
      { type: "SEBASTIAN SEAT", value: "IDR 900.000" },
      { type: "BILL SEAT", value: "IDR 1.200.000" },
    ],
    discount: "40%",
  },
  event3: {
    title: "RI-FEST 2025",
    date: "15-17 Agustus 2025",
    duration: "3 hari",
    location: "Parkir Barat Jiexpo Kemayoran",
    image: "/img/event3.jpg",
    description: "Menyambut Hari Kemerdekaan...",
    fullDescription:
      "Menyambut Hari Kemerdekaan Indonesia ke-80, Ruang Indonesia Festival Vol. 4 kembali hadir pada tanggal 15,16 & 17 Agustus 2025 dalam rangkaian kegiatan seperti festival musik, lomba 17-an, kuliner nusantara, dan masih banyak lagi kegiatan seru lainnya.",
    prices: [
      { type: "Promo Blind Ticket (3 Day Pass)", value: "IDR 80.000" },
      {
        type: "Tiket VIP Lounge Upper Deck (3 Day Pass)",
        value: "IDR 1.350.000",
      },
    ],
    discount: "10%",
  },
};

export default function HomePage() {
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showBiodataModal, setShowBiodataModal] = useState(false);

  const openDetailModal = (eventId: string) => {
    setSelectedEvent(eventsData[eventId]);
    setShowDetailModal(true);
  };

  const closeDetailModal = () => {
    setShowDetailModal(false);
    setSelectedEvent(null);
  };

  const openBiodataModal = () => {
    setShowDetailModal(false);
    setShowBiodataModal(true);
  };

  const closeBiodataModal = () => {
    setShowBiodataModal(false);
  };

  return (
    <>
      {/* <!-- Navbar --> */}
      <nav className="gradient-bg text-white shadow-lg">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <i className="fas fa-ticket-alt text-2xl"></i>
            <span className="text-xl font-bold">Tiketmu.com</span>
          </div>
        </div>
      </nav>

      {/* <!-- Main Content --> */}
      <div className="container mx-auto px-4 py-8">
        {/* <!-- Hero Section --> */}
        <div className="gradient-bg text-white rounded-xl p-8 mb-8">
          <h1 className="text-4xl font-bold mb-4">Beli Tiketmu Disini!</h1>
          <p className="text-xl mb-6">Tiket Aman, Dompet nyaman!.</p>
          <div className="flex space-x-4"></div>
        </div>

        {/* <!-- Anti-Scalping Features --> */}
        <section id="features" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Benefit pembelian tiket
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Benefit yang akan kamu dapatkan ketika melakukan pembelian
                tiket.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* <!-- Feature 1 --> */}
              <div className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition">
                <div className="text-indigo-500 mb-4">
                  <i className="fas fa-fingerprint text-4xl"></i>
                </div>
                <h3 className="text-xl font-semibold mb-3">NFT Tiket</h3>
                <p className="text-gray-600 mb-4">
                  Setiap tiket adalah NFT yang unik, memastikan keaslian dan
                  mencegah duplikasi atau pemalsuan.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
                    <span>Kepemilikan yang dapat diverifikasi</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
                    <span>Pembatasan Transfer</span>
                  </li>
                </ul>
              </div>

              {/* <!-- Feature 2 --> */}
              <div className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition">
                <div className="text-indigo-500 mb-4">
                  <i className="fas fa-chart-line text-4xl"></i>
                </div>
                <h3 className="text-xl font-semibold mb-3">Harga Dinamis</h3>
                <p className="text-gray-600 mb-4">
                  Kami menyesuaikan harga berdasarkan permintaan.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
                    <span>Penyesuaian Harga yang nyata</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
                    <span>Algoritma berbasis permintaan</span>
                  </li>
                </ul>
              </div>

              {/* <!-- Feature 3 --> */}
              <div className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition">
                <div className="text-indigo-500 mb-4">
                  <i className="fas fa-id-card text-4xl"></i>
                </div>
                <h3 className="text-xl font-semibold mb-3">Bukti Kehadiran</h3>
                <p className="text-gray-600 mb-4">
                  Masukkan daftar hadir untuk mengumpulkan lencana.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
                    <span>Harga Tiket Eksklusif</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
                    <span>Merchandise menarik</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* <!-- Featured Events --> */}
        <h2 className="text-2xl font-bold mb-6">Event Tersedia</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {Object.entries(eventsData).map(([key, event]) => (
            <div
              key={key}
              className="ticket-card bg-white rounded-xl overflow-hidden"
            >
              <div className="relative">
                <img
                  src={event.image}
                  alt="Music festival with colorful stage lights and large crowd"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4 bg-white text-indigo-600 px-2 py-1 rounded-lg text-xs font-medium">
                  {event.discount} Sold
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{event.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{event.date}</p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-500 text-xs">Mulai dari harga</p>
                    <p className="font-bold">{event.prices[0].value}</p>
                  </div>
                  <button
                    className="details-btn bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition"
                    data-event-id="event1"
                    onClick={() => openDetailModal(key)}
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* <!-- Modal Event --> */}
        {showDetailModal && (
          <div
            id="detail-modal"
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="relative">
                <img
                  src="img/event.jpg"
                  alt="Event"
                  className="w-full h-64 object-cover"
                />
                <button
                  id="close-modal-btn"
                  className="absolute top-4 right-4 bg-white text-gray-800 p-2 rounded-full hover:bg-gray-200 transition"
                  onClick={closeDetailModal}
                >
                  x
                </button>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">
                  {selectedEvent?.title}
                </h2>
                <div className="flex items-center text-gray-600 mb-4">
                  <i className="far fa-calendar-alt mr-2"></i>
                  <span id="event-date">{selectedEvent?.date}</span>
                  <i className="far fa-clock ml-4 mr-2"></i>
                  <span id="event-duration">{selectedEvent?.duration}</span>
                </div>
                <div className="flex items-center text-gray-600 mb-6">
                  <i className="fas fa-map-marker-alt mr-2"></i>
                  <span id="event-location">{selectedEvent?.location}</span>
                </div>
                <div className="mb-6">
                  <h3 className="font-bold mb-2">Tentang konser</h3>
                  <p id="event-description" className="text-gray-700">
                    {selectedEvent?.fullDescription}
                  </p>
                </div>
              </div>
              <div className="flex justify-center mt-6">
                <button
                  id="open-biodata-btn"
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
                  onClick={openBiodataModal}
                >
                  Lanjut Isi Biodata
                </button>
              </div>
            </div>
          </div>
        )}

        {showBiodataModal && (
          <div
            id="biodata-modal"
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 hidden z-50"
          >
            <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
              <button
                id="close-biodata-modal"
                className="absolute top-2 right-2 text-red-600 text-xl font-bold"
              >
                ×
              </button>
              <h2 className="text-xl font-bold mb-4">Form Biodata</h2>

              {/* <!-- Form Isi --> */}
              <form id="biodata-form" className="space-y-4">
                <div>
                  <label htmlFor="name" className="block font-semibold">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block font-semibold">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block font-semibold">
                    Nomor Telepon
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                >
                  Kirim
                </button>
              </form>
            </div>
          </div>
        )}

        {/* <!-- Dynamic Pricing Demo --> */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                  Smart Dynamic Pricing
                </h2>
                <p className="text-xl text-gray-600 mb-6">
                  Algoritma penetapan harga berbasis AI kami menyesuaikan biaya
                  tiket berdasarkan permintaan waktu nyata, membuat penjualan
                  eceran tidak layak secara ekonomi sekaligus memastikan akses
                  yang adil.
                </p>
                <div className="bg-gray-50 p-6 rounded-xl mb-6">
                  <h3 className="font-bold text-lg mb-3">Harga saat ini</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center justify-between">
                      <span>Waktu hingga acara</span>
                      <span className="font-medium">3 hari</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Ticket tersisa</span>
                      <span className="font-medium">23%</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Index permintaan</span>
                      <span className="font-medium">Tinggi</span>
                    </li>
                    <li className="flex items-center justify-between border-t pt-3">
                      <span className="font-bold">Harga saat ini</span>
                      <span className="text-2xl font-bold text-indigo-600">
                        IDR 184k
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="md:w-1/2">
                <div className="bg-gray-50 p-6 rounded-xl">
                  <div id="price-chart">
                    <img
                      src="img/event.jpg"
                      alt="Sample price chart"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <!-- POAP Showcase --> */}
        <section className="py-20 bg-indigo-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Koleksi lencana
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Kumpulkan lencana dan dapatkan hadiah menarik.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-12">
              <div className="poap-badge bg-white p-2 rounded-full flex flex-col items-center">
                <img
                  src="img/orkestra.png"
                  alt="Music festival POAP badge with soundwave and guitar design in neon colors"
                  className="w-16 h-16 rounded-full mb-2"
                />
                <span className="text-xs font-medium text-center">
                  Orkestra
                </span>
              </div>
              <div className="poap-badge bg-white p-2 rounded-full flex flex-col items-center">
                <img
                  src="img/Drama Musical.png"
                  alt="Blockchain conference POAP badge with digital blockchain nodes connected"
                  className="w-16 h-16 rounded-full mb-2"
                />
                <span className="text-xs font-medium text-center">
                  Drama musical
                </span>
              </div>
              <div className="poap-badge bg-white p-2 rounded-full flex flex-col items-center">
                <img
                  src="img/music.png"
                  alt="Art exhibition POAP badge with abstract paint splatter in vibrant colors"
                  className="w-16 h-16 rounded-full mb-2"
                />
                <span className="text-xs font-medium text-center">
                  Konser music
                </span>
              </div>
              <div className="poap-badge bg-white p-2 rounded-full flex flex-col items-center">
                <img
                  src="img/programming.png"
                  alt="Charity gala POAP badge with golden heart and ribbon design"
                  className="w-16 h-16 rounded-full mb-2"
                />
                <span className="text-xs font-medium text-center">
                  Programming
                </span>
              </div>
              <div className="poap-badge bg-white p-2 rounded-full flex flex-col items-center">
                <img
                  src="img/pameran lukisan.png"
                  alt="Tech workshop POAP badge with microchip and digital elements"
                  className="w-16 h-16 rounded-full mb-2"
                />
                <span className="text-xs font-medium text-center">
                  Pameran lukisan
                </span>
              </div>
              <div className="poap-badge bg-white p-2 rounded-full flex flex-col items-center">
                <img
                  src="img/pameran tari.png"
                  alt="Science museum VIP tour POAP badge with DNA helix and atoms design"
                  className="w-16 h-16 rounded-full mb-2"
                />
                <span className="text-xs font-medium text-center">
                  Pameran tari
                </span>
              </div>
            </div>

            <div className="text-center">
              <button className="px-8 py-3 gradient-bg text-white font-bold rounded-lg hover:opacity-90 transition">
                Lihat koleksi lencanamu
              </button>
            </div>
          </div>
        </section>

        {/* <!-- KYC Verification --> */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <img
                  src="img/banneratas.png"
                  alt="Illustration of secure identity verification process with shield and fingerprint icons"
                  className="rounded-xl"
                />
              </div>
              <div className="md:w-1/2 md:pl-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                  {" "}
                  Verifikasi keamanan
                </h2>
                <p className="text-xl text-gray-600 mb-6">
                  Sistem KYC kami memastikan pembelian tiket autentik sekaligus
                  melindungi data pribadi Anda..
                </p>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <div className="bg-green-100 p-2 rounded-full mr-4">
                      <i className="fas fa-check text-green-600"></i>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">
                        Verifikasi tiket
                      </h4>
                      <p className="text-gray-600">
                        Verifikasi sekali dan beli tiket dengan aman selamanya
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-100 p-2 rounded-full mr-4">
                      <i className="fas fa-check text-green-600"></i>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">
                        Perlindungan identitas
                      </h4>
                      <p className="text-gray-600">
                        Data Anda dienkripsi dan tidak pernah dibagikan dengan
                        penyelenggara acara
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-100 p-2 rounded-full mr-4">
                      <i className="fas fa-check text-green-600"></i>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">
                        Pencegahan Bot dan pembelian massal
                      </h4>
                      <p className="text-gray-600">
                        Identitas terverifikasi mencegah bot dan pembelian
                        massal
                      </p>
                    </div>
                  </li>
                </ul>

                <button className="px-8 py-3 gradient-bg text-white font-bold rounded-lg hover:opacity-90 transition">
                  Daptkan Verifikasi
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* <!-- Testimonials --> */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Ulasan tentang kami
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Dipercaya oleh penyelenggara acara dan peserta di seluruh dunia
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* <!-- Testimonial 1 --> */}
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <div className="flex items-center mb-4">
                  <img
                    src="img/sarah jhonson.jpg"
                    alt="Portrait of Sarah Johnson, female event organizer in her 30s smiling"
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-bold">Sarah Johnson</h4>
                    <div className="text-sm text-gray-500">Peserta konser</div>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  "Saya sangat merasa senang, karena dengan membeli tiket disini
                  saya bisa mendapatkan benefit yang menarik dan bahkan tidak
                  ada ditempat lain"
                </p>
                <div className="text-amber-400">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
              </div>

              {/* <!-- Testimonial 2 --> */}
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <div className="flex items-center mb-4">
                  <img
                    src="img/michael chen.jpg"
                    alt="Portrait of Michael Chen, young male concert attendee with glasses"
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-bold">Michael Chen</h4>
                    <div className="text-sm text-gray-500">Peserta konser</div>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  "Getting real tickets at fair prices is amazing. The POAP
                  collection shows all the great shows I've been to."
                </p>
                <div className="text-amber-400">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
              </div>

              {/* <!-- Testimonial 3 --> */}
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <div className="flex items-center mb-4">
                  <img
                    src="img/david rodriguez.jpg"
                    alt="Portrait of David Rodriguez, male tech conference speaker in blazer"
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-bold">David Rodriguez</h4>
                    <div className="text-sm text-gray-500">Peserta konser</div>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  "Ini memberikan pengalaman yang berharga untuk saya, jadi saya
                  tidak harus mencari calo lagi untuk membeli tiketnya."
                </p>
                <div className="text-amber-400">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star-half-alt"></i>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <!-- CTA --> */}
        <section className="gradient-bg text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Siap untuk Pemesanan Tiket Acara yang Adil dan Aman?
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Jadikan hidup anda lebih mudah, aman, dan nyaman bersama kami!.
            </p>
          </div>
        </section>

        {/* <!-- Footer --> */}
        <footer className="bg-gray-900 text-gray-400 py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center mb-4">
                  <img
                    src="img/logo.png"
                    alt="NexusTicket logo - abstract hexagonal logo with gradient purple to teal colors"
                    className="h-10 w-10 rounded-full mr-2"
                  />
                  <h3 className="text-xl font-bold text-white">Tiketmu.com</h3>
                </div>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-white">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white">
                    <i className="fab fa-discord"></i>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white">
                    <i className="fab fa-linkedin"></i>
                  </a>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-bold text-white mb-4">WCHL2025</h4>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">Hak cipta © 2025 Tiketmu.com.</div>
              <div className="flex space-x-6">
                <a href="#" className="hover:text-white">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-white">
                  Terms of Service
                </a>
                <a href="#" className="hover:text-white">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
