const express = require("express");
const axios = require("axios");

const app = express();
const API_KEY = "029dc254541d66ff207bd94192077f9a";
const BASE_URL = "https://api.themoviedb.org"; // Gunakan URL yang benar

app.use(express.json());

app.all("*", async (req, res) => {
    try {
        let tmdbUrl = `${BASE_URL}${req.path}`;
        let params = { ...req.query }; // Ambil semua parameter query

        // Pastikan API Key tetap ada
        params.api_key = API_KEY;

        // 🛠 DEBUG: Log URL dan Query untuk cek apakah `page` ikut terkirim
        console.log("Request ke TMDB:", tmdbUrl);
        console.log("Query Params:", params);

        // Fetch data dari TMDB dengan parameter yang benar
        const response = await axios.get(tmdbUrl, { params });

        // Set header agar tidak disimpan cache di browser
        res.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");

        res.status(response.status).json(response.data);
    } catch (error) {
        console.error("Error:", error.message);
        res.status(error.response?.status || 500).json({
            error: "Gagal mengambil data dari TMDB",
            details: error.message
        });
    }
});

module.exports = app;
