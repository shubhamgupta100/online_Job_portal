const express = require("express");
const multer = require("multer");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const { promisify } = require("util");
// const cloudinary = require("cloudinary");

const pipeline = promisify(require("stream").pipeline);
// npm i multer@2.0.0-rc.1
const router = express.Router();
const upload = multer();
// const upload = multer().single("file");
router.post("/resume", upload.single("file"), (req, res, next) => {
  const { file } = req;
  if (file.detectedFileExtension != ".pdf") {
    res.status(400).json({
      message: "Invalid format",
    });
  } else {
    const filename = `${uuidv4()}${file.detectedFileExtension}`;

    pipeline(
      file.stream,
      fs.createWriteStream(`${__dirname}/../public/resume/${filename}`)
    )
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
  }
});

router.post("/profile", upload.single("file"), (req, res, next) => {
  // upload(req, res, (err) => {
  //   if (err) {
  //     // An error occurred when uploading
  //     return res.status(400).json({
  //       msg: err,
  //     });
  //   }
  //   return res.json({
  //     msg: "Sucess",
  //   });
  // });
  // console.log("file name", req.file);
  const { file } = req;
  // console.log("fileName", file);
  // if (
  //   file.detectedFileExtension != ".jpg" &&
  //   file.detectedFileExtension != ".png" &&
  //   file.detectedFileExtension != ".jpeg"
  // ) {
  //   res.status(400).json({
  //     message: "Invalid format",
  //     extension: file.detectedFileExtension,
  //   });
  // }

  // else {
  // const filename = `${uuidv4()}${file.detectedFileExtension}`;
  const filename = file.originalname;
  pipeline(
    file.stream,
    fs.createWriteStream(`${__dirname}/../public/profile/${filename}`)
  )
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
