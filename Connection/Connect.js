const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGODB_URL)
  .then((data) => {
    console.log("connected");
  })
  .catch((err) => {
    console.log("error");
  });
