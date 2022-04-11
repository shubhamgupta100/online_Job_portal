const express = require("express");
const bodyParser = require("body-parser");
const passportConfig = require("./lib/passportConfig");
const cors = require("cors");
// const cloudinary = require("cloudinary");
// const fileUpload = require("express-fileupload");
const fs = require("fs");
const path = require("path");
const db = require("./config/mongoose");
const app = express();
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });
const port = process.env.PORT || 4444;
// initialising directories
if (!fs.existsSync("./public")) {
  fs.mkdirSync("./public");
}
// const x = require('../backend/public/resume')
if (!fs.existsSync("./public/resume")) {
  fs.mkdirSync("./public/resume");
}
if (!fs.existsSync("./public/profile")) {
  fs.mkdirSync("./public/profile");
}

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Setting up middlewares
app.use(cors());
app.use(express.json());
// app.use(fileUpload());
app.use(passportConfig.initialize());

// Routing
app.use("/auth", require("./routes/authRoutes"));
app.use("/api", require("./routes/apiRoutes"));
app.use("/upload", require("./routes/uploadRoutes"));
app.use("/host", require("./routes/downloadRoutes"));

app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
