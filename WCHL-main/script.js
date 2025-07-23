// Gunakan provider asli dari MetaMask
const ethereum = window.ethereum;
let selectedTicket = { type: '', value: '', event: '' };
let selectedPaymentMethod = "";

const eventsData = {
  event1: {
    title: "Ruang Bermusik 2025",
    date: "19-20 Juli 2025",
    duration: "2 hari",
    location: "Tasikmalaya",
    image: "img/event.jpg",
    description: "Ruang Bermusik 2025 di Tasikmalaya dengan Perunggu, Lomba Sihir, dll.",
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
    description: "Pertunjukan ini menghidupkan kembali film La La Land karya Damien Chazelle...",
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
    description: "RI-Fest adalah festival musik dan budaya...",
    prices: [
      { type: "Promo Blind Ticket (3 Day Pass)", value: "IDR 80.000" },
      { type: "Tiket Masuk Duluan (Sebelum 16.00 WIB)", value: "IDR 90.000" },
      { type: "Tiket Early Bird (3 Day Pass)", value: "IDR 150.000" },
      { type: "Tiket VIP (3 Day Pass)", value: "IDR 450.000" },
      { type: "Tiket VIP Lounge Upper Deck (3 Day Pass)", value: "IDR 1.350.000" }
    ]
  }
};

 document.addEventListener("DOMContentLoaded", function () {
    const detailButtons = document.querySelectorAll(".details-btn");
    const eventModal = document.getElementById("event-modal");
    const closeModalBtn = document.getElementById("close-modal-btn");

    let selectedEvent = {}; // Keep this

    detailButtons.forEach((btn) => {
        btn.addEventListener("click", function () {
            const eventId = btn.dataset.eventId; // Get eventId from data-event-id attribute
            selectedEvent = eventsData[eventId]; // <<< Correctly populate selectedEvent from eventsData
            
            if (selectedEvent) { // Check if the event data was found
                selectedEvent.id = eventId; // Add the ID to the object
                // You might want to update modal content here, e.g.:
                // document.getElementById('modal-event-title').textContent = selectedEvent.title;
                eventModal.classList.remove("hidden");
            } else {
                console.error("Event data not found for ID:", eventId);
                alert("Error: Detail event tidak ditemukan. Mohon coba lagi.");
            }
        });
    });

    closeModalBtn.addEventListener("click", () => eventModal.classList.add("hidden"));

    document.getElementById("biodata-form").addEventListener("submit", async function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const termsChecked = document.getElementById("terms-check").checked;

        if (!termsChecked) {
            alert("Harap menyetujui syarat & ketentuan terlebih dahulu.");
            return;
        }

        if (name && email && phone) {
            const biodata = {
                name,
                email,
                phone,
                event: selectedEvent.title, // Send only the title for the email as planned
            };

            try {
                // <<< Use the FULL URL of your Node.js backend
                const response = await fetch('http://localhost:3000/submit-biodata', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(biodata),
                });

                const result = await response.json();

                if (response.ok) {
                    alert(`Data berhasil disimpan dan email konfirmasi telah dikirim!\nNama: ${name}\nEmail: ${email}\nHP: ${phone}\nEvent: ${selectedEvent.title}`);
                    localStorage.setItem("ticketBiodata", JSON.stringify(biodata));
                    eventModal.classList.add("hidden");
                } else {
                    alert(`Terjadi kesalahan saat menyimpan data atau mengirim email: ${result.message}`);
                }
            } catch (error) {
                console.error('Error submitting biodata (frontend fetch error):', error); // Added more specific message
                alert("Terjadi kesalahan jaringan atau server. Mohon coba lagi.");
            }
        } else {
            alert("Mohon isi semua data.");
        }
    });
});
// Simple dynamic pricing simulation
        document.addEventListener('DOMContentLoaded', function() {
            // Simulate price changes for demonstration
            setInterval(function() {
                const priceElements = document.querySelectorAll('.dynamic-price');
                priceElements.forEach(el => {
                    const basePrice = parseInt(el.getAttribute('data-base'));
                    const variation = Math.floor(Math.random() * 20) - 10; // +/- $10 variation
                    const newPrice = Math.max(basePrice - 20, basePrice + variation); // Don't go below base - $20
                    el.textContent = '$' + newPrice;
                });
            }, 5000);
            
            // Simple chart initialization placeholder
            if (document.getElementById('price-chart')) {
                // In a real implementation, this would use a charting library like Chart.js
                // For this demo, we'll just show a placeholder image
                document.getElementById('price-chart').innerHTML = `
                    <img src="img/event.jpg" alt="Sample price chart showing dynamic pricing trends over time for event tickets" style="width: 100%; height: 100%; object-fit: cover;">
                `;
            }
            
            // Demo KYC verification flow
            const verifyButtons = document.querySelectorAll('button:contains("Get Verified")');
            verifyButtons.forEach(button => {
                button.addEventListener('click', function() {
                    alert('In a live implementation, this would launch our secure KYC verification flow with identity document upload and biometric verification.');
                });
            });
            
            // Event filtering - placeholder functionality
            const eventFilterButtons = document.querySelectorAll('#events button:not(.dynamic-price)');
            eventFilterButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // Remove active class from all buttons
                    eventFilterButtons.forEach(btn => btn.classList.remove('bg-indigo-600', 'text-white'));
                    // Add active class to clicked button
                    this.classList.add('bg-indigo-600', 'text-white');
                    // In a real implementation, this would filter the events
                });
            });
        });