const mongoose = require("mongoose");
mongoose
  .connect("mongodb+srv://XXX:FksMCyYcYMgkUkK9@project.66wonva.mongodb.net/imdb?retryWrites=true&w=majority")
  .then((data) => {
    console.log("connected");
  })
  .catch((err) => {
    console.log("error");
  });

