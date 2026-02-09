const express = require("express");

const router = express.Router();

router.get("/geocode", async (req, res) => {
  const { lat, lng } = req.query;

  if (!lat || !lng) {
    return res.status(400).json({ error: "No coordinates" });
  }

  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.GOOGLE_MAPS_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === "OK" && data.results.length > 0) {
      res.json({
        address: data.results[10].formatted_address, //result[10] is correct formating for City Country
        lat: parseFloat(lat),
        lng: parseFloat(lng),
      });
    } else {
      res.status(404).json({ error: "Address not found" });
    }
  } catch (error) {
    console.error("Geocoding error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
