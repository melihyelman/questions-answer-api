const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDb Connection successful");
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = connectDatabase;
