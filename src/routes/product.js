const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("hallo");
});

router.post("/", (req, res) => {
  const { username, password } = req.body;

  res.json(username + " : " + password);
});

router.put("/:id", (req, res) => {
  const { id } = req.params;

  res.json(id);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  res.json(id);
});

module.exports = router;
