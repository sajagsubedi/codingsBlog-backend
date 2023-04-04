const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const BlogsSchema = new Schema({
  Title: {
    type: String,
    required: true
  },
  SubTitle: String,
  Description: {
    type: String,
    required: true,
  },
  imgUrl: String,
  publishedAt: {
    type: Date,
    default: Date.now
    },
    category: {
      type: String,
    default: "general",
    }
  });

  module.exports = mongoose. model('Blog', BlogsSchema);