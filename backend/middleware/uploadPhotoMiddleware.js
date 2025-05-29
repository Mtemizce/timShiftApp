// ✅ middleware/uploadPhotoMiddleware.js
import multer from "multer";
import fs from "fs";
import path from "path";

// Hedef klasör
const BASE_DIR = path.resolve("./frontend/assets/personnelPhotos");

// Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const { tc_no } = req.body;
    if (!tc_no) return cb(new Error("TC No zorunlu"), null);

    const targetDir = path.join(BASE_DIR, tc_no);
    if (!fs.existsSync(BASE_DIR)) fs.mkdirSync(BASE_DIR);
    if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir);

    cb(null, targetDir);
  },
  filename: function (req, file, cb) {
    const { tc_no, registry } = req.body;
    const random = Math.floor(10000 + Math.random() * 90000);
    const ext = path.extname(file.originalname);
    const fileName = `${tc_no}_${registry}_${random}${ext}`;
    req.savedImageName = fileName; // İleride DB'ye kaydetmek istersen
    cb(null, fileName);
  },
});

export const uploadPersonnelPhoto = multer({ storage }).single("image_file");
