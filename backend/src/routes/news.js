const express = require("express");

const router = express.Router();

router.get("/news", async (req, res) => {
  const { country } = req.query;
  console.log(process.env.News_API);

  if (!country) {
    return res.status(400).json({ error: "No country" });
  }

  const url = `https://newsdata.io/api/1/latest?apikey=${process.env.News_API}&country=${country}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.status === "success" && data.results.length > 0) {
      res.json({
        data,
      });
    } else {
      res.status(404).json({ error: "Address not found" });
    }
  } catch (error) {
    console.error("news error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
