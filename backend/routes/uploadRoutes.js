const express = require("express");
const multer = require("multer");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const { promisify } = require("util");
const streamifier = require("streamifier");
const pipeline = promisify(require("stream").pipeline);
const router = express.Router();
const upload = multer();
router.post("/resume", upload.single("file"), (req, res, next) => {
  const { file } = req;
  let stream = streamifier.createReadStream(file.buffer);
  let extension = file.originalname.split(".").pop();
  const filename = `${uuidv4()}.${extension}`;
  pipeline(stream, fs.createWriteStream(`../public/resume/${filename}`))
    .then(() => {
      res.send({
        message: "File uploaded successfully",
        url: `/host/resume/${filename}`,
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: "Error while uploading",
      });
    });
  // }
});

router.post("/profile", upload.single("file"), (req, res, next) => {
  const { file } = req;
  let stream = streamifier.createReadStream(file.buffer);
  let extension = file.originalname.split(".").pop();
  const filename = `${uuidv4()}.${extension}`;
  pipeline(stream, fs.createWriteStream(`../public/profile/${filename}`))
    .then(() => {
      res.send({
        message: "Profile image uploaded successfully",
        url: `/host/profile/${filename}`,
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: "Error while uploading",
        err,
      });
    });
  // }
});

module.exports = router;
