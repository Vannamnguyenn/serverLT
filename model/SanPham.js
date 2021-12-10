var mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  autoIncrement = require("mongoose-auto-increment");

const SanPhamSchema = new Schema(
  {
    TenSP: { type: String, require: true },
    DonGia: { type: Number, require: true },
    SoLuong: { type: Number, require: true },
    MaTL: { type: Number, require: true },
  },
  {
    timestamps: true,
  }
);

autoIncrement.initialize(mongoose.connection);
SanPhamSchema.plugin(autoIncrement.plugin, {
  model: "SanPham",
  field: "MaSp",
  startAt: 1000,
});

module.exports = mongoose.model("SanPham", SanPhamSchema);
