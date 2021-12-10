var mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  autoIncrement = require("mongoose-auto-increment");

const HoaDonSchema = new Schema({
  MaSP: { type: Number, require: true },
  TenSP: { type: String, require: true },
  createdAt: String,
});

autoIncrement.initialize(mongoose.connection);

HoaDonSchema.plugin(autoIncrement.plugin, {
  model: "HoaDon",
  field: "MaHD",
  startAt: 1000,
});
module.exports = mongoose.model("HoaDon", HoaDonSchema);
