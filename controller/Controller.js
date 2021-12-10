const SanPham = require("../model/SanPham");
const ChiTietHoaDon = require("../model/ChiTietHoaDon");
const HoaDon = require("../model/HoaDon");
const TheLoai = require("../model/TheLoai");
const moment = require("moment-timezone");

class Controller {
  async createProduct(req, res) {
    const sanpham = new SanPham(req.body);
    await sanpham.save();
    res.json(sanpham);
  }

  async createHoaDon(req, res) {
    const { MaSP, SoLuong } = req.body;
    const sampham = await SanPham.findOne({ MaSp: MaSP });
    sampham.SoLuong = sampham.SoLuong - Number(SoLuong);
    await sampham.save();
    const hoaDon = new HoaDon({
      MaSP,
      TenSP: sampham.TenSP,
      createdAt: new Date().toISOString(),
    });
    await hoaDon.save();
    const chiTiet = new ChiTietHoaDon({
      MaHD: hoaDon.MaHD,
      Ngay: hoaDon.createdAt,
      MaSP,
      SoLuong,
    });
    await chiTiet.save();
    res.json({ ...hoaDon._doc, details: [chiTiet] });
  }

  async getData(req, res) {
    const theLoais = await TheLoai.find();
    const sanPhams = await SanPham.find();
    const hoadons = await HoaDon.aggregate([
      {
        $lookup: {
          from: "chitiethoadons",
          localField: "MaHD",
          foreignField: "MaHD",
          as: "details",
        },
      },
    ]);
    return res.json({ theLoais, sanPhams, hoadons });
  }
  async getSellestProduct(req, res) {
    const today = moment().format("YYYY-MM-DD");
    const sanPhamBanNhieuNhat = await ChiTietHoaDon.aggregate([
      {
        $group: {
          _id: "$MaSP",
          MaSP: { $first: "$MaSP" },
          count: {
            $sum: "$SoLuong",
          },
        },
      },

      {
        $match: {
          $expr: {
            createdAt: new RegExp(today, "i"),
          },
        },
      },

      { $sort: { count: -1 } },
      { $project: { _id: 0 } },
    ]);
    const sanpham = await SanPham.findOne({
      MaSp: sanPhamBanNhieuNhat[0].MaSP,
    });
    console.log(sanPhamBanNhieuNhat[0].MaSP);
    return res.json({ sanpham, sanPhamBanNhieuNhat });
  }
}

module.exports = new Controller();
