const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

router.get("/", (req, res) => {
  res.send("hallo");
});

router.post("/", (req, res) => {
  const { username, password } = req.body;

  res.json(username + " : " + password);
});

router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  const { id } = req.params;
  let { password } = req.body;
  if (password) {
    req.body.password = bcrypt.hashSync(password, 8);
  }
  // res.send("password: " + password);
  try {
    const updateUser = await User.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    console.log(updateUser);
    res.status(201).json(updateUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json("User has been deleted !!!");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", verifyTokenAndAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
