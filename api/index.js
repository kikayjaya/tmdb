const express = require("express");
const axios = require("axios");

const app = express();
const API_KEY = "029dc254541d66ff207bd94192077f9a";
const BASE_URL = "https://api.themoviedb.org"; // Pastikan menggunakan "/3"

app.use(express.json());

app.all("*", async (req, res) => {
    try {
        let tmdbUrl = `${BASE_URL}${req.path}`;
        let params = { ...req.query }; // Salin semua parameter dari query

        // Tambahkan API Key jika belum ada
        if (!params.api_key) {
            params.api_key = API_KEY;
        }

        // 🛠 DEBUG: Log request ke TMDB
        console.log("Fetching TMDB:", tmdbUrl, params);

        // Fetch data dari TMDB
        const response = await axios.get(tmdbUrl, { params });

        res.status(response.status).json(response.data);
    } catch (error) {
        console.error("Error fetching TMDB:", error.message);

        res.status(error.response?.status || 500).json({
            error: "Gagal mengambil data dari TMDB",
            details: error.message
        });
    }
});

module.exports = app;
