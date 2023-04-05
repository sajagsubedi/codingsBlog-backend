const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  blogId: {
    type: Schema.Types.ObjectId,
    ref: "blogId",
  },
  username: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: "userId",
  },
  description:{ 
    type:String,
  required:true
  },
  date: {
    type: Date,
    default:Date.now,
  },
});
module.exports = mongoose.model("comment", CommentSchema);
