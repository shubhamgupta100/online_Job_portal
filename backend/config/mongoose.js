const mongoose = require("mongoose");

mongoose
  .connect(
    process.env.MONGODB_URI,
    { useNewUrlParser: true },
    { useUnifiedTopology: true },
    { useCreateIndex: true }
  )
  .then((data) => {
    console.log(`Mongodb is connected with server:${data.connection.host}`);
  })
  .catch((err) => {
    console.log(err);
  });
