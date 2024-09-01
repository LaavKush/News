const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();

app.get('/', (req, res) => {
    res.sendFile("news.html", { root: path.join(__dirname) });
});

app.get('/api', async (req, res) => {
    try {
        // Extract query parameters
        const queryParams = req.query;
        
        // Construct URL with query parameters
        const url = `https://newsapi.org/v2/everything?${new URLSearchParams(queryParams)}`;
        
        // Make request to the external API
        const response = await axios.get(url);
        
        // Send the response data to the client
        res.json(response.data);
    } catch (error) {
        // Handle errors
        console.error('Error fetching news:', error);
        res.status(500).json({ error: 'Failed to fetch news' });
    }
});

const PORT = process.env.PORT || 7000;
app.listen(PORT, function(err) {
    if (err) console.log("Error in server setup:", err)
    console.log("Server is running on port", PORT)
});
