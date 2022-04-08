const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://shubhamgupta:9nsyRSb8IroSf2ud@cluster0.6rwkw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
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
