var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const TheLoaiSchema = new Schema(
  {
    MaTL: Number,
    TenTL: { type: String, require: true },
  },
  {
    collection: "TheLoai",
  }
);

module.exports = mongoose.model("TheLoai", TheLoaiSchema);
