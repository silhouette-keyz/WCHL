const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const port = 3000; // Port dari backend

// ----- //
app.use(express.json()); // Untuk mengurai badan permintaan JSON
app.use(cors({
    origin: 'http://127.0.0.1:5500' // <<< pengizinan permintaan dari frontend Live Server Anda
}));

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // menggunakan TLS (bukan SSL)
    auth: {
        user: 'faji635@gmail.com',
        pass: 'snqpkrecwpgfepxi',
    },
});

// --- API Endpoint ---
app.post('/submit-biodata', async (req, res) => {
    console.log('Received biodata submission:', req.body); // Log incoming data
    const { name, email, phone, event } = req.body;

    // Validasi
    if (!name || !email || !phone || !event) {
        console.error('Validation error: Missing required fields.');
        return res.status(400).json({ message: 'Mohon lengkapi semua data.' });
    }

    const mailOptions = {
        from: 'faji635@gmail.com', // pengirim gmail
        to: email,
        subject: 'Konfirmasi Pendaftaran Tiket Anda',
        html: `
            <h2>Terima kasih atas pendaftaran Anda, ${name}!</h2>
            <p>Berikut detail yang kami terima:</p>
            <ul>
                <li><strong>Nama:</strong> ${name}</li>
                <li><strong>Email:</strong> ${email}</li>
                <li><strong>Nomor HP:</strong> ${phone}</li>
                <li><strong>Event:</strong> ${event}</li>
            </ul>
            <p>Tiket Anda akan segera diproses. Harap periksa email Anda secara berkala untuk pembaruan.</p>
            <p>Hormat kami,<br>Tiketmu.com</p>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Email konfirmasi berhasil dikirim ke: ${email}`);
        res.status(200).json({ message: 'Biodata berhasil disimpan dan email konfirmasi telah dikirim.' });
    } catch (error) {
        console.error('Error saat mengirim email:', error); // Log specific email error
        res.status(500).json({ message: 'Terjadi kesalahan saat mengirim email.' });
    }
});

// --- memulai server ---
app.listen(port, () => {
    console.log(`Server Node.js berjalan di http://localhost:${port}`);
});