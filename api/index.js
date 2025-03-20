const express = require("express");
const axios = require("axios");

const app = express();
const API_KEY = "029dc254541d66ff207bd94192077f9a";
const BASE_URL = "https://api.themoviedb.org/3";

app.use(express.json());

app.get("*", async (req, res) => {
    try {
        const path = req.path;
        const query = new URLSearchParams(req.query);

        // Pastikan API Key tetap ada di query
        if (!query.has("api_key")) {
            query.append("api_key", API_KEY);
        }

        // Buat URL lengkap ke TMDB
        const tmdbUrl = `${BASE_URL}${path}?${query.toString()}`;
        console.log(`Fetching: ${tmdbUrl}`);

        // Fetch data dari TMDB
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
