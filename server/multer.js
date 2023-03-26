import multer from "multer";

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // console.log(process.cwd());
    cb(null, `${process.cwd()}/uploads`);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filename = file.fieldname.split(".")[0];
    cb(null, filename + "-" + uniqueSuffix + ".png");
  },
});
export const upload = multer({ storage });
