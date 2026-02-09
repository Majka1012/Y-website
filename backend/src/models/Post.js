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

    address: String,
    likes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Post", PostSchema);
