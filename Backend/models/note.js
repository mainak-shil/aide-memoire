const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const noteSchema = new Schema({
  // _id: { type: ObjectId },
  title: { type: String },
  text: { type: String, required: true },
  user: { type: String, required: true },
});

module.exports = mongoose.model("Note", noteSchema);
