const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
// REGISTER

router.post("/register", async (req, res) => {
  const { username, password, email } = req.body;
  const newUser = new User({
    username,
    email,
    password: bcrypt.hashSync(password, 8),
  });

  try {
    const saveUser = await newUser.save();
    res.status(201).json(saveUser);
    console.log(saveUser);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

module.exports = router;
