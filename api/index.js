const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

// Konfigurasi API TMDB
const API_KEY = "029dc254541d66ff207bd94192077f9a"; // Ganti dengan API Key TMDB
const BASE_URL = "https://api.themoviedb.org"; // Base URL TMDB

app.use(express.json());

// Proxy TMDB API
app.get("*", async (req, res) => {
    try {
        // Ambil path dari request
        const path = req.path;
        const query = new URLSearchParams(req.query);

        // Tambahkan API Key jika belum ada
        if (!query.has("api_key")) {
            query.append("api_key", API_KEY);
        }

        // Buat URL TMDB
        const tmdbUrl = `${BASE_URL}${path}?${query.toString()}`;
        console.log(`Fetching: ${tmdbUrl}`);

        // Ambil data dari TMDB
        const response = await axios.get(tmdbUrl);
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({
            error: "Gagal mengambil data dari TMDB",
            details: error.message
        });
    }
});

module.exports = app;
