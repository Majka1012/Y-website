const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },

    user: {
      username: String,
      handle: String,
      avatarUrl: String,
    },

    location: {
      lat: Number,
      lng: Number,
      city: String,
      country: String,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Post", PostSchema);
