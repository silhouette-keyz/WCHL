// ======== Global Variables ========
const ethereum = window.ethereum;
let selectedTicket = { type: '', value: '', event: '' };
let selectedPaymentMethod = "";

// ======== Event Data ========
const eventsData = {
  event1: {
    title: "Ruang Bermusik 2025",
    date: "19-20 Juli 2025",
    duration: "2 hari",
    location: "Tasikmalaya",
    image: "img/event.jpg",
    description: " Gala konser Ruang Bermusik 2025 akan diselenggarakan akhir pekan ini Sabtu, 19 Juli hingga Minggu, 20 Juli 2025. Festival musik ini digelar di arena Lanud Wiriadinata, Tasikmalaya, Jawa Barat. Sederet musisi populer dari berbagai aliran kekinian siap mengisi line upRuang Bermusik tahun ini, seperti, Maliq & D'Essentials, Adnan Veron x HBRP hingga Perunggu. Tidak hanya perhelatan musik, Ruang Bermusik 2025 turut menghadirkan pelaku industri kreatif juga hiburan dari kesenian lokal. Selain itu berbagai sajian kuliner, banyak pilihan makanan dan minuman mulai dari kuliner tradisional hingga modern khas Tasikmalaya yang menggiurkan.",
    prices: [
      { type: "Early Bid Special - 2 Day Pass", value: "IDR 100.000" },
      { type: "Normal - 2 Day Pass (19-20 Juli 2025)", value: "IDR 200.000" },
      { type: "Presale 1 - 2 Day Pass (19-20 Juli 2025)", value: "IDR 150.000" }
    ]
  },
  event2: {
    title: "La La Land in the concert",
    date: "26 Juli 2025",
    duration: "1 hari",
    location: "JIExpo Kemayoran.",
    image: "img/event1.jpg",
    description: "La La Land in Corcert di Jakarta akan diselenggarakan pada 26 Juli 2025 di Jakarta International Expo atau JIExpo, Kemayoran. Sebelum akhirnya tiba di Jakarta,  La La Land in Concert akan menyapa penggemarnya di Boston 7 Juni 2025. ",
    prices: [
      { type: "SEBASTIAN SEAT", value: "IDR 900.000" },
      { type: "BILL SEAT", value: "IDR 1.200.000" },
      { type: "GREG SEAT", value: "IDR 1.450.000" },
      { type: "LAURA SEAT", value: "IDR 1.700.000" },
      { type: "KEITH SEAT", value: "IDR 1.950.000" },
      { type: "MIA SEAT", value: "IDR 2.150.000" }
    ]
  },
  event3: {
    title: "RI-FEST 2025",
    date: "15-17 Agustus 2025",
    duration: "3 hari",
    location: "Parkir Barat Jiexpo Kemayoran",
    image: "img/event3.jpg",
    description: "Menyambut Hari Kemerdekaan Indonesia ke-80, Ruang Indonesia Festival Vol. 4 kembali hadir pada tanggal 15,16 & 17 Agustus 2025 dalam rangkaian kegiatan seperti festival musik, lomba 17-an, kuliner nusantara, dan masih banyak lagi kegiatan seru lainnya.",
    prices: [
      { type: "Promo Blind Ticket (3 Day Pass)", value: "IDR 80.000" },
      { type: "Tiket Masuk Duluan (Sebelum 16.00 WIB)", value: "IDR 90.000" },
      { type: "Tiket Early Bird (3 Day Pass)", value: "IDR 150.000" },
      { type: "Tiket VIP (3 Day Pass)", value: "IDR 450.000" },
      { type: "Tiket VIP Lounge Upper Deck (3 Day Pass)", value: "IDR 1.350.000" }
    ]
  }
};

// ======== DOM Ready ========
document.addEventListener('DOMContentLoaded', () => {
  const detailModal = document.getElementById('detail-modal');
  const closeDetail = document.getElementById('close-modal-btn');
  const biodataModal = document.getElementById('biodata-modal');
  const openBiodataBtn = document.getElementById('open-biodata-btn');
  const closeBiodata = document.getElementById('close-biodata-modal');

  document.querySelectorAll('.details-btn').forEach(button => {
    button.addEventListener('click', () => {
      const eventId = button.dataset.eventId;
      const event = eventsData[eventId];
      selectedTicket.event = event.title;

      document.querySelector('#detail-modal img').src = event.image;
      document.querySelector('#detail-modal h2').textContent = event.title;
      document.getElementById('event-date').textContent = event.date;
      document.getElementById('event-duration').textContent = event.duration;
      document.getElementById('event-location').textContent = event.location;
      document.getElementById('event-description').textContent = event.description;

      detailModal.classList.remove('hidden');
    });
  });

  closeDetail.addEventListener('click', () => {
    detailModal.classList.add('hidden');
  });

  openBiodataBtn.addEventListener('click', () => {
    detailModal.classList.add('hidden');
    biodataModal.classList.remove('hidden');
  });

  closeBiodata.addEventListener('click', () => {
    biodataModal.classList.add('hidden');
  });

  document.getElementById('biodata-form').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Form berhasil dikirim!');
    biodataModal.classList.add('hidden');
  });

  // Dynamic pricing simulation (dummy)
  setInterval(() => {
    document.querySelectorAll('.dynamic-price').forEach(el => {
      const basePrice = parseInt(el.getAttribute('data-base'));
      const variation = Math.floor(Math.random() * 20) - 10;
      const newPrice = Math.max(basePrice - 20, basePrice + variation);
      el.textContent = '$' + newPrice;
    });
  }, 5000);

  // Price chart placeholder
  const chartContainer = document.getElementById('price-chart');
  if (chartContainer) {
    chartContainer.innerHTML = `
      <img src="img/event.jpg" alt="Sample price chart" style="width: 100%; height: 100%; object-fit: cover;">
    `;
  }

  // KYC placeholder
  document.querySelectorAll('button').forEach(button => {
    if (button.textContent.includes("Get Verified")) {
      button.addEventListener('click', () => {
        alert('Ini hanya simulasi. KYC akan mengarah ke proses verifikasi identitas.');
      });
    }
  });

  // Event filter button style
  const eventFilterButtons = document.querySelectorAll('#events button:not(.dynamic-price)');
  eventFilterButtons.forEach(button => {
    button.addEventListener('click', function () {
      eventFilterButtons.forEach(btn => btn.classList.remove('bg-indigo-600', 'text-white'));
      this.classList.add('bg-indigo-600', 'text-white');
      // Logic penyaringan event bisa ditambahkan di sini
    });
  });
});
