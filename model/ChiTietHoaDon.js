var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const ChiTietHoaDonSchema = new Schema(
  {
    MaHD: { type: Number, require: true },
    Ngay: { type: String, require: true },
    MaSP: { type: Number, require: true },
    SoLuong: { type: Number, require: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ChiTietHoaDon", ChiTietHoaDonSchema);
