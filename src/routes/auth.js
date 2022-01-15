const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { findOne } = require("../models/User");
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

// LOGIN

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  const checkPassword = await bcrypt.compare(password, user.password);

  try {
    if (!checkPassword) {
      console.log("login gagal");
      res.status(201).json("login gagal");
    }
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_TOKEN,
      { expiresIn: "15s" }
    );
    const { password, ...others } = user._doc;
    console.log("login berhasil");
    res.status(201).json({ ...others, accessToken });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
