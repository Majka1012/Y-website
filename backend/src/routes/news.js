const express = require("express");
const router = express.Router();

// Cache dla newsów
const newsCache = new Map();
const CACHE_DURATION = 10 * 60 * 1000; //10min

router.get("/news", async (req, res) => {
  const { country } = req.query;

  if (!country) {
    return res.status(400).json({ error: "No country" });
  }

  const cacheKey = `news_${country}`;
  const cached = newsCache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    console.log("Returning cached news for", country);
    return res.json(cached.data);
  }

  const url = `https://newsdata.io/api/1/latest?apikey=${process.env.News_API}&country=${country}&size=5`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log("API Response status:", data.status);
    console.log("API credits:", data.credits);

    if (data.status === "success" && data.results && data.results.length > 0) {
      const responseData = { data };

      newsCache.set(cacheKey, {
        data: responseData,
        timestamp: Date.now(),
      });

      res.json(responseData);
    } else {
      console.log("API Error:", data);
      res.status(404).json({
        error: "No news found",
        details: data.message || "Unknown error",
      });
    }
  } catch (error) {
    console.error("News fetch error:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

module.exports = router;
