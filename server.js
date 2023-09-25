// create  Node.js server application
const express = require("express");
// MongoDB connection via mongoose
const mongoose = require("mongoose");
const dotenv = require("dotenv")
dotenv.config()


const app = express();


class Database {
  constructor() {
    this._connect();
  }
  _connect() {
    mongoose
      //.connect(`mongodb://${server}/${database}`)
      .connect(process.env.CONNECTION_STRING)
      .then(() => {
        console.log('Database connection successful');
      })
      .catch((err) => {
        console.error('Database connection failed');
      });
  }
}

module.exports = new Database();

// define the schema database of mongoose
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});




app.use(express.json());
app.listen(4500, () => {
  console.log("The server is active on port 3000");
});
