const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://princeyadav0136:moqwl6xJlcXqCbRu@namastenode.rksjx.mongodb.net/devTinder"
  );
};

module.exports = connectDB
