const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const Schema = mongoose.Schema;

//organiser, timestamp, attendies[]

const meetSchema = new Schema({
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
});

meetSchema.plugin(timestamps);

module.exports = mongoose.model("Meet", meetSchema);
