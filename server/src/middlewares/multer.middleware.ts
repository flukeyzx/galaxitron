import multer from "multer";

export const fileUpload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (_, file, cb) => {
    const allowedMimeTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-word",
    ];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      return cb(new Error("Invalid file type"));
    }
    cb(null, true);
  },
  limits: {
    fileSize: 1024 * 1024 * 100,
  },
});
