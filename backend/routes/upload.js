const multer = require("multer");
const express = require("express");
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const streamifier = require("streamifier");
const upload = multer();
const router = express.Router();
router.post("/upload", upload.single("file"), async function (req, res, next) {
  const { file } = req;
  //   let extension = file.originalname.split(".").pop();
  const fileName = `${file.originalname}`;
  let stream = streamifier.createReadStream(file.buffer);
  console.log(stream);
  await pipeline(
    stream,
    fs.createWriteStream(`${__dirname}/../public/profile/${fileName}`)
  );
  return res.status(200).json({
    msg: `File uploaded as `,
    stream,
  });
  // res.send("File uploaded as " + fileName);
});

module.exports = router;
