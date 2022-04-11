const express = require("express");
const multer = require("multer");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const { promisify } = require("util");
const streamifier = require("streamifier");
const pipeline = promisify(require("stream").pipeline);
// npm i multer@2.0.0-rc.1
const router = express.Router();
const upload = multer();
router.post("/resume", upload.single("file"), (req, res, next) => {
  const { file } = req;
  let stream = streamifier.createReadStream(file.buffer);
  let extension = file.originalname.split(".").pop();
  const filename = `${uuidv4()}.${extension}`;
  // if (file.detectedFileExtension != ".pdf") {
  //   res.status(400).json({
  //     message: "Invalid format",
  //   });
  // } else {
  // const filename = `${uuidv4()}${file.detectedFileExtension}`;

  pipeline(stream, fs.createWriteStream(`/../public/resume/${filename}`))
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
  let extension = file.originalname.split(".").pop();
  const filename = `${uuidv4()}.${extension}`;
  pipeline(
    stream,
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

// const path = require("path");
// const storageEngine = multer.diskStorage({
//   destination: "public",
//   filename: function (req, file, callback) {
//     callback(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });
// initialize multer
// const upload = multer({
//   storage: storageEngine,
// });

// router.post('/profile' ,upload.single("file"), (req,res)=>{

//   var imageName = req.file.filename;
//   var blogDetail = new Blog({
//     title: req.body.title,
//     content: req.body.content,
//     imageName: imageName,
//   });
//   blogDetail.save(function (err, doc) {
//     if (err) throw err;
//     return res.status(200).json({
//       sucess: 1,
//       message: "Product is created",
//       blog: doc,
//     });
//   });

// })

module.exports = router;
