import path from "path";
import multer from "multer";
import { Router } from "express";

const router = Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function fileFilter(req, file, cb) {
  const fileTypes = /jpg|jpeg|png/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    return cb(new Error("Please upload Images Only!"));
  }
}

const upload = multer({ storage, fileFilter });

router.post("/", upload.single("image"), (req, res, next) => {
  res.json({
    message: "Image uploaded successfully",
    image: `/${req.file.path}`,
  });
});

export default router;
