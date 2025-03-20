const express = require("express");
const axios = require("axios");

const app = express();
const API_KEY = "029dc254541d66ff207bd94192077f9a";
const BASE_URL = "https://api.themoviedb.org";

app.use(express.json());

app.all("*", async (req, res) => {
    try {
        let tmdbUrl = `${BASE_URL}${req.path}`;
        let params = req.query;

        // Tambahkan API Key jika belum ada
        if (!params.api_key) {
            params.api_key = API_KEY;
        }

        // Fetch data menggunakan Axios (setara cURL di PHP)
        const response = await axios.get(tmdbUrl, { params });

        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({
            error: "Gagal mengambil data dari TMDB",
            details: error.message
        });
    }
});

module.exports = app;
