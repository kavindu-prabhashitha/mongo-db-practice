// create  Node.js server application
const express = require("express");
// MongoDB connection via mongoose
const mongoose = require("mongoose");
const dotenv = require("dotenv")
dotenv.config()


const app = express();
app.use(express.json())

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

// Using schema to build Mongoose models
const User = mongoose.model('User', userSchema);
const newUser = new User({
  name: 'Elena John',
  email: 'elena.john@example.com',
  age: 22,
});

newUser.save()
.then(() => {
  console.log('Save User at MongoDB');
})
.catch((error) => {
  console.error(error);
});


// performing POST and GET endpoints using Express framework
app.post("/user", async (request, response) => {
    console.log("user Data : ", request.body)
  const user = new User(request.body);
  try {
    await user.save();
    response.send(user);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.get("/users", async (request, response) => {
  const users = await User.find({});
  try {
    response.send(users);
  } catch (error) {
    response.status(500).send(error);
  }
});


app.use(express.json());
app.listen(4500, () => {
  console.log("The server is active on port 3000");
});
