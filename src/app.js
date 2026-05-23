const express = require("express");
require("dotenv").config();
const connectDB = require("./config/database");
const User = require("./modules/user");

const app = express();

app.use(express.json());

// signup user
app.post("/signup", async (req, res) => {
  // creating new instance
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User created successfully");
  } catch (err) {
    res.status(400).send("Error saving the user : " + err);
  }
});

//find user my email
app.get("/user", async (req, res) => {
  const userEmailId = req.body.emailId;

  try {
    const user = await User.find({ emailId: userEmailId });
    if (user.length === 0) res.status(400).send("User not found");
    res.send(user);
  } catch (err) {
    res.status(400).send("Soemthing went wrong!");
  }
});

// get all users
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) res.status(400).send("No users found");
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong!");
  }
});

// delete one user by id
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) res.status(400).send("User not found");
    res.send("User deleted successfully");
  } catch (err) {
    res.status(400).send("Something went wrong!");
  }
});

// update the user
app.patch("/user", async (req, res) => {
  try {
    const userId = req.body.userId;
    const user = await User.findByIdAndUpdate(userId, req.body, {
      runValidators: true,
    });
    res.send("User updated successfully");
  } catch (err) {
    res.status(400).send("Something went wrong!");
  }
});

connectDB()
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => {
      console.log("server is running on port 3000");
    });
  })
  .catch((err) => {
    console.error("DB connection error:", err.message || err);
    process.exit(1);
  });
