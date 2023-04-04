const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ThemeSchema = new Schema({
  lightMode: Object,
  darkMode:Object
});
module.exports = mongoose.model("Theme", ThemeSchema);
