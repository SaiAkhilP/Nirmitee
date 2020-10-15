const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const meetSchema = new Schema(
  {
    meeting_id: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
      min: "2017-08-28",
      default: Date.now,
    },
    organiser: {
      type: String,
      required: true,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = mongoose.model("Meet", meetSchema);
